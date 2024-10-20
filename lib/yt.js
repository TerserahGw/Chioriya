const ytdl = require('@distube/ytdl-core');
const ytSearch = require('yt-search');
const fs = require('fs');
const { createAgent } = require('@distube/ytdl-core/lib/utils');
const path = require('path');

const cookies = [
  {
    domain: ".youtube.com",
    expirationDate: 1755771738.439212,
    hostOnly: false,
    httpOnly: false,
    name: "__Secure-1PAPISID",
    path: "/",
    sameSite: "unspecified",
    secure: true,
    session: false,
    value: "6_8gr4h-rhmvubBf/Apvu5zivh3t6lnNQ_"
  }
];

const agentOptions = {
  // Optional agent options
};

const agent = ytdl.createAgent(cookies, agentOptions);

async function ytplay2(query) {
  try {
    const result = await ytSearch(query);
    const videos = result.videos;
    if (videos.length === 0) throw `No videos found for "${query}" :/`;
    const randomIndex = Math.floor(Math.random() * videos.length);
    const videoURL = videos[randomIndex].url;
    const info = await ytdl.getInfo(videoURL, { agent });

    const videoFormat = ytdl.chooseFormat(info.formats, { quality: 'highestvideo' });
    const audioFormat = ytdl.chooseFormat(info.formats, { quality: 'highestaudio' });

    const mediaDir = path.join(__dirname, 'media');
    if (!fs.existsSync(mediaDir)) {
      fs.mkdirSync(mediaDir);
    }

    const videoOutput = path.join(mediaDir, 'video.mp4');
    const audioOutput = path.join(mediaDir, 'audio.mp4');

    // Download video
    ytdl.downloadFromInfo(info, { format: videoFormat, agent })
      .pipe(fs.createWriteStream(videoOutput))
      .on('finish', () => {
        console.log('Video downloaded successfully:', videoOutput);
      })
      .on('error', (err) => {
        console.error('Video download failed:', err);
      });

    // Download audio
    ytdl.downloadFromInfo(info, { format: audioFormat, agent })
      .pipe(fs.createWriteStream(audioOutput))
      .on('finish', () => {
        console.log('Audio downloaded successfully:', audioOutput);
      })
      .on('error', (err) => {
        console.error('Audio download failed:', err);
      });

    return {
      title: info.videoDetails.title,
      thumb: info.videoDetails.thumbnails[0].url,
      urlyt: videoURL,
    };
  } catch (error) {
    throw `Error searching YouTube: ${error.message}`;
  }
}

async function ytdl2(url) {
  try {
    const info = await ytdl.getInfo(url, { agent });
    const videoFormat = ytdl.chooseFormat(info.formats, { quality: 'highestvideo' });
    const audioFormat = ytdl.chooseFormat(info.formats, { quality: 'highestaudio' });

    const mediaDir = path.join(__dirname, 'media');
    if (!fs.existsSync(mediaDir)) {
      fs.mkdirSync(mediaDir);
    }

    const videoOutput = path.join(mediaDir, 'video.mp4');
    const audioOutput = path.join(mediaDir, 'audio.mp4');

    // Download video
    ytdl.downloadFromInfo(info, { format: videoFormat, agent })
      .pipe(fs.createWriteStream(videoOutput))
      .on('finish', () => {
        console.log('Video downloaded successfully:', videoOutput);
      })
      .on('error', (err) => {
        console.error('Video download failed:', err);
      });

    // Download audio
    ytdl.downloadFromInfo(info, { format: audioFormat, agent })
      .pipe(fs.createWriteStream(audioOutput))
      .on('finish', () => {
        console.log('Audio downloaded successfully:', audioOutput);
      })
      .on('error', (err) => {
        console.error('Audio download failed:', err);
      });

    return {
      title: info.videoDetails.title,
      thumb: info.videoDetails.thumbnails[0].url,
      urlyt: url,
    };
  } catch (err) {
    throw `Error fetching video info: ${err.message}`;
  }
}

module.exports = { ytplay2, ytdl2 }
