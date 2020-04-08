const ytdl = require('ytdl-core');

module.exports = {
  name: 'play',
  category: 'Music',
  description: '입력한 유튜브 영상 URL의 음악을 재생합니다. 베타 기능이므로 불안정할 수 있습니다.',
  aliases: ['join', 'connect'],
  guildOnly: true,
  usage: ['<유튜브 URL>'],
  async execute(message, args) {
    if (!message.member.voice.channel) return message.reply('음악을 재생하려면 먼저 음성 채널에 연결해주세요.');
    
    if (!args[0]) return message.reply('음악 URL을 입력해주세요.');

    const validate = await ytdl.validateURL(args[0]);
    if (!validate) return message.reply('올바른 유튜브 영상 URL을 입력해주세요.');

    const info = await ytdl.getInfo(args[0]);

    const data = message.client.active.get(message.guild.id) || {};

    if (!data.connection) data.connection = await message.member.voice.channel.join();
    if (!data.queue) data.queue = [];
    data.guildID = message.guild.id;

    data.queue.push({
      songTitle: info.title,
      requester: message.author.tag,
      url: args[0],
      announceChannel: message.channel.id,
    });

    if (!data.dispatcher) play(message.client, data);
    else {
      message.channel.send(`**${info.title}** 을(를) 재생목록에 추가했습니다. (${message.author.tag} 에 의해 요청됨)`);
    }
    
    message.client.active.set(message.guild.id, data);
  },
};

async function play(client, data) {
  client.channels.cache.get(data.queue[0].announceChannel).send(`**${data.queue[0].songTitle}** 을(를) 재생합니다. (${data.queue[0].requester} 에 의해 요청됨)`);
  
  data.dispatcher = await data.connection.play(ytdl(data.queue[0].url, { filter: 'audioonly' }));
  data.dispatcher.guildId = data.guildID;
  
  data.dispatcher.once('finish', () => {
    end(client, data);
  });
}

async function end(client, dispatcher) {
  const fetched = client.active.get(dispatcher.guildID);

  fetched.queue.shift();

  if (fetched.queue.length > 0) {
    client.active.set(dispatcher.guildID, fetched);
    play(client, fetched);
  }
  else {
    client.active.delete(dispatcher.guildID);
    
    const vc = client.guilds.cache.get(dispatcher.guildID).me.voice.channel;
    if (vc) vc.leave();
  }
}