const Discord = require('discord.js');

module.exports = {
  name: 'dmannounce',
  description: '**서버 소유자만 사용 가능한 명령어입니다**\n서버 멤버들에게 DM으로 공지를 보냅니다.',
  aliases: ['DM공지', '디엠공지'],
  guildOnly: true,
  args: true,
  usage: ['[공지 내용]'],
  cooldowns: 6,
  async execute(message, args) {
    if (message.author.id != message.guild.owner.id) return message.reply(':no_entry: 해당 명령어를 사용할 권한이 없습니다.');

    const members = message.guild.members.cache.filter(m => !m.user.bot);

    if (members.size > 200) return message.reply('DM 공지 기능은 봇 제외 인원이 200명 이하인 서버만 지원됩니다.');
    
    const failedMembers = [];

    for (const m of members) {
      await m[1].user.send(`**${message.guild.name} 서버 공지**\n\n${args.join(' ')}`)
        .catch(async error => failedMembers.push(m[1]));
    }

    if (failedMembers.length) message.reply(`${failedMembers.length}명의 유저에게 공지를 보내는 데 실패했습니다:\n\`\`\`${failedMembers.map(m => `${m.user.tag} ${m.nickname ? `(${m.nickname})` : ''}`).join('\n')}\`\`\``);
    else message.channel.send('모든 멤버에게 성공적으로 공지를 전송하였습니다.');
  },
};