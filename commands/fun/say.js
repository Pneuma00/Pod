const Discord = require("discord.js");

module.exports = {
  name: 'say',
  category: 'Fun',
  description: '봇으로 하여금 메시지를 보내게 합니다.',
  aliases: ['echo', '앵무새'],
  args: true,
  usage: ['[보낼 메시지]'],
  async execute(message, args) {
    const sayMessage = args.join(" ");
    
    if (message.channel.type === 'text')
      message.delete().catch(error => message.reply(`메시지 삭제에 실패하였습니다: \`${error}\``));
  
    const embed = new Discord.MessageEmbed()
      .setColor('RANDOM')
      .setTitle(sayMessage)
      .setTimestamp()
      .setFooter(`${message.author.tag} 님의 메시지`, await message.author.displayAvatarURL());
    message.channel.send(embed);
  },
};