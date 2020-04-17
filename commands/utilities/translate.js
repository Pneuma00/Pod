const Discord = require('discord.js');
const translate = require('@vitalets/google-translate-api');

module.exports = {
  name: 'translate',
  category: 'Utilities',
  description: '입력한 텍스트를 언어 옵션에 따라 번역합니다.',
  aliases: ['translation', '번역', '번역기'],
  args: true,
  usage: ['auto <도착언어> [텍스트]', '<출발언어> <도착언어> [텍스트]'],
  cooldowns: 10,
  execute(message, args) {
    const logoURL = 'https://seeklogo.com/images/G/google-translate-logo-66F8665D22-seeklogo.com.png';
    const fromLang = args.shift();

    if (fromLang === 'auto') {
      if (!args.length) return message.reply('도착 언어를 입력해주세요.');
      const toLang = args.shift();

      if (!args.length) return message.reply('번역할 텍스트를 입력해주세요.');
      const translateText = args.join(' ');

      translate(translateText, { to: toLang })
        .then(res => {
        const embed = new Discord.MessageEmbed()
          .setColor('BLUE')
          .setTitle('번역 결과')
          .setThumbnail(logoURL)
          .addFields(
            { name: '언어 옵션', value: `\`${res.from.language.iso}\` => \`${toLang}\`` },
            { name: '입력한 텍스트', value: `\`\`\`${translateText}\`\`\`` },
            { name: '번역 결과', value: `\`\`\`${res.text}\`\`\`` },
          )
          .setTimestamp()
          .setFooter(`Google Translate API | ${message.author.tag} 에 의해 요청됨`, logoURL);
        message.channel.send(embed);
      }).catch(err => {
        console.log(err);
        message.channel.send('예상치 못한 오류가 발생했습니다.\n해당 문제가 반복된다면 개발자에게 문의하시기 바랍니다.');
      });
    }
    else {
      if (!args.length) return message.reply('도착 언어를 입력해주세요.');
      const toLang = args.shift();

      if (!args.length) return message.reply('번역할 텍스트를 입력해주세요.');
      const translateText = args.join(' ');

      translate(translateText, { from: fromLang, to: toLang })
        .then(res => {
        const embed = new Discord.MessageEmbed()
          .setColor('BLUE')
          .setTitle('번역 결과')
          .setThumbnail(logoURL)
          .addFields(
            { name: '언어 옵션', value: `\`${fromLang}\` => \`${toLang}\`` },
            { name: '입력한 텍스트', value: `\`\`\`${translateText}\`\`\`` },
            { name: '번역 결과', value: `\`\`\`${res.text}\`\`\`` },
          )
          .setTimestamp()
          .setFooter(`Google Translate API | ${message.author.tag} 에 의해 요청됨`, logoURL);
        message.channel.send(embed);
      }).catch(err => {
        console.log(err);
        message.channel.send('예상치 못한 오류가 발생했습니다.\n해당 문제가 반복된다면 개발자에게 문의하시기 바랍니다.');
      });
    }
  },
};