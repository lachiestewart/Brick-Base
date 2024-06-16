import jwt from 'jsonwebtoken'

const jwtSecretKey = process.env.JWT_SECRET_KEY
const jwtExpirationTime = process.env.JWT_EXPIRATION_TIME

const generateToken = (payload: User) => {
  const secretKey = jwtSecretKey
  const options = {
    expiresIn: jwtExpirationTime
  }
  const token = jwt.sign(payload, secretKey, options)
  return token
}

export { generateToken }