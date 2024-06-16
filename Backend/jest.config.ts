/** @type {import('ts-jest').JestConfigWithTsJest} */
require('dotenv').config()
process.env.USER_COLLECTION = process.env.TEST_USER_COLLECTION
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['./src/test'],
}