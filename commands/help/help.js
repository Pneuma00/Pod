const Discord = require('discord.js');

module.exports = {
  name: 'help',
  category: 'Help',
  description: 'Pod 봇에 대한 도움말을 표시합니다.',
  aliases: ['helpme', 'info', '도움', '도움말'],
  async execute(message, args) {
    const embed = new Discord.MessageEmbed()
      .setColor('RANDOM')
      .setTitle('Pod 봇 도움말')
      .setAuthor('Pod', 'https://i.imgur.com/8eJU78T.png')
      .setThumbnail('https://i.imgur.com/8eJU78T.png')
      .setDescription('Pod는 Pneuma가 2020.3.5에 개발 시작한 베타 봇입니다.\nPneuma#2575 로 피드백과 개선할 사항을 알려주세요!')
      .addFields(
        { name: '접두어', value: `현재 Pod 봇의 기본 접두어는 \`${message.client.config.prefix}\` 입니다.` },
        { name: '명령어', value: `\`${message.client.config.prefix}command\` 로 Pod 봇의 명령어 전체 목록을 볼 수 있습니다.\n` },
        { name: '인공지능 대화', value: '핑퐁 빌더를 이용한 인공지능 대화를 지원합니다.\nPod에게 명령어 이외의 메시지를 전송해보세요!\n*단, 기계에 의한 답변이므로 어떠한 유효성도 갖지 못하고,\n답변에 대한 책임을 지지 않습니다.*' },
        { name: '문의', value: 'Pod 봇에 관련된 문의사항은 `,,support` 를 참고해주세요.' },
      )
      .setTimestamp()
      .setFooter('Made by Pneuma', (await message.client.users.fetch(message.client.config.devID)).displayAvatarURL());
    message.channel.send(embed);
  },
};