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
      companyId: company.id,
      addressId: address.id,
    })

    const table = await makeTable({ storeId: store.id })

    const login = await client.post('/login').json({
      email: 'johndoe@mail.com',
      password: '123',
    })

    const { token } = login.body().data

    const body = {
      observation: 'observation',
      reservedDate: '06/06/2050',
      tableId: table.id,
      storeId: store.id,
    }

    const result = await client.post('/books').json(body).bearerToken(token)

    result.assertStatus(201)

    const bookingOnDatabase = Booking.first()

    assert.isOk(bookingOnDatabase)
  })

  test('[PUT] /books', async ({ client, assert }) => {
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
      companyId: company.id,
      addressId: address.id,
    })

    const table = await makeTable({
      storeId: store.id,
    })

    const login = await client.post('/login').json({
      email: 'johndoe@mail.com',
      password: '123',
    })

    const { token } = login.body().data

    const booking = await makeBooking({
      reservedDate: '06/06/2050',
      tableId: table.id,
      storeId: store.id,
      userId: user.id,
    })

    const body = { reservedDate: '02/02/2001' }

    const result = await client.put(`/books/${booking.id}`).json(body).bearerToken(token)

    result.assertStatus(200)

    const bookingOnDatabase = await Booking.find(booking.id)

    assert.equal(bookingOnDatabase?.reservedDate, '02/02/2001')
  })

  test('[DELETE] /books', async ({ client, assert }) => {
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
      companyId: company.id,
      addressId: address.id,
    })

    const table = await makeTable({
      storeId: store.id,
    })

    const login = await client.post('/login').json({
      email: 'johndoe@mail.com',
      password: '123',
    })

    const { token } = login.body().data

    const booking = await makeBooking({
      reservedDate: '06/06/2050',
      tableId: table.id,
      storeId: store.id,
      userId: user.id,
    })

    const result = await client.delete(`/books/${booking.id}`).bearerToken(token)

    result.assertStatus(200)

    const bookingOnDatabase = await Booking.find(booking.id)

    assert.isNull(bookingOnDatabase)
  })

  test('[GET] /books', async ({ client }) => {
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
      companyId: company.id,
      addressId: address.id,
    })

    const store2 = await makeStore({
      companyId: company.id,
      addressId: address.id,
    })

    await user.related('store').attach([store.id])

    const table = await makeTable({
      storeId: store.id,
    })

    const table2 = await makeTable({
      storeId: store.id,
    })

    const login = await client.post('/login').json({
      email: 'johndoe@mail.com',
      password: '123',
    })

    const { token } = login.body().data

    await makeBooking({
      reservedDate: '06/06/2050',
      storeId: store.id,
      userId: user.id,
      tableId: table.id,
    })

    await makeBooking({
      reservedDate: '06/06/2050',
      storeId: store2.id,
      userId: user.id,
      tableId: table2.id,
    })

    const result = await client
      .get(`/books?limit=${10}&page=${1}&status=available`)
      .bearerToken(token)

    result.assertStatus(200)
  })

  test('[GET] /books/:id', async ({ client }) => {
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

    const table = await makeTable({
      storeId: store.id,
    })

    const login = await client.post('/login').json({
      email: 'johndoe@mail.com',
      password: '123',
    })

    const { token } = login.body().data

    const booking = await makeBooking({
      reservedDate: '06/06/2050',
      storeId: store.id,
      tableId: table.id,
      userId: user.id,
    })

    const result = await client.get(`/books/${booking.id}`).bearerToken(token)

    result.assertStatus(200)
  })
})
