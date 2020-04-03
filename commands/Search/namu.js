const Discord = require('discord.js');

module.exports = {
  name: 'namu',
  category: 'Search',
  description: '입력한 제목에 대한 나무위키 검색 결과의 링크를 보여줍니다.',
  aliases: ['namuwiki', '나무', '나무위키'],
  args: true,
  usage: ['[검색할 제목]'],
  async execute(message, args) {
    const search = args.join(' ');

    const embed = new Discord.MessageEmbed()
      .setColor('GREEN')
      .setTitle('나무위키 검색 결과 링크')
      .setURL(`https://namu.wiki/Search?q=${search.replace(/ /g, '%20')}`)
      .setDescription(`문서 바로가기 [링크](https://namu.wiki/w/${search.replace(/ /g, '%20')})`)
      .setTimestamp()
      .setFooter(`${message.author.tag} 에 의해 요청됨`, await message.author.displayAvatarURL());
    
    return message.channel.send(embed);
  },
};