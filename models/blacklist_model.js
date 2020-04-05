const Sequelize = require('sequelize');

const sequelize = new Sequelize('database', 'user', 'password', {
	host: 'localhost',
	dialect: 'sqlite',
	logging: false,
	// SQLite only
	storage: 'database.sqlite',
});

const Blacklist = sequelize.define('blacklist', {
	user_id: Sequelize.STRING,
	reason: Sequelize.TEXT,
});

module.exports = {
  sequelize: sequelize,
  Blacklist: Blacklist,
};