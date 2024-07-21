import Advert from '#models/advert'
import AdvertAttachement from '#models/advert_attachement'
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
    const user = await makeUser({
      email: 'johndoe@mail.com',
      password: '123',
    })

    const address = await makeAddress()

    await makeCompany({
      name: 'company',
      userId: user.id,
      addressId: address.id,
    })

    await makeStore()

    const login = await client.post('/login').json({
      email: 'johndoe@mail.com',
      password: '123',
    })

    const { token } = login.body().data

    const body = {
      name: 'name',
      type: 'type',
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

  test('[SHOW] /adverts/:id', async ({ client, assert }) => {
    const user = await makeUser({
      email: 'johndoe@mail.com',
      password: '123',
    })

    const address = await makeAddress()

    await makeCompany({
      name: 'company',
      userId: user.id,
      addressId: address.id,
    })

    await makeStore()

    const advert = await makeAdvert()

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
    const user = await makeUser({
      email: 'johndoe@mail.com',
      password: '123',
    })

    const address = await makeAddress()

    await makeCompany({
      name: 'company',
      userId: user.id,
      addressId: address.id,
    })

    await makeStore()

    const advert = await makeAdvert()

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
    const user = await makeUser({
      email: 'johndoe@mail.com',
      password: '123',
    })

    const address = await makeAddress()

    await makeCompany({
      name: 'company',
      userId: user.id,
      addressId: address.id,
    })

    await makeStore()

    const advert = await makeAdvert()

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

  test('[GET] /adverts/', async ({ client, assert }) => {
    const user = await makeUser({
      email: 'johndoe@mail.com',
      password: '123',
    })

    const address = await makeAddress()

    await makeCompany({
      name: 'company',
      userId: user.id,
      addressId: address.id,
    })

    await makeStore()

    await makeAdvert()
    await makeAdvert()

    const login = await client.post('/login').json({
      email: 'johndoe@mail.com',
      password: '123',
    })

    const { token } = login.body().data

    const result = await client.get('/adverts').bearerToken(token)

    result.assertStatus(200)

    result.assertBodyContains({
      data: [
        {
          id: String,
        },
      ],
    })
  })
})
