import User from '#models/user'
import UserHasType from '#models/user_has_type'
import UserType from '#models/user_type'
import testUtils from '@adonisjs/core/services/test_utils'
import { test } from '@japa/runner'

test.group('User test', (group) => {
  group.each.setup(() => testUtils.db().migrate())

  test('[POST] /users', async ({ client, assert }) => {
    const type = await UserType.create({ name: 'admin' })
    const body = {
      email: 'johndoe@gmail.com',
      name: 'john doe',
      phone: '123123123',
      password: '123',
      typeId: type.id,
    }

    const result = await client.post('/users').json(body)

    result.assertStatus(201)

    const userOnDatabase = await User.first()

    assert.isOk(userOnDatabase.id)

    const userHasTypeOnDatabase = await UserHasType.first()

    assert.isOk(userHasTypeOnDatabase.id)
  })
})
