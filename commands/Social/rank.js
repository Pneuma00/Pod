module.exports = {
  name: 'rank',
  description: '해당 서버 내의 Podcoin 랭킹을 보여줍니다.',
  aliases: ['랭킹'],
  execute(message, args) {
    const ranks = message.client.currency.sort((a, b) => b.balance - a.balance)
      .filter(user => message.client.users.cache.has(user.user_id) && message.guild.members.cache.has(user.user_id))
      .first(10)
      .map((user, position) => `${position + 1}. [${(message.client.users.cache.get(user.user_id).tag)}](${user.balance}💰)`)
      .join('\n');
    
    message.channel.send(`\`\`\`markdown\n# Podcoin 전체 랭킹\n> [유저](Podcoin 소지량)\n${ranks}\`\`\``);
  },
};