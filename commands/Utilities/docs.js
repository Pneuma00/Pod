const Discord = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
  name: 'docs',
  category: 'Search',
  description: '주어진 키워드에 대한 Discord.js 문서 검색결과를 보여줍니다.',
  aliases: ['doc', 'djsdocs', 'djsdoc', 'djs', 'discordjs', '문서', '독스', '도큐', '도큐먼트'],
  args: true,
  usage: ['[키워드]'],
  cooldowns: 10,
  async execute(message, args) {
    const query = args.join(' ').replace('#', '.');
    if (!query) return message.reply('검색할 키워드를 입력 해주세요.');

    const body = await fetch(`https://djsdocs.sorta.moe/v2/embed?src=https://raw.githubusercontent.com/discordjs/discord.js/docs/stable.json&q=${encodeURI(query)}`).then(res => res.json());

    if (!body) return message.reply('검색 결과가 없습니다.');

    const embed = new Discord.MessageEmbed(body)
      .setAuthor('Discord.js Docs (stable)', 'https://discord.js.org/favicon.ico');
    message.channel.send(embed);
  },
};