import Store from '#models/store'
import {
  IEditStoreRequest,
  IStoreIdRequest,
  IStoreStoreRequest,
} from '../interfaces/Requests/Store/index.js'

export class StoreService {
  async store({ name, phone, companyId, addressId, description }: IStoreStoreRequest) {
    return await Store.create({
      name,
      phone,
      companyId,
      addressId,
      description,
    })
  }

  async update({ name, phone, description, storeId }: IEditStoreRequest) {
    const store = await Store.find(storeId)

    if (!store) return null

    store.name = name ?? store.name
    store.phone = phone ?? store.phone
    store.description = description ?? store.description

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

  async index() {
    const stores = await Store.all()

    const storeJson = stores.map((store) => store.serialize())

    return storeJson
  }
}
