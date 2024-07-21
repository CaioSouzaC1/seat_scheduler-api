import Evaluation from '#models/evaluation'
import { faker } from '@faker-js/faker'

export async function makeEvaluation(override: Partial<Evaluation> = {}) {
  const evaluation = {
    description: faker.lorem.lines(1),
    note: faker.number.int({ min: 0, max: 10 }),
    ...override,
  }
  return await Evaluation.create(evaluation)
}
