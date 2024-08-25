import Advert from '#models/advert'
import { faker } from '@faker-js/faker'

export async function makeAdvert(override: Partial<Advert> = {}) {
  const advert = {
    name: faker.company.name(),
    type: 'type',
    ...override,
  }
  return await Advert.create(advert)
}
