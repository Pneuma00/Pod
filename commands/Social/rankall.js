module.exports = {
  name: 'rankall',
  description: 'Pod 이용자 전체의 Podcoin 랭킹을 보여줍니다.',
  aliases: ['전체랭킹'],
  execute(message, args) {
    const ranks = message.client.currency.sort((a, b) => b.balance - a.balance)
      .filter(user => message.client.users.cache.has(user.user_id))
      .first(10)
      .map((user, position) => `${position + 1}. [${(message.client.users.cache.get(user.user_id).tag)}](${user.balance}💰)`)
      .join('\n');
    
    message.channel.send(`\`\`\`markdown\n# Podcoin 전체 랭킹\n> [유저](Podcoin 소지량)\n${ranks}\`\`\``);
  },
};