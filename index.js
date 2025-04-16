const express = require('express');
const textToSpeech = require('@google-cloud/text-to-speech');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const client = new textToSpeech.TextToSpeechClient({
  keyFilename: 'tts-backend.json'
});

app.post('/speak', async (req, res) => {
  const text = req.body.text;

  const request = {
    input: { text },
    voice: { languageCode: 'ne-NP', ssmlGender: 'FEMALE' },
    audioConfig: { audioEncoding: 'MP3' },
  };

  try {
    const [response] = await client.synthesizeSpeech(request);
    res.set('Content-Type', 'audio/mpeg');
    res.send(response.audioContent);
  } catch (err) {
    console.error('Error:', err);
    res.status(500).send('Something went wrong.');
  }
});

app.listen(5000, () => {
  console.log('✅ Nepali TTS server running on http://localhost:5000');
});
