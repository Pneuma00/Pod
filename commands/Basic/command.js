const Discord = require("discord.js");

module.exports = {
  name: 'command',
  description: 'Pod 봇 명령어 전체 목록 또는 특정 명령어의 도움말을 표시합니다.',
  aliases: ['commands', 'cmd', 'cmds', '명령어', '명령', '커맨드'],
  usage: ['<명령어>'],
  cooldown: 5,
  async execute(message, args) {
    if (!args.length) {
      const categories = ['Basic', 'Social (WIP)', 'Fun', 'Utilities', 'Miscellaneous', 'Moderation'];
      const embed = new Discord.MessageEmbed()
        .setColor('RANDOM')
        .setTitle('Pod 봇 명령어 전체 목록')
        .setAuthor('Pod', 'https://i.imgur.com/8eJU78T.png')
        .setThumbnail('https://i.imgur.com/8eJU78T.png')
        .setDescription(`\`${message.client.config.prefix}command <명령어>\` 로 특정 명령어의 도움말을 볼 수 있습니다.
          ${
            categories.map(e => {
              return `\n**${e}**\n` + message.client.commands.filter(c => c.category === e).map(c => `\`${c.name}\``).join(' | ');
            }).join('\n')
          }`)
        .setTimestamp()
        .setFooter('Made by Pneuma', (await message.client.users.fetch(message.client.config.devID)).displayAvatarURL());
      return message.channel.send(embed);
        /* .then(() => {
          if (message.channel.type === 'dm') return;
          message.reply("개인 DM을 확인해주세요!");
        })
        .catch(error => {
          console.error(`${message.author.tag}에게 DM으로 명령어 목록 메시지를 보내지 못했습니다.\n`, error);
          message.reply(`DM으로 메시지를 보내지 못했습니다: \`${error}\`\nDM이 활성화 되어있는 지 확인해주세요.`);
        });*/
    }

    if (args[0] === 'dev') {
      const embed = new Discord.MessageEmbed()
        .setColor('RANDOM')
        .setTitle('Pod 개발자 전용 명령어 목록')
        .setAuthor('Pod', 'https://i.imgur.com/8eJU78T.png')
        .setThumbnail('https://i.imgur.com/8eJU78T.png')
        .setDescription(`\`${message.client.config.prefix}command <명령어>\` 로 특정 명령어의 도움말을 볼 수 있습니다.\n
          ${message.client.commands.filter(c => c.category === 'Dev Only').map(c => `\`${c.name}\``).join(' | ')}`)
        .setTimestamp()
        .setFooter('Made by Pneuma', (await message.client.users.fetch(message.client.config.devID)).displayAvatarURL());
      return message.channel.send(embed);
    }

    const name = args[0].toLowerCase();
    const command = message.client.commands.get(name) || message.client.commands.find(c => c.aliases && c.aliases.includes(name));

    if (!command) {
      return message.reply('존재하지 않는 명령어입니다.');
    }

    const embed = new Discord.MessageEmbed()
      .setColor('RANDOM')
      .setTitle(`${message.client.config.prefix}${command.name} 명령어 도움말`)
      .setAuthor('Pod', 'https://i.imgur.com/8eJU78T.png')
      .setThumbnail('https://i.imgur.com/8eJU78T.png')
      .setTimestamp()
      .setFooter('Made by Pneuma', (await message.client.users.fetch(message.client.config.devID)).displayAvatarURL());

    let desc = '';
    if (command.aliases) desc += `\n**커맨드**\n\`${command.name}\` 또는 ${command.aliases.map(alias => `\`${alias}\``).join(' ')}\n`;
    else desc += `\n**커맨드**\n\`${command.name}\`\n`;

    if (command.description) desc += `\n**설명**\n${command.description}\n`;

    if (command.usage) {
      if (command.args)
        desc += `\n**사용방법**\n${command.usage.map(usg => `\`${message.client.config.prefix}${command.name} ${usg}\``).join('\n')}\n`;
      else desc += `\n**사용방법**\n\`${message.client.config.prefix}${command.name}\`\n${command.usage.map(usg => `\`${message.client.config.prefix}${command.name} ${usg}\``).join('\n')}\n`;
    }
    else desc += `\n**사용방법**\n\`${message.client.config.prefix}${command.name}\`\n`;

    desc += `\n**쿨타임**\n${command.cooldowns || 3} 초\n`;

    desc += '\n**사용방법 참고사항**\n`<내용>` - 변수, `[내용]` - 띄어쓰기 포함 가능 변수\n';

    embed.setDescription(desc);

    message.channel.send(embed);
  },
};