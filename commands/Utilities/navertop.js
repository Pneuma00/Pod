const Discord = require('discord.js');
const request = require("request");
const cheerio = require('cheerio');
const JSON = require('JSON');

module.exports = {
  name: 'navertop',
  category: 'Search',
  description: '네이버 실시간 검색어 1~10위를 보여줍니다.',
  aliases: ['naverhot', 'silgum', '네이버실검', '네이버핫토픽'],
  async execute(message, args) {
    const nums = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'keycap_ten'];

    const loading = new Discord.MessageEmbed()
      .setColor('GREEN')
      .setTitle('네이버 실시간 검색어 정보를 물러오는 중...');
    const msg = await message.channel.send(loading);

    request('https://www.naver.com/srchrank?frm=main', (err, res, html) => {
      const $ = cheerio.load(html);
      const json = JSON.parse($('body').text());
      
      const embed = new Discord.MessageEmbed()
        .setColor('GREEN')
        .setTitle('네이버 실시간 검색어 순위')
        .setThumbnail('https://t1.daumcdn.net/cfile/tistory/26745B3B58F1BFA71C')
        .setFooter(`${json.ts} | ${message.author.tag} 에 의해 요청됨`, 'https://t1.daumcdn.net/cfile/tistory/26745B3B58F1BFA71C');

      let desc = '';
      for (let i = 0; i < 10; i++) {
        desc += `:${nums[i]}: [${json.data[i].keyword}](https://search.naver.com/search.naver?query=${json.data[i].keyword.replace(/ /g, '+')})\n${
          (json.data[i].keyword_synonyms.length ? ':link: ' + json.data[i].keyword_synonyms.map(e => (
            `[${e}](https://search.naver.com/search.naver?query=${e.replace(/ /g, '+')})`
          )).join(', ') + '\n' : '') + '\n'
        }`;
      }
      embed.setDescription(desc);
      msg.edit(embed);
    });
  },
};