const Discord = require('discord.js');
const isgd = require('isgd');

module.exports = {
  name: 'shorten',
  category: 'Utilities',
  description: '입력한 URL을 단축한 URL로 바꿔줍니다.',
  aliases: ['shorturl', 'isgd', '단축', '링크단축'],
  args: true,
  usage: ['<단축할 링크>', '<단축할 링크> <이름>'],
  cooldowns: 10,
  async execute(message, args) {
    const longURL = args[0];

    const embed = new Discord.MessageEmbed()
      .setColor('RANDOM')
      .setTitle('URL 단축 중...')
      .setTimestamp()
      .setFooter(`${message.author.tag} 에 의해 요청됨`);
    const msg = await message.channel.send(embed);

    if (!args[1]) {
      isgd.shorten(args[0], (shortURL) => {
        if (shortURL.startsWith('Error:')) {
          embed
            .setTitle('URL 단축 실패')
            .setThumbnail('https://i.imgur.com/fUpb9h2.jpg')
            .setDescription('**올바른 URL을 입력해주세요.**')
            .setFooter(`isgd API | ${message.author.tag} 에 의해 요청됨`, 'https://i.imgur.com/WiF9gaf.png');
          return msg.edit(embed);
        }

        embed
          .setTitle('URL 단축 성공!')
          .setThumbnail('https://i.imgur.com/fUpb9h2.jpg')
          .setDescription(`**단축된 링크:**\n**${shortURL}**`)
          .setFooter(`isgd API | ${message.author.tag} 에 의해 요청됨`, 'https://i.imgur.com/WiF9gaf.png');
        return msg.edit(embed);
      });
    }

    else {
      isgd.custom(args[0], args[1], (shortURL) => {
        if (shortURL.startsWith('Error: ')) {
          if (shortURL === 'Error: Please enter a valid URL to shorten')
            embed.setDescription('올바른 URL을 입력해주세요.');

          else if (shortURL === 'Error: Short URLs may only contain the characters a-z, 0-9 and underscore)')
            embed.setDescription('커스텀 URL에는 영문, 숫자, 언더바(_) 만 포함 가능합니다.');

          else if (shortURL === 'Error: Short URLs must be a maximum of 30 characters long')
            embed.setDescription('30자 이하의 커스텀 URL을 입력해주세요.');

          else if (shortURL === 'Error: The shortened URL you picked already exists, please choose another.')
            embed.setDescription('이미 존재하는 이름입니다. 다른 이름을 입력해주세요.');

          else return embed.setDescription(`예상치 못한 오류가 발생하였습니다: \`\`\`${shortURL}\`\`\``);

          embed
            .setTitle('URL 단축 실패')
            .setThumbnail('https://i.imgur.com/fUpb9h2.jpg')
            .setFooter(`isgd API | ${message.author.tag} 에 의해 요청됨`, 'https://i.imgur.com/WiF9gaf.png');
          return msg.edit(embed);
        }

        embed
          .setTitle('URL 단축 성공!')
          .setThumbnail('https://i.imgur.com/fUpb9h2.jpg')
          .setDescription(`**단축된 링크:**\n**${shortURL}**`)
          .setFooter(`isgd API | ${message.author.tag} 에 의해 요청됨`, 'https://i.imgur.com/WiF9gaf.png');
        return msg.edit(embed);
      });
    }
  },
};