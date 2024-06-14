const Sequelize = require('sequelize');
// eslint-disable-next-line no-unused-vars
const colors = require('colors');

const sequelize = new Sequelize(process.env.DB_URL, {
  dialect: 'postgres',
  // logging: (...msg) => console.log(msg),
  logging: false, // if the console output is too much
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
  define: {
    freezeTableName: true,
  },
});

const connect = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.'.green.bold);
  } catch (error) {
    console.error('Unable to connect to the database:'.red.bold, error);
  }
};
module.exports = {
  connect,
  sequelize,
};
