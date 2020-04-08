const Discord = require('discord.js');
const randomPuppy = require('random-puppy');

module.exports = {
  name: 'meme',
  category: 'Search',
  description: 'reddit 랜덤 이미지를 보여줍니다.\n**이미지를 필터링하지 않으므로 NSFW 채널에서 사용하는 것을 권장합니다.**',
  aliases: ['redditmeme', 'reddit', 'subreddit', 'memeimage', '밈', '레딧밈'],
  usage: ['<서브레딧명>'],
  cooldown: 5,
  async execute(message, args) {
    const subReddits = ['dankmeme', 'meme', 'me_irl'];
    const randomSub = args[0] || subReddits[Math.floor(Math.random() * subReddits.length)];

    const embed = new Discord.MessageEmbed()
      .setTitle(`/r/${randomSub} 랜덤 밈 불러오는 중...`)
      .setURL(`https://reddit.com/r/${randomSub}`);
    const msg = await message.channel.send(embed);     

    const img = await randomPuppy(randomSub);

    embed.setImage(img)
      .setTitle(`/r/${randomSub} 랜덤 밈`)
      .setURL(`https://reddit.com/r/${randomSub}`)
      .setTimestamp()
      .setFooter(`${message.author.tag} 에 의해 요청됨`, await message.author.displayAvatarURL());
    msg.edit(embed);
  },
};