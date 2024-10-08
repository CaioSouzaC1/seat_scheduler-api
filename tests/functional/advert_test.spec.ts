import Advert from '#models/advert'
import UserHasType from '#models/user_has_type'
import UserType from '#models/user_type'
import { makeAddress } from '#tests/utils/factories/make_address'
import { makeAdvert } from '#tests/utils/factories/make_advert'
import { makeCompany } from '#tests/utils/factories/make_company'
import { makeStore } from '#tests/utils/factories/make_store'
import { makeUser } from '#tests/utils/factories/make_user'
import testUtils from '@adonisjs/core/services/test_utils'
import { test } from '@japa/runner'
import { join, resolve } from 'node:path'

test.group('Advert test', (group) => {
  group.each.setup(() => testUtils.db().migrate())

  test('[POST] /adverts', async ({ client, assert }) => {
    const address = await makeAddress()

    const user = await makeUser({
      addressId: address.id,
      email: 'johndoe@mail.com',
      password: '123',
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

    await user.related('store').attach([store.id])

    const login = await client.post('/login').json({
      email: 'johndoe@mail.com',
      password: '123',
    })

    const { token } = login.body().data

    const body = {
      name: 'name',
      type: 'type',
      storeId: store.id,
    }

    const result = await client
      .post('/adverts')
      .file('images', join(resolve(), '/tests/utils/', 'dog-marine.jpg'))
      .file('images', join(resolve(), '/tests/utils/', 'dog-marine.jpg'))
      .fields(body)
      .bearerToken(token)

    result.assertStatus(201)

    const advert = await Advert.first()

    assert.isOk(advert)
  })

  test('[SHOW] /adverts/:id', async ({ client }) => {
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

    const advert = await makeAdvert({
      companyId: company.id,
      storeId: store.id,
    })

    const login = await client.post('/login').json({
      email: 'johndoe@mail.com',
      password: '123',
    })

    const { token } = login.body().data

    const result = await client.get(`/adverts/${advert.id}`).bearerToken(token)

    result.assertStatus(200)

    result.assertBodyContains({
      data: {
        id: String,
      },
    })
  })

  test('[DELETE] /adverts/:id', async ({ client, assert }) => {
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

    const advert = await makeAdvert({
      companyId: company.id,
      storeId: store.id,
    })

    const login = await client.post('/login').json({
      email: 'johndoe@mail.com',
      password: '123',
    })

    const { token } = login.body().data

    const result = await client.delete(`/adverts/${advert.id}`).bearerToken(token)

    result.assertStatus(200)

    const advertOnDatabase = await Advert.find(advert.id)

    assert.isNull(advertOnDatabase)
  })

  test('[PUT] /adverts/:id', async ({ client, assert }) => {
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

    const advert = await makeAdvert({
      companyId: company.id,
      storeId: store.id,
    })

    const login = await client.post('/login').json({
      email: 'johndoe@mail.com',
      password: '123',
    })

    const { token } = login.body().data

    const body = {
      name: 'name update',
      type: 'type update',
    }

    const result = await client
      .put(`/adverts/${advert.id}`)
      .file('images', join(resolve(), '/tests/utils/', 'dog-marine.jpg'))
      .file('images', join(resolve(), '/tests/utils/', 'dog-marine.jpg'))
      .fields(body)
      .bearerToken(token)

    result.assertStatus(200)

    const advertOnDatabase = await Advert.find(advert.id)

    assert.equal(advertOnDatabase?.name, 'name update')
  })

  test('[GET] /adverts/', async ({ client }) => {
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

    await makeAdvert({
      companyId: company.id,
      storeId: store.id,
    })

    await makeAdvert({
      companyId: company.id,
      storeId: store.id,
    })

    const login = await client.post('/login').json({
      email: 'johndoe@mail.com',
      password: '123',
    })

    const { token } = login.body().data

    const result = await client.get('/adverts').bearerToken(token)

    result.assertStatus(200)
  })
})

test.group('Adverts Client routes', (group) => {
  group.each.setup(() => testUtils.db().migrate())
  test('[GET] /adverts', async ({ client }) => {
    const address = await makeAddress()

    const user = await makeUser({
      addressId: address.id,
    })

    const userCompany = await makeUser({
      addressId: address.id,
    })

    const company = await makeCompany({
      name: 'company',
      userId: userCompany.id,
      addressId: address.id,
    })

    const store = await makeStore({
      addressId: address.id,
      companyId: company.id,
    })

    await user.related('store').attach([store.id])

    await makeAdvert({
      companyId: company.id,
      storeId: store.id,
    })

    await makeAdvert({
      companyId: company.id,
      storeId: store.id,
    })

    const userClient = await makeUser({
      email: 'johndoe@mail.com',
      password: '123',
      addressId: address.id,
    })

    const type = await UserType.create({
      name: 'client',
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

    const result = await client.get('/adverts/').bearerToken(token)

    result.assertStatus(200)

    result.assertBodyContains({
      data: {
        data: [{ id: String }],
      },
    })
  })
})
