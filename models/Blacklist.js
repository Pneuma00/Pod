module.exports = (sequelize, DataTypes) => {
	return sequelize.define('blacklist', {
		user_id: DataTypes.STRING,
		reason: DataTypes.TEXT,
	});
};