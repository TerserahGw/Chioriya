const { createCanvas, loadImage } = require('canvas');
const ffmpeg = require('fluent-ffmpeg');
const fs = require('fs');
const axios = require('axios');
const path = require('path');
const sharp = require('sharp');

const width = 1400;
const height = 800;

async function downloadImage(url, filepath) {
    const response = await axios.get(url, { responseType: 'arraybuffer' });
    fs.writeFileSync(filepath, response.data);
}

async function convertImageToPng(inputPath, outputPath) {
    await sharp(inputPath).toFile(outputPath);
}

function drawStar(ctx, cx, cy, spikes, outerRadius, innerRadius) {
    const step = Math.PI / spikes;
    ctx.beginPath();
    ctx.moveTo(cx, cy - outerRadius);
    for (let i = 0; i < spikes * 2; i++) {
        const angle = i * step;
        const radius = (i % 2 === 0) ? outerRadius : innerRadius;
        ctx.lineTo(cx + Math.cos(angle) * radius, cy + Math.sin(angle) * radius);
    }
    ctx.lineTo(cx, cy - outerRadius);
    ctx.closePath();
    ctx.fillStyle = 'gold';
    ctx.fill();
}

function drawTextWithShadow(ctx, text, x, y) {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
    ctx.font = '50px Arial';
    ctx.fillText(text, x + 2, y + 2);
    ctx.fillStyle = 'white';
    ctx.fillText(text, x, y);
}

async function buatWish(nama, rarity, splashUrl) {
    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext('2d');

    const backgroundUrl = 'https://raw.githubusercontent.com/Mantan21/Genshin-Impact-Wish-Simulator/refs/heads/master/src/images/background/splash-background.webp';
    const tmpDir = path.join(__dirname, '../tmp');
    if (!fs.existsSync(tmpDir)) fs.mkdirSync(tmpDir);

    const backgroundPath = path.join(tmpDir, 'background.webp');
    const splashArtPath = path.join(tmpDir, 'splash_art.webp');
    const backgroundPngPath = path.join(tmpDir, 'background.png');
    const splashArtPngPath = path.join(tmpDir, 'splash_art.png');

    await downloadImage(backgroundUrl, backgroundPath);
    await downloadImage(splashUrl, splashArtPath);

    await convertImageToPng(backgroundPath, backgroundPngPath);
    await convertImageToPng(splashArtPath, splashArtPngPath);

    const background = await loadImage(backgroundPngPath);
    const splashArt = await loadImage(splashArtPngPath);

    const splashArtWidth = width * 1.1; // Menyesuaikan lebar splash
    const splashArtHeight = splashArt.height * (splashArtWidth / splashArt.width);
    const centerX = (width - splashArtWidth) / 2;
    const centerY = (height - splashArtHeight) / 2 + 40;

    let frameCount = 0;

    for (let i = 0; i <= 10; i++) {
        ctx.clearRect(0, 0, width, height);
        ctx.drawImage(background, 0, 0, width, height);
        ctx.globalAlpha = i / 10;
        ctx.drawImage(splashArt, centerX, centerY, splashArtWidth, splashArtHeight);
        fs.writeFileSync(path.join(tmpDir, `frame-${frameCount}.png`), canvas.toBuffer());
        frameCount++;
    }

    const nameX = 50;
    const nameY = height / 2 + 20;

    for (let i = 0; i <= 15; i++) {
        ctx.clearRect(0, 0, width, height);
        ctx.drawImage(background, 0, 0, width, height);
        ctx.drawImage(splashArt, centerX, centerY, splashArtWidth, splashArtHeight);
        drawTextWithShadow(ctx, nama, nameX, nameY);
        ctx.globalAlpha = (i / 15) * 1;
        fs.writeFileSync(path.join(tmpDir, `frame-${frameCount}.png`), canvas.toBuffer());
        frameCount++;
    }

    const starCount = rarity === 'B5' ? 5 : rarity === 'B4' ? 4 : 3;
    const starY = nameY + 40; // Posisi bintang di bawah nama
    const starSpacing = 40; // Jarak antar bintang

    for (let i = 0; i < starCount; i++) {
        ctx.clearRect(0, 0, width, height);
        ctx.drawImage(background, 0, 0, width, height);
        ctx.drawImage(splashArt, centerX, centerY, splashArtWidth, splashArtHeight);
        drawTextWithShadow(ctx, nama, nameX, nameY);
        drawStar(ctx, nameX + 200 + (i * starSpacing), starY, 5, 15, 7); // Ukuran bintang lebih kecil
        ctx.globalAlpha = 1;
        fs.writeFileSync(path.join(tmpDir, `frame-${frameCount}.png`), canvas.toBuffer());
        frameCount++;
        await new Promise(resolve => setTimeout(resolve, 200));
    }

    for (let i = 0; i <= 15; i++) {
        ctx.clearRect(0, 0, width, height);
        ctx.drawImage(background, 0, 0, width, height);
        ctx.drawImage(splashArt, centerX, centerY, splashArtWidth, splashArtHeight);
        drawTextWithShadow(ctx, nama, nameX, nameY);
        for (let j = 0; j < starCount; j++) {
            drawStar(ctx, nameX + 200 + (j * starSpacing), starY, 5, 15, 7);
        }
        ctx.globalAlpha = 1 - (i / 15);
        fs.writeFileSync(path.join(tmpDir, `frame-${frameCount}.png`), canvas.toBuffer());
        frameCount++;
    }

    const frameFiles = fs.readdirSync(tmpDir).filter(file => file.startsWith('frame-') && file.endsWith('.png'));

    if (frameFiles.length > 0) {
        ffmpeg()
            .input(path.join(tmpDir, 'frame-%d.png'))
            .inputOptions('-framerate 30')
            .outputOptions('-pix_fmt yuv420p')
            .on('end', () => {
                console.log('Video selesai dibuat!');
                const files = fs.readdirSync(tmpDir);
                files.forEach(file => {
                    if (file.startsWith('frame-') && file.endsWith('.png')) {
                        fs.unlinkSync(path.join(tmpDir, file));
                    }
                });
            })
            .on('error', (err) => {
                console.error('Terjadi kesalahan: ' + err.message);
            })
            .save(path.join(tmpDir, 'output.mp4'));
    } else {
        console.error('Tidak ada frame yang ditemukan untuk membuat video.');
    }
}

module.exports = { buatWish };
