import Booking from '#models/booking'
import Store from '#models/store'
import Table from '#models/table'

export class DashboardService {
  async cards({ userId, loginCount }: { userId: string; loginCount: number }) {
    const stores = await Store.query()
      .whereHas('company', (companyQuery) => {
        companyQuery.where('user_id', userId)
      })
      .count('id as totalStores')

    const tables = await Table.query()
      .whereHas('store', (storeQuery) => {
        storeQuery.whereHas('company', (companyQuery) => {
          companyQuery.where('user_id', userId)
        })
      })
      .count('id as totalTables')

    const bookings = await Booking.query().whereHas('table', (tableQuery) => {
      tableQuery.whereHas('store', (storeQuery) => {
        storeQuery.whereHas('company', (companyQuery) => {
          companyQuery.where('user_id', userId)
        })
      })
    })

    const data = {
      loginCount: loginCount,
      totalStores: Number(stores[0]?.$extras?.totalStores) || 0,
      totalTables: Number(tables[0]?.$extras?.totalTables) || 0,
      totalBookings: Number(bookings[0]?.$extras?.totalTables) || 0,
    }

    return data
  }

  async recentBookings({ userId }: { userId: string }) {
    const bookings = await Booking.query()
      .preload('store')
      .whereHas('table', (tableQuery) => {
        tableQuery.whereHas('store', (storeQuery) => {
          storeQuery.whereHas('company', (companyQuery) => {
            companyQuery.where('user_id', userId)
          })
        })
      })
      .paginate(1, 5)

    return bookings.toJSON()
  }
}
