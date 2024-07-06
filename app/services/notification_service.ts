import Notification from '#models/notification'
import {
  INotificationId,
  IStoreNotificationRequest,
} from '../interfaces/Requests/Notification/index.js'

export class NoificationService {
  async store({ data, type, title, userId, message }: IStoreNotificationRequest) {
    await Notification.create({ data, type, title, userId, message })
  }

  async readed({ notificationId }: INotificationId) {
    const notification = await Notification.find(notificationId)

    if (!notification) return

    notification.read = true

    await notification.save()
  }
}
