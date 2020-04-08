const Discord = require('discord.js');
const fetch = require('node-fetch');

require('dotenv').config();

const WolframAlphaAPI = require('wolfram-alpha-api');
const waApi = WolframAlphaAPI(process.env.WOLFRAMALPHA_API_KEY);

module.exports = {
  name: 'wolfram',
  category: 'Search',
  description: '울프럼 알파 검색 결과의 짧은 버전을 보여줍니다. 베타 기능이므로 불안정할 수 있습니다.',
  aliases: ['wolframalpha', 'wolf', '울프럼', '울프럼알파', '울프'],
  args: true,
  usage: ['[검색 내용]'],
  cooldown: 5,
  async execute(message, args) {
    const question = args.join(' ');

    const embed = new Discord.MessageEmbed()
      .setColor('ORANGE')
      .setTitle('울프럼 알파 검색 중...')
      .setTimestamp();
    const msg = await message.channel.send(embed);

    let answer = '';

    try {
      answer = await waApi.getShort(question);
    }
    catch (error) {
      if (error == 'Error: Wolfram|Alpha did not understand your input') {
        embed
          .setTitle('울프럼 알파 검색 결과')
          .setThumbnail('https://www.wolframalpha.com/static/share_3G6HuGr6.png')
          .setDescription(`**검색 내용을 해석하지 못했습니다.**`)
          .setFooter(`Wolfram Alpha API | ${message.author.tag} 에 의해 요청됨`, 'https://cpb-ap-se2.wpmucdn.com/global2.vic.edu.au/dist/e/29837/files/2016/10/Wolfram-Alpha-pqskmm.png');
        return msg.edit(embed);
      }
      else if (error == 'Error: No short answer available') {
        embed
          .setTitle('울프럼 알파 검색 결과')
          .setThumbnail('https://www.wolframalpha.com/static/share_3G6HuGr6.png')
          .setDescription(`**검색 결과가 없습니다.**`)
          .setFooter(`Wolfram Alpha API | ${message.author.tag} 에 의해 요청됨`, 'https://cpb-ap-se2.wpmucdn.com/global2.vic.edu.au/dist/e/29837/files/2016/10/Wolfram-Alpha-pqskmm.png');
        return msg.edit(embed);
      }
      else return message.channel.send(`예상치 못한 오류가 발생하였습니다: \`\`\`${error}\`\`\``);
    }

    embed
      .setTitle('울프럼 알파 검색 결과')
      .setThumbnail('https://www.wolframalpha.com/static/share_3G6HuGr6.png')
      .setDescription(`
        **검색 내용**
        \`\`\`${question}\`\`\`
        **검색 결과**
        \`\`\`${answer}\`\`\``)
      .setFooter(`Wolfram Alpha API | ${message.author.tag} 에 의해 요청됨`, 'https://cpb-ap-se2.wpmucdn.com/global2.vic.edu.au/dist/e/29837/files/2016/10/Wolfram-Alpha-pqskmm.png');
    msg.edit(embed);
  },
};