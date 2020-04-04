module.exports = {
  name: 'ban',
  category: 'Moderation',
  description: '서버의 멤버를 차단합니다. 이유를 지정하면 감사 로그에 해당 이유가 기록됩니다.',
  guildOnly: true,
  args: true,
  usage: ['<유저 멘션>', '<유저 멘션> [이유]'],
  execute(message, args) {
    if (!message.member.hasPermission(['BAN_MEMBERS'])) return message.reply(':no_entry: 해당 명령어를 사용할 권한이 없습니다.');

    const user = require('../../functions.js').getUserFromMention(message.client, args.shift());

    if (user) {
      const member = message.guild.member(user);

      if (member) {
        member
          .ban({ reason: `${args.join(' ') || '이유가 지정되지 않음'}` })
          .then(() => {
            message.reply(`${user.tag} 를 차단했습니다.`);
          })
          .catch(err => {
            message.reply(`멤버 차단에 실패했습니다: \`\`\`${err}\`\`\``);
            console.error(err);
          });
      }
      else {
        message.reply('이 서버에 존재하지 않는 유저입니다.');
      }
    }
    else {
      message.reply('차단할 멤버를 올바르게 멘션해주세요.');
    }
  },
};