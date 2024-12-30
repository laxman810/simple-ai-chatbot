// api/ask.js
const { OpenAI } = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

module.exports = async (req, res) => {
  if (req.method === 'POST') {
    const { question } = req.body;

    try {
      const completion = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: question }],
      });

      res.status(200).json({ answer: completion.choices[0].message.content });
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while fetching the response.' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
};
