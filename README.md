# Movie ticket booking system exercise

## Requirements

- **Get a list of movies**.

- **Get movies by their ID**. IDs should be provided in query parameters.

- **Get all screenings**. Returns date, total number of tickets, number of tickets left and movie title and year.

- **Get all selected movie screenings**. User should provide movie ID. Returns all screenings for that movie: screening ID, timestamp, total number of tickets, number of tickets left.

- **Create new screening**. User should provide date, allocation of tickets and movie ID.

- **Create a booking for screening**. User should provide screening ID and number of tickets. Returns created ticket, if there are no tickets left returns error.

- **Get all user's bookings**.

## Database

This project should be used with the `movies.db` database in `data/` folder. It is the same database that we used in the previous exercise. You can download a fresh database [here](https://cdn.cs50.net/2022/fall/psets/7/movies.zip) or from [CS50](https://cs50.harvard.edu/x/2023/psets/7/movies/).

## Migrations

We can run migrations with the following command:

```bash
npm run migrate:latest
```

## Running the server

In development mode:

```bash
npm run dev
```

In production mode:

```bash
npm run start
```

## Updating types

If you make changes to the database schema, you will need to update the types. You can do this by running the following command:

```bash
npm run generate-types
```
