module.exports = (sequelize, DataTypes) => {
	return sequelize.define('tags', {
		name: DataTypes.STRING,
		description: DataTypes.TEXT,
		user_id: DataTypes.STRING,
		guild_id: DataTypes.STRING,
		usage_count: {
			type: DataTypes.INTEGER,
			defaultValue: 0,
			allowNull: false,
		},
	});
};