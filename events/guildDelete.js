const Discord = require('discord.js');
const chalk = require('chalk');

module.exports = async (client, guild) => {
  console.log(`${chalk.redBright('[Guild Info]')} (ID: ${guild.id}) (Name: ${guild.name}) 서버에서 탈퇴되었습니다.`);

  const embed = new Discord.MessageEmbed()
    .setColor('RANDOM')
    .setTitle('Pod를 더 이상 이용하지 않으신다니.. 아쉽네요 :cry:')
    .setAuthor('Pod', 'https://i.imgur.com/8eJU78T.png')
    .setThumbnail('https://i.imgur.com/8eJU78T.png')
    .setDescription(`Pod를 더 개선시키기 위해 Pod를 사용 중지한 이유를 알려주세요.
      :one: 기능이 부족함
      :two: 채팅에 방해됨
      :three: 서버 삭제 또는 일시적 중지
      :four: 기타 사유 (Pneuma#2575 로 DM해주세요)`)
    .setTimestamp()
    .setFooter('Made by Pneuma', (await client.users.fetch(client.config.devID)).displayAvatarURL());
    
  const msg = await guild.owner.send(embed);

  await msg.react('1️⃣');
  await msg.react('2️⃣');
  await msg.react('3️⃣');
  await msg.react('4️⃣');

  const filter = (reaction, user) => {
    return ['1️⃣', '2️⃣', '3️⃣', '4️⃣'].includes(reaction.emoji.name) && user.id === guild.owner.id;
  };
  
  msg.awaitReactions(filter, { max: 1, time: 120000, errors: ['time'] })
    .then(async collected => {
      const reaction = collected.first();
      
      if (reaction.emoji.name === '1️⃣')
        console.log(`${chalk.redBright('[Guild Info]')} (ID: ${guild.id}) (Name: ${guild.name}) 서버 탈퇴 사유: 기능이 부족함`);

      else if (reaction.emoji.name === '2️⃣')
        console.log(`${chalk.redBright('[Guild Info]')} (ID: ${guild.id}) (Name: ${guild.name}) 서버 탈퇴 사유: 채팅에 방해됨`);

      else if (reaction.emoji.name === '3️⃣')
        console.log(`${chalk.redBright('[Guild Info]')} (ID: ${guild.id}) (Name: ${guild.name}) 서버 탈퇴 사유: 서버 삭제 또는 일시적 중지`);

      else if (reaction.emoji.name === '4️⃣')
        console.log(`${chalk.redBright('[Guild Info]')} (ID: ${guild.id}) (Name: ${guild.name}) 서버 탈퇴 사유: 기타 사유`);

      const reply = new Discord.MessageEmbed()
        .setColor('RANDOM')
        .setTitle('피드백을 주셔서 감사합니다!')
        .setAuthor('Pod', 'https://i.imgur.com/8eJU78T.png')
        .setThumbnail('https://i.imgur.com/8eJU78T.png')
        .setDescription('더 나은 Pod 봇이 되어 돌아오도록 하겠습니다.')
        .setTimestamp()
        .setFooter('Made by Pneuma', (await client.users.fetch(client.config.devID)).displayAvatarURL());

      guild.owner.send(reply);
    }).catch(collection => { return; });
};