import Table from '#models/table'
import {
  IEditTableRequest,
  IStoreTableRequest,
  ITableIdRequest,
} from '../interfaces/Requests/Table/index.js'
import { IIndexRequest } from '../interfaces/ReturnApi/index.js'

export class TableService {
  async store({ number, status, storeId, observation, numberOfChairs }: IStoreTableRequest) {
    return await Table.create({ number, status, storeId, observation, numberOfChairs })
  }

  async edit({ tableId, number, status, observation, numberOfChairs }: IEditTableRequest) {
    const table = await Table.find(tableId)

    if (!table) return null

    table.number = number ?? table.number
    table.status = status ?? table.status
    table.observation = observation ?? table.observation
    table.numberOfChairs = numberOfChairs ?? table.numberOfChairs

    await table.save()
  }

  async show({ tableId }: ITableIdRequest) {
    return await Table.find(tableId)
  }

  async delete({ tableId }: ITableIdRequest) {
    const table = await Table.find(tableId)

    await table?.delete()
  }

  async index({ page, limit, id: storeId }: IIndexRequest) {
    const tables = await Table.query()
      .preload('store', (storeQuery) => {
        storeQuery.where('id', storeId!)
      })
      .paginate(page, limit)

    return tables.toJSON()
  }
}
