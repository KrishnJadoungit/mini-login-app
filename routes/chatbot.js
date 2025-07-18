require('dotenv').config();
const express = require('express');
const axios = require('axios');

const router = express.Router();

router.post('/chatbot', async (req, res) => {
  const { question } = req.body;
  console.log('➡️ Received:', question);

  try {
    const response = await axios.post(
      'https://api.openai.com/v1/completions',
      {
        model: 'gpt-3.5-turbo-instruct',
        prompt: question,
        max_tokens: 150,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const aiAnswer = response.data.choices[0].text.trim();
    res.json({ answer: aiAnswer });
  } catch (error) {
    console.error(error.response ? error.response.data : error.message);
    res.status(500).json({ error: 'AI API error' });
  }
});

module.exports = router;
