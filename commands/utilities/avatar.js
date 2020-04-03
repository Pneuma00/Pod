const Discord = require("discord.js");
const funcs = require('../../functions.js');

module.exports = {
  name: 'avatar',
  category: 'Utilities',
  description: '자신의 프로필 사진을 보여줍니다.',
  aliases: ['icon', 'profile', '아바타', '프로필', '프사'],
  async execute(message, args) {
    if (args[0]) {
      const user = funcs.getUserFromMention(message.client, args[0]);
      if (!user) return message.reply('다른 유저의 프로필 사진을 보기 위해서는 올바른 멘션을 입력해주세요.');
  
      const embed = new Discord.MessageEmbed()
        .setTitle(`${user.username} 님의 아바타는?`)
        .setImage(user.displayAvatarURL({ format: 'png' }))
        .setFooter(`${user.tag} 님의 아바타`);

      return message.channel.send(embed);
    }

    const embed = new Discord.MessageEmbed()
      .setTitle(`나의 아바타는?`)
      .setImage(message.author.displayAvatarURL({ format: 'png' }))
      .setFooter(`${message.author.tag} 님의 아바타`);

    return message.channel.send(embed);
  },
};