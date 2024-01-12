import type { Database } from '@/database'

const TABLE = 'screening'

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
})
