// Required packages: express, cors, axios, dotenv
const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config(); // Load environment variables from .env file

const app = express();
const PORT = 3001; // Change from 3000 to 3001


// Enable CORS and JSON body parsing
app.use(cors());
app.use(express.json());

// Endpoint for chatbot
app.post('/chatbot', async (req, res) => {
    const { message } = req.body;
    const apiKey = process.env.OPENAI_API_KEY; // Ensure this is correct and not undefined

    try {
        console.log('Received message from frontend:', message);

        // Make the OpenAI API request
        const response = await axios.post('https://api.openai.com/v1/chat/completions', {
            model: 'gpt-4o-mini', // Use 'gpt-3.5-turbo' to be safe
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

        console.log('Response from OpenAI:', response.data);

        // Return the AI response to the client
        res.json(response.data.choices[0].message);

    } catch (error) {
        // Detailed logging
        console.error('Error details:', error.response ? error.response.data : error.message);
        res.status(500).json({ error: 'Unable to process your request. Please try again later.' });
    }
});



// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
