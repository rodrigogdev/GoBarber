// eslint-disable-next-line no-unused-expressions
module.exports = {
  type: process.env.DATABASE_TYPE,
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT,
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  entities: [process.env.DATABASE_ENTITIES],
  migrations: [process.env.DATABASE_MIGRATIONS],
  cli: {
    migrationsDir: "src/shared/infra/typeorm/migrations",
    entitiesDir: "src/models",
  },

  mongo: {
    name: "mongodb",
    type: "mongodb",
    host: "localhost",
    port: 27017,
    database: "gobarber",
    useUnifiedTopology: true,
    entities: ["./src/modules/**/infra/typeorm/schemas/*.ts"],
  },
};
