module.exports = {
  name: 'emojitext',
  category: 'Miscellaneous',
  description: '영문 텍스트를 이모지를 이용한 텍스트로 변환해줍니다.\n공백용 이모지를 지정하면 공백 자리에 해당 이모지가 들어갑니다. 기본값은 :white_large_square: 입니다.',
  aliases: ['textemoji', 'text2emoji', '이모지텍스트', '이모지글자', '이모티콘글자', '텍스트이모지'],
  args: true,
  usage: ['[텍스트]', '-<공백용 이모지> [텍스트]'],
  execute(message, args) {
    let spaceEmoji = ':white_large_square:';
    if (args[0].startsWith('-')) {
      spaceEmoji = args.shift();
      spaceEmoji = spaceEmoji.split('-')[1];
    }

    const content = args.join(' ').toLowerCase().replace(/[^ 0-9a-z]/g, '');
    if (!content.length) return message.reply('변환할 텍스트를 입력해주세요.');

    const numberEmoji = [':zero:', ':one:', ':two:', ':three:', ':four:', ':five:', ':six:', ':seven:', ':eight:', ':nine:'];
    const emojiList = [];

    for (const c of content) {
      if (c === ' ') emojiList.push(spaceEmoji);
      else if (!isNaN(c)) emojiList.push(numberEmoji[c]);
      else emojiList.push(`:regional_indicator_${c}:`);
    }

    const emojiText = emojiList.join('');
    message.channel.send(emojiText);
  },
};