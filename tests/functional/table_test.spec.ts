import StoreUser from '#models/store_user'
import Table from '#models/table'
import { makeAddress } from '#tests/utils/factories/make_address'
import { makeCompany } from '#tests/utils/factories/make_company'
import { makeStore } from '#tests/utils/factories/make_store'
import { makeTable } from '#tests/utils/factories/make_table'
import { makeUser } from '#tests/utils/factories/make_user'
import testUtils from '@adonisjs/core/services/test_utils'
import { test } from '@japa/runner'

test.group('Table test', (group) => {
  group.each.setup(() => testUtils.db().migrate())

  test('[POST] /tables/bulk', async ({ client }) => {
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

    const store = await makeStore({
      addressId: address.id,
      companyId: company.id,
    })

    const login = await client.post('/login').json({
      email: 'johndoe@mail.com',
      password: '123',
    })

    const { token } = login.body().data

    const body = {
      numberOfTables: 1,
      storeId: store.id,
      numberOfChairs: 10,
      observation: 'closed door',
    }

    const result = await client.post('/tables/bulk').json(body).bearerToken(token)

    result.assertStatus(201)
  })

  test('[POST] /tables', async ({ client }) => {
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

    const store = await makeStore({
      addressId: address.id,
      companyId: company.id,
    })

    const login = await client.post('/login').json({
      email: 'johndoe@mail.com',
      password: '123',
    })

    const { token } = login.body().data

    const body = {
      number: 1,
      storeId: store.id,
      numberOfChairs: 10,
      observation: 'closed door',
    }

    const result = await client.post('/tables').json(body).bearerToken(token)

    result.assertStatus(201)

    result.assertBodyContains({
      data: {
        id: String,
      },
    })
  })

  test('[GET] /tables/{id}/all', async ({ client }) => {
    const address = await makeAddress()

    const user = await makeUser({
      email: 'johndoe@mail.com',
      password: '123',
      addressId: address.id,
    })

    const company = await makeCompany({
      addressId: address.id,
      userId: user.id,
    })
    const store = await makeStore({
      addressId: address.id,
      companyId: company.id,
    })

    await makeTable({ storeId: store.id })

    const login = await client.post('/login').json({
      email: 'johndoe@mail.com',
      password: '123',
    })

    const { token } = login.body().data

    const result = await client.get(`/tables/${store.id}/all`).bearerToken(token)

    result.assertStatus(200)

    result.assertBodyContains({
      data: {
        data: [{ id: String }],
      },
    })
  })

  test('[GET] /tables/{id}', async ({ client }) => {
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

    const store = await makeStore({
      companyId: company.id,
      addressId: address.id,
    })

    const table = await makeTable({
      storeId: store.id,
    })

    const login = await client.post('/login').json({
      email: 'johndoe@mail.com',
      password: '123',
    })

    const { token } = login.body().data

    const result = await client.get(`/tables/${table.id}`).bearerToken(token)

    result.assertStatus(200)

    result.assertBodyContains({
      data: {
        id: String,
      },
    })
  })

  test('[PUT] /tables/{id}', async ({ assert, client }) => {
    const address = await makeAddress()

    const user = await makeUser({
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
      numberOfChairs: 10,
    }

    const company = await makeCompany({
      addressId: address.id,
      userId: user.id,
    })

    const store = await makeStore({
      addressId: address.id,
      companyId: company.id,
    })

    await StoreUser.create({
      storeId: store.id,
      userId: user.id,
    })

    const table = await makeTable({
      numberOfChairs: 2,
      storeId: store.id,
    })

    const result = await client.put(`/tables/${table.id}`).json(body).bearerToken(token)

    result.assertStatus(200)

    const tableOnDatabase = await Table.find(table.id)

    assert.equal(tableOnDatabase?.numberOfChairs, 10)
  })

  test('[DELETE] /tables/{id}', async ({ assert, client }) => {
    const address = await makeAddress()

    const user = await makeUser({
      email: 'johndoe@mail.com',
      password: '123',
      addressId: address.id,
    })

    const company = await makeCompany({
      addressId: address.id,
      userId: user.id,
    })
    const store = await makeStore({
      addressId: address.id,
      companyId: company.id,
    })

    await StoreUser.create({
      storeId: store.id,
      userId: user.id,
    })

    const table = await makeTable({
      numberOfChairs: 2,
      storeId: store.id,
    })

    const login = await client.post('/login').json({
      email: 'johndoe@mail.com',
      password: '123',
    })

    const { token } = login.body().data

    const result = await client.delete(`/tables/${table.id}`).bearerToken(token)

    result.assertStatus(200)

    const tableOnDatabase = await Table.find(table.id)

    assert.isNull(tableOnDatabase)
  })

  test('[DELETE] /tables', async ({ client }) => {
    await makeUser({
      email: 'johndoe@mail.com',
      password: '123',
    })

    const table = await makeTable()

    const login = await client.post('/login').json({
      email: 'johndoe@mail.com',
      password: '123',
    })

    const company = await makeCompany({ name: 'company' })

    const store = await makeStore({ name: 'store', companyId: company.id })

    const body = { storeId: store.id, tables: [table.id] }

    const { token } = login.body().data

    const result = await client.delete(`/tables`).json(body).bearerToken(token)

    result.assertStatus(200)
  }).skip()
})
