module.exports = {
  getUserFromMention(client, mention) {
    const matches = mention.match(/^<@!?(\d+)>$/);

    if (!matches) return;

    const id = matches[1];
    return client.users.cache.get(id);
  },

  getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
  },

  getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; // Includes min value, but excludes max value.
  },

  getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; // Includes both of min and max value.
  },

  getKoreanDate(date) {
    return `${date.getFullYear()}년 ${(date.getMonth() + 1)}월 ${date.getDate()}일 ${date.getHours()}시 ${date.getMinutes()}분 ${date.getSeconds()}초`;
  }

};