/* const Sequelize = require('sequelize');

const sequelize = new Sequelize('database', 'user', 'password', {
	host: 'localhost',
	dialect: 'sqlite',
	logging: false,
	// SQLite only
	storage: 'database.sqlite',
});

const Changelogs = sequelize.define('changelogs', {
  timestamp: Sequelize.DATE,
  description: Sequelize.TEXT,
});

module.exports = {
  sequelize: sequelize,
  Changelogs: Changelogs,
};*/