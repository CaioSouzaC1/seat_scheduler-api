import Order from '#models/order'

export async function makeOrder(override: Partial<Order> = {}) {
  const order = {
    ...override,
  }
  return await Order.create(order)
}
