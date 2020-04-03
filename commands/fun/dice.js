const Discord = require('discord.js');

module.exports = {
  name: 'dice',
  category: 'Fun',
  description: '주사위를 굴려 1~6 중 랜덤한 수를 뽑습니다.',
  aliases: ['roll', '주사위'],
  async execute(message, args) {
    const dice = [
      '.......\n.......\n.......\n...0...\n.......\n.......\n.......',
      '.......\n.......\n....0..\n.......\n..0....\n.......\n.......',
      '.......\n.....0.\n.......\n...0...\n.......\n.0.....\n.......',
      '.......\n.......\n..0.0..\n.......\n..0.0..\n.......\n.......',
      '.......\n.0...0.\n.......\n...0...\n.......\n.0...0.\n.......',
      '.......\n.......\n.0.0.0.\n.......\n.0.0.0.\n.......\n.......',
    ];

    const embed = new Discord.MessageEmbed()
      .setColor(0x000000)
      .setTitle('주사위를 굴렸습니다!')
      .setDescription('결과는?')
      .setTimestamp();
    const msg = await message.channel.send(embed);

    const number = Math.floor(Math.random() * 6) + 1;
    const result = dice[number - 1]
      .replace(/[.]/g, ':white_large_square:')
      .replace(/[0]/g, ':black_circle:');
    
    embed.setDescription(`결과는? **${number}**!\n${result}`);
    setTimeout(() =>{
      msg.edit(embed);
    }, 1500);
  },
};