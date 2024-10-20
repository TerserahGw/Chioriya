const fs = require('fs');
const SpeechToText = require('speech-to-text');

async function transcribeAudio(audioFilePath) {
    return new Promise((resolve, reject) => {
        const stt = new SpeechToText();
        const audio = fs.createReadStream(audioFilePath);
        let transcription = '';

        stt.on('data', (data) => {
            transcription += data.transcript;
        });

        stt.on('end', () => {
            resolve(transcription);
        });

        stt.on('error', (err) => {
            reject(err);
        });

        audio.pipe(stt);
    });
}

module.exports = { transcribeAudio };
