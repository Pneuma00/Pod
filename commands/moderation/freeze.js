module.exports = {
  name: 'freeze',
  category: 'Moderation',
  description: '**역할 및 채널 관리 권한이 있는 유저만 사용 가능한 명령어입니다.**\n해당 채널을 동결시킵니다.\neveryone 이외의 역할 중 메시지 보내기 권한이 무조건 활성화된 역할이 있을 시에는 제대로 작동하지 않을 수 있습니다.',
  guildOnly: true,
  aliases: ['frz', '동결'],
  execute(message, args) {
    if (!message.member.hasPermission(['MANAGE_CHANNELS', 'MANAGE_ROLES']))
      return message.reply(':no_entry: 해당 명령어를 사용할 권한이 없습니다.');

    message.channel.updateOverwrite(message.channel.guild.roles.everyone, { SEND_MESSAGES: false })
      .catch(error => message.reply(`채널 동결에 실패하였습니다: \`${error}\``));

    message.channel.send(`${message.author} 에 의해 채널이 동결되었습니다.`);
  },
};