import Order from '#models/order'
import { IOrderIdRequest, IStoreOrderRequest } from '../interfaces/Requests/Order/index.js'
import { IIndexRequest } from '../interfaces/ReturnApi/index.js'

export class OrderService {
  async store({ itemId, userId, tableId }: IStoreOrderRequest) {
    itemId.map(async (id) => await Order.create({ itemId: id, userId, tableId }))
  }

  async index({ page, limit, id: userId }: IIndexRequest) {
    const orders = await Order.query()
      .preload('table', (tableQuery) => {
        tableQuery.preload('store', (storeQuery) => {
          storeQuery.preload('user', (userQuery) => {
            userQuery.where('user_id', userId!)
          })
        })
      })
      .paginate(page, limit)

    return orders.toJSON()
  }

  async show({ orderId }: IOrderIdRequest) {
    const order = await Order.find(orderId)

    return order
  }

  async delete({ orderId }: IOrderIdRequest) {
    const order = await Order.find(orderId)

    await order?.delete()
  }
}
