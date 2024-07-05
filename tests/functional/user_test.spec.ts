import User from '#models/user'
import UserHasType from '#models/user_has_type'
import UserType from '#models/user_type'
import { makeAddress } from '#tests/utils/factories/make_address'
import { makeUser } from '#tests/utils/factories/make_user'
import testUtils from '@adonisjs/core/services/test_utils'
import { test } from '@japa/runner'

test.group('User test', (group) => {
  group.each.setup(() => testUtils.db().migrate())

  test('[POST] /users', async ({ client, assert }) => {
    const type = await UserType.create({ name: 'operator' })

    const body = {
      email: 'johndoe@gmail.com',
      password: '123',
      name: 'john doe',
      phone: '123123123',
      typeId: type.id,
      cep: '11111111',
      country: 'Brasil',
      state: 'SP',
      city: 'Cruzero',
      neighborhood: 'Centro',
      street: 'Av. Jorge',
      number: 904,
      complement: '',
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
