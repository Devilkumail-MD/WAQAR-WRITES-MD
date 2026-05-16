// commands/reactions/divorce.js
const reaction = require('../../utils/reactionHelper');

module.exports = {
  name: 'divorce',
  aliases: [],
  category: 'reactions',
  description: 'Divorce reaction',
  usage: '.divorce @user',

  async execute(sock, msg, args, extra) {
    return reaction.textAction(sock, msg, extra, {
      lines: ["@me filed for divorce from @user. So sad… 💔","It's over between @me and @user. 😢","@me said: \"We're done!\" to @user. 💔"],
      emoji: "💔",
      requireTarget: true
    });
  }
};
