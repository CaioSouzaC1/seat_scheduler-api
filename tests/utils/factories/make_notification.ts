import Notification from '#models/notification'
import { faker } from '@faker-js/faker'

export async function makeNotification(override: Partial<Notification> = {}) {
  const notification = {
    type: faker.lorem.lines(1),
    title: faker.lorem.lines(1),
    message: faker.lorem.lines(1),
    data: faker.object(),
    read: faker.boolean(),
    ...override,
  }
  return await Notification.create(notification)
}
