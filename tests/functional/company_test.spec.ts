import Company from '#models/company'
import { makeAddress } from '#tests/utils/factories/make_address'
import { makeCompany } from '#tests/utils/factories/make_company'
import { makeUser } from '#tests/utils/factories/make_user'
import testUtils from '@adonisjs/core/services/test_utils'
import { test } from '@japa/runner'

test.group('Company test', (group) => {
  group.each.setup(() => testUtils.db().migrate())

  test('[POST] /companies', async ({ assert, client }) => {
    await makeUser({
      email: 'johndoe@mail.com',
      password: '123',
    })

    const login = await client.post('/login').json({
      email: 'johndoe@mail.com',
      password: '123',
    })

    const { token } = login.body().data

    const body = {
      name: 'company',
      cnpj: '123123123jasdf',
      cep: '11111111',
      country: 'Brasil',
      state: 'SP',
      city: 'Cruzero',
      neighborhood: 'Centro',
      street: 'Av. Jorge',
      number: 904,
      complement: '',
    }

    const result = await client.post('/companies').json(body).bearerToken(token)

    result.assertStatus(201)

    const companyOnDatabase = await Company.first()

    assert.equal(companyOnDatabase!.name, 'company')
  })

  test('[PUT] /companies/:id', async ({ assert, client }) => {
    const user = await makeUser({
      email: 'johndoe@mail.com',
      password: '123',
    })

    const address = await makeAddress()

    const company = await makeCompany({
      name: 'company',
      userId: user.id,
      addressId: address.id,
    })

    const login = await client.post('/login').json({
      email: 'johndoe@mail.com',
      password: '123',
    })

    const { token } = login.body().data

    const body = {
      name: 'company update',
    }

    const result = await client.put(`/companies/${company.id}`).json(body).bearerToken(token)

    result.assertStatus(200)

    const companyOnDatabase = await Company.find(company.id)

    assert.equal(companyOnDatabase!.name, 'company update')
  })

  test('[DELETE] /companies/:id', async ({ assert, client }) => {
    const user = await makeUser({
      email: 'johndoe@mail.com',
      password: '123',
    })

    const address = await makeAddress()

    const company = await makeCompany({
      name: 'company',
      userId: user.id,
      addressId: address.id,
    })

    const login = await client.post('/login').json({
      email: 'johndoe@mail.com',
      password: '123',
    })

    const { token } = login.body().data

    const result = await client.delete(`/companies/${company.id}`).bearerToken(token)

    result.assertStatus(200)

    const companyOnDatabase = await Company.find(company.id)

    assert.isNull(companyOnDatabase)
  })

  test('[GET] /companies/:id', async ({ client }) => {
    const user = await makeUser({
      email: 'johndoe@mail.com',
      password: '123',
    })

    const address = await makeAddress()

    const company = await makeCompany({
      name: 'company',
      userId: user.id,
      addressId: address.id,
    })

    const login = await client.post('/login').json({
      email: 'johndoe@mail.com',
      password: '123',
    })

    const { token } = login.body().data

    const result = await client.get(`/companies/${company.id}`).bearerToken(token)

    result.assertStatus(200)

    result.assertBodyContains({
      data: {
        name: 'company',
      },
    })
  })
})
