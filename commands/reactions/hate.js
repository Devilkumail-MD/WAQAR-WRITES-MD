// commands/reactions/hate.js
const reaction = require('../../utils/reactionHelper');

module.exports = {
  name: 'hate',
  aliases: [],
  category: 'reactions',
  description: 'Hate reaction',
  usage: '.hate @user',

  async execute(sock, msg, args, extra) {
    return reaction.textAction(sock, msg, extra, {
      lines: ["@me cannot stand @user 💢","@me: \"@user, we are NOT friends.\" 😤","Big yikes — @me hates @user 💢"],
      emoji: "💢",
      requireTarget: true
    });
  }
};
