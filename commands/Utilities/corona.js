const Discord = require("discord.js");
const request = require("request");
const cheerio = require("cheerio");
const moment = require("moment");

module.exports = {
  name: 'corona',
  category: 'Search',
  description: '국내 코로나19 감염 현황 정보를 표시합니다.',
  aliases: ['covid', 'covid19', 'ncov', '코로나', '코비드'],
  usage: ['local'],
  cooldown: 10,
  async execute(message, args) {
    if (args.length && (['local', '지역']).includes(args[0])) {
      const loading = new Discord.MessageEmbed()
        .setColor('RED')
        .setTitle('국내 코로나19 지자체별 발생 동향을 불러오는 중..');
      const msg = await message.channel.send(loading);

      request('http://ncov.mohw.go.kr/', (err, res, html) => {
        const $ = cheerio.load(html);
        const $data = $('body .wrap.nj .mainlive_container .container div .liveboard_layout .live_right .livemap .main_maparea #main_maplayout').children();
        const date = $('body .wrap.nj .mainlive_container .container div .liveboard_layout .live_right h2 a .livedate').text().trim();

        const embed = new Discord.MessageEmbed()
          .setColor('RED')
          .setTitle('국내 코로나19 지자체별 발생 동향')
          .setAuthor('Pod', 'https://i.imgur.com/8eJU78T.png')
          .attachFiles(['./images/Avatar_mask.png'])
          .setThumbnail('attachment://Avatar_mask.png')
          .setDescription("베타 기능이므로 불안정할 수 있습니다.")
          .setFooter(`${date} | 출처: 질병관리본부 코로나19 홈페이지`, 'http://ncov.mohw.go.kr/static/image/header/ROK.png');

        for (let i = 0; i < 17; i++) {
          const name = $data.eq(i).find('.name').text();
          const num = $data.eq(i).find('.num').text().replace(/[^0-9]/g, '');
          const before = $data.eq(i).find('.before').text().replace(/[^0-9]/g, '');
          embed.addField(name, `${num}명 (▲${before})`, true);
        }
        
        embed.addField('\u200b', '\u200b', true);
        msg.edit(embed);
      });
      return;
    }

    const loading = new Discord.MessageEmbed()
      .setColor('RED')
      .setTitle('국내 코로나19 전국 발생 동향을 불러오는 중..');
    const msg = await message.channel.send(loading);

    request('http://ncov.mohw.go.kr/', (err, res, html) => {
      const $ = cheerio.load(html);
      // const $data = $('body .wrap.nj .mainlive_container .container div .liveboard_layout .live_left');
      const $data = $('body .wrap.nj .mainlive_container .container div .liveboard_layout');

      // const date = $data.find('h2 .livedate').text().replace(/[()]/g, '');
      const date = $data.find('.liveNumOuter h2 a .livedate').text().replace(/[()]/g, '');

      // const $numData = $data.find('.liveNum .liveNum').children();
      const $numData = $data.find('.liveNumOuter .liveNum .liveNum').children();

      const numData = [];
      const beforeData = [];
      for (let i = 0; i < 4; i++) {
        numData[i] = $numData.eq(i).find('li .num').text().replace(/[^0-9]/g, '');
        beforeData[i] = $numData.eq(i).find('li .before').text().replace(/[^-0-9]/g, '');
        if (beforeData[i] >= 0)
          beforeData[i] = `▲${beforeData[i]}`;
        else beforeData[i] = `▼${-beforeData[i]}`;
      }

      // const $inspectData = $data.find('.liveTest .info_core .suminfo').children();
      const $inspectData = $data.find('.liveToggleOuter div .live_left .liveTest.main_box_toggle .info_core .suminfo').children();
      const inspectData = [];
      for (let i = 0; i < 3; i++) {
        inspectData[i] = $inspectData.eq(i).find('li .num').text().replace(/[^.0-9]/g, '');
      }

      // const inspectMinus = $data.find('.liveTest .chart_d div .numinfo3 .num_rnum').text().split(' ')[0].replace(/[^0-9]/g, '');
      const inspectMinus = $data.find('.liveToggleOuter div .live_left .liveTest.main_box_toggle .chart_d div .numinfo3 .num_rnum').text().split(' ')[0].replace(/[^0-9]/g, '');

      const chartURL = `http://ncov.mohw.go.kr/static/image/main_chart/week_${moment().format('MMDD')}.png`;
      // $data.find('.liveWeek .info_week .box_image');
      
      const embed = new Discord.MessageEmbed()
        .setColor('RED')
        .setTitle('국내 코로나19 전국 발생 동향')
        .setAuthor('Pod', 'https://i.imgur.com/8eJU78T.png')
        .attachFiles(['./images/Avatar_mask.png'])
        .setThumbnail('attachment://Avatar_mask.png')
        .setDescription("베타 기능이므로 불안정할 수 있습니다.")
        .addFields(
          { name: ':drop_of_blood: 확진자', value: `${numData[0]}명 (${beforeData[0]})`, inline: true },
          { name: ':green_heart: 완치자', value: `${numData[1]}명 (${beforeData[1]})`, inline: true },
          { name: ':skull: 사망자', value: `${numData[3]}명 (${beforeData[3]})`, inline: true },
          { name: ':adhesive_bandage: 치료중', value: `${numData[2]}명 (${beforeData[2]})`, inline: true },
          { name: ':syringe: 총 검사 수', value: `${inspectData[0]}명`, inline: true },
          { name: ':ok: 총 검사완료', value: `${inspectData[1]}명`, inline: true },
          { name: ':test_tube: 검사 중', value: `${inspectData[0] - inspectData[1]}명`, inline: true },
          { name: ':white_check_mark: 검사 음성', value: `${inspectMinus}명`, inline: true },
          { name: ':heavy_division_sign: 확진률', value: `${inspectData[2]}%`, inline: true },
        )
        .setImage(chartURL)
        .setFooter(`${date} | 출처: 질병관리본부 코로나19 홈페이지`, 'http://ncov.mohw.go.kr/static/image/header/ROK.png');
      msg.edit(embed);
    });
  },
};