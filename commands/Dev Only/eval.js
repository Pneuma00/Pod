const Discord = require('discord.js');

function clean(text) {
  if (typeof (text) === "string")
    return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
  else
    return text;
}

module.exports = {
  name: 'eval',
  category: 'Dev Only',
  description: '***개발자 전용 명령어입니다. 일반 유저의 사용을 절대 금지합니다.***\n***개발자 및 개발자가 일시적으로 허용한 유저 이외에***\n***해당 명령어를 사용한 유저는 봇 이용 금지 대상이 될 수 있습니다.***\n입력한 함수를 실행하고 반환값을 출력합니다.',
  aliases: ['evaluate', 'func', 'compile', 'run', '이발', '컴파일', '함수', '실행'],
  devOnly: true,
  args: true,
  usage: ['[코드]'],
  async execute(message, args) {
    const code = args.join(' ');
    
    try {
      let evaled = eval(code);
 
      if (typeof evaled !== "string")
        evaled = require("util").inspect(evaled);
 
      const embed = new Discord.MessageEmbed()
        .setColor('GREEN')
        .setTitle('코드 실행 결과')
        .setDescription(`:inbox_tray: **입력 함수 코드:**\n\`\`\`js\n${code}\`\`\`\n:outbox_tray: **실행 결과:**\n\`\`\`xl\n${clean(evaled)}\`\`\``)
        .setTimestamp();
      message.channel.send(embed);
    }
    catch (err) {
      const embed = new Discord.MessageEmbed()
        .setColor('RED')
        .setTitle('코드 실행 오류')
        .setDescription(`:inbox_tray: **입력 함수 코드:**\n\`\`\`js\n${code}\`\`\`\n:outbox_tray: **오류 메시지:**\n\`\`\`xl\n${clean(err)}\`\`\``)
        .setTimestamp();
      message.channel.send(embed);
    }
  },
};