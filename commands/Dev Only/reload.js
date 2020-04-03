const Discord = require('discord.js');
const fs = require('fs');
const chalk = require('chalk');

module.exports = {
  name: 'reload',
  category: 'Dev Only',
  description: '**개발자 전용 명령어입니다.**\n모든 명령어를 업데이트합니다.',
  devOnly: true,
  aliases: ['re', '리로드', '리'],
  async execute(message, args) {
    const ascii_table = require("ascii-table");
    const table = new ascii_table("Commands Reload");
    table.setHeading("Command", "Reload Status");

    let successCount = 0;
    let failCount = 0;
    const failCommand = [];

    fs.readdirSync("./commands/").forEach(dir => {
      const commands = fs.readdirSync(`./commands/${dir}/`).filter(file => file.endsWith(".js"));
    
      for (const file of commands) {
        delete require.cache[require.resolve(`../${dir}/${file}`)];
        const newCommand = require(`../${dir}/${file}`);
    
        if (newCommand.name) {
          message.client.commands.set(newCommand.name, newCommand);
          table.addRow(file, '✅Succeed');
          successCount += 1;
        }
        else {
          table.addRow(file, '❌Failed');
          failCount += 1;
          failCommand.push(file);
          continue;
        }
        message.client.commands.set(newCommand.name, newCommand);
      }
    });

    console.log(table.toString());
    
    if (failCount) {
      const embed = new Discord.MessageEmbed()
        .setColor('RED')
        .setTitle('명령어 전체 리로드 실패')
        .setDescription(`**${successCount + failCount}**개 명령어 중 **${successCount}**개 명령어 리로드에 성공하고,
          **${failCount}**개 명령어 리로드에 실패했습니다.
          
          **실패한 명령어 목록**\n\`\`\`${failCommand.join('\n')}\`\`\``)
        .setTimestamp();
      return message.channel.send(embed);
    }

    const embed = new Discord.MessageEmbed()
      .setColor('GREEN')
      .setTitle('명령어 전체 리로드 성공')
      .setDescription(`**${successCount}**개 명령어를 모두 리로드하였습니다.`)
      .setTimestamp();
    return message.channel.send(embed);
  },
};