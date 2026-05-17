/**
 * Global Configuration for WhatsApp MD Bot
 */

module.exports = {
    // Bot Owner Configuration
    ownerNumber: ['923375626980','447520643901'], // Add your number without + or spaces (e.g., 919876543210)
    ownerName: ['𝑾𝑨𝑸𝑨𝑹 𝑾𝑹𝑰𝑻𝑬𝑺 𝑴𝑫', '𝙳𝙴𝚅𝙸𝙻 𝚇'], // Owner names corresponding to ownerNumber array
    
    // Bot Configuration
    botName: '𝑾𝑨𝑸𝑨𝑹 𝑾𝑹𝑰𝑻𝑬𝑺 𝑴𝑫',
    prefix: '.',
    sessionName: 'session',
    sessionID: process.env.SESSION_ID || '',
    sessionGenUrl: process.env.SESSION_GEN_URL || 'https://waqar-writes-md.replit.app/session/', // Default session generator URL
    newsletterJid: '120363424512151830@newsletter', // Newsletter JID for menu forwarding
    updateZipUrl: 'https://github.com', // URL to latest code zip for .update command
    
    // Sticker Configuration
    packname: '𝑾𝑨𝑸𝑨𝑹 𝑾𝑹𝑰𝑻𝑬𝑺 𝑴𝑫',
    
    // Bot Behavior
    selfMode: false, // Private mode - only owner can use commands
    autoRead: false,
    autoTyping: false,
    autoBio: false,
    autoSticker: false,
    autoReact: false,
    autoReactMode: 'bot', // set bot or all via cmd
    autoDownload: false,
    
    // Group Settings Defaults
    defaultGroupSettings: {
      antilink: false,
      antilinkAction: 'delete', // 'delete', 'kick', 'warn'
      antitag: false,
      antitagAction: 'delete',
      antiall: false, // Owner only - blocks all messages from non-admins
      antiviewonce: false,
      antibot: false,
      anticall: false, // Anti-call feature
      antigroupmention: false, // Anti-group mention feature
      antigroupmentionAction: 'delete', // 'delete', 'kick'
      welcome: false,
      welcomeMessage: '𝙒𝙚𝙡𝙘𝙤𝙢𝙚 @user 👋\n\n𝐖𝐞’𝐫𝐞 𝐠𝐥𝐚𝐝 𝐭𝐨 𝐡𝐚𝐯𝐞 𝐲𝐨𝐮 𝐡𝐞𝐫𝐞... ✨\n\n𝒀𝒐𝒖’𝒓𝒆 𝒏𝒐𝒘 𝒑𝒂𝒓𝒕 𝒐𝒇\n𝒔𝒐𝒎𝒆𝒕𝒉𝒊𝒏𝒈 𝒍𝒆𝒈𝒆𝒏𝒅𝒂𝒓𝒚 ☠️\n\n𝕀𝕟𝕛𝕠𝕪 𝕥𝕙𝕖 𝕧𝕚𝕓𝕖𝕤...\n𝕒𝕟𝕕 𝕤𝕥𝕒𝕪 𝕒𝕔𝕥𝕚𝕧𝕖 ⚡\n\nＤｏｎ’ｔ ｂｒｅａｋ ｔｈｅ ｒｕｌｅｓ，\nｊｕｓｔ ｅｎｊｏｙ ｔｈｅ ｃｏｍｍｕｎｉｔｙ 🖤\n\n☠️ 𝙉𝙚𝙬 𝙇𝙚𝙜𝙚𝙣𝙙 𝙃𝙖𝙨 𝘼𝙧𝙧𝙞𝙫𝙚𝙙 ☠️\n\n> ᴘᴏᴡᴇʀᴇᴅ ʙʏ 𝚆𝙰𝚀𝙰𝚁 𝚆𝚁𝙸𝚃𝙀𝚂',
      goodbye: false,
      goodbyeMessage: '𝙂𝙤𝙤𝙙𝙗𝙮𝙚 @user 👋\n\n𝐖𝐞 𝐰𝐢𝐥𝐥 𝐧𝐞𝐯𝐞𝐫 𝐦𝐢𝐬𝐬 𝐲𝐨𝐮... 😈\n\n𝒀𝒐𝒖 𝒘𝒆𝒓𝒆 𝒋𝒖𝒔𝒕 𝒂 𝒄𝒉𝒂𝒑𝒕𝒆𝒓,\n𝒏𝒐𝒕 𝒕𝒉𝒆 𝒔𝒕𝒐𝒓𝒚 ☠️\n\n𝕋𝕙𝕒𝕟𝕜𝕤 𝕗𝕠𝕣 𝕥𝕙𝕖 𝕞𝕖𝕞𝕠𝕣𝕚𝕖𝕤...\n𝕓𝕦𝕥 𝕟𝕠𝕨 𝕚𝕥’𝕤 𝕥𝕚𝕞𝕖 𝕥𝕠 𝕘𝕠 ⚡\n\nＤｏｎ’ｔ ｌｏｏｋ ｂａｃｋ，\nｊｕｓｔ ｄｉｓａｐｐｅａｒ 🖤\n\n☠️ 𝙇𝙚𝙜𝙚𝙣𝙙𝙨 𝙣𝙚𝙫𝙚𝙧 𝙙𝙞𝙚 ☠️\n\n> ᴘᴏᴡᴇʀᴇᴅ ʙʏ 𝚆𝙰𝚀𝙰𝚁 𝚆𝚁𝙸𝚃𝙀𝚂',
      antiSpam: false,
      antidelete: false,
      nsfw: false,
      detect: false,
      chatbot: false,
      autosticker: false // Auto-convert images/videos to stickers
    },
    
    // API Keys (add your own)
    apiKeys: {
      // Add API keys here if needed
      openai: '',
      deepai: '',
      remove_bg: ''
    },
    
    // Message Configuration
    messages: {
      wait: '⏳ Please wait...',
      success: '✅ Success!',
      error: '❌ Error occurred!',
      ownerOnly: '👑 This command is only for bot owner!',
      adminOnly: '🛡️ This command is only for group admins!',
      groupOnly: '👥 This command can only be used in groups!',
      privateOnly: '💬 This command can only be used in private chat!',
      botAdminNeeded: '🤖 Bot needs to be admin to execute this command!',
      invalidCommand: '❓ Invalid command! Type .menu for help'
    },
    
    // Timezone
    timezone: 'Asia/Karachi',
    
    // Limits
    maxWarnings: 3,
    
    // Social Links (optional)
    social: {
      github: 'https://github.com',
      instagram: 'https://instagram.com',
      youtube: 'http://youtube.com/@devilxofficial_hackers'
    }
};
  