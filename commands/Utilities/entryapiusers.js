const fetch = require('node-fetch');

module.exports = {
  name: 'entryapiusers',
  description: 'playentry.org/api/users 를 fetch합니다. (테스트용 명령어)',
  beta: true,
  async execute(message, args) {
    message.channel.send(await fetch('https://playentry.org/api/users'), { code: 'xl' });
  },
};