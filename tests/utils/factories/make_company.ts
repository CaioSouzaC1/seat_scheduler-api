import Company from '#models/company'
import { faker } from '@faker-js/faker'

export async function makeCompany(override: Partial<Company> = {}) {
  const company = {
    name: faker.company.name(),
    cnpj: faker.string.numeric(14),
    ...override,
  }

  return await Company.create(company)
}
