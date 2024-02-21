## Setup
### Prerequisites
- node
- yarn
- docker

### Install Node ###
Visit this website to install node
```
https://nodejs.org/en/download
```

Once node is installed, make sure to add it as a alias to use it via terminal/console
You can test if it is install correctly you should be able to run this command
```
node --version

output:
20.11.1
```

### Install yarn ###
To install yarn, we will use node, make to to add on -g to make it a global instance
```
npm install -g yarn
```

To check that yarn is install run
```
yarn --version

output: 
1.22.21
```

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
Change the values of the variables to fit your application.



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

## Other Useful Commands (Dont worry about these for now)

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
Seed script is found in `prisma/seeds.ts`. Update that script to add default data to your database - Note: seeds should be idempotent... this means that you should be able to run the seeds multiple times and the database should be in the same state regardless of whether its the first or 100th time you run it.

```bash
yarn seed
# npm run seed
```