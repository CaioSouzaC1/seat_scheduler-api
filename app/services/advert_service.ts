import Advert from '#models/advert'
import app from '@adonisjs/core/services/app'
import {
  IAdvertRequestId,
  IStoreAdvertRequest,
  IUpdateAdvertRequest,
} from '../interfaces/Requests/Advert/index.js'
import { cuid } from '@adonisjs/core/helpers'
import { IIndexRequest } from '../interfaces/ReturnApi/index.js'

export class AdvertService {
  async store({ name, type, images, companyId, storeId }: IStoreAdvertRequest) {
    const advert = await Advert.create({ name, type, companyId, storeId })

    for (const image of images) {
      await image.move(app.makePath('uploads/adverts'), {
        name: `${cuid()}.${image.extname}`,
      })

      await advert
        .related('attachements')
        .create({ imagePath: '/uploads/companies/' + image.fileName })
    }
  }

  async update({ name, images, type, advertId }: IUpdateAdvertRequest) {
    const advert = await Advert.find(advertId)

    if (!advert) return null

    advert.type = type ?? advert.type
    advert.name = name ?? advert.name

    if (images)
      for (const image of images) {
        await image.move(app.makePath('uploads/adverts'), {
          name: `${cuid()}.${image.extname}`,
        })
        await advert
          .related('attachements')
          .updateOrCreate({ id: advert.id }, { imagePath: image.filePath })
      }

    await advert.save()
  }

  async show({ advertId }: IAdvertRequestId) {
    return await Advert.find(advertId)
  }

  async delete({ advertId }: IAdvertRequestId) {
    const advert = await Advert.find(advertId)

    await advert?.delete()
  }

  async index({ page, limit }: IIndexRequest) {
    const advert = await Advert.query().paginate(page, limit)

    return advert.toJSON()
  }

  async myOwn({ page, limit, ids: storeIds }: IIndexRequest) {
    const advert = await Advert.query()
      .whereHas('store', (storeQuery) => {
        storeQuery.whereIn('id', storeIds!)
      })
      .paginate(page, limit)

    return advert.toJSON()
  }
}
