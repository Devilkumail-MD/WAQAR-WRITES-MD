// commands/reactions/clap2.js
const reaction = require('../../utils/reactionHelper');

module.exports = {
  name: 'clap2',
  aliases: [],
  category: 'reactions',
  description: 'Clap2 reaction',
  usage: '.clap2',

  async execute(sock, msg, args, extra) {
    return reaction.textAction(sock, msg, extra, {
      lines: ["@me👏 claps👏 loudly👏","Standing ovation from @me 👏👏👏","@me applauds dramatically 👏"],
      emoji: "👏",
      requireTarget: false
    });
  }
};
