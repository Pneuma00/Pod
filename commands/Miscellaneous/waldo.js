const Discord = require('discord.js');
const translate = require('@vitalets/google-translate-api');

module.exports = {
  name: 'waldo',
  category: 'Miscellaneous',
  description: '입력한 텍스트를 왈도체로 변환합니다.',
  aliases: ['waldotext', '왈도', '왈도체'],
  args: true,
  usage: ['[텍스트]'],
  cooltime: 15,
  async execute(message, args) {
    const waldoText = args.join(' ');
    let result = waldoText;
    const route = ['ko', 'en', 'fr', 'ko'];

    const embed = new Discord.MessageEmbed()
      .setColor('ORANGE')
      .setTitle('왈도체 변환 중...');

    const msg = await message.channel.send(embed);

    for (let i = 0; i < 3; i++) {
      await translate(result, { from: route[i], to: route[i + 1] }).then(res => {result = res.text;})
      .catch(err => {
        console.log(err);
        return message.channel.send('예상치 못한 오류가 발생했습니다.\n해당 문제가 반복된다면 개발자에게 문의하시기 바랍니다.');
      });
    }

    embed
      .setColor('ORANGE')
      .setTitle('왈도체 변환 결과')
      .setThumbnail('https://i.imgur.com/1sQUyHP.png')
      .addFields(
        { name: '입력한 텍스트', value: `\`\`\`${waldoText}\`\`\`` },
        { name: '왈도체 변환 결과', value: `\`\`\`${result}\`\`\`` },
      )
      .setFooter(`Google Translate API | ${message.author.tag} 에 의해 요청됨`, 'https://seeklogo.com/images/G/google-translate-logo-66F8665D22-seeklogo.com.png');

    msg.edit(embed);
  },
};