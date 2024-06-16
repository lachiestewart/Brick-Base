import request from "supertest"
import express from "../config/express"
import * as db from "../config/db"
import * as backdoor from '../app/models/backdoor.model'
import * as users from './resources/users.json'
import exp from "constants"

const app = express()

beforeAll(async () => {
  await db.connect()
  await backdoor.resetUsers()
})

afterAll(async () => {
  await db.disconnect()
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

// Get all users which should be default 20
test("Get all users", done => {
  request(app)
    .get("/api/v1/users")
    .then(response => {
      expect(response.statusCode).toBe(200)
      expect((response.body as []).length).toBe(20)
      done()
    })
})

// Register a valid user and check that they were added to the database
test("Valid register", done => {
  request(app)
    .post("/api/v1/users/register")
    .send(users.validUser)
    .then(response => {
      expect(response.statusCode).toBe(201)
      expect(response.body).toBeDefined()
      request(app)
        .get("/api/v1/user?email=" + users.validUser.email)
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
    .post("/api/v1/users/register")
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
    .post("/api/v1/users/register")
    .send(users.registeredUser)
    .then(response => {
      expect(response.statusCode).toBe(400)
      expect(response.body.message).toBe("Email already in use")
      done()
    })
})

test("Check user exists", done => {
  request(app)
    .get("/api/v1/user?email=" + users.registeredUser.email)
    .then(response => {
      expect(response.statusCode).toBe(200)
      expect(response.body.email).toBe(users.registeredUser.email)
      expect(response.body.password).toBeUndefined()
      done()
    })
})

test("Valid login", done => {
  request(app)
    .post("/api/v1/users/login")
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
    .post("/api/v1/users/login")
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
    .post("/api/v1/users/login")
    .send(users.incorrectPasswordUser)
    .then(response => {
      expect(response.statusCode).toBe(401)
      expect(response.body.message).toBe("Incorrect password")
      done()
    })
})