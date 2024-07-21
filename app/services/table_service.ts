import Table from '#models/table'
import {
  IEditTableRequest,
  IStoreTableRequest,
  ITableIdRequest,
} from '../interfaces/Requests/Table/index.js'

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

  async index(id: string) {
    const tables = await Table.findManyBy({ storeId: id })

    const tablesJson = tables.map((table) => table.serialize())

    return tablesJson
  }
}
