const chalk = require('chalk');

module.exports = {
  name: 'blacklist',
  category: 'Dev Only',
  description: '유저를 블랙리스트에 추가하여 봇 사용을 금지하도록 합니다.',
  aliases: ['black', '블랙리스트', '블랙'],
  devOnly: true,
  args: true,
  usage: ['<유저 멘션>', '<유저 멘션> [이유]'],
  async execute(message, args) {
    const user = require('../../functions.js').getUserFromMention(message.client, args.shift());

    if (user) {
      if (await message.client.blacklist.Blacklist.count({ where: { user_id: user.id } }))
        return message.reply('이미 블랙리스트에 추가된 사용자입니다.');
        
      const targetUser = await message.client.blacklist.Blacklist.create({
        user_id: user.id,
        reason: args.join(' ') || '이유가 지정되지 않음',
      });

      console.log(`[${message.createdAt}] ${chalk.red('[User Blacklisted]')} (ID: ${targetUser.user_id}) 사용자 ${user.tag} 를 블랙리스트에 추가했습니다. (사유: ${targetUser.reason})`);
      return message.channel.send(`사용자 ${user.tag} (${targetUser.user_id}) 를 블랙리스트에 추가했습니다.`);
    }
    else {
      return message.reply('블랙리스트에 추가할 유저를 올바르게 멘션해주세요.');
    }
  },
};