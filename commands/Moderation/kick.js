module.exports = {
  name: 'kick',
  description: '서버의 멤버를 추방합니다. 이유를 지정하면 감사 로그에 해당 이유가 기록됩니다.',
  guildOnly: true,
  args: true,
  usage: ['<유저 멘션>', '<유저 멘션> [이유]'],
  execute(message, args) {
    if (!message.member.hasPermission(['KICK_MEMBERS'])) return message.reply(':no_entry: 해당 명령어를 사용할 권한이 없습니다.');

    const user = require('../../functions.js').getUserFromMention(message.client, args.shift());

    if (user) {
      const member = message.guild.member(user);

      if (member) {
        member
          .kick(args.join(' ') || '이유가 지정되지 않음')
          .then(() => {
            message.reply(`${user.tag} 를 추방했습니다.`);
          })
          .catch(err => {
            message.reply(`멤버 추방에 실패했습니다: \`\`\`${err}\`\`\``);
            console.error(err);
          });
      }
      else {
        message.reply('이 서버에 존재하지 않는 유저입니다.');
      }
    }
    else {
      message.reply('추방할 멤버를 올바르게 멘션해주세요.');
    }
  },
};