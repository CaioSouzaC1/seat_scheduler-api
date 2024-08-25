import Store from '#models/store'
import { cuid } from '@adonisjs/core/helpers'
import {
  IEditStoreRequest,
  IStoreIdRequest,
  IStoreStoreRequest,
} from '../interfaces/Requests/Store/index.js'
import app from '@adonisjs/core/services/app'
import { IIndexRequest } from '../interfaces/ReturnApi/index.js'

export class StoreService {
  async store({
    name,
    phone,
    companyId,
    description,
    images,
    addressId,
  }: IStoreStoreRequest) {

    const store = await Store.create({
      name,
      phone,
      companyId,
      description,
      addressId,
    })

    if (images) {
      for (const image of images) {
        await image.move(app.makePath('uploads/stores'), {
          name: `${cuid()}.${image.extname}`,
        })

        await store
          .related('attachement')
          .create({ imagePath: '/uploads/stores/' + image.fileName })
      }
    }

    return store
  }

  async update({ name, phone, description, storeId, images, companyId }: IEditStoreRequest) {
    const store = await Store.findBy({ id: storeId, companyId })

    if (!store) return null

    store.name = name ?? store.name
    store.phone = phone ?? store.phone
    store.description = description ?? store.description

    if (images) {
      for (const image of images) {
        await image.move(app.makePath('uploads/stores'), {
          name: `${cuid()}.${image.extname}`,
        })

        await store
          .related('attachement')
          .updateOrCreate({ id: store.id }, { imagePath: image.filePath })
      }
    }

    await store?.save()

    return store
  }

  async delete({ storeId }: IStoreIdRequest) {
    const store = await Store.find(storeId)

    await store?.delete()
  }

  async show({ storeId }: IStoreIdRequest) {
    return await Store.find(storeId)
  }

  async index({ page, limit }: IIndexRequest) {
    const stores = await Store.query().paginate(page, limit)

    return stores.toJSON()
  }
}
