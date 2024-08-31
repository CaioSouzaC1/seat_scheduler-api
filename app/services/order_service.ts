import Order from '#models/order'
import { IOrderIdRequest, IStoreOrderRequest } from '../interfaces/Requests/Order/index.js'
import { IIndexRequest } from '../interfaces/ReturnApi/index.js'

export class OrderService {
  async store({ itemId, userId, tableId }: IStoreOrderRequest) {
    itemId.map(async (id) => await Order.create({ menuItemId: id, userId, tableId }))
  }

  async index({ page, limit, ids: storeIds }: IIndexRequest) {
    const orders = await Order.query()
      .preload('user')
      .preload('menu')
      .preload('table')
      .whereHas('table', (tableQuery) => {
        tableQuery.whereHas('store', (storeQuery) => {
          storeQuery.whereIn('id', storeIds!)
        })
      })
      .paginate(page, limit)

    return orders.toJSON()
  }

  async show({ orderId }: IOrderIdRequest) {
    const order = await Order.query()
      .preload('user')
      .preload('menu')
      .preload('table')
      .where('id', orderId)
      .first()

    return order
  }

  async delete({ orderId }: IOrderIdRequest) {
    const order = await Order.find(orderId)

    await order?.delete()
  }
}
