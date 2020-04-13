const Discord = require('discord.js');

module.exports = {
  name: 'flip',
  category: 'Fun',
  description: 'Podcoin 동전을 던져 앞면 또는 뒷면을 확인합니다.',
  aliases: ['flipcoin', '동전'],
  async execute(message, args) {
    const coin = [
      { string: '앞면', url: 'https://i.imgur.com/vI8052v.png' },
      { string: '뒷면', url: 'https://i.imgur.com/YXwWa8Y.png' },
    ];

    const embed = new Discord.MessageEmbed()
      .setColor(0x000000)
      .setTitle('동전을 던졌습니다!')
      .setDescription('결과는?')
      .setTimestamp();
    const msg = await message.channel.send(embed);

    const number = require('../../functions.js').getRandomIntInclusive(0, 1);
    
    embed
      .setDescription(`결과는? **${coin[number].string}**!`)
      .setImage(coin[number].url);

    setTimeout(() =>{
      msg.edit(embed);
    }, 1500);
  },
};