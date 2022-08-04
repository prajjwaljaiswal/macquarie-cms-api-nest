/* eslint-disable prettier/prettier */
export default () => ({
  port: parseInt(process.env.PORT, 10) || 3015,
  secret: process.env.JWT_SECRET,
  database: {
    common: {
      type: process.env.DB_TYPE,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DB_PORT, 10) || 3307,
      synchronize: false,
    },
    mqwarrants: {
      name: process.env.WARRANTS_DB_CONN_NAME,
      database: process.env.WARRANTS_DB,
    },
    default: {
      database: process.env.MQ_DB,
    },
  },
});
