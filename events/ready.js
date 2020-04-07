module.exports = async (client) => {
  const storedBalances = await client.database.Users.findAll();
  storedBalances.forEach(b => client.currency.set(b.user_id, b));

  console.log(`${client.guilds.cache.size}개 서버의 ${client.channels.cache.size}개 채널에서 ${client.users.cache.size}명의 유저와 참여할 준비가 되었습니다.`);

  let index = 0;
  
  setInterval(() => {
    const activities_list = [`${client.guilds.cache.size}개의 서버에 참여 중`, `${client.users.cache.size}명 유저와 함께 중`, 'https://enturl.me/pod', '꾸준히 업데이트 중..'];
    client.user.setActivity(`${client.config.prefix}help | ${activities_list[index]}`);
    index = (index + 1) % activities_list.length;
  }, 5000);  
};