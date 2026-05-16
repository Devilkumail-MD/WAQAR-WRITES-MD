// commands/reactions/choke.js
const reaction = require('../../utils/reactionHelper');

module.exports = {
  name: 'choke',
  aliases: [],
  category: 'reactions',
  description: 'Choke reaction',
  usage: '.choke @user',

  async execute(sock, msg, args, extra) {
    return reaction.reactionGif(sock, msg, extra, {
      apiAction: "bite",
      fallbackAction: null,
      verbs: ["choked"],
      emoji: "✋",
      requireTarget: true,
      soloMessage: null,
      usage: '.choke @user'
    });
  }
};
