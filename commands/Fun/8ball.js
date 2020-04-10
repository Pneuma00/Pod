const Discord = require('discord.js');

module.exports = {
  name: '8ball',
  category: 'Fun',
  description: '질문에 대한 답변을 해줍니다. 단, 기계에 의한 임의의 답변이므로 맹신하지 마세요.',
  aliases: ['8b', '8공', '8볼'],
  args: true,
  usage: ['[질문]?'],
  cost: 5,
  async execute(message, args) {
    const question = args.join(' ');

    if (question.slice(-1) !== '?' || args.length < 2) return message.reply('올바른 질문을 입력해주세요.');

    const answers = [
      '네.', '네, 아마도요.', '네, 확실해요.', '제 생각에는 그럴 것 같아요.',
      '아마도요?', '그럴 지도 몰라요.', '아마 그럴 거에요.',
      '잘 모르겠어요.', '흠, 다른 분께 물어보는 건 어때요?', '그건 제가 답변하기는 어려울 것 같아요.',
      '아마 아닐 것 같은데요?', '그렇지 않을지도 몰라요.',
      '아니요.', '아니요, 아마도요.', '아니라는 건 확실해요.', '제 생각에는 그렇지 않아요.',
      '음.. 나중에 다시 생각해보는건 어때요?', '흠, 다음에 다시 물어보세요.',
      '이미 답은 정해져 있을 지도 몰라요.', '가슴에 손을 얹고 생각해보면 답이 나올 거에요.',
      'ㅇ 노답', 'ㅇ 듣기 싫음',
    ];
    
    const embed = new Discord.MessageEmbed()
      .setColor('BLACK')
      .setTitle('8-Ball')
      .setThumbnail('https://i.pinimg.com/564x/e8/cb/6d/e8cb6d17003ed339ad02c648745635bc.jpg')
      .setDescription(answers[require('../../functions.js').getRandomInt(0, answers.length)])
      .setTimestamp()
      .setFooter(`${message.author.tag} 님의 질문에 대한 대답`, await message.author.displayAvatarURL());

    message.channel.send(embed);
  },
};