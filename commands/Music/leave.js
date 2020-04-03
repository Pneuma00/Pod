module.exports = {
  name: 'leave',
  category: 'Music',
  description: '음악 재생을 멈추고 음성 채널 연결을 해제합니다.',
  aliases: ['stop', 'disconnect'],
  guildOnly: true,
  async execute(message, args) {
    if (!message.member.voice.channel) return message.reply('음악 재생을 멈추고 연결 해제하려면 먼저 음성 채널에 연결해주세요.');
    
    if (!message.guild.me.voice.channel) return message.reply('봇이 음성 채널에 연결되어 있지 않습니다.');

    if (message.guild.me.voice.channelID !== message.member.voice.channelID) return message.reply('봇이 연결된 음성 채널에 먼저 연결해주세요.');
    
    await message.guild.me.voice.channel.leave();

    message.channel.send('음성 채널로부터 연결 해제하였습니다.');
  },
};