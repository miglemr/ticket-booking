import { Database } from '@/database'

const TABLE = 'ticket'

export default (db: Database) => ({
  createBooking: async (screeningIds: any) =>
    db.insertInto(TABLE).values(screeningIds).returning(['id']).execute(),

  findAll: async () => db.selectFrom(TABLE).selectAll().execute(),
})
