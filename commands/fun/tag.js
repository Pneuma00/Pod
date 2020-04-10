module.exports = {
  name: 'tag',
  description: '커스텀 태그(명령어)를 설정합니다.\n불안정한 베타 기능이며 자주 초기화될 수 있습니다.',
  aliases: ['tag', '태그'],
  guildOnly: true,
  args: true,
  usage: ['<태그명>', 'add <태그명> [내용]', 'edit <태그명> [새로운 내용]', 'remove <태그명>', 'info <태그명>', 'raw <태그명>', 'list', 'rank', 'reset'],
  async execute(message, args) {
    const option = args.shift();

    if (option === 'add') {
      if (!args.length) return message.reply('추가할 태그의 이름을 입력해주세요.');
      const tagName = args.shift();

      if (!args.length) return message.reply('추가할 태그의 내용을 입력해주세요.');
      const tagDescription = args.join(' ');

      if (await message.client.database.Tags.findOne({ where: { name: tagName, guild_id: message.guild.id } }))
        return message.reply('이미 존재하는 태그입니다.');
      
      try {
        // equivalent to: INSERT INTO tags (name, description, username) values (?, ?, ?);
        const tag = await message.client.database.Tags.create({
          name: tagName,
          description: tagDescription,
          user_id: message.author.id,
          guild_id: message.guild.id,
        });
        return message.reply(`태그 \`${tag.name}\` 가 추가되었습니다.`);
      }
      catch (err) {
        if (err.name === 'SequelizeUniqueConstraintError') {
          return message.reply('이미 존재하는 태그입니다.');
        }
        return message.reply(`태그를 추가하는 도중 오류가 발생했습니다: ${err}`);
      }
    }

    else if (option === 'edit') {
      if (!args.length) return message.reply('수정할 태그의 이름을 입력해주세요.');
      const tagName = args.shift();

      if (!args.length) return message.reply('수정한 태그의 내용을 입력해주세요.');
      const tagDescription = args.join(' ');

      // equivalent to: UPDATE tags (descrption) values (?) WHERE name='?';
      const affectedRows = await message.client.database.Tags.findOne({ where: { name: tagName, guild_id: message.guild.id } });
      if (!affectedRows) return message.reply('존재하지 않는 태그입니다.');

      if (message.author.id !== affectedRows.user_id) {
        return message.reply('해당 태그를 수정할 권한이 없습니다.');
      }
      await affectedRows.update({ description: tagDescription }, { where: { name: tagName, guild_id: message.guild.id } });
      return message.reply(`태그 \`${tagName}\` 가 수정되었습니다.`);
    }

    else if (option === 'info') {
      if (!args.length) return message.reply('정보를 확인하고자 하는 태그의 이름을 입력해주세요.');
      const tagName = args.shift();

      // equivalent to: SELECT * FROM tags WHERE name = 'tagName' LIMIT 1;
      const tag = await message.client.database.Tags.findOne({ where: { name: tagName, guild_id: message.guild.id } });
      if (tag) {
        return message.channel.send(`태그 \`${tagName}\` 는 \`${message.client.users.cache.get(tag.user_id).username}\` 에 의해 \`${tag.createdAt}\` 에 만들어졌고, ${tag.usage_count}번 사용되었습니다.`);
      }
      return message.reply(`\`${tagName}\` 이라는 이름의 태그를 찾을 수 없습니다.`);
    }

    else if (option === 'raw') {
      if (!args.length) return message.reply('내용을 확인할 태그의 이름을 입력해주세요.');
      const tagName = args.shift();

      const tag = await message.client.database.Tags.findOne({ where: { name: tagName, guild_id: message.guild.id } });
      if (!tag) {
        return message.reply('존재하지 않는 태그입니다.');
      }
      return message.reply(`\`\`\`${tag.description}\`\`\``);
    }

    else if (option === 'remove') {
      if (!args.length) return message.reply('삭제할 태그의 이름을 입력해주세요.');
      const tagName = args.shift();

      // equivalent to: DELETE from tags WHERE name = ?;

      const rowCount = await message.client.database.Tags.findOne({ where: { name: tagName, guild_id: message.guild.id } });
      if (!rowCount) return message.reply('존재하지 않는 태그입니다.');
      if (message.author.id !== rowCount.user_id && message.author.id !== message.guild.owner.id && message.author.id !== message.client.config.devID) {
        return message.reply('해당 태그를 삭제할 권한이 없습니다.');
      }
      await rowCount.destroy({ where: { name: tagName } });

      return message.reply('태그가 삭제되었습니다.');
    }

    else if (option === 'list') {
      // equivalent to: SELECT name FROM tags;
      const tagList = await message.client.database.Tags.findAll({ attributes: ['name'], where: { guild_id: message.guild.id } });
      const tagString = tagList.map(t => `\`${t.name}\``).join(' | ') || '생성된 태그가 없습니다.';
      
      return message.channel.send(`생성된 태그 목록:\n${tagString}`);
    }

    else if (option === 'rank') {
      const tagList = await message.client.database.Tags.findAll({ limit: 10, where: { guild_id: message.guild.id }, order: [['usage_count', 'DESC']] });
      
      let rankText = '';
      for (let i = 0; i < 10; i++) {
        if (!tagList[i]) break;
        rankText += `${i + 1}. [${tagList[i].name}](${tagList[i].usage_count}회) - ${message.client.users.cache.get(tagList[i].user_id).username}\n`;
      }

      return message.channel.send(
        rankText ? `\`\`\`markdown\n# 태그 사용 순위 TOP 10\n> [태그명](횟수) - 작성 유저\n${rankText}\`\`\`` : '생성된 태그가 없습니다.');
    }

    else if (option === 'reset') {
      if (message.author.id !== message.client.config.devID) {
        return message.reply('해당 옵션은 개발자 전용 옵션입니다.');
      }

      message.client.database.Tags.sync({ force: true });
      message.reply('태그 데이터베이스가 리셋되었습니다.');
    }

    else {
      const tagName = option;
      // equivalent to: SELECT * FROM tags WHERE name = 'tagName' LIMIT 1;
      if (tagName) {
        const tag = await message.client.database.Tags.findOne({ where: { name: tagName, guild_id: message.guild.id } });
        if (tag) {
          // equivalent to: UPDATE tags SET usage_count = usage_count + 1 WHERE name = 'tagName';
          tag.increment('usage_count');
          const tagResult = tag.get('description')
            .replace(/{user_name}/g, message.author.username)
            .replace(/{user_id}/g, message.author.id)
            .replace(/{user_discriminator}/g, message.author.discriminator)
            .replace(/{channel_id}/g, message.channel.id)
            .replace(/{args;[0-9]+}/g, d => {
              return args[parseInt(d.substring(6, d.length - 1))];
            })
            .replace(/{args;all}/g, args.join(' '))
            .replace(/{args;join;[^]+}/g, d => {
              return args.join(d.substring(11, d.length - 1));
            })
            .replace(/{args;length}/g, args.length);
          return message.channel.send(tagResult, { split: { char: ' ' } });
        }
      }
      return message.reply(`${tagName} 라는 이름의 태그를 찾을 수 없습니다.`);
    }
  },
};