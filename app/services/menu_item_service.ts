import MenuItem from '#models/menu_item'
import Table from '#models/table'
import {
  IIndexMenuItemRequest,
  IStoreMenuItemRequest,
} from '../interfaces/Requests/MenuItem/index.js'
import {
  IDeleteInBulkRequest,
  IEditTableRequest,
  ITableIdRequest,
} from '../interfaces/Requests/Table/index.js'

export class MenuItemService {
  async store({ name, storeId, description, price }: IStoreMenuItemRequest) {
    return await MenuItem.create({
      name,
      description: description ?? '',
      price,
      storeId,
    })
  }

  async edit({ tableId, number, status, observation, numberOfChairs }: IEditTableRequest) {
    const table = await Table.find(tableId)

    if (!table) return null

    table.number = number ?? table.number
    table.status = status ?? table.status
    table.observation = observation ?? ''
    table.numberOfChairs = numberOfChairs ?? table.numberOfChairs

    await table.save()
  }

  async delete({ tableId }: ITableIdRequest) {
    const table = await Table.find(tableId)

    await table?.delete()
  }

  async deleteInBulk({ menuItems, storeId }: { menuItems: string[]; storeId: string }) {
    await MenuItem.query().where('store_id', storeId).whereIn('id', menuItems).delete()
  }

  async index({ page, limit, storeId, search }: IIndexMenuItemRequest) {
    const query = MenuItem.query().where('storeId', storeId!)

    if (search) {
      query.where('name', 'like', `%${search}%`).orWhere('description', 'like', `%${search}%`)
    }

    const items = await query.paginate(page ?? 1, limit)

    return items.toJSON()
  }
}
