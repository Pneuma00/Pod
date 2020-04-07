const chalk = require('chalk');

module.exports = {
  name: 'unblacklist',
  category: 'Dev Only',
  description: '유저를 블랙리스트에서 삭제하여 봇 사용을 허용하도록 합니다.',
  aliases: ['unblack', '언블랙리스트', '언블랙'],
  devOnly: true,
  args: true,
  usage: ['<유저 멘션>'],
  async execute(message, args) {
    const user = require('../../functions.js').getUserFromMention(message.client, args.shift());

    if (user) {
      const targetUser = await message.client.database.Blacklist.findOne({ where: { user_id: user.id } });

      if (!targetUser) return message.reply('블랙리스트에 추가되지 않은 사용자입니다.');

      await targetUser.destroy({ where: { user_id: user.id } });

      console.log(`[${message.createdAt}] ${chalk.red('[User Unblacklisted]')} (ID: ${user.id}) 사용자 ${user.tag} 를 블랙리스트에서 삭제했습니다.`);
      return message.channel.send(`사용자 ${user.tag} (${user.id}) 를 블랙리스트에서 삭제했습니다.`);
    }
    else {
      return message.reply('블랙리스트에 추가할 유저를 올바르게 멘션해주세요.');
    }
  },
};