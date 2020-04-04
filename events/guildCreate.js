const Discord = require('discord.js');
const chalk = require('chalk');

module.exports = async (client, guild) => {
  console.log(`[${new Date()}] ${chalk.magentaBright('[Guild Notification]')} 새로운 서버에 가입되었습니다: ${guild.name} (id: ${guild.id}). 해당 서버에는 ${guild.memberCount}명의 멤버가 있습니다.`);
  
  const embed = new Discord.MessageEmbed()
    .setColor('RANDOM')
    .setTitle('Pod를 초대해주셔서 감사합니다!')
    .setAuthor('Pod', 'https://i.imgur.com/8eJU78T.png')
    .setThumbnail('https://i.imgur.com/8eJU78T.png')
    .setDescription(`\`${client.config.prefix}\`<명령어> 로 명령어를 사용할 수 있어요!
      \`${client.config.prefix}help\` 로 도움말을, \`${client.config.prefix}command\` 로 명령어 목록을 확인해보세요!`)
    .setTimestamp()
    .setFooter('Made by Pneuma', (await client.users.fetch(client.config.devID)).displayAvatarURL());
    
  guild.owner.send(embed);
};