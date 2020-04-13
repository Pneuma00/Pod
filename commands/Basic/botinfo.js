const Discord = require('discord.js');
const funcs = require('../../functions.js');

module.exports = {
  name: 'botinfo',
  description: 'Pod 봇 이용 및 가동 정보를 보여줍니다.',
  aliases: ['podinfo', '봇정보'],
  async execute(message, args) {
    const client = message.client;
    const member = message.guild.me;

    const embed = new Discord.MessageEmbed()
      .setColor('RANDOM')
      .setTitle('Pod 봇 정보')
      .setAuthor('Pod', 'https://i.imgur.com/8eJU78T.png')
      .setThumbnail('https://i.imgur.com/8eJU78T.png')
      .addFields(
        { name: '서버', value: client.guilds.cache.size + ' 개', inline: true },
        { name: '채널', value: client.channels.cache.size + ' 개', inline: true },
        { name: '유저', value: client.users.cache.size + ' 명', inline: true },
        { name: '유저명', value: client.user.tag, inline: true },
        { name: '시작 시각', value: funcs.getKoreanDate(client.readyAt), inline: true },
        { name: '업타임', value: client.uptime, inline: true },
        { name: '닉네임', value: member.nickname, inline: true },
        { name: '가입 일자', value: funcs.getKoreanDate(member.joinedAt), inline: true },
        { name: '역할', value: member.roles.cache.sort((a, b) => b.position - a.position).map(r => `<@&${r.id}>`).join(' ') },
      )
      .setTimestamp()
      .setFooter('Made by Pneuma', (await message.client.users.fetch(message.client.config.devID)).displayAvatarURL());
    
    message.channel.send(embed);
  },
};