// commands/reactions/roast.js
const reaction = require('../../utils/reactionHelper');

module.exports = {
  name: 'roast',
  aliases: [],
  category: 'reactions',
  description: 'Roast reaction',
  usage: '.roast @user',

  async execute(sock, msg, args, extra) {
    return reaction.textAction(sock, msg, extra, {
      lines: ["@user, your code has more bugs than a forest. 🔥 — @me","@user, you're proof evolution can go in reverse. 😂","@user, even Google says \"did you mean… nothing\"? 💀","@user is the reason shampoo bottles have instructions. 🧴","@user, your secrets are safe with me — I never even listen. 🙃","@user has a face only a mother could block. 📵","@user, you bring everyone so much joy… when you leave. 👋"],
      emoji: "🔥",
      requireTarget: true
    });
  }
};
