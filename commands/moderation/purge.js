// const Discord = require("discord.js");

module.exports = {
  name: 'purge',
  category: 'Moderation',
  description: '**메시지 관리 권한이 있는 유저만 사용 가능한 명령어입니다.**\n해당 채널의 최근 메시지를 삭제할 수 만큼 삭제합니다.',
  guildOnly: true,
  aliases: ['delete', 'del', 'clear', 'clean', '삭제'],
  args: true,
  usage: ['<삭제할 수>'],
  async execute(message, args) {
    if (!message.member.hasPermission(['MANAGE_MESSAGES'])) return message.reply(':no_entry: 해당 명령어를 사용할 권한이 없습니다.');

    const deleteCount = parseInt(args[0], 10);
  
    if (!deleteCount || deleteCount < 2 || deleteCount > 100)
      return message.reply("2부터 100까지의 범위 내로 삭제할 메시지의 수를 입력하세요.");
  
    message.channel.bulkDelete(deleteCount, true)
      .catch(error => {
        message.reply(`메시지 삭제에 실패하였습니다: \`${error}\``);
        return;
      });
    
    const notice = await message.channel.send(`${message.author}, 메시지 ${deleteCount}개를 삭제했습니다.`)
      .then(msg => msg.delete({ timeout: 3000 }));
  },
};