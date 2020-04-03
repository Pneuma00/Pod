const Sequelize = require('sequelize');

const sequelize = new Sequelize('database', 'user', 'password', {
	host: 'localhost',
	dialect: 'sqlite',
	logging: false,
	// SQLite only
	storage: 'database.sqlite',
});

const Tags = sequelize.define('tags', {
	name: Sequelize.STRING,
	description: Sequelize.TEXT,
	username: Sequelize.STRING,
	guild_id: Sequelize.STRING,
	usage_count: {
		type: Sequelize.INTEGER,
		defaultValue: 0,
		allowNull: false,
	},
});

module.exports = {
  sequelize: sequelize,
  Tags: Tags,
};