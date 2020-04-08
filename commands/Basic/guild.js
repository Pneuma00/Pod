const Discord = require('discord.js');

module.exports = {
  name: 'guild',
  category: 'Utilities',
  description: '길드(또는 서버) 에 대한 정보를 표시합니다.',
  guildOnly: true,
  aliases: ['server', 'guildinfo', 'serverinfo', '서버', '서버정보', '길드', '길드정보'],
  async execute(message, args) {
    const embed = new Discord.MessageEmbed()
      .setColor('RANDOM')
      .setTitle('길드 정보')
      .setAuthor('Pod', 'https://i.imgur.com/8eJU78T.png')
      .setThumbnail(`https://cdn.discordapp.com/icons/${message.guild.id}/${message.guild.icon}.png`)
      .setDescription('본 서버에 대한 정보입니다.')
      .addFields(
        { name: '서버명', value: message.guild.name },
        { name: '소유자', value: message.guild.owner.user.tag, inline: true },
        { name: '지역', value: message.guild.region, inline: true },
        { name: '생성일', value: message.guild.createdAt, inline: true },
        { name: '유저 수', value: `${message.guild.memberCount}명`, inline: true },
        { name: '채널 수', value: `${message.guild.channels.cache.size}개`, inline: true },
        { name: 'ID', value: message.guild.id, inline: true },
      )
      .setTimestamp()
      .setFooter('Made by Pneuma', (await message.client.users.fetch(message.client.config.devID)).displayAvatarURL());
    message.channel.send(embed);
  },
};