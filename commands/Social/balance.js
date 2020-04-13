module.exports = {
  name: 'balance',
  description: '자신이 가지고 있는 Podcoin 정보를 보여줍니다.',
  aliases: ['밸런스'],
  execute(message, args) {
    return message.channel.send(`당신은 ${message.client.currency.getBalance(message.author.id)} Podcoin💰 을 가지고 있습니다.`);
  },
};