import { Insertable } from 'kysely'
import { Database, Ticket } from '@/database'
import BadRequest from '@/utils/errors/BadRequest'

const TABLE = 'ticket'

type Row = Ticket
type RowWithoutId = Omit<Row, 'id'>
type RowInsert = Insertable<RowWithoutId>

export default (db: Database) => ({
  createBooking: async (screeningIds: RowInsert[] | RowInsert) =>
    db.transaction().execute(async (trx) => {
      if (Array.isArray(screeningIds)) {
        const screeningIdArr = screeningIds.map(
          (screeningIdObj) => screeningIdObj.screeningId
        )

        const { numUpdatedRows } = await trx
          .updateTable('screening')
          .set((eb) => ({
            ticketsLeft: eb('ticketsLeft', '-', 1),
          }))
          .where('id', 'in', screeningIdArr)
          .where('ticketsLeft', '>', 0)
          .executeTakeFirstOrThrow()

        if (!numUpdatedRows) throw new BadRequest('error')
      } else {
        const { numUpdatedRows } = await trx
          .updateTable('screening')
          .set((eb) => ({
            ticketsLeft: eb('ticketsLeft', '-', 1),
          }))
          .where('id', '=', Object.values(screeningIds))
          .where('ticketsLeft', '>', 0)
          .executeTakeFirstOrThrow()

        if (!numUpdatedRows) throw new BadRequest('error')
      }

      return trx
        .insertInto(TABLE)
        .values(screeningIds)
        .returning(['id'])
        .execute()
    }),
  findAll: async () => db.selectFrom(TABLE).selectAll().execute(),
})
