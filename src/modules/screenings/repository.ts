import { Insertable } from 'kysely'
import type { Database, Screening } from '@/database'

const TABLE = 'screening'

type Row = Screening
type RowWithoutId = Omit<Row, 'id'>
type RowInsert = Insertable<Omit<RowWithoutId, 'ticketsLeft'>>

export default (db: Database) => ({
  findAll: async () =>
    db
      .selectFrom(TABLE)
      .innerJoin('movies', 'movies.id', 'screening.movieId')
      .select([
        'screening.id',
        'screening.timestamp',
        'screening.ticketsTotal',
        'screening.ticketsLeft',
        'movies.title',
        'movies.year',
      ])
      .execute(),
  findById: async (movieId: number) =>
    db
      .selectFrom(TABLE)
      .innerJoin('movies', 'movies.id', 'screening.movieId')
      .select([
        'screening.id',
        'screening.timestamp',
        'screening.ticketsTotal',
        'screening.ticketsLeft',
        'movies.title',
        'movies.year',
      ])
      .where('movieId', '=', movieId)
      .execute(),
  createScreening: async (record: RowInsert) =>
    db
      .insertInto(TABLE)
      .values({ ...record, ticketsLeft: record.ticketsTotal })
      .returning('id')
      .executeTakeFirst(),
})
