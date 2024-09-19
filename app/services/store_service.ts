import Store from '#models/store'
import { cuid } from '@adonisjs/core/helpers'
import {
  IEditStoreRequest,
  IStoreIdRequest,
  IStoreStoreRequest,
} from '../interfaces/Requests/Store/index.js'
import app from '@adonisjs/core/services/app'
import {
  IIndexResquestWithSearchAndOrder,
  IIndexWithIdsRequest,
} from '../interfaces/ReturnApi/index.js'

export class StoreService {
  async store({ name, phone, companyId, description, images, addressId }: IStoreStoreRequest) {
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

        const imgName = image.fileName ?? ''

        await store.related('attachement').create({
          imagePath: '/uploads/stores/' + imgName,
          name: imgName,
          type: image.type ?? '',
        })
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
    return await Store.query()
      .preload('attachement')
      .preload('user')
      .preload('evaluation')
      .preload('advert')
      .preload('address')
      .preload('company')
      .preload('menuItem')
      .preload('tables')
      .where('id', storeId)
      .first()
  }

  async index({ page, limit, search, orderBy }: IIndexResquestWithSearchAndOrder) {
    const query = Store.query()
      .preload('attachement')
      .preload('user')
      .preload('evaluation')
      .preload('advert')
      .preload('address')
      .preload('company')
    // .join('evaluations', 'stores.id', 'evaluations.store_id')

    if (search) {
      query
        .where('stores.name', 'like', `%${search}%`)
        .orWhere('stores.description', 'like', `%${search}%`)
    }

    // if (orderBy === 'asc') {
    //   query.orderBy('evaluations.note', 'asc')
    // } else {
    //   query.orderBy('evaluations.note', 'desc')
    // }

    const stores = await query.paginate(page, limit)

    return stores.toJSON()
  }

  async myOwn({ page, limit, ids }: IIndexWithIdsRequest) {
    const stores = await Store.query()
      .preload('attachement')
      .preload('user')
      .preload('evaluation')
      .preload('advert')
      .preload('address')
      .preload('company')
      .whereIn('id', ids!)
      .paginate(page, limit)

    return stores.toJSON()
  }
}
