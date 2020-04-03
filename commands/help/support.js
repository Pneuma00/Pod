const Discord = require("discord.js");

module.exports = {
  name: 'support',
  category: 'Help',
  description: 'Pod 봇 관련 문의 안내를 표시합니다.',
  aliases: ['문의', '지원'],
  async execute(message, args) {
    const embed = new Discord.MessageEmbed()
      .setColor('RANDOM')
      .setTitle("Pod 봇 지원 센터")
      .setAuthor("Pod", "https://i.imgur.com/8eJU78T.png")
      .setThumbnail("https://i.imgur.com/8eJU78T.png")
      .setDescription('봇 관련 질문 및 건의사항은 아래의 링크 또는 Pneuma#2575 로 문의해주세요!')
      .addField('Pod\'s Lounge 링크', 'https://discord.gg/d9uQ4Yb')
      .setTimestamp()
      .setFooter("Made by Pneuma", (await message.client.users.fetch(message.client.config.devID)).displayAvatarURL());
    message.channel.send(embed);
  },
};