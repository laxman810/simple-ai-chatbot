// index.js
const express = require('express');
const { OpenAI } = require('openai');
const app = express();
const port = process.env.PORT || 3000;

// Set up OpenAI API key (add your key here)
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Make sure to keep your API key secure
});

// Middleware to parse JSON bodies
app.use(express.json());

// Endpoint to interact with GPT-3
app.post('/ask', async (req, res) => {
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
});

// Start the server
app.listen(port, () => {
  console.log(`AI chatbot is running on http://localhost:${port}`);
});
