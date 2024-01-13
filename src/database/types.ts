import type { ColumnType } from "kysely";

export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
  ? ColumnType<S, I | undefined, U>
  : ColumnType<T, T | undefined, T>;

export interface Directors {
  movieId: number;
  personId: number;
}

export interface Movies {
  id: number | null;
  title: string;
  year: number | null;
}

export interface People {
  id: number | null;
  name: string;
  birth: number | null;
}

export interface Ratings {
  movieId: number;
  rating: number;
  votes: number;
}

export interface Screening {
  id: Generated<number>;
  timestamp: string;
  ticketsTotal: number;
  movieId: number;
}

export interface Stars {
  movieId: number;
  personId: number;
}

export interface Ticket {
  id: Generated<number>;
  screeningId: number;
}

export interface DB {
  directors: Directors;
  movies: Movies;
  people: People;
  ratings: Ratings;
  screening: Screening;
  stars: Stars;
  ticket: Ticket;
}
