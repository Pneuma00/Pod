const Discord = require('discord.js');

module.exports = {
  name: 'google',
  category: 'Search',
  description: '입력한 키워드에 대한 구글 검색 결과의 링크를 보여줍니다.',
  aliases: ['구글', '구글링'],
  args: true,
  usage: ['[검색할 내용]'],
  async execute(message, args) {
    const search = args.join(' ');

    const embed = new Discord.MessageEmbed()
      .setColor('BLUE')
      .setTitle('구글 검색 결과 링크')
      .setURL(`https://www.google.com/search?q=${search.replace(/ /g, '%20')}`)
      .setTimestamp()
      .setFooter(`${message.author.tag} 에 의해 요청됨`, await message.author.displayAvatarURL());
    
    return message.channel.send(embed);
  },
};