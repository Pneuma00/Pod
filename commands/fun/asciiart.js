const figlet = require('figlet');

module.exports = {
  name: 'asciiart',
  category: 'Fun',
  description: '입력한 텍스트를 아스키 아트로 변환해줍니다. 영문, 숫자, 키보드에 있는 기호만 변환 가능합니다.',
  aliases: ['asciiarts', 'ascii', '아스키아트', '아스키'],
  args: true,
  usage: ['[텍스트]', 'font', '<폰트> | [텍스트]'],
  async execute(message, args) {
    const content = args.join(' ');
    if (!content) return message.reply('변환할 텍스트를 입력해주세요.');

    if (content === 'font') {
      figlet.fonts((err, fonts) => {
        if (err) {
          console.dir(err);
          return message.channel.send(`예상치 못한 오류가 발생하였습니다: \`\`\`${err}\`\`\``);
        }
        const msgText = fonts.map(e => `\`${e}\``).join(' | ');
        return message.author.send(`**사용 가능한 아스키 아트 폰트 전체 목록입니다:**\n${msgText}`, { split: { char: '|' } })
          .then(() => {
            if (message.channel.type === 'dm') return;
            message.reply("개인 DM을 확인해주세요!");
          })
          .catch(error => {
            message.reply(`DM으로 폰트 목록을 전송하지 못했습니다: \`${error}\`\nDM이 활성화 되어있는 지 확인해주세요.`);
          });
      });
      return;
    }
    
    const tempArgs = content.split(' | ');

    // No font option is given
    if (tempArgs.length === 1) { 
      const asciiText = tempArgs[0];
      figlet.text(asciiText, (err, res) => {
        if (err) {
          console.dir(err);
          return message.channel.send(`예상치 못한 오류가 발생하였습니다: \`\`\`${err}\`\`\``);
        }
        message.channel.send(`\`\`\`${res}\`\`\``);
      });
    }
    // Font option is given
    else {
      const fontArg = tempArgs.shift();
      const asciiText = tempArgs.join(' | ');
      figlet.text(asciiText, { font: fontArg }, (err, res) => {
        if (err) {
          if (err.toString().startsWith('Error: ENOENT: no such file or directory, open'))
            return message.reply('존재하지 않는 폰트입니다.\n폰트 목록은 `,,ascii font` 로 확인할 수 있습니다.');
          return message.channel.send(`예상치 못한 오류가 발생하였습니다: \`\`\`${err}\`\`\``);
        }
        message.channel.send(`\`\`\`${res}\`\`\``);
      });
    }
  },
};