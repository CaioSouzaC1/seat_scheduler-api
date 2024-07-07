export interface IStoreNotificationRequest {
  userId: string
  title: string
  message: string
  type: string
  data: object
}

export interface INotificationId {
  notificationId: string
}

export interface IEmitNotificationRequest {
  userId: string
  data: object
}
