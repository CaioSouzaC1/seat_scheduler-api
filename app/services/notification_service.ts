import Notification from '#models/notification'
import { inject } from '@adonisjs/core'
import {
  IEmitNotificationRequest,
  INotificationId,
  IStoreNotificationRequest,
} from '../interfaces/Requests/Notification/index.js'
import { IIndexWithIdRequest } from '../interfaces/ReturnApi/index.js'
import ws from './ws.js'

@inject()
export class NotificationService {
  async store({ data, type, title, userId, message }: IStoreNotificationRequest) {
    await Notification.create({ data, type, title, userId, message })
  }

  async readed({ notificationId }: INotificationId) {
    const notification = await Notification.query().where('id', notificationId).first()

    if (!notification) return

    notification.read = true

    await notification.save()
  }

  async sendMessagePrivate({ userId, data }: IEmitNotificationRequest) {
    ws.io?.emit(`notify.${userId}`, data)
  }

  async index({ page, limit, id: userId }: IIndexWithIdRequest) {
    const notifications = await Notification.query().where('userId', userId!).paginate(page, limit)

    return notifications.toJSON()
  }
}
