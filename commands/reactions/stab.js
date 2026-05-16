// commands/reactions/stab.js
const reaction = require('../../utils/reactionHelper');

module.exports = {
  name: 'stab',
  aliases: [],
  category: 'reactions',
  description: 'Stab reaction',
  usage: '.stab @user',

  async execute(sock, msg, args, extra) {
    return reaction.reactionGif(sock, msg, extra, {
      apiAction: "kill",
      fallbackAction: null,
      verbs: ["stabbed","knifed"],
      emoji: "🗡️",
      requireTarget: true,
      soloMessage: null,
      usage: '.stab @user'
    });
  }
};
