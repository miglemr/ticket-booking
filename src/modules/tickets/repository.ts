import { Insertable } from 'kysely'
import { Database, Ticket } from '@/database'

const TABLE = 'ticket'

type Row = Ticket
type RowWithoutId = Omit<Row, 'id'>
type RowInsert = Insertable<RowWithoutId>

export default (db: Database) => ({
  createBooking: async (record: RowInsert) =>
    db.insertInto(TABLE).values(record).returning(['id']).executeTakeFirst(),
})
