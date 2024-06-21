const Sequelize = require('sequelize');
const dotenv = require('dotenv');

dotenv.config();

const sequelize = new Sequelize(process.env.DB_URL, {
  dialect: 'postgres',
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
