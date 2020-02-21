/**
 * @property use_env_variable
 */
module.exports = {
    development: {
        username: process.env.CI_DB_USERNAME,
        password: process.env.CI_DB_PASSWORD,
        database: process.env.CI_DB_NAME,
        host: process.env.CI_DB_HOST,
        port: process.env.CI_DB_PORT,
        dialect: 'mysql',
    },
    production: {
        username: process.env.CI_DB_USERNAME,
        password: process.env.CI_DB_PASSWORD,
        database: process.env.CI_DB_NAME,
        host: process.env.CI_DB_HOST,
        port: process.env.CI_DB_PORT,
        dialect: 'mysql',
    },
};
