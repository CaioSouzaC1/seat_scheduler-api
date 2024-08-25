import Order from '#models/order'

export async function makeOrder(override: Partial<Order> = {}) {
  const order = {
    status: 'Pendente',
    ...override,
  }
  return await Order.create(order)
}
