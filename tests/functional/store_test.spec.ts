import Store from '#models/store'
import { makeAddress } from '#tests/utils/factories/make_address'
import { makeCompany } from '#tests/utils/factories/make_company'
import { makeStore } from '#tests/utils/factories/make_store'
import { makeUser } from '#tests/utils/factories/make_user'
import testUtils from '@adonisjs/core/services/test_utils'
import { test } from '@japa/runner'

test.group('Store test', (group) => {
  group.each.setup(() => testUtils.db().migrate())

  test('[GET] /stores', async ({ client }) => {
    await makeUser({
      email: 'johndoe@mail.com',
      password: '123',
    })

    const login = await client.post('/login').json({
      email: 'johndoe@mail.com',
      password: '123',
    })

    const { token } = login.body().data

    const address = await makeAddress()

    const company = await makeCompany({ addressId: address.id })

    const store = await makeStore({ companyId: company.id, addressId: address.id })

    const result = await client.get('/stores').bearerToken(token)

    result.assertStatus(200)

    result.assertBodyContains({
      data: {
        data: [{ id: store.id }],
      },
    })
  })

  test('[POST] /stores', async ({ client }) => {
    await makeUser({
      email: 'johndoe@mail.com',
      password: '123',
    })

    const login = await client.post('/login').json({
      email: 'johndoe@mail.com',
      password: '123',
    })

    const { token } = login.body().data

    const company = await makeCompany()

    const body = {
      name: 'store',
      phone: '123123',
      description: 'asdf',
      cep: '12701050',
      city: 'Cruzeiro',
      complement: '',
      country: 'Brasil',
      state: 'SP',
      street: 'Rua Engenheiro Antônio Penido',
      number: '22',
      neighborhood: 'Centro',
      companyId: company.id,
    }

    const result = await client.post('/stores').json(body).bearerToken(token)

    result.assertStatus(201)

    result.assertBodyContains({
      data: {
        name: 'store',
      },
    })
  })

  test('[PUT] /stores/:id', async ({ client, assert }) => {
    await makeUser({
      email: 'johndoe@mail.com',
      password: '123',
    })

    const login = await client.post('/login').json({
      email: 'johndoe@mail.com',
      password: '123',
    })

    const { token } = login.body().data

    const company = await makeCompany({ name: 'company' })

    const store = await makeStore({ name: 'store', companyId: company.id })

    const body = { name: 'store update', companyId: company.id }

    const result = await client.put(`/stores/${store.id}`).json(body).bearerToken(token)

    result.assertStatus(200)

    const storeOnDatabase = await Store.find(store.id)

    assert.equal(storeOnDatabase?.name, 'store update')
  })

  test('[DELETE] /stores/:id', async ({ assert, client }) => {
    await makeUser({
      email: 'johndoe@mail.com',
      password: '123',
    })

    const login = await client.post('/login').json({
      email: 'johndoe@mail.com',
      password: '123',
    })

    const store = await makeStore({ name: 'store' })

    const { token } = login.body().data

    const result = await client.delete(`/stores/${store.id}`).bearerToken(token)

    result.assertStatus(200)

    const storeOnDatabase = await Store.find(store.id)

    assert.isNull(storeOnDatabase)
  })
})
