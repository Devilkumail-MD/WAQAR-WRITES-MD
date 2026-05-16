const axios = require('axios');
module.exports = {
  name: 'arecommend', aliases: ['animerec'], category: 'anime',
  description: 'Get anime recommendations', usage: '.arecommend',
  async execute(sock, msg, args, extra) {
    try {
      const r = await axios.get('https://api.jikan.moe/v4/recommendations/anime', { timeout:12000 });
      const items = (r.data.data?.[0]?.entry||[]).slice(0,2);
      if (!items.length) return extra.reply('❌ No recommendations.');
      const text = '✨ *Recommendations*\n\n' + items.map((a,i)=>(i+1)+'. '+a.title+'\n   '+a.url).join('\n\n');
      extra.reply(text);
    } catch (e) { extra.reply('❌ ' + e.message); }
  }
};
