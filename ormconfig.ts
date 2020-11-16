const {DB_TYPE, DB_HOST, DB_PORT, DB_USERNAME, DB_PASSWORD, DB_DATABASE, DB_SYNCHRONIZE} = process.env;

export default {
    type: DB_TYPE,
    host: DB_HOST,
    port: DB_PORT,
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_DATABASE,
    synchronize: DB_SYNCHRONIZE,
    logging: false,
    entities: [
       "src/models/**/*.ts"
    ],
    migrations: [
       "src/migrations/**/*.ts"
    ],
    subscribers: [
       "src/subscribers/**/*.ts"
    ],
    cli: {
       entitiesDir: "src/models",
       migrationsDir: "src/migrations",
       subscribersDir: "src/subscribers",
    }
 }