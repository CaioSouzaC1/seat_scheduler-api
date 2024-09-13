import Store from '#models/store'
import UserHasType from '#models/user_has_type'
import UserType from '#models/user_type'
import { makeAddress } from '#tests/utils/factories/make_address'
import { makeCompany } from '#tests/utils/factories/make_company'
import { makeStore } from '#tests/utils/factories/make_store'
import { makeUser } from '#tests/utils/factories/make_user'
import testUtils from '@adonisjs/core/services/test_utils'
import { test } from '@japa/runner'

test.group('Store test', (group) => {
  group.each.setup(() => testUtils.db().migrate())

  test('[GET] /stores', async ({ client }) => {
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

    const company = await makeCompany({ addressId: address.id, userId: user.id })

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

    const company = await makeCompany({
      addressId: address.id,
      userId: user.id,
    })

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

    const company = await makeCompany({ name: 'company', addressId: address.id, userId: user.id })

    const store = await makeStore({ name: 'store', companyId: company.id, addressId: address.id })

    const body = { name: 'store update', companyId: company.id }

    const result = await client.put(`/stores/${store.id}`).json(body).bearerToken(token)

    result.assertStatus(200)

    const storeOnDatabase = await Store.find(store.id)

    assert.equal(storeOnDatabase?.name, 'store update')
  })

  test('[DELETE] /stores/:id', async ({ assert, client }) => {
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

    const company = await makeCompany({
      addressId: address.id,
      userId: user.id,
    })

    const store = await makeStore({
      name: 'store',
      addressId: address.id,
      companyId: company.id,
    })

    const { token } = login.body().data

    const result = await client.delete(`/stores/${store.id}`).bearerToken(token)

    result.assertStatus(200)

    const storeOnDatabase = await Store.find(store.id)

    assert.isNull(storeOnDatabase)
  })

  test('[GET] /stores/:id', async ({ assert, client }) => {
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

    const company = await makeCompany({
      addressId: address.id,
      userId: user.id,
    })

    const store = await makeStore({
      name: 'store',
      addressId: address.id,
      companyId: company.id,
    })

    const { token } = login.body().data

    const result = await client.get(`/stores/${store.id}`).bearerToken(token)

    result.assertStatus(200)
  })
})

test.group('Stores Client', (group) => {
  group.each.setup(() => testUtils.db().migrate())

  test('[GET] /stores', async ({ client }) => {
    const address = await makeAddress()

    const user = await makeUser({ addressId: address.id })

    const company = await makeCompany({ addressId: address.id, userId: user.id })

    const store = await makeStore({ companyId: company.id, addressId: address.id })

    const type = await UserType.create({
      name: 'client',
    })

    const userClient = await makeUser({
      email: 'johndoe@mail.com',
      password: '123',
      addressId: address.id,
    })

    UserHasType.create({
      userId: userClient.id,
      typeId: type.id,
    })

    const login = await client.post('/login').json({
      email: 'johndoe@mail.com',
      password: '123',
    })

    const { token } = login.body().data

    const result = await client.get('/stores').bearerToken(token)

    result.assertStatus(200)

    // result.assertBodyContains({
    //   data: {
    //     data: [{ id: store.id }],
    //   },
    // })
  })
})
