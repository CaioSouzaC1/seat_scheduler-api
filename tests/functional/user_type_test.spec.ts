import UserType from '#models/user_type'
import testUtils from '@adonisjs/core/services/test_utils'
import { test } from '@japa/runner'

test.group('User type test', (group) => {
  group.each.setup(() => testUtils.db().migrate())

  test('[GET] /user-types', async ({ client }) => {
    UserType.createMany([
      {
        name: 'admin',
      },
      {
        name: 'operator',
      },
      {
        name: 'client',
      },
    ])

    const result = await client.get('/user-types')

    result.assertStatus(200)
  })
})
