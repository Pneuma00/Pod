const Discord = require("discord.js");

module.exports = {
  name: 'invite',
  category: 'Help',
  description: 'Pod 봇 초대 링크를 줍니다.',
  aliases: ['botinvite', '초대', '봇초대'],
  async execute(message, args) {
    const embed = new Discord.MessageEmbed()
      .setColor('RANDOM')
      .setTitle('Pod 봇 초대 링크')
      .setAuthor('Pod', 'https://i.imgur.com/8eJU78T.png')
      .setThumbnail('https://i.imgur.com/8eJU78T.png')
      .setDescription('Pod를 초대한다면 서버에 큰 도움이 될 것이에요!')
      .addFields(
        { name: '초대 링크', value: 'http://enturl.me/pod' },
        { name: '유의 사항', value: 'Pod는 테스트 중인 봇이므로 불안정할 수 있는 점 유의해주세요.' },
      )
      .setTimestamp()
      .setFooter('Made by Pneuma', (await message.client.users.fetch(message.client.config.devID)).displayAvatarURL());
    message.channel.send(embed);
  },
};