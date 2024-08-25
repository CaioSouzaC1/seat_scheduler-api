import Company from '#models/company'
import CompanyAttachement from '#models/company_attachement'
import { makeAddress } from '#tests/utils/factories/make_address'
import { makeCompany } from '#tests/utils/factories/make_company'
import { makeUser } from '#tests/utils/factories/make_user'
import testUtils from '@adonisjs/core/services/test_utils'
import { test } from '@japa/runner'
import { join, resolve } from 'node:path'

test.group('Company test', (group) => {
  group.each.setup(() => testUtils.db().migrate())

  test('[POST] /companies', async ({ assert, client }) => {
    const address = await makeAddress()

    await makeUser({
      email: 'johndoe@mail.com',
      password: '123',
      addressId: address.id,
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

    const result = await client
      .post('/companies')
      .file('images', join(resolve(), '/tests/utils/', 'dog-marine.jpg'))
      .file('images', join(resolve(), '/tests/utils/', 'dog-marine.jpg'))
      .fields(body)
      .bearerToken(token)

    result.assertStatus(201)

    const companyOnDatabase = await CompanyAttachement.first()

    assert.ok(companyOnDatabase?.imagePath)
  })

  test('[PUT] /companies/:id', async ({ assert, client }) => {
    const address = await makeAddress()

    const user = await makeUser({
      email: 'johndoe@mail.com',
      password: '123',
      addressId: address.id,
    })

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
      cnpj: '123123123jasdfaaaaaa',
      cep: '22222222',
      country: 'Brazil',
      state: 'RJ',
      city: 'Cruzero',
      neighborhood: 'Centro',
      street: 'Av. Jorge',
      number: 91,
      complement: '',
    }

    const result = await client
      .put(`/companies/${company.id}`)
      .file('images', join(resolve(), '/tests/utils/', 'dog-marine.jpg'))
      .file('images', join(resolve(), '/tests/utils/', 'dog-marine.jpg'))
      .fields(body)
      .bearerToken(token)

    result.assertStatus(200)

    const companyOnDatabase = await Company.find(company.id)
    const attachOnDatabase = await CompanyAttachement.findBy('company_id', company.id)

    assert.equal(companyOnDatabase!.name, 'company update')
    assert.ok(attachOnDatabase?.imagePath)
  })

  test('[DELETE] /companies/:id', async ({ assert, client }) => {
    const address = await makeAddress()

    const user = await makeUser({
      email: 'johndoe@mail.com',
      password: '123',
      addressId: address.id,
    })

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
    const address = await makeAddress()

    const user = await makeUser({
      email: 'johndoe@mail.com',
      password: '123',
      addressId: address.id,
    })

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

  test('[GET] /companies', async ({ client }) => {
    const address = await makeAddress()

    const user = await makeUser({
      email: 'johndoe@mail.com',
      password: '123',
      addressId: address.id,
    })

    await makeCompany({
      name: 'company',
      userId: user.id,
      addressId: address.id,
    })

    const login = await client.post('/login').json({
      email: 'johndoe@mail.com',
      password: '123',
    })

    const { token } = login.body().data

    const result = await client.get('/companies').bearerToken(token)

    result.assertStatus(200)

    result.assertBodyContains({
      data: {
        data: [{ id: String }],
      },
    })
  })
})
