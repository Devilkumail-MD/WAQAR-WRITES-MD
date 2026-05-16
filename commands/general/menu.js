/**
 * Menu Command - Display all available commands
 */

const config = require('../../config');
const { loadCommands } = require('../../utils/commandLoader');

// Display order + label/emoji per category
const CATEGORY_ORDER = [
  { key: 'general',    label: '🧭 𝐆𝐄𝐍𝐄𝐑𝐀𝐋' },
  { key: 'ai',         label: '🤖 𝐀𝐈' },
  { key: 'anime',      label: '👾 𝐀𝐍𝐈𝐌𝐄' },
  { key: 'downloader', label: '📥 𝐃𝐎𝐖𝐍𝐋𝐎𝐀𝐃𝐄𝐑' },
  { key: 'fun',        label: '🎉 𝐅𝐔𝐍' },
  { key: 'group',      label: '👥 𝐆𝐑𝐎𝐔𝐏' },
  { key: 'admin',      label: '🛡️ 𝐀𝐃𝐌𝐈𝐍' },
  { key: 'image',      label: '🖼️ 𝐈𝐌𝐀𝐆𝐄' },
  { key: 'info',       label: 'ℹ️ 𝐈𝐍𝐅𝐎' },
  { key: 'media',      label: '🎬 𝐌𝐄𝐃𝐈𝐀' },
  { key: 'owner',      label: '👑 𝐎𝐖𝐍𝐄𝐑' },
  { key: 'public',     label: '🌍 𝐏𝐔𝐁𝐋𝐈𝐂' },
  { key: 'reactions',  label: '💞 𝐑𝐄𝐀𝐂𝐓𝐈𝐎𝐍𝐒' },
  { key: 'search',     label: '🔎 𝐒𝐄𝐀𝐑𝐂𝐇' },
  { key: 'stalk',      label: '🕵️ 𝐒𝐓𝐀𝐋𝐊' },
  { key: 'textmaker',  label: '🖋️ 𝐓𝐄𝐗𝐓𝐌𝐀𝐊𝐄𝐑' },
  { key: 'tools',      label: '🛠️ 𝐓𝐎𝐎𝐋𝐒' },
  { key: 'utility',    label: '🔧 𝐔𝐓𝐈𝐋𝐈𝐓𝐘' },
  { key: 'video',      label: '🎥 𝐕𝐈𝐃𝐄𝐎' },
];

module.exports = {
  name: 'menu',
  aliases: ['help', 'commands'],
  category: 'general',
  description: 'Show all available commands',
  usage: '.menu',

  async execute(sock, msg, args, extra) {
    try {
      const commands = loadCommands();
      const categories = {};

      // Group commands by category (only main names, skip aliases)
      commands.forEach((cmd, name) => {
        if (cmd.name === name) {
          if (!categories[cmd.category]) categories[cmd.category] = [];
          categories[cmd.category].push(cmd);
        }
      });

      // Sort each category alphabetically
      Object.values(categories).forEach(arr => arr.sort((a, b) => a.name.localeCompare(b.name)));

      const ownerNames = Array.isArray(config.ownerName) ? config.ownerName : [config.ownerName];
      const displayOwner = ownerNames[0] || 'Bot Owner';

      const totalUnique = Object.values(categories).reduce((s, a) => s + a.length, 0);

      let menuText = `╭═━『 *${config.botName}* 』━═╮\n\n`;
      menuText += `👋 Hello @${extra.sender.split('@')[0]}!\n\n`;
      menuText += `⚡ Prefix: ${config.prefix}\n`;
      menuText += `📦 Total Commands: ${totalUnique}\n`;
      menuText += `👑 Owner: ${displayOwner}\n\n`;

      // Render configured order first
      const renderedKeys = new Set();
      for (const { key, label } of CATEGORY_ORDER) {
        if (categories[key] && categories[key].length) {
          renderedKeys.add(key);
          menuText += `╔═══━━━─── • ───━━━═══╗\n`;
          menuText += `┃ ${label} 𝐂𝐎𝐌𝐌𝐀𝐍𝐃𝐒\n`;
          menuText += `╚═══━━━─── • ───━━━═══╝\n`;
          for (const cmd of categories[key]) {
            menuText += `│ ➜ ${config.prefix}${cmd.name}\n`;
          }
          menuText += `\n`;
        }
      }

      // Any remaining categories (future-proof)
      for (const key of Object.keys(categories)) {
        if (renderedKeys.has(key)) continue;
        menuText += `╔═══━━━─── • ───━━━═══╗\n`;
        menuText += `┃ 📁 ${key.toUpperCase()} 𝐂𝐎𝐌𝐌𝐀𝐍𝐃𝐒\n`;
        menuText += `╚═══━━━─── • ───━━━═══╝\n`;
        for (const cmd of categories[key]) {
          menuText += `│ ➜ ${config.prefix}${cmd.name}\n`;
        }
        menuText += `\n`;
      }

      menuText += `╰═━════━━════━═╯\n\n`;
      menuText += `💡 Type ${config.prefix}help <command> for more info\n`;
      menuText += `🌟 Bot Version: 2.0.0\n\n`;
      menuText += `𝐏𝐎𝐖𝐄𝐑𝐄𝐃 𝐁𝐘  𝑾𝑨𝑸𝑨𝑹 𝑾𝑹𝑰𝑻𝑬𝑺\n`;

      const fs = require('fs');
      const path = require('path');
      const imagePath = path.join(__dirname, '../../utils/bot_image.jpg');

      if (fs.existsSync(imagePath)) {
        const imageBuffer = fs.readFileSync(imagePath);
        await sock.sendMessage(extra.from, {
          image: imageBuffer,
          caption: menuText,
          mentions: [extra.sender],
          contextInfo: {
            forwardingScore: 1,
            isForwarded: true,
            forwardedNewsletterMessageInfo: {
              newsletterJid: config.newsletterJid || '120363424512151830@newsletter',
              newsletterName: config.botName,
              serverMessageId: -1
            }
          }
        }, { quoted: msg });
      } else {
        await sock.sendMessage(extra.from, {
          text: menuText,
          mentions: [extra.sender]
        }, { quoted: msg });
      }
    } catch (error) {
      console.error('Menu error:', error);
      await extra.reply(`❌ Error: ${error.message}`);
    }
  }
};
