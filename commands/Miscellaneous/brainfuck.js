const Brainfuck = require('brainfuck-node');
const brainfuck = new Brainfuck({ maxSteps: 100000000 });

module.exports = {
  name: 'brainfuck',
  category: 'Miscellaneous',
  description: '입력한 Brainfuck 코드를 실행합니다.',
  aliases: ['brainf', 'bf', '브레인퍽'],
  args: true,
  usage: ['[코드]', '[코드] | [입력값]'],
  execute(message, args) {
    const contents = args.join(' ').split(' | ');
    const result = brainfuck.execute(contents[0], contents[1] || '');
    message.channel.send(`\`\`\`${result.output}\`\`\``);
  },
};