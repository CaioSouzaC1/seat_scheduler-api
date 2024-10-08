import Table from '#models/table'
import {
  IDeleteInBulkRequest,
  IEditTableRequest,
  IStoreInBulkTableRequest,
  IStoreTableRequest,
  ITableIdRequest,
} from '../interfaces/Requests/Table/index.js'
import { IIndexWithIdRequest } from '../interfaces/ReturnApi/index.js'

export class TableService {
  async storeInBulk({
    numberOfTables,
    numberOfChairs,
    observation,
    status,
    storeId,
  }: IStoreInBulkTableRequest) {
    const table = await Table.query().where('storeId', storeId).orderBy('number', 'desc').first()

    let i = 1
    let numberTables = numberOfTables
    if (table) {
      i = table.number
      numberTables += i
    }

    for (i; i <= numberTables; i++) {
      await Table.create({ number: i, status, storeId, observation, numberOfChairs })
    }
  }

  async store({ number, storeId, observation, numberOfChairs }: IStoreTableRequest) {
    return await Table.create({ number, storeId, observation, numberOfChairs })
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

  async show({ tableId }: ITableIdRequest) {
    return await Table.query().preload('booking').preload('store').where('id', tableId).first()
  }

  async delete({ tableId }: ITableIdRequest) {
    const table = await Table.find(tableId)

    await table?.delete()
  }

  async deleteInBulk({ tables, storeId }: IDeleteInBulkRequest) {
    await Table.query().where('store_id', storeId).whereIn('id', tables).delete()
  }

  async index({ page, limit, id: storeId }: IIndexWithIdRequest) {
    const tables = await Table.query()
      .preload('store')
      .preload('booking')
      .where('storeId', storeId!)
      .orderBy('number', 'desc')
      .paginate(page, limit)

    return tables.toJSON()
  }
}
