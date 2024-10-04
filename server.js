require('dotenv').config();


// Required packages: express, cors, axios
const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config(); // Optional: to store your API key securely in a .env file

const app = express();
const PORT = 3000;

// Enable CORS and JSON body parsing
app.use(cors());
app.use(express.json());

// Endpoint for chatbot
app.post('/chatbot', async (req, res) => {
    const { message } = req.body;
    const apiKey = process.env.OPENAI_API_KEY;

    try {
        // Make the OpenAI API request
        const response = await axios.post('https://api.openai.com/v1/chat/completions', {
            model: 'gpt-4', // or 'gpt-3.5-turbo'
            messages: [
                { role: 'system', content: 'You are a helpful assistant.' },
                { role: 'user', content: message }
            ],
            max_tokens: 150,
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            }
        });

        // Return the AI response to the client
        res.json(response.data.choices[0].message);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Something went wrong');
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
