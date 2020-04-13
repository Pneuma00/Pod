const Discord = require('discord.js');
const chalk = require('chalk');

module.exports = async (client, message) => {
  if (message.system) return;
  if (message.author.bot) return;

  client.currency.add(message.author.id, 1);

  if (message.content.indexOf(client.config.prefix) !== 0) return;

  client.currency.add(message.author.id, -1);

  if (await client.database.Blacklist.count({ where: { user_id: message.author.id } })) {
    console.log(`[${message.createdAt}] ${chalk.red('[Blacklisted Message]')} (Guild: ${message.guild.id}) (Channel: ${message.channel.id}) (User: ${message.author.id}) ${message.author.tag} : ${message.content}`);
    return message.reply(':no_entry_sign: 차단된 사용자입니다.');
  }

  if (message.channel.type === 'text')
    console.log(`[${message.createdAt}] ${chalk.green('[Guild Message]')} (Guild: ${message.guild.id}) (Channel: ${message.channel.id}) ${message.author.tag} : ${message.content}`);
  else console.log(`[${message.createdAt}] ${chalk.green('[DM Message]')} (User: ${message.author.id}) ${message.author.tag} : ${message.content}`);

  const contents = message.content.slice(client.config.prefix.length).trim();
  const args = contents.split(/ +/g);
  const commandName = args.shift().toLowerCase();

  const command = client.commands.get(commandName)
    || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

  if (!command) {
    // return message.channel.send(`:negative_squared_cross_mark: 존재하지 않는 명령어입니다.`);
    return require('../pingpong.js')(client, message);
  }

  // checking
  if (command.devOnly && message.author.id !== client.config.devID) {
    return message.channel.send(':no_entry: 해당 명령어를 사용할 권한이 없습니다.');
  }

  if (command.guildOnly && message.channel.type !== 'text') {
    return message.channel.send(':negative_squared_cross_mark: DM에서 사용 불가능한 명령어입니다.');
  }

  if (command.guildOnly && command.adminOnly && message.channel.type === 'text' && message.author.id !== message.guild.owner.id) {
    return message.channel.send(':no_entry: 해당 명령어를 사용할 권한이 없습니다.');
  }

  if (command.args && !args.length) {
    let reply = `:negative_squared_cross_mark: 잘못된 형식입니다.`;
    if (command.usage) {
      reply += `\n올바른 사용방법은 다음과 같습니다: ${command.usage.map(usg => `\`${client.config.prefix}${command.name} ${usg}\``).join(' | ')}`;
    }
    return message.channel.send(reply);
  }

  // cooldowns
  if (!client.cooldowns.has(command.name)) {
    client.cooldowns.set(command.name, new Discord.Collection());
  }
  
  const now = Date.now();
  const timestamps = client.cooldowns.get(command.name);
  const cooldownAmount = (command.cooldown || 3) * 1000;
  
  if (timestamps.has(message.author.id)) {
    const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

    if (now < expirationTime) {
      const timeLeft = (expirationTime - now) / 1000;
      return message.channel.send(`:hourglass_flowing_sand: ${timeLeft.toFixed(1)}초 후에 \`${command.name}\` 명령어를 다시 사용해주세요.`);
    }
  }

  timestamps.set(message.author.id, now);
  setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

  if (command.cost) {
    if (client.currency.getBalance(message.author.id) - command.cost < 0)
      return message.reply('Podcoin💰 이 부족합니다. 이 명령어를 사용하기 위해서는 5 Podcoin💰 이 필요합니다.');

    else {
      client.currency.add(message.author.id, -command.cost);
      const embed = new Discord.MessageEmbed()
        .setTitle(`${command.cost} Podcoin 💰 을 사용했습니다.`);
      message.channel.send(embed).then(msg => msg.delete({ timeout: 3000 }));
    }
  }

  // executing
  try {
    command.execute(message, args);
  }
  catch (error) {
    console.error(error);
    message.channel.send(`:octagonal_sign: 오류가 발생하였습니다: \`${error}\``);
    return;
  }
};