// commands/reactions/scream.js
const reaction = require('../../utils/reactionHelper');

module.exports = {
  name: 'scream',
  aliases: [],
  category: 'reactions',
  description: 'Scream reaction',
  usage: '.scream',

  async execute(sock, msg, args, extra) {
    return reaction.reactionGif(sock, msg, extra, {
      apiAction: "shoot",
      fallbackAction: null,
      verbs: ["screamed at"],
      emoji: "😱",
      requireTarget: false,
      soloMessage: "@me is screaming 😱",
      usage: '.scream'
    });
  }
};
