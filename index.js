const express = require('express');
const { TextToSpeechClient } = require('@google-cloud/text-to-speech');
const fs = require('fs');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

// Set up Google Cloud Text-to-Speech client
const client = new TextToSpeechClient({
  d681f3463e5f7a062160fafcff2b44688225fb51: 'tts-backend.json', // Make sure this points to your tts-backend.json file
});

app.get('/', (req, res) => {
  res.send('Welcome to Nepali Text-to-Speech Service!');
});

// Endpoint to convert text to speech
app.get('/speak', async (req, res) => {
  const text = req.query.text;

  if (!text) {
    return res.status(400).send('Please provide text as a query parameter.');
  }

  try {
    // Construct the request
    const request = {
      input: { text: text },
      voice: {
        languageCode: 'ne-NP', // Nepali language code
        ssmlGender: 'NEUTRAL',
      },
      audioConfig: {
        audioEncoding: 'MP3',
      },
    };

    // Perform the text-to-speech request
    const [response] = await client.synthesizeSpeech(request);

    // Send the audio file as a response
    res.set('Content-Type', 'audio/mpeg');
    res.send(response.audioContent);
  } catch (error) {
    console.error('Error during text-to-speech request:', error);
    res.status(500).send('Error during text-to-speech request');
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
