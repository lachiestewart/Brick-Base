import request from "supertest"
import express from "../config/express"
import * as db from "../config/db"
import * as backdoorModel from '../app/models/backdoor.model'
import * as users from './resources/users.json'
import * as items from './resources/items.json'

const app = express()

const baseUrl = "/api/v1"

const invalidToken = "badToken"

beforeAll(async () => {
  await db.connect()
})

beforeEach(async () => {
  await backdoorModel.resetUsers()
})

afterAll(async () => {
  await db.disconnect()
})

describe("User account tests", () => {

  test("Check if server alive", done => {
    request(app)
      .get("/")
      .then(response => {
        expect(response.statusCode).toBe(200)
        expect(response.text).toBe("Hello World!")
        done()
      })
  })

  // Get all users which should be default 20
  test("Get all users", done => {
    request(app)
      .get(baseUrl + "/users")
      .then(response => {
        expect(response.statusCode).toBe(200)
        expect((response.body as []).length).toBe(20)
        done()
      })
  })

  // Register a valid user and check that they were added to the database
  test("Valid register", done => {
    request(app)
      .post(baseUrl + "/users/register")
      .send(users.validUser)
      .then(response => {
        expect(response.statusCode).toBe(201)
        expect(response.body).toBeDefined()
        request(app)
          .get(baseUrl + "/user?email=" + users.validUser.email)
          .then(response => {
            expect(response.statusCode).toBe(200)
            expect(response.body.email).toBe(users.validUser.email)
            done()
          })
      })
  })


  // Try to register a user with a weak password
  test("Invalid register, weak password", done => {
    request(app)
      .post(baseUrl + "/users/register")
      .send(users.weakPasswordUser)
      .then(response => {
        expect(response.statusCode).toBe(400)
        expect(response.body.message).toBe("Password too weak")
        done()
      })
  })

  // Try to register a user with an email that already exists
  test("Invalid register, email already in use", done => {
    request(app)
      .post(baseUrl + "/users/register")
      .send(users.registeredUser)
      .then(response => {
        expect(response.statusCode).toBe(400)
        expect(response.body.message).toBe("Email already in use")
        done()
      })
  })

  test("Check user exists", done => {
    request(app)
      .get(baseUrl + "/user?email=" + users.registeredUser.email)
      .then(response => {
        expect(response.statusCode).toBe(200)
        expect(response.body.email).toBe(users.registeredUser.email)
        expect(response.body.password).toBeUndefined()
        done()
      })
  })

  test("Valid login", done => {
    request(app)
      .post(baseUrl + "/users/login")
      .send(users.registeredUser)
      .then(response => {
        expect(response.statusCode).toBe(200)
        expect(response.headers.authorization).toBeDefined()
        done()
      })
  })

  // Try to login with a user that doesn't exist
  test("Invalid login, unregistered user", done => {
    request(app)
      .post(baseUrl + "/users/login")
      .send(users.weakPasswordUser)
      .then(response => {
        expect(response.statusCode).toBe(404)
        expect(response.body.message).toBe("User not found")
        done()
      })
  })

  // Try to login with a user that has the wrong password
  test("Invalid login, wrong password", done => {
    request(app)
      .post(baseUrl + "/users/login")
      .send(users.incorrectPasswordUser)
      .then(response => {
        expect(response.statusCode).toBe(401)
        expect(response.body.message).toBe("Incorrect password")
        done()
      })
  })
})

describe("Items tests", () => {

  let userWithNoItemsToken: string
  let userWithItemsToken: string

  beforeAll(async () => {
    await request(app)
      .post(baseUrl + "/users/login")
      .send(users.registeredUser)
      .then(response => {
        userWithNoItemsToken = response.headers.authorization
      })
    await request(app)
      .post(baseUrl + "/users/login")
      .send(users.userWithItems)
      .then(response => {
        userWithItemsToken = response.headers.authorization
      })
  })

  test("Check if server alive", done => {
    request(app)
      .get("/")
      .then(response => {
        expect(response.statusCode).toBe(200)
        expect(response.text).toBe("Hello World!")
        done()
      })
  })

  test("Get all items for a user", done => {
    request(app)
      .get(baseUrl + "/items")
      .set("Authorization", userWithItemsToken)
      .then(response => {
        expect(response.statusCode).toBe(200)
        expect(response.body.length).toBe(2)
        done()
      })
  })

  test("Add item to user's items list", done => {
    request(app)
      .post(baseUrl + "/items")
      .send(items.newItem)
      .set("Authorization", userWithNoItemsToken)
      .then(postResponse => {
        expect(postResponse.statusCode).toBe(201)
        request(app)
          .get(baseUrl + "/items")
          .set("Authorization", userWithNoItemsToken)
          .then(getResponse => {
            expect(getResponse.statusCode).toBe(200)
            expect(getResponse.body.length).toBe(1)
            expect(getResponse.body[0].type).toBe(items.newItem.type)
            expect(getResponse.body[0].no).toBe(items.newItem.no)
            done()
          })
      })
  })

  test("Remove item from user's items list", done => {
    request(app)
      .delete(baseUrl + "/items?no=" + items.itemToRemove.no + "&type=" + items.itemToRemove.type)
      .set("Authorization", userWithItemsToken)
      .then(deleteResponse => {
        expect(deleteResponse.statusCode).toBe(204)
        request(app)
          .get(baseUrl + "/items")
          .set("Authorization", userWithItemsToken)
          .then(getResponse => {
            expect(getResponse.statusCode).toBe(200)
            expect(getResponse.body.length).toBe(1)
            expect(getResponse.body[0].type).toBe(items.remainingItem.type)
            expect(getResponse.body[0].no).toBe(items.remainingItem.no)
            done()
          })
      })
  })

  test("Try to get items without being authenticated", done => {
    request(app)
      .get(baseUrl + "/items")
      .then(response => {
        expect(response.statusCode).toBe(401)
        expect(response.body.message).toBe("Unauthorized")
        done()
      })
  })

  test("Try to get items with invalid authentication", done => {
    request(app)
      .get(baseUrl + "/items")
      .set("Authorization", invalidToken)
      .then(response => {
        expect(response.statusCode).toBe(401)
        expect(response.body.message).toBe("Unauthorized")
        done()
      })
  })

})
