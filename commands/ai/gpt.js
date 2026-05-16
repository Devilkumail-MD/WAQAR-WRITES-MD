const axios = require('axios');
module.exports = {
  name: 'gpt', aliases: ['chatgpt'], category: 'ai',
  description: 'Ask ChatGPT (OpenAI)', usage: '.gpt <question>',
  async execute(sock, msg, args, extra) {
    const q = args.join(' ');
    if (!q) return extra.reply('Usage: .gpt <your question>');
    const key = process.env.OPENAI_API_KEY;
    if (key) {
      try {
        const r = await axios.post('https://api.openai.com/v1/chat/completions',
          { model: 'gpt-4o-mini', messages: [{ role:'user', content: q }] },
          { headers: { Authorization: 'Bearer ' + key }, timeout: 30000 }
        );
        return extra.reply('🤖 *GPT:*\n\n' + r.data.choices[0].message.content);
      } catch (e) { /* fall through */ }
    }
    // Free fallback: try a public mirror
    try {
      const r = await axios.post('https://api.binjie.fun/api/generateStream',
        { prompt: q, userId: '#/chat/' + Date.now(), network: true, system: '', withoutContext: false, stream: false },
        { timeout: 30000 }
      );
      extra.reply('🤖 *GPT (free):*\n\n' + (r.data || 'No response.'));
    } catch (e) {
      extra.reply('⚠️ OpenAI key missing and free fallback failed.\nSet OPENAI_API_KEY for reliable use.');
    }
  }
};
