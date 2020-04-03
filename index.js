const Discord = require('discord.js');
const fs = require('fs');
const Sequelize = require('sequelize');
const chalk = require('chalk');

require('dotenv').config();

// =========================================================================================================

const client = new Discord.Client();

const config = require("./config.json");
client.config = config;

client.commands = new Discord.Collection();
client.cooldowns = new Discord.Collection();

client.active = new Map();

// =========================================================================================================

client.tags = require('./tag_model.js');

// client.changelogs = require('./changelog_model.js');

// =========================================================================================================

const ascii_table = require("ascii-table");

const table = new ascii_table("Commands");
table.setHeading("Command", "Load Status");

fs.readdirSync("./commands/").forEach(dir => {
	const commands = fs.readdirSync(`./commands/${dir}/`).filter(file => file.endsWith(".js"));

	for (const file of commands) {
		const command = require(`./commands/${dir}/${file}`);

		if (command.name) {
			client.commands.set(command.name, command);
			table.addRow(file, '✅ Succeed');
		} else {
			table.addRow(file, '❌ Failed');
			continue;
		}
	}
});

console.log(table.toString());

fs.readdirSync("./events/").forEach(file => {
  const event = require(`./events/${file}`);
  const eventName = file.split(".")[0];
  client.on(eventName, event.bind(null, client));
});

client.login(process.env.DISCORD_TOKEN);