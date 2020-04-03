const Discord = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
  name: 'xkcd',
  category: 'Miscellaneous',
  description: 'xkcd 웹툰을 보여줍니다. 옵션 미설정 시 랜덤 에피소드를 가져옵니다. **에피소드를 필터링하지 않으므로 NSFW 채널에서 사용하는 것을 권장합니다.**',
  aliases: ['탗ㅇ'],
  usage: ['latest', 'search <에피소드 번호>'],
  async execute(message, args) {
    let search = '';

    if (args[0] === 'latest') search = 'http://xkcd.com/info.0.json';
    else if (args[0] === 'search') {
      if (!args[1]) return message.reply('검색할 에피소드의 번호를 입력해주세요.');
      else if (args[1] && isNaN(args[1])) return message.reply('올바른 에피소드 번호를 입력해주세요.');
      search = `http://xkcd.com/${args[1]}/info.0.json`;
    }
    else {
      const maxNum = await fetch('http://xkcd.com/info.0.json').then(res => res.json()).then(res => { return res.num; });
      search = `http://xkcd.com/${require('../../functions.js').getRandomIntInclusive(1, maxNum)}/info.0.json`;
    }

    try {
      fetch(search).then(res => res.json()).then(res => {
        if (!res) return message.channel.send('검색 결과가 없습니다.');
        
        const { safe_title, img, day, month, year, num, alt } = res;
        const embed = new Discord.MessageEmbed()
          .setColor('RANDOM')
          .setTitle(`xkcd | ${safe_title} [${num}]`)
          .setURL(`http://xkcd.com/${num}`)
          .setThumbnail('https://pbs.twimg.com/profile_images/902997738870026240/ACFlWC3y_400x400.jpg')
          .setDescription(alt ? alt : '')
          .setImage(img)
          .setFooter(`${year}.${month}.${day}에 연재됨 | ${message.author.tag} 에 의해 요청됨`);
        message.channel.send(embed);
      });
    }
    catch (err) {
      console.log(err);
      return message.reply(`예상치 못한 오류가 발생하였습니다: \`\`\`${err}\`\`\``);
    }
  },
};