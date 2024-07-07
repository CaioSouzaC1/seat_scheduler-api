import Store from '#models/store'
import app from '@adonisjs/core/services/app'
import { IStoreStoreAttachementRequest } from '../interfaces/Requests/Store/index.js'
import { cuid } from '@adonisjs/core/helpers'

export class StoreAttachementService {
  async store(store: Store, { name, type, imagePath }: IStoreStoreAttachementRequest) {
    imagePath.move(app.makePath('uploads/StoreAttachement'), {
      name: `${cuid()}.${imagePath.extname}`,
    })

    await store.related('attach').create({
      name,
      type,
      imagePath: imagePath.filePath,
    })
  }
}
