import Booking from '#models/booking'
import { makeAddress } from '#tests/utils/factories/make_address'
import { makeCompany } from '#tests/utils/factories/make_company'
import { makeStore } from '#tests/utils/factories/make_store'
import { makeTable } from '#tests/utils/factories/make_table'
import { makeUser } from '#tests/utils/factories/make_user'
import testUtils from '@adonisjs/core/services/test_utils'
import { test } from '@japa/runner'

test.group('Booking test', (group) => {
  group.each.setup(() => testUtils.db().migrate())

  test('[POST] /bookings', async ({ assert, client }) => {
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

    const table = await makeTable()
    await makeStore()

    const login = await client.post('/login').json({
      email: 'johndoe@mail.com',
      password: '123',
    })

    const { token } = login.body().data

    const body = {
      observation: 'observation',
      reservedDate: '01/01/0001',
      tableId: table.id,
    }

    const result = await client.post('/bookings').json(body).bearerToken(token)

    result.assertStatus(201)

    const bookingOnDatabase = Booking.first()

    assert.isOk(bookingOnDatabase)
  })
})
