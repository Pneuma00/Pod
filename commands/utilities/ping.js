// const Discord = require("discord.js");

module.exports = {
  name: 'ping',
  category: 'Utilities',
  description: '핑을 측정합니다.',
  aliases: ['핑'],
  async execute(message, args) {
    const msg = await message.channel.send("Ping?");
    msg.edit(`Pong! Latency is ${msg.createdTimestamp - message.createdTimestamp}ms.`);
  },
};