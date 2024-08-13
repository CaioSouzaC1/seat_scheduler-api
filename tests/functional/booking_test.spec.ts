import Booking from '#models/booking'
import { makeAddress } from '#tests/utils/factories/make_address'
import { makeBooking } from '#tests/utils/factories/make_booking'
import { makeCompany } from '#tests/utils/factories/make_company'
import { makeStore } from '#tests/utils/factories/make_store'
import { makeTable } from '#tests/utils/factories/make_table'
import { makeUser } from '#tests/utils/factories/make_user'
import testUtils from '@adonisjs/core/services/test_utils'
import { test } from '@japa/runner'

test.group('Booking test', (group) => {
  group.each.setup(() => testUtils.db().migrate())

  test('[POST] /books', async ({ assert, client }) => {
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

    const store = await makeStore()

    const table = await makeTable({ storeId: store.id })

    const login = await client.post('/login').json({
      email: 'johndoe@mail.com',
      password: '123',
    })

    const { token } = login.body().data

    const body = {
      observation: 'observation',
      reservedDate: '01/01/0001',
      tableId: table.id,
      storeId: store.id,
    }

    const result = await client.post('/books').json(body).bearerToken(token)

    result.assertStatus(201)

    const bookingOnDatabase = Booking.first()

    assert.isOk(bookingOnDatabase)
  })

  test('[PUT] /books', async ({ client, assert }) => {
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

    await makeTable()

    await makeStore()

    const login = await client.post('/login').json({
      email: 'johndoe@mail.com',
      password: '123',
    })

    const { token } = login.body().data

    const booking = await makeBooking({ reservedDate: '01/01/0001' })

    const body = { reservedDate: '02/02/2001' }

    const result = await client.put(`/books/${booking.id}`).json(body).bearerToken(token)

    result.assertStatus(200)

    const bookingOnDatabase = await Booking.find(booking.id)

    assert.equal(bookingOnDatabase?.reservedDate, '02/02/2001')
  })

  test('[DELETE] /books', async ({ client, assert }) => {
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

    await makeTable()

    await makeStore()

    const login = await client.post('/login').json({
      email: 'johndoe@mail.com',
      password: '123',
    })

    const { token } = login.body().data

    const booking = await makeBooking({ reservedDate: '01/01/0001' })

    const result = await client.delete(`/books/${booking.id}`).bearerToken(token)

    result.assertStatus(200)

    const bookingOnDatabase = await Booking.find(booking.id)

    assert.isNull(bookingOnDatabase)
  })

  test('[GET] /books', async ({ client }) => {
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

    await makeTable()

    await makeStore()

    const login = await client.post('/login').json({
      email: 'johndoe@mail.com',
      password: '123',
    })

    const { token } = login.body().data

    await makeBooking({ reservedDate: '01/01/0001' })

    const result = await client.get(`/books`).bearerToken(token)

    result.assertStatus(200)

    result.assertBodyContains({
      data: {
        data: [{ id: String }],
      },
    })
  })

  test('[GET] /bookins/:id', async ({ client }) => {
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

    await makeTable()

    await makeStore()

    const login = await client.post('/login').json({
      email: 'johndoe@mail.com',
      password: '123',
    })

    const { token } = login.body().data

    const booking = await makeBooking({ reservedDate: '01/01/0001' })

    const result = await client.get(`/books/${booking.id}`).bearerToken(token)

    result.assertStatus(200)

    result.assertBodyContains({
      data: {
        id: String,
      },
    })
  })
})
