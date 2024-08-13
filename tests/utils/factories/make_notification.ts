import Notification from '#models/notification'
import { faker } from '@faker-js/faker'

export async function makeNotification(override: Partial<Notification> = {}) {
  const notification = {
    data: { data: faker.git.commitDate() },
    read: faker.datatype.boolean(),
    title: faker.word.adjective(),
    message: faker.lorem.lines(1),
    type: faker.word.adjective(),
    ...override,
  }
  return await Notification.create(notification)
}
