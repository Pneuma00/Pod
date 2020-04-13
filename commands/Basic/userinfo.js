const Discord = require('discord.js');

module.exports = {
  name: 'userinfo',
  description: '자신 또는 멘션한 유저의 정보를 보여줍니다.',
  aliases: ['유저정보'],
  guildOnly: true,
  usage: ['<유저 멘션>'],
  async execute(message, args) {
    const target = args[0] ? require('../../functions.js').getUserFromMention(message.client, args[0]) || message.author : message.author;
    const member = message.guild.member(target);

    const embed = new Discord.MessageEmbed()
      .setColor('RANDOM')
      .setTitle('유저 정보')
      .setThumbnail(await target.displayAvatarURL())
      .setDescription(`**유저명:** ${target.tag}\n**닉네임:** ${member.nickname}\n**ID:** ${target.id}\n**계정 생성일자:** ${target.createdAt}\n**서버 가입일자:** ${member.joinedAt}\n**역할:** ${member.roles.cache.sort((a, b) => b.position - a.position).map(r => `<@&${r.id}>`).join(' ')}`)
      .setTimestamp()
      .setFooter(`${message.author.tag} 에 의해 요청됨`, await message.author.displayAvatarURL());
    
    message.channel.send(embed);
  },
};