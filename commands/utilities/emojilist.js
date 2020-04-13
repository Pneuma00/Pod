const Discord = require('discord.js');

module.exports = {
  name: 'emojilist',
  category: 'Utilities',
  description: '해당 서버의 커스텀 이모지 리스트를 보여줍니다.',
  aliases: ['emojis', 'customemoji', '이모지리스트', '커스텀이모지', '서버이모지'],
  guildOnly: true,
  execute(message, args) {
    const embed = new Discord.MessageEmbed()
      .setColor('RANDOM')
      .setTitle('서버 커스텀 이모지 목록')
      .setThumbnail(`https://cdn.discordapp.com/icons/${message.guild.id}/${message.guild.icon}.png`)
      .setDescription(`본 서버에는 **${message.guild.emojis.cache.size}개**의 커스텀 이모지가 등록되어있습니다.\n
        ${message.guild.emojis.cache.map(e => e.toString()).join(' ')}`)
      .setTimestamp();
    message.channel.send(embed);
  },
};