const axios = require('axios');
module.exports = {
  name: 'gemini', aliases: [], category: 'ai',
  description: 'Ask Google Gemini AI', usage: '.gemini <question>',
  async execute(sock, msg, args, extra) {
    const q = args.join(' ');
    if (!q) return extra.reply('Usage: .gemini <your question>');
    const key = process.env.GEMINI_API_KEY;
    if (!key) return extra.reply('⚠️ Gemini API key not set. Owner: set GEMINI_API_KEY env var.\nGet one free: https://aistudio.google.com/app/apikey');
    try {
      const r = await axios.post(
        'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=' + key,
        { contents: [{ parts: [{ text: q }] }] },
        { timeout: 30000 }
      );
      const text = r.data?.candidates?.[0]?.content?.parts?.[0]?.text || 'No response.';
      extra.reply('🤖 *Gemini:*\n\n' + text);
    } catch (e) { extra.reply('❌ ' + (e.response?.data?.error?.message || e.message)); }
  }
};
