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
