require('dotenv').config();

const defaultConfig = {
  url: process.env.DEV_URL,
  dialect: 'postgres'
};

const testConfig = {
  url: process.env.TEST_URL,
  dialect: 'postgres'
}

module.exports = {
  development: defaultConfig,
  test: testConfig
};