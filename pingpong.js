const request = require('request');
const JSON = require('JSON');
require('dotenv').config();

module.exports = async (client, message) => {
  const headers = {
      'Authorization': `${process.env.PINGPONG_AUTHORIZATION}`,
      'Content-Type': 'application/json',
  };

  const dataString = `{"request": {"query": "${message.content.slice(client.config.prefix.length).trim()}"}}`;

  const options = {
      url: `https://builder.pingpong.us/api/builder/${process.env.PINGPONG_ID}/integration/v0.2/custom/${message.author.id}`,
      method: 'POST',
      headers: headers,
      body: dataString,
  };

  request(options, (err, res, body) => {
    if (!err && res.statusCode == 200) {
      const json = JSON.parse(body);
      message.channel.send(json.response.replies[0].text);
    }
  });
};

