/**
 * List Command
 * Show all commands with descriptions
 */

const fs = require('fs');
const path = require('path');
const config = require('../../config');
const { loadCommands } = require('../../utils/commandLoader');

// gifted-btns is incompatible with newer Baileys versions; load defensively.
let sendButtons = null;
try { sendButtons = require('gifted-btns').sendButtons; } catch (_) { /* fallback to plain text */ }

module.exports = {
  name: 'list',
  aliases: [],
  description: 'List all commands with descriptions',
  usage: '.list',
  category: 'general',
  
  async execute(sock, msg, args, extra) {
    try {
      const prefix = config.prefix;
      const commands = loadCommands();
      const categories = {};
      
      // Group commands by category
      commands.forEach((cmd, name) => {
        if (cmd.name === name) { // Only count main command names, not aliases
          const category = (cmd.category || 'other').toLowerCase();
          if (!categories[category]) {
            categories[category] = [];
          }
          categories[category].push({
            label: cmd.description || '',
            names: [cmd.name].concat(cmd.aliases || []),
          });
        }
      });
      
      let menu = `*${config.botName} - Commands List*\n`;
      menu += `Prefix: *${prefix}*\n\n`;
      
      const orderedCats = Object.keys(categories).sort();
      
      for (const cat of orderedCats) {
        menu += `*📂 ${cat.toUpperCase()}*\n`;
        for (const entry of categories[cat]) {
          const cmdList = entry.names.map((n) => `${prefix}${n}`).join(', ');
          const label = entry.label || '';
          menu += label ? `• \`${cmdList}\` - ${label}\n` : `• ${cmdList}\n`;
        }
        menu += '\n';
      }
      
      menu = menu.trimEnd();
      
      
      const footer = `\n\n> *Powered by ${config.botName}*`;
      const links =
        `\n\n📺 Youtube: ${config.social?.youtube || 'http://youtube.com/@devilxofficial_hackers'}` +
        `\n💻 Repo: ${config.social?.github || 'coming soon'}` +
        `\n📢 Channel: https://whatsapp.com/channel/0029Vb79zv13mFY8wJw14h1T`;

      // Try gifted-btns first, fall back to plain text if it fails or is missing.
      let sentWithButtons = false;
      if (sendButtons) {
        try {
          await sendButtons(sock, extra.from, {
            title: '',
            text: menu,
            footer: `> *Powered by ${config.botName}*`,
            buttons: [
              { name: 'cta_url', buttonParamsJson: JSON.stringify({ display_text: 'Youtube',         url: config.social?.youtube || 'http://youtube.com/@devilxofficial_hackers' }) },
              { name: 'cta_url', buttonParamsJson: JSON.stringify({ display_text: 'Visit Bot Repo',  url: config.social?.github  || 'coming soon' }) },
              { name: 'cta_url', buttonParamsJson: JSON.stringify({ display_text: 'Join Channel',    url: 'https://whatsapp.com/channel/0029Vb79zv13mFY8wJw14h1T' }) }
            ]
          }, { quoted: msg });
          sentWithButtons = true;
        } catch (btnErr) {
          console.warn('list.js: gifted-btns failed, falling back to plain text:', btnErr.message);
        }
      }
      if (!sentWithButtons) {
        await sock.sendMessage(extra.from, { text: menu + links + footer }, { quoted: msg });
      }
      
    } catch (err) {
      console.error('list.js error:', err);
      await extra.reply('❌ Failed to load commands list.');
    }
  }
};

