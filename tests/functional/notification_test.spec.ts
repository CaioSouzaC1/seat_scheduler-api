import { makeAddress } from '#tests/utils/factories/make_address'
import { makeAdvert } from '#tests/utils/factories/make_advert'
import { makeCompany } from '#tests/utils/factories/make_company'
import { makeNotification } from '#tests/utils/factories/make_notification'
import { makeStore } from '#tests/utils/factories/make_store'
import { makeUser } from '#tests/utils/factories/make_user'
import testUtils from '@adonisjs/core/services/test_utils'
import { test } from '@japa/runner'

test.group('Notification test', (group) => {
  group.each.setup(() => testUtils.db().migrate())

  test('[GET] /notifications/', async ({ client }) => {
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

    await makeNotification({
      userId: user.id,
    })

    const login = await client.post('/login').json({
      email: 'johndoe@mail.com',
      password: '123',
    })

    const { token } = login.body().data

    const result = await client.get('/notifications').bearerToken(token)

    result.assertStatus(200)
  })
})
