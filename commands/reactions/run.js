// commands/reactions/run.js
const reaction = require('../../utils/reactionHelper');

module.exports = {
  name: 'run',
  aliases: [],
  category: 'reactions',
  description: 'Run reaction',
  usage: '.run',

  async execute(sock, msg, args, extra) {
    return reaction.reactionGif(sock, msg, extra, {
      apiAction: "run",
      fallbackAction: null,
      verbs: ["is running from"],
      emoji: "🏃",
      requireTarget: false,
      soloMessage: "@me is running away 🏃💨",
      usage: '.run'
    });
  }
};
