import { faker } from '@faker-js/faker'
import { createHash } from '../utils/hashingUtils.js'

export const generateMockUser = () => ({
    first_name: faker.person.firstName(),
    last_name: faker.person.lastName(),
    email: faker.internet.email(),
    age: faker.number.int({ min: 18, max: 80 }), 
    password: createHash('coder123'),
    role: faker.helpers.arrayElement(['user', 'admin']),
    pets: []
  })

export const generateMockUsers = (count = 50) => {
  const users = []
  for (let i = 0; i < count; i++) {
    users.push(generateMockUser())
  }
  return users
}
