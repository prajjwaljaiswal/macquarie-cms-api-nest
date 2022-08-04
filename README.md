# CMS API

## Installation

```bash
npm install
```

## Setting up the database

1. Run an instance of mysql or an existing instance of mysql is need to run this project

2. Create a file called ormconfig.json in the root directory of the project

```bash
  mv .ev.template .env
```

1. Create a .env from `.env.template` and set the correct connection information

```bash
  JWT_SECRET = 
  JWT_EXPIRY = 
  PORT = 

  # Warrents Database settings
  WARRANTS_DB_CONN_NAME = w
  WARRANTS_DB =   

  # MQ SG database
  MQ_DB =   

  # Common database config
  DB_TYPE = 
  DB_USERNAME = 
  DB_PASSWORD = 
  DB_HOST = 
  DB_PORT = 
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod

# production build mode
$ npm run build 
# Utilize the build files to run the api
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## License

Nest is [MIT licensed](LICENSE).
