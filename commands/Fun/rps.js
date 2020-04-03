const Discord = require('discord.js');

module.exports = {
  name: 'rps',
  category: 'Fun',
  description: '이모지 반응으로 봇과 가위바위보 게임을 합니다.',
  aliases: ['rockpaperscissors', '가위바위보', '묵찌빠'],
  async execute(message, args) {
    const embed = new Discord.MessageEmbed()
      .setColor('YELLOW')
      .setTitle('가위바위보 게임!')
      .setDescription('이모지에 반응해서 가위바위보를 내세요!')
      .setTimestamp()
      .setFooter(`${message.author.tag} 에 의해 요청됨`, await message.author.displayAvatarURL());

    const msg = await message.channel.send(embed);

    const emojis = ['✌️', '✊', '✋'];

    emojis.forEach(async e => {
      await msg.react(e);
    });
    
    const filter = (reaction, user) => {
      return emojis.includes(reaction.emoji.name) && user.id === message.author.id;
    };
    
    msg.awaitReactions(filter, { max: 1, time: 30000, errors: ['time'] })
      .then(async collected => {
        const reaction = collected.first();

        msg.reactions.removeAll().catch(error => console.error('이모지 삭제에 실패했습니다: ', error));

        const random = require('../../functions.js').getRandomIntInclusive(0, 2); // 0 - Win, 1 - Lose, 2 - Draw.

        const result = new Discord.MessageEmbed()
          .setColor('YELLOW')
          .setTimestamp()
          .setFooter(`${message.author.tag} 에 의해 요청됨`, await message.author.displayAvatarURL());

        if (random === 0) { // Player win
          result.setTitle('이겼습니다!').setDescription(`${reaction.emoji.name} **vs** ${emojis[(emojis.indexOf(reaction.emoji.name) + 2) % 3]}`);
        }
        else if (random === 1) {
          result.setTitle('졌습니다...').setDescription(`${reaction.emoji.name} **vs** ${emojis[(emojis.indexOf(reaction.emoji.name) + 1) % 3]}`);
        }
        else {
          result.setTitle('비겼습니다.').setDescription(`${reaction.emoji.name} **vs** ${reaction.emoji.name}`);
        }
        
        return msg.edit(result);
      }).catch(collection => { return message.reply('시간이 초과되었습니다.'); });
  },
};