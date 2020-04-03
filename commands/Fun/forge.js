const Discord = require('discord.js');
const funcs = require('../../functions.js');

module.exports = {
  name: 'forge',
  category: 'Fun',
  description: '강화할 수록 성공 확률이 낮아지고, 연속으로 많은 강화를 성공해서 끝내는 게임입니다. 단, 도중에 강화를 실패하거나 이모지 추가 이후 10초 동안 반응이 없으면 패배가 됩니다.',
  aliases: ['reinforce', '강화', '강화게임'],
  async execute(message, args) {
    const embed = new Discord.MessageEmbed()
      .setColor('RANDOM')
      .setTitle('강화 게임을 시작하시겠습니까?')
      .setDescription('시작하려면 :white_check_mark: 에, 취소하려면 :negative_squared_cross_mark: 에 반응해주세요.')
      .setTimestamp()
      .setFooter(`${message.author.tag} 에 의해 요청됨`, await message.author.displayAvatarURL());

    const msg = await message.channel.send(embed);

    await msg.react('✅');
    await msg.react('❎');

    let filter = (reaction, user) => {
      return ['✅', '❎'].includes(reaction.emoji.name) && user.id === message.author.id;
    };
    
    const collected = await msg.awaitReactions(filter, { max: 1, time: 30000, errors: ['time'] })
      .catch(collection => { return message.reply('시간을 초과하여 취소되었습니다.'); });
    
    const userReaction = collected.first();
    
    msg.reactions.removeAll().catch(error => console.error('이모지 삭제에 실패했습니다: ', error));

    if (userReaction.emoji.name === '❎') return message.channel.send('강화 게임이 취소되었습니다.');

    // Game Start ====================================================================================
    
    let result = false;
    let count = 0;
    let percentage = 100;
    let allPercentage = 100;

    filter = (reaction, user) => {
      return ['✅', '⛔'].includes(reaction.emoji.name) && user.id === message.author.id;
    };

    while (!result) {
      embed
        .setTitle('강화 게임!')
        .setDescription(`
          ${count ? '강화에 성공했습니다!' : ''}

          **🛠️ 강화 횟수:** ${count}회
          **📶 성공 확률:** ${percentage.toFixed(1)}%
          
          강화하려면 ✅ 에, 강화를 마치려면 ⛔ 에 반응해주세요.`)
        .setTimestamp();

      msg.edit(embed);

      if (!count) {
        await msg.react('✅');
        await msg.react('⛔');
      }

      const gameCollected = await msg.awaitReactions(filter, { max: 1, time: 10000, errors: ['time'] })
        .catch(collection => { result = 'timeover'; });
      
      if (result !== 'timeover') {
        const gameReaction = gameCollected.first();
        
        const userReactions = msg.reactions.cache.filter(reaction => reaction.users.cache.has(message.author.id));
        try {
          for (const reaction of userReactions.values()) {
            await reaction.users.remove(message.author.id);
          }
        }
        catch (error) {
          console.error('Failed to remove reactions.');
        }

        if (gameReaction.emoji.name === '⛔') result = 'finish';

        else {
          const random = funcs.getRandomArbitrary(0, 100);

          if (random < percentage) {
            count += 1;
            const percentMultiple = funcs.getRandomArbitrary(0.95, 0.98);
            percentage *= percentMultiple;
            allPercentage *= percentage / 100;
          }
          else {
            result = 'fail';
          }
        }
      }
    }
    
    // Result ======================================================================================

    msg.reactions.removeAll().catch(error => console.error('이모지 삭제에 실패했습니다: ', error));

    if (result === 'finish') {
      embed
        .setColor('GREEN')
        .setDescription(`
          강화를 성공적으로 마쳤습니다!

          **🛠️ 강화 횟수:** ${count}회
          ** 📶 총 확률:** ${allPercentage.toFixed(2)}%`)
        .setTimestamp();
      msg.edit(embed);
    }

    else if (result === 'fail') {
      embed
        .setColor('RED')
        .setDescription(`
          강화에 실패했습니다...

          **🛠️ 강화 횟수:** ${count}회
          ** 📶 총 확률:** ${allPercentage.toFixed(2)}%`)
        .setTimestamp();
      msg.edit(embed);
    }

    else {
      embed
        .setColor('RED')
        .setDescription(`
          시간이 초과되었습니다...

          **🛠️ 강화 횟수:** ${count}회
          ** 📶 총 확률:** ${allPercentage.toFixed(2)}%`)
        .setTimestamp();
      msg.edit(embed);
    }   
  },
};
