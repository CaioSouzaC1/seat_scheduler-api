import User from '#models/user'
import UserHasType from '#models/user_has_type'
import UserType from '#models/user_type'
import { makeAddress } from '#tests/utils/factories/make_address'
import { makeStore } from '#tests/utils/factories/make_store'
import { makeUser } from '#tests/utils/factories/make_user'
import testUtils from '@adonisjs/core/services/test_utils'
import { test } from '@japa/runner'

test.group('User test', (group) => {
  group.each.setup(() => testUtils.db().migrate())

  test('[POST] /users', async ({ client, assert }) => {
    await UserType.create({ name: 'operator' })
    const store = await makeStore()

    const body = {
      cep: '12701050',
      city: 'Cruzeiro',
      complement: '',
      country: 'Brasil',
      email: 'johndoaae@gmail.com',
      name: 'Vasco de la gama',
      neighborhood: 'Centro',
      number: '22',
      password: '12312312312312',
      phone: '12123123123',
      state: 'SP',
      street: 'Rua Engenheiro Antônio Penido',
      storeId: store.id,
    }

    const result = await client.post('/users').json(body)

    result.assertStatus(201)

    const userOnDatabase = await User.first()

    assert.isOk(userOnDatabase!.id)

    const userHasTypeOnDatabase = await UserHasType.first()

    assert.isOk(userHasTypeOnDatabase!.id)
  })

  test('[PUT] /users/', async ({ client, assert }) => {
    const address = await makeAddress()

    const user = await makeUser({
      email: 'johndoe@gmail.com',
      password: '123',
      name: 'John Doe',
      addressId: address.id,
    })

    const login = await client.post('/login').json({
      email: 'johndoe@gmail.com',
      password: '123',
    })

    const { token } = login.body().data

    const result = await client.put('/users').json({ name: 'joao' }).bearerToken(token)

    result.assertStatus(200)

    const userOnDatabase = await User.find(user.id)

    assert.equal(userOnDatabase!.name, 'joao')
  })

  test('[DELETE] /users/', async ({ client, assert }) => {
    const user = await makeUser({
      email: 'johndoe@gmail.com',
      password: '123',
      name: 'John Doe',
    })

    const login = await client.post('/login').json({
      email: 'johndoe@gmail.com',
      password: '123',
    })

    const { token } = login.body().data

    const result = await client.delete('/users').bearerToken(token)

    result.assertStatus(200)

    const userOnDatabase = await User.find(user.id)

    assert.isNull(userOnDatabase)
  })
})
