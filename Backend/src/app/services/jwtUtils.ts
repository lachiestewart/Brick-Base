import jwt from 'jsonwebtoken'

const jwtSecretKey = process.env.JWT_SECRET_KEY
const jwtExpirationTime = process.env.JWT_EXPIRATION_TIME

const generateToken = (user: User) => {
  const options = {
    expiresIn: jwtExpirationTime
  }
  user.password = undefined
  user.items = undefined
  const token = jwt.sign(user, jwtSecretKey, options)
  return token
}

const decodeToken = (token: string): User | null => {
  const content = jwt.verify(token, jwtSecretKey)
  if (typeof content === 'string') {
    return null
  }
  return content as User
}

export { generateToken, decodeToken }