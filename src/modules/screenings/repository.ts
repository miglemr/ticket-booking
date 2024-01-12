import { Insertable } from 'kysely'
import type { Database, Screening } from '@/database'

const TABLE = 'screening'

type Row = Screening
type RowWithoutId = Omit<Row, 'id'>
type RowInsert = Insertable<RowWithoutId>

export default (db: Database) => ({
  findAll: async () =>
    db
      .selectFrom(TABLE)
      .innerJoin('movies', 'movies.id', 'screening.movieId')
      .select([
        'screening.id',
        'screening.date',
        'screening.ticketsTotal',
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
        'screening.date',
        'screening.ticketsTotal',
        'movies.title',
        'movies.year',
      ])
      .where('movieId', '=', movieId)
      .execute(),
  createScreening: async (record: RowInsert) =>
    db.insertInto(TABLE).values(record).executeTakeFirst(),
})
