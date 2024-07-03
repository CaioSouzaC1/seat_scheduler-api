import User from '#models/user'
import testUtils from '@adonisjs/core/services/test_utils'
import { test } from '@japa/runner'

test.group('Session test', (group) => {
  group.each.setup(() => testUtils.db().migrate())

  test('[POST] /login', async ({ client }) => {
    await User.create({
      email: 'johndoe@mail.com',
      password: '123',
      name: 'john doe',
      phone: '123123',
    })

    const body = {
      email: 'johndoe@mail.com',
      password: '123',
    }

    const result = await client.post('/login').json(body)

    result.assertStatus(200)
    result.assertBodyContains({
      data: {
        user: { email: 'johndoe@mail.com' },
        token: String,
      },
    })
  })

  test('[GET] /me', async ({ client }) => {
    await User.create({
      email: 'johndoe@mail.com',
      password: '123',
      name: 'john doe',
      phone: '123123',
    })

    const body = {
      email: 'johndoe@mail.com',
      password: '123',
    }

    const login = await client.post('/login').json(body)

    const { token } = login.body().data

    const result = await client.get('/me').bearerToken(token)

    result.assertStatus(200)

    result.assertBodyContains({ id: String })
  })
})
