# Using the app

## Pre-requisites

### Running on a Linux distribution or a Linux container

### Node.js installed

[Download and install node.js for Linux](https://nodejs.org/en/download)

### Install application modules

Make sure myapp is the working directory !

```bash
$ cd myapp
$ npm install
```

### Create your .env file inside of myapp

```bash
# Environment variables declared in this file are automatically made available to Prisma.
# See the documentation for more detail: https://pris.ly/d/prisma-schema#accessing-environment-variables-from-the-schema

# Prisma supports the native connection string format for PostgreSQL, MySQL, SQLite, SQL Server, MongoDB and CockroachDB.
# See the documentation for all the connection string options: https://pris.ly/d/connection-strings

# The following `prisma+postgres` URL is similar to the URL produced by running a local Prisma Postgres 
# server with the `prisma dev` CLI command, when not choosing any non-default ports or settings. The API key, unlike the 
# one found in a remote Prisma Postgres URL, does not contain any sensitive information.

DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=SCHEMA"
JWT_SECRET="your-random-string-encoding-key"
```

Replace with your DB's values.

### Generate Prisma client

```bash
$ npx prisma generate
```

### Run your DB

```bash
$ npx prisma studio
```

## Run the front & the back

```bash
$ node job_board.js
```

```bash
$ node client-dev-server.js
```
