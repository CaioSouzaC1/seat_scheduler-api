import Order from '#models/order'
import { makeAddress } from '#tests/utils/factories/make_address'
import { makeCompany } from '#tests/utils/factories/make_company'
import { makeMenuItem } from '#tests/utils/factories/make_item'
import { makeOrder } from '#tests/utils/factories/make_order'
import { makeStore } from '#tests/utils/factories/make_store'
import { makeTable } from '#tests/utils/factories/make_table'
import { makeUser } from '#tests/utils/factories/make_user'
import testUtils from '@adonisjs/core/services/test_utils'
import { test } from '@japa/runner'

test.group('Order test', (group) => {
  group.each.setup(() => testUtils.db().migrate())

  test('[POST] /orders', async ({ client }) => {
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

    const item = await makeMenuItem({
      storeId: store.id,
    })

    const login = await client.post('/login').json({
      email: 'johndoe@mail.com',
      password: '123',
    })

    const { token } = login.body().data

    const body = {
      itemId: [item.id],
      tableId: table.id,
      storeId: store.id,
    }

    const result = await client.post('/orders').json(body).bearerToken(token)

    result.assertStatus(201)
  })

  test('[GET] /orders', async ({ client }) => {
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

    const store = await makeStore({ addressId: address.id, companyId: company.id })

    await user.related('store').attach([store.id])

    const table = await makeTable({ storeId: store.id })

    const item = await makeMenuItem({
      storeId: store.id,
    })

    const login = await client.post('/login').json({
      email: 'johndoe@mail.com',
      password: '123',
    })

    const { token } = login.body().data

    await makeOrder({
      menuItemId: item.id,
      tableId: table.id,
      userId: user.id,
    })

    const result = await client.get('/orders').bearerToken(token)

    result.assertStatus(200)

    result.assertBodyContains({
      data: {
        data: [{ id: String }],
      },
    })
  })

  test('[GET] /orders/:id', async ({ client }) => {
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

    const table = await makeTable({ storeId: store.id })

    const item = await makeMenuItem({
      storeId: store.id,
    })

    const login = await client.post('/login').json({
      email: 'johndoe@mail.com',
      password: '123',
    })

    const { token } = login.body().data

    const order = await makeOrder({
      menuItemId: item.id,
      tableId: table.id,
      userId: user.id,
    })

    const result = await client.get(`/orders/${order.id}`).bearerToken(token)

    result.assertStatus(200)

    result.assertBodyContains({
      data: {
        id: String,
      },
    })
  })

  test('[DELETE] /orders/:id', async ({ assert, client }) => {
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

    const store = await makeStore({ companyId: company.id, addressId: address.id })

    const table = await makeTable({ storeId: store.id })

    const item = await makeMenuItem({
      storeId: store.id,
    })

    const login = await client.post('/login').json({
      email: 'johndoe@mail.com',
      password: '123',
    })

    const { token } = login.body().data

    const order = await makeOrder({
      menuItemId: item.id,
      tableId: table.id,
      userId: user.id,
    })

    const result = await client.delete(`/orders/${order.id}`).bearerToken(token)

    result.assertStatus(200)

    const orderOnDatabase = await Order.find(order.id)

    assert.isNull(orderOnDatabase)
  })
})
