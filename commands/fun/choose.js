module.exports = {
  name: 'choose',
  category: 'Fun',
  description: '여러가지 옵션들 중 한 가지를 랜덤으로 뽑습니다.',
  aliases: ['choice', 'roulette', 'pick', '랜덤', '룰렛', '뽑기', '선택'],
  args: true,
  usage: ['[옵션1] | [옵션2] | ... | [옵션n]'],
  async execute(message, args) {
    const joinArgs = args.join(' ');
    const options = joinArgs.split(' | ');

    if (options.length < 2) return message.reply('최소 2개의 옵션을 입력해주세요.');

    const index = require('../../functions.js').getRandomInt(0, options.length);

    const msg = await message.channel.send(`${message.author}, 결과는...`);
    setTimeout(() =>{
      msg.edit(`${message.author}, 결과는... **${index + 1}번!**\n> ${options[index]}`);
    }, 1500);
  },
};