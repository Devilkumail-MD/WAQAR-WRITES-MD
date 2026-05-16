// commands/reactions/wink.js
const reaction = require('../../utils/reactionHelper');

module.exports = {
  name: 'wink',
  aliases: [],
  category: 'reactions',
  description: 'Wink reaction',
  usage: '.wink',

  async execute(sock, msg, args, extra) {
    return reaction.reactionGif(sock, msg, extra, {
      apiAction: "wink",
      fallbackAction: null,
      verbs: ["winked at"],
      emoji: "😉",
      requireTarget: false,
      soloMessage: "@me winks 😉",
      usage: '.wink'
    });
  }
};
