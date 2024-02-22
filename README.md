## Setup

### Prerequisites

- node
- yarn
- docker

### Install Node

Visit this website to install node

```
https://nodejs.org/en/download
```

Once node is installed, make sure to add it as a alias to use it via terminal/console.
To check that you did this correclty, run `npm --version`

### Install yarn

To install yarn, we will use node, make to to add on -g to make it a global instance

```
npm install -g yarn
```

Check that yarn installed correctly using `yarn --version`

### Install dependencies

In the root of the project run

```bash
yarn
# npm install
```

In the `client` folder run

```bash
yarn
# npm install
```

### Create .env file

Create a new file called `.env` in the root of the project and copy the contents of `.env.example` into it.
Change the values of the variables to fit your environment.

NOTE: IF YOU CHANGE ANY OF THE DATABASE VARS, IT WILL ALSO NEED TO BE CHANGED IN `DATABASE_URL`

## Running the application

In the root of the project run

```bash
yarn dev
# npm run dev
```

Open and new terminal tab and navigate to the `client` folder and run

```bash
yarn dev
# npm run dev
```

Visit your application at `http://localhost:3000` (or whatever port you specified in your `.env` file)

NOTE: YOU MUST BE RUNNING BOTH THE CLIENT AND SERVER

## Setting up the Database

### Docker Setup

Download and install docker

```
https://www.docker.com/products/docker-desktop/
```

After installation make sure you can run `docker --version` in your terminal/cmd
to make sure the alias got setup correcty

NOTE: IN ORDER TO RUN ANY DOCKER COMMANDS, DOCKER MUST BE OPEN & RUNNING

### Setup the database

In the root of the project run

```bash
docker compose up -d
# -d starts the container in the background
```

### Generate and run migrations

```bash
yarn migrate-dev
# npm run migrate-dev
```

### Run prisma console

```bash
yarn console
# npm run console
```

### Reset the database

This command deletes all data from the database and recreates all of the tables from the existing migrations.

```bash
yarn migrate-reset
# npm run migrate-reset
```

### Seed the Database

Seed script is found in `prisma/seed.ts`. Update that script to add default data to your database - Note: seeds should be idempotent... this means that you should be able to run the seeds multiple times and the database should be in the same state regardless of whether its the first or 100th time you run it.

```bash
yarn seed
# npm run seed
```
