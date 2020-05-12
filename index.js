require('dotenv').config();

// =========================================================================================================

const Discord = require('discord.js');

const client = new Discord.Client();

const Koreanbots = require('koreanbots');
client.koreanbots = new Koreanbots.MyBot(process.env.KOREANBOTS_TOKEN);

const config = require("./config.json");
client.config = config;

client.commands = new Discord.Collection();
client.cooldowns = new Discord.Collection();

client.active = new Map();

// =========================================================================================================

client.database = require('./dbObjects.js');

client.currency = new Discord.Collection();

Reflect.defineProperty(client.currency, 'add', {
	value: async function add(id, amount) {
		const user = client.currency.get(id);
		if (user) {
			user.balance += Number(amount);
			return user.save();
		}
		const newUser = await client.database.Users.create({ user_id: id, balance: amount });
		client.currency.set(id, newUser);
		return newUser;
	},
});

Reflect.defineProperty(client.currency, 'getBalance', {
	value: function getBalance(id) {
		const user = client.currency.get(id);
		return user ? user.balance : 0;
	},
});

// =========================================================================================================

const fs = require('fs');
const ascii_table = require("ascii-table");

const table = new ascii_table("Commands");
table.setHeading("Command", "Load Status");

fs.readdirSync("./commands/").forEach(dir => {
	const commands = fs.readdirSync(`./commands/${dir}/`).filter(file => file.endsWith(".js"));

	for (const file of commands) {
		const command = require(`./commands/${dir}/${file}`);

		if (command.name) {
			command.category = dir;
			client.commands.set(command.name, command);
			table.addRow(`${dir} / ${file}`, '✅ Succeed');
		}
		else {
			table.addRow(`${dir} / ${file}`, '❌ Failed');
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

client.login();