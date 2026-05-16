// commands/reactions/poke.js
const reaction = require('../../utils/reactionHelper');

module.exports = {
  name: 'poke',
  aliases: [],
  category: 'reactions',
  description: 'Poke reaction',
  usage: '.poke @user',

  async execute(sock, msg, args, extra) {
    return reaction.reactionGif(sock, msg, extra, {
      apiAction: "poke",
      fallbackAction: null,
      verbs: ["poked","prodded"],
      emoji: "👉",
      requireTarget: true,
      soloMessage: null,
      usage: '.poke @user'
    });
  }
};
