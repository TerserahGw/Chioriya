process.on("uncaughtException", console.error);

require("./settings");
const fs = require("fs");
const os = require("os");
const util = require("util");
const jimp = require("jimp");
const path = require("path");
const https = require("https");
const fse = require("fs-extra");
const axios = require("axios");
const chalk = require("chalk");
//const yts = require("yt-search");
//const ytdl = require("ytdl-core");
const cron = require("node-cron");
const cheerio = require("cheerio");
const request = require("request");
const maker = require("mumaker");
const fetch = require("node-fetch");
const FileType = require("file-type");
const { JSDOM } = require("jsdom");
const agent = require("superagent");
const similarity = require("similarity");
const webp = require("node-webpmux");
const ffmpeg = require("fluent-ffmpeg");
const nodemailer = require("nodemailer");
const speed = require("performance-now");
const didYouMean = require("didyoumean");
const { performance } = require("perf_hooks");
const moment = require("moment-timezone");
const Carbon = require("unofficial-carbon-now");
const imageToBase64 = require("image-to-base64");
const { exec, spawn, execSync } = require("child_process");
const smtpTransport = require("nodemailer-smtp-transport");
const { Primbon } = require("scrape-primbon");
const primbon = new Primbon();
const { EmojiAPI } = require("emoji-api");
const emoji = new EmojiAPI();
const PDFDocument = require("pdfkit");
const ytdl = require('@distube/ytdl-core');
const ytSearch = require('yt-search');
const { createAgent } = require('@distube/ytdl-core/lib/utils');
const { PassThrough } = require('stream');
const { WritableStreamBuffer } = require('stream-buffers');
const Spotify = require('./lib/Spotify');
const { getAccessToken, searchSpotify, formatSearchResults } = require('./lib/spotifySearch');
const { translate } = require('@vitalets/google-translate-api');
const acrcloud = require('acrcloud');
const {igdl} = require('ruhend-scraper');
const getGPT4js = require('gpt4js');
const fx = require('@m00nbyte/currency-converter');
const fgsd = require("@fongsidev/scraper");

const {
	BufferJSON,
	WA_DEFAULT_EPHEMERAL,
	generateWAMessageFromContent,
	proto,
	getBinaryNodeChildren,
	generateWAMessageContent,
	generateWAMessage,
	prepareWAMessageMedia,
	areJidsSameUser,
	getContentType,
} = require("@whiskeysockets/baileys");

const prem = require("./src/premium");
const { LoadDataBase } = require("./src/message");
const { TelegraPh, chatBox, UguuSe, webp2mp4File } = require("./lib/uploader");
const { uploadImage } = require("./lib/up2");
const { toAudio, toPTT, toVideo } = require("./lib/converter");
const { imageToWebp, videoToWebp, writeExif } = require("./lib/exif");
const {
	chatGpt,
	aiTranslate,
	tiktokDl,
	facebookDl,
	instaDl,
	instaStory,
} = require("./lib/screaper");
const { ytplay2, ytdl2 } = require("./lib/yt");
const { tiktokDlKei, searchTikTokKei, tiktokSearchKei } = require("./lib/tiktok");
const processing = require("./lib/upscale");
const {
	gameSlot,
	gameCasinoSolo,
	gameMerampok,
	gameTangkapOr,
	daily,
	transferLimit,
	transferUang,
} = require("./lib/game");
const {
	pinterest,
	pinterest2,
	wallpaper,
	wikimedia,
	quotesAnime,
	happymod,
	umma,
	ringtone,
	jadwalsholat,
	styletext,
} = require("./lib/scraper");
const {
	formatp,
	tanggal,
	formatDate,
	getTime,
	isUrl,
	sleep,
	clockString,
	runtime,
	fetchJson,
	getBuffer,
	jsonformat,
	format,
	webApi,
	parseMention,
	generateProfilePicture,
	getRandom,
	getGroupAdmins,
	readFileTxt,
	readFileJson,
	getHashedPassword,
	generateAuthToken,
	generateToken,
	batasiTeks,
	randomText,
	isEmoji,
	getAllHTML,
} = require("./lib/function");
const { ttp, qouted } = require('./lib/qcini');
const { savefrom } = require('@bochilteam/scraper');
const { igDlKei, sswebKei } = require('./lib/keiScrape');
const { instagramKei } = require('./lib/igkei');
const { download } = require('./lib/y2kei');
const { gacha, historyGacha, inventoryGacha, rwdGacha } = require('./lib/gachaSimulator');
const { Telesticker } = require('./lib/telestiker');
const { handlerMath } = require('./lib/exmath');
const { transcribeAudio } = require('./lib/transkrip');
const { TempMail } = require('tempmail.lol');
const { mediafireDl } = require('./lib/mediafire');



const tempmail = new TempMail();

const agentOptions = {
  // Optional agent options
};

const cookiesPath = path.join(__dirname, "lib", "cookies.json");

const agentYT2 = ytdl.createAgent(JSON.parse(fs.readFileSync(cookiesPath)), agentOptions);


// Read Database

const sewa = JSON.parse(fs.readFileSync("./database/sewa.json"));
const premium = JSON.parse(fs.readFileSync("./database/premium.json"));

let giveawayStatus = false;
let giveawayName = '';
let giveawayUser = {};

const acr = new acrcloud({
    host: 'identify-eu-west-1.acrcloud.com',
    access_key: 'c33c767d683f78bd17d4bd4991955d81',
    access_secret: 'bvgaIAEtADBTbLwiPGYlxupWqkNGIjT7J9Ag2vIu'
});

function convertTimeToSeconds(timeString) {
    const timePattern = /((\d+)m)?((\d+)d)?((\d+)md)?/;
    const match = timeString.match(timePattern);
    let seconds = 0;

    if (match) {
        const minutes = parseInt(match[2] || 0);
        const secs = parseInt(match[4] || 0);
        const millis = parseInt(match[6] || 0);

        seconds = minutes * 60 + secs + millis / 1000;
    }

    return seconds;
}

const keilaDBPath = path.join(__dirname, 'database', 'keila.json');
const sfsFilePath = path.join(__dirname, 'lib', 'sfs.json');

function loadKeilaDB() {
  if (fs.existsSync(keilaDBPath)) {
    const fileData = fs.readFileSync(keilaDBPath, 'utf-8');
    return JSON.parse(fileData);
  } else {
    return {};
  }
}

function saveKeilaDB(data) {
  fs.writeFileSync(keilaDBPath, JSON.stringify(data, null, 2));
}

function loadSfsData() {
    if (fs.existsSync(sfsFilePath)) {
        const fileData = fs.readFileSync(sfsFilePath, 'utf-8');
        return JSON.parse(fileData);
    } else {
        return [];
    }
}

function saveSfsData(data) {
    fs.writeFileSync(sfsFilePath, JSON.stringify(data, null, 2));
}

function addToSfsData(name) {
    const sfsData = loadSfsData();
    if (!sfsData.includes(name)) {
        sfsData.push(name);
        saveSfsData(sfsData);
        return `Nama "${name}" telah ditambahkan ke daftar karakter fiksi.`;
    } else {
        return `Nama "${name}" sudah ada dalam daftar.`;
    }
}

function removeFromSfsData(name) {
    let sfsData = loadSfsData();
    if (sfsData.includes(name)) {
        sfsData = sfsData.filter(n => n !== name);
        saveSfsData(sfsData);
        return `Nama "${name}" telah dihapus dari daftar karakter fiksi.`;
    } else {
        return `Nama "${name}" tidak ditemukan dalam daftar.`;
    }
}

function listSfsData() {
    const sfsData = loadSfsData();
    if (sfsData.length === 0) {
        return 'Daftar karakter fiksi kosong.';
    }
    return 'Daftar karakter fiksi:\n' + sfsData.map(name => `- ${name}`).join('\n');
}

const unoDatabasePath = path.join(__dirname, 'database', 'uno_games.json');

// Fungsi untuk membaca data permainan UNO dari file
function readUnoGameData() {
    if (fs.existsSync(unoDatabasePath)) {
        const data = fs.readFileSync(unoDatabasePath);
        return JSON.parse(data);
    }
    return {};
}

// Fungsi untuk menulis data permainan UNO ke file
function writeUnoGameData(data) {
    fs.writeFileSync(unoDatabasePath, JSON.stringify(data, null, 2));
}

const gamesFilePath = path.join(__dirname, 'database', 'games.json');

// Function to read game data from JSON file
function readGamesData() {
    if (!fs.existsSync(gamesFilePath)) {
        fs.writeFileSync(gamesFilePath, JSON.stringify({}));
    }
    const data = fs.readFileSync(gamesFilePath);
    return JSON.parse(data);
}

// Function to write game data to JSON file
function writeGamesData(data) {
    fs.writeFileSync(gamesFilePath, JSON.stringify(data, null, 2));
}

const redeemFilePath = path.join(__dirname, 'database', 'reedem.json');

function loadRedeems() {
    if (!fs.existsSync(redeemFilePath)) {
        fs.writeFileSync(redeemFilePath, JSON.stringify([], null, 2));
    }
    return JSON.parse(fs.readFileSync(redeemFilePath));
};

function saveRedeems(redeems) {
    fs.writeFileSync(redeemFilePath, JSON.stringify(redeems, null, 2));
};

module.exports = keila = async (keila, m, chatUpdate, store) => {
	try {
		const body =
			m.type === "conversation"
				? m.message.conversation
				: m.type == "imageMessage"
				? m.message.imageMessage.caption
				: m.type == "videoMessage"
				? m.message.videoMessage.caption
				: m.type == "extendedTextMessage"
				? m.message.extendedTextMessage.text
				: m.type == "buttonsResponseMessage"
				? m.message.buttonsResponseMessage.selectedButtonId
				: m.type == "listResponseMessage"
				? m.message.listResponseMessage.singleSelectReply.selectedRowId
				: m.type == "templateButtonReplyMessage"
				? m.message.templateButtonReplyMessage.selectedId
				: m.type === "messageContextInfo"
				? m.message.buttonsResponseMessage?.selectedButtonId ||
				  m.message.listResponseMessage?.singleSelectReply
						.selectedRowId ||
				  m.text
				: "";
		const budy = typeof m.text == "string" ? m.text : "";
		const prefix = global.settings.multiprefix
			? ""
			: /[\uD800-\uDBFF][\uDC00-\uDFFF]/gi.test(body)
			? body.match(/[\uD800-\uDBFF][\uDC00-\uDFFF]/gi)[0]
			: /^[°•π÷×¶∆£¢€¥®™+✓_=|~!?@()#,'"*+÷/\%^&.©^]/gi.test(body)
			? body.match(/^[°•π÷×¶∆£¢€¥®™+✓_=|~!?@()#,'"*+÷/\%^&.©^]/gi)[0]
			: ".";
		const isCmd = body.startsWith(prefix);
		const args = body.trim().split(/ +/).slice(1);
		const getQuoted = m.quoted || m;
		const botNumber = await keila.decodeJid(keila.user.id);
		const isCreator = (isOwner = [botNumber, ...global.owner]
			.map(v => v.replace(/[^0-9]/g, "") + "@s.whatsapp.net")
			.includes(m.sender));
		const quoted =
			getQuoted.type == "buttonsMessage"
				? getQuoted[Object.keys(getQuoted)[1]]
				: getQuoted.type == "templateMessage"
				? getQuoted.hydratedTemplate[
						Object.keys(getQuoted.hydratedTemplate)[1]
				  ]
				: getQuoted.type == "product"
				? getQuoted[Object.keys(getQuoted)[0]]
				: m.quoted
				? m.quoted
				: m;
		const command = body.replace(prefix, "").trim().split(/ +/).shift().toLowerCase();

		const text = (q = args.join(" "));
		const mime = (quoted.msg || quoted).mimetype || "";
		const qmsg = quoted.msg || quoted;
		const hari = moment.tz("Asia/Jakarta").locale("id").format("dddd");
		const readmore = '͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏';
		const tanggal = moment
			.tz("Asia/Jakarta")
			.locale("id")
			.format("DD/MM/YYYY");
		const jam = moment().tz("Asia/Jakarta").locale("id").format("HH:mm:ss");
		const ucapanWktu =
			jam < "05:00:00"
				? "Selamat Pagi"
				: jam < "11:00:00"
				? "Selamat Pagi"
				: jam < "15:00:00"
				? "Selamat Siang"
				: jam < "18:00:00"
				? "Selamat Sore"
				: jam < "19:00:00"
				? "Selamat Sore"
				: jam < "23:59:00"
				? "Selamat Malam"
				: "Selamat Malam";
		const ucapanWaktu =
			jam < "05:00:00"
				? "Selamat Pagi 🌉"
				: jam < "11:00:00"
				? "Selamat Pagi 🌄"
				: jam < "15:00:00"
				? "Selamat Siang 🏙"
				: jam < "18:00:00"
				? "Selamat Sore 🌅"
				: jam < "19:00:00"
				? "Selamat Sore 🌃"
				: jam < "23:59:00"
				? "Selamat Malam 🌌"
				: "Selamat Malam 🌌";
		if (m.isGroup) {
			m.metadata = await keila.groupMetadata(m.chat);
			m.admins = m.metadata.participants.reduce(
				(a, b) =>
					(b.admin
						? a.push({
								id: b.id,
								admin: b.admin,
						  })
						: [...a]) && a,
				[],
			);
			m.isAdmin = m.admins.some(b => b.id === m.sender);
			m.participant = m.key.participant;
			m.isBotAdmin = !!m.admins.find(member => member.id === botNumber);
		}
		
		keila.sendMessageToNewsLetter = (jid, content, options = {}) => {
  let messages = {}

  if (content.audio) {
    messages.audioMessage = {
      audio: { url: content.audio.url },
      mimetype: content.mimetype,
      ptt: content.ptt,
      fileLength: content.fileLength
    }
  } else if (content.video) {
    messages.videoMessage = {
      video: { url: content.video.url },
      mimetype: content.mimetype,
      fileLength: content.fileLength
    }
  } else if (content.image) {
    messages.imageMessage = {
      image: { url: content.image.url },
      mimetype: content.mimetype,
      fileLength: content.fileLength
    }
  } else {
    messages.extendedTextMessage = {
      text: content.text || '',
      ...options
    }
  }

  const messageToChannel = proto.Message.encode(messages).finish()
  const result = {
    tag: 'message',
    attrs: { to: jid, type: content.audio ? 'audio' : content.video ? 'video' : content.image ? 'image' : 'text' },
    content: [
      {
        tag: 'plaintext',
        attrs: {},
        content: messageToChannel
      }
    ]
  }

  return keila.query(result)
}


		await LoadDataBase(keila, m);

		const isVip = global.db.users[m.sender]
			? global.db.users[m.sender].vip
			: false;
		const isPremium =
			isCreator || prem.checkPremiumUser(m.sender, premium) || false;
		const isNsfw = m.isGroup ? global.db.groups[m.chat].nsfw : false;

		function pickRandom(list) {
			return list[Math.floor(list.length * Math.random())];
		}

		// Define the functions outside the cases
		function getUserInfo(m, user, isVip, isPremium, language) {
			switch (language) {
				case "ID":
					return `
╭──❍「 *INFO PENGGUNA* 」❍
├ *Nama* : ${m.pushName ? m.pushName : "Tanpa Nama"}
├ *Id* : @${m.sender.split("@")[0]}
├ *Pengguna* : ${isVip ? "VIP" : isPremium ? "PREMIUM" : "GRATIS"}
├ *Limit* : ${isVip ? "VIP" : global.db.users[m.sender].limit}
├ *Uang* : ${user ? user.uang.toLocaleString("id-ID") : "0"}
╰─┬────❍`;
				case "JP":
					return `
╭──❍「 *ユーザー情報* 」❍
├ *名前* : ${m.pushName ? m.pushName : "名前なし"}
├ *Id* : @${m.sender.split("@")[0]}
├ *ユーザー* : ${isVip ? "VIP" : isPremium ? "プレミアム" : "無料"}
├ *制限* : ${isVip ? "VIP" : global.db.users[m.sender].limit}
├ *お金* : ${user ? user.uang.toLocaleString("ja-JP") : "0"}
╰─┬────❍`;
				case "EN":
				default:
					return `
╭──❍「 *USER INFO* 」❍
├ *Name* : ${m.pushName ? m.pushName : "No Name"}
├ *Id* : @${m.sender.split("@")[0]}
├ *User* : ${isVip ? "VIP" : isPremium ? "PREMIUM" : "FREE"}
├ *Limit* : ${isVip ? "VIP" : global.db.users[m.sender].limit}
├ *Money* : ${user ? user.uang.toLocaleString("en-US") : "0"}
╰─┬────❍`;
			}
		}

		function getBotInfo(language) {
			switch (language) {
				case "ID":
					return `
╭─┴─❍「 *INFO BOT* 」❍
├ *Nama Bot* : ${global.botname}
├ *Powered* : @${"6289646942000@s.whatsapp.net".split("@")[0]}
├ *Pemilik* : @${global.owner[0].split("@")[0]}
├ *Mode* : ${keila.public ? "Publik" : "Privat"}
├ *Prefix* :「 MULTI-PREFIX 」
╰─┬────❍`;
				case "JP":
					return `
╭─┴─❍「 *ボット情報* 」❍
├ *ボット名* : ${global.botname}
├ *Powered* : @${"6289646942000@s.whatsapp.net".split("@")[0]}
├ *所有者* : @${global.owner[0].split("@")[0]}
├ *モード* : ${keila.public ? "公開" : "自己"}
├ *プレフィックス* :「 複数のプレフィックス 」
╰─┬────❍`;
				case "EN":
				default:
					return `
╭─┴─❍「 *BOT INFO* 」❍
├ *Bot Name* : ${global.botname}
├ *Powered* : @${"6289646942000@s.whatsapp.net".split("@")[0]}
├ *Owner* : @${global.owner[0].split("@")[0]}
├ *Mode* : ${keila.public ? "Public" : "Self"}
├ *Prefix* :「 MULTI-PREFIX 」
╰─┬────❍`;
			}
		}

		function getAbout(tanggal, hari, jam, language) {
			switch (language) {
				case "ID":
					return `
╭─┴─❍「 *TENTANG* 」❍
├ *Tanggal* : ${tanggal}
├ *Hari* : ${hari}
├ *Jam* : ${jam} WIB
╰──────❍`;
				case "JP":
					return `
╭─┴─❍「 *約* 」❍
├ *日付* : ${tanggal}
├ *曜日* : ${hari}
├ *時間* : ${jam} WIB
╰──────❍`;
				case "EN":
				default:
					return `
╭─┴─❍「 *ABOUT* 」❍
├ *Date* : ${tanggal}
├ *Day* : ${hari}
├ *Time* : ${jam} WIB
╰──────❍`;
			}
		}

		// Fake
		const fkontak = {
			key: {
				remoteJid: "0@s.whatsapp.net",
				participant: "0@s.whatsapp.net",
				fromMe: false,
				id: "Keila",
			},
			message: {
				contactMessage: {
					displayName: m.pushName || global.author,
					vcard: `BEGIN:VCARD\nVERSION:3.0\nN:XL;${
						m.pushName || global.author
					},;;;\nFN:${m.pushName || global.author}\nitem1.TEL;waid=${
						m.sender.split("@")[0]
					}:${
						m.sender.split("@")[0]
					}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`,
					sendEphemeral: true,
				},
			},
		};

		// Reset Limit
		cron.schedule(
			"00 00 * * *",
			() => {
				let user = Object.keys(global.db.users);
				for (let jid of user) {
					const limitUser = global.db.users[jid].vip
						? global.limit.vip
						: prem.checkPremiumUser(jid, premium)
						? global.limit.premium
						: global.limit.free;
					global.db.users[jid].limit = limitUser;
					global.db.users[jid].uang += 80;
					console.log("Reset & Add Reward");
				}
			},
			{
				scheduled: true,
				timezone: "Asia/Jakarta",
			},
		);

		// Auto Set Bio
		if (settings.autobio) {
			if (new Date() * 1 - 0 > 1000) {
				await keila.updateProfileStatus(
					`${keila.user.name} | 🎯 Runtime : ${runtime(
						process.uptime(),
					)}`,
				);
			}
		}

		if (!keila.public) {
			if (!m.key.fromMe) return;
		}

		// Auto Read
		if (m.message) {
			console.log(
				chalk.black.bgWhite("[ PESAN ]:"),
				chalk.black.bgGreen(new Date()),
				chalk.black.bgHex("#00EAD3")(budy || m.type) +
					"\n" +
					chalk.black(
						chalk.bgCyanBright("[ DARI ] :"),
						chalk.bgYellow(m.pushName),
						chalk.bgHex("#FF449F")(m.sender),
						chalk.bgBlue(
							"(" +
								(m.isGroup ? m.pushName : "Private Chat",
								m.chat) +
								")",
						),
					),
			);
			if (settings.autoread) keila.readMessages([m.key]);
		}
	
//Cai Deteksi No Prefix Charname	
if (!m.isGroup) {
    const caiDatabasePath = path.join(__dirname, 'database', 'cai.json');
    let caiDatabase = {};

    if (fs.existsSync(caiDatabasePath)) {
        const fileContent = fs.readFileSync(caiDatabasePath, 'utf8');
        caiDatabase = JSON.parse(fileContent);
    }
    const senderData = caiDatabase[m.sender];
    if (senderData && senderData.activeChar && senderData.setatus) {
        const charData = senderData.data.find(entry => entry.charname === senderData.activeChar);
        if (charData && senderData.setatus) {
            const { charid, chatid } = charData;
            const apiUrl = `https://keilaapi.vercel.app/api/cai?charid=${charid}&message=${encodeURIComponent(m.text)}&id=${chatid}`;
            try {
                const response = await fetch(apiUrl);
                const data = await response.json();
                if (data && data.reply) {
                    await keila.sendMessage(m.chat, { text: `${data.reply}` }, { quoted: m });
                }
            } catch (error) {
                return
            }
        } else {
            m.reply(`Karakter aktif tidak ditemukan dalam data Anda.`);
        }
    }
}


		// Group Settings
		if (m.isGroup) {
			// Mute
			if (db.groups[m.chat].mute && !isCreator) {
				return;
			}

			// Anti Delete
			if (
				m.type == "protocolMessage" &&
				db.groups[m.chat].antidelete &&
				!isCreator &&
				m.isBotAdmin &&
				!m.isAdmin
			) {
				const mess = chatUpdate.messages[0].message.protocolMessage;
				if (
					store.messages &&
					store.messages[m.chat] &&
					store.messages[m.chat].array
				) {
					const chats = store.messages[m.chat].array.find(
						a => a.id === mess.key.id,
					);
					chats.msg.contextInfo = {
						mentionedJid: [chats.key.participant],
						isForwarded: true,
						forwardingScore: 1,
						quotedMessage: {
							conversation: "*Anti Delete❗*",
						},
						...chats.key,
					};
					const pesan =
						chats.type === "conversation"
							? {
									extendedTextMessage: {
										text: chats.msg,
										contextInfo: {
											mentionedJid: [
												chats.key.participant,
											],
											isForwarded: true,
											forwardingScore: 1,
											quotedMessage: {
												conversation: "*Anti Delete❗*",
											},
											...chats.key,
										},
									},
							  }
							: {
									[chats.type]: chats.msg,
							  };
					await keila.relayMessage(m.chat, pesan, {});
				}
			}
			
// Anti-bot
if (
  db.groups[m.chat].antiBot &&
  !isCreator &&
  m.isBotAdmin &&
  !m.isAdmin
) {
  if (
    m.isBaileys
  ) {
    console.log(`Bot terdeteksi: ${m.key.participant}, Pengirim: ${m.sender}`);
    
    await keila.relayMessage(
      m.chat,
      {
        extendedTextMessage: {
          text: "*Bot Lain Terdeteksi*\n\nMaaf Kak Harus Saya Keluarkan, Karena Admin Mengaktifkan Anti Bot :)\n\n`Jika Merasa Bukan Bot Segera Hubungi Admin!`",
          contextInfo: {
            mentionedJid: [m.key.participant],
            isForwarded: true,
            forwardingScore: 1,
            quotedMessage: {
              conversation: "*Anti Bot❗*",
            },
            ...m.key,
          },
        },
      },
      {}
    );

    try {
      await keila.groupParticipantsUpdate(m.chat, [m.key.participant], 'remove');
      console.log(`Bot ${m.key.participant} telah dihapus.`);
    } catch (error) {
      console.error(`Gagal menghapus bot: ${error.message}`);
    }
  }
}


// Cai Detect
if (
    db.groups[m.chat].charai
) {
    const caiDatabasePath = path.join(__dirname, 'database', 'cai.json');
    let caiDatabase = {};

    if (fs.existsSync(caiDatabasePath)) {
        const fileContent = fs.readFileSync(caiDatabasePath, 'utf8');
        caiDatabase = JSON.parse(fileContent);
    }

    const senderData = caiDatabase[m.sender];

    if (senderData && senderData.status && senderData.data.length > 0) {
        const messageParts = m.text.split(' ');
        const charName = messageParts[0].toLowerCase();
        const message = messageParts.slice(1).join(' ');

        const charData = senderData.data.find(entry => entry.charname.toLowerCase() === charName);

        if (charData) {
            const charId = charData.charid;
            const chatId = charData.chatid;

            const apiUrl = `https://keilaapi.vercel.app/api/cai?charid=${charId}&message=${encodeURIComponent(message)}&id=${chatId}`;

            try {
                const response = await fetch(apiUrl);
                const data = await response.json();

                if (data && data.reply) {
                    await keila.relayMessage(
                        m.chat,
                        {
                            extendedTextMessage: {
                                text: `*${data.name}*\n\n${data.reply}`,
                                contextInfo: {
                                    mentionedJid: [m.sender],
                                    isForwarded: true,
                                    forwardingScore: 1,
                                    quotedMessage: {
                                        conversation: "*Chat Cai Response❗*",
                                    },
                                    ...m.key,
                                },
                            },
                        },
                        {}
                    );
                }
            } catch (error) {}
        }
    }
}


			// Anti Link Group
			if (
				db.groups[m.chat].antilink &&
				!isCreator &&
				m.isBotAdmin &&
				!m.isAdmin
			) {
				if (budy.match("chat.whatsapp.com/")) {
					const isGcLink = new RegExp(
						`https://chat.whatsapp.com/${await keila.groupInviteCode(
							m.chat,
						)}`,
						"i",
					).test(m.text);
					if (isGcLink) return;
					await keila.sendMessage(m.chat, {
						delete: {
							remoteJid: m.chat,
							fromMe: false,
							id: m.id,
							participant: m.sender,
						},
					});
					await keila.relayMessage(
						m.chat,
						{
							extendedTextMessage: {
								text: `Terdeteksi @${
									m.sender.split("@")[0]
								} Mengirim Link Group\nMaaf Link Harus Di Hapus..`,
								contextInfo: {
									mentionedJid: [m.key.participant],
									isForwarded: true,
									forwardingScore: 1,
									quotedMessage: {
										conversation: "*Anti Link❗*",
									},
									...m.key,
								},
							},
						},
						{},
					);
				}
			}
		}

		// Mengetik
		if (settings.autotype && isCmd) {
			await keila.sendPresenceUpdate("composing", m.chat);
		}

		// Salam
		if (
			/^a(s|ss)alamu('|)alaikum(| )(wr|)( |)(wb|)$/.test(
				budy?.toLowerCase(),
			)
		) {
			const jwb_salam = [
				"Wa'alaikumusalam",
				"Wa'alaikumusalam wb",
				"Wa'alaikumusalam Warohmatulahi Wabarokatuh",
			];
			m.reply(pickRandom(jwb_salam));
		}

		// Cek Expired
		prem.expiredCheck(keila, premium);

		// TicTacToe
		let room = Object.values(game.tictactoe).find(
			room =>
				room.id &&
				room.game &&
				room.state &&
				room.id.startsWith("tictactoe") &&
				[room.game.playerX, room.game.playerO].includes(m.sender) &&
				room.state == "PLAYING",
		);
		if (room) {
			let ok;
			let isWin = !1;
			let isTie = !1;
			let isSurrender = !1;
			if (!/^([1-9]|(me)?nyerah|surr?ender|off|skip)$/i.test(m.text))
				return;
			isSurrender = !/^[1-9]$/.test(m.text);
			if (m.sender !== room.game.currentTurn) {
				if (!isSurrender) return !0;
			}
			if (
				!isSurrender &&
				1 >
					(ok = room.game.turn(
						m.sender === room.game.playerO,
						parseInt(m.text) - 1,
					))
			) {
				m.reply(
					{
						"-3": "Game telah berakhir",
						"-2": "Invalid",
						"-1": "Posisi Invalid",
						0: "Posisi Invalid",
					}[ok],
				);
				return !0;
			}
			if (m.sender === room.game.winner) isWin = true;
			else if (room.game.board === 511) isTie = true;
			let arr = room.game.render().map(v => {
				return {
					X: "❌",
					O: "⭕",
					1: "1️⃣",
					2: "2️⃣",
					3: "3️⃣",
					4: "4️⃣",
					5: "5️⃣",
					6: "6️⃣",
					7: "7️⃣",
					8: "8️⃣",
					9: "9️⃣",
				}[v];
			});
			if (isSurrender) {
				room.game._currentTurn = m.sender === room.game.playerX;
				isWin = true;
			}
			let winner = isSurrender ? room.game.currentTurn : room.game.winner;
			if (isWin) {
				global.db.users[m.sender].limit += 1;
				global.db.users[m.sender].uang += 160;
			}
			let str = `Room ID: ${room.id}\n\n${arr.slice(0, 3).join("")}\n${arr
				.slice(3, 6)
				.join("")}\n${arr.slice(6).join("")}\n\n${
				isWin
					? `@${winner.split("@")[0]} Menang!`
					: isTie
					? `Game berakhir`
					: `Giliran ${["❌", "⭕"][1 * room.game._currentTurn]} (@${
							room.game.currentTurn.split("@")[0]
					  })`
			}\n❌: @${room.game.playerX.split("@")[0]}\n⭕: @${
				room.game.playerO.split("@")[0]
			}\n\nKetik *nyerah* untuk menyerah dan mengakui kekalahan`;
			if (
				(room.game._currentTurn ^ isSurrender ? room.x : room.o) !==
				m.chat
			)
				room[room.game._currentTurn ^ isSurrender ? "x" : "o"] = m.chat;
			if (room.x !== room.o)
				await keila.sendMessage(
					room.x,
					{
						text: str,
						mentions: parseMention(str),
					},
					{
						quoted: m,
					},
				);
			await keila.sendMessage(
				room.o,
				{
					text: str,
					mentions: parseMention(str),
				},
				{
					quoted: m,
				},
			);
			if (isTie || isWin) {
				delete game.tictactoe[room.id];
			}
		}

		// Suit PvP
		let roof = Object.values(game.suit).find(
			roof =>
				roof.id && roof.status && [roof.p, roof.p2].includes(m.sender),
		);
		if (roof) {
			let win = "";
			let tie = false;
			if (
				m.sender == roof.p2 &&
				/^(acc(ept)?|terima|gas|oke?|tolak|gamau|nanti|ga(k.)?bisa|y)/i.test(
					m.text,
				) &&
				m.isGroup &&
				roof.status == "wait"
			) {
				if (/^(tolak|gamau|nanti|n|ga(k.)?bisa)/i.test(m.text)) {
					m.reply(
						`@${
							roof.p2.split`@`[0]
						} menolak suit,\nsuit dibatalkan`,
					);
					delete game.suit[roof.id];
					return !0;
				}
				roof.status = "play";
				roof.asal = m.chat;
				clearTimeout(roof.waktu);
				m.reply(
					`Suit telah dikirimkan ke chat\n\n@${
						roof.p.split`@`[0]
					} dan @${
						roof.p2.split`@`[0]
					}\n\nSilahkan pilih suit di chat masing-masing klik https://wa.me/${
						botNumber.split`@`[0]
					}`,
				);
				if (!roof.pilih)
					keila.sendMessage(
						roof.p,
						{
							text: `Silahkan pilih \n\nBatu🗿\nKertas📄\nGunting✂️`,
						},
						{
							quoted: m,
						},
					);
				if (!roof.pilih2)
					keila.sendMessage(
						roof.p2,
						{
							text: `Silahkan pilih \n\nBatu🗿\nKertas📄\nGunting✂️`,
						},
						{
							quoted: m,
						},
					);
				roof.waktu_milih = setTimeout(() => {
					if (!roof.pilih && !roof.pilih2)
						m.reply(
							`Kedua pemain tidak niat main,\nSuit dibatalkan`,
						);
					else if (!roof.pilih || !roof.pilih2) {
						win = !roof.pilih ? roof.p2 : roof.p;
						m.reply(
							`@${
								(roof.pilih ? roof.p2 : roof.p).split`@`[0]
							} tidak memilih suit, game berakhir`,
						);
					}
					delete game.suit[roof.id];
					return !0;
				}, roof.timeout);
			}
			let jwb = m.sender == roof.p;
			let jwb2 = m.sender == roof.p2;
			let g = /gunting/i;
			let b = /batu/i;
			let k = /kertas/i;
			let reg = /^(gunting|batu|kertas)/i;

			if (jwb && reg.test(m.text) && !roof.pilih && !m.isGroup) {
				roof.pilih = reg.exec(m.text.toLowerCase())[0];
				roof.text = m.text;
				m.reply(
					`Kamu telah memilih ${m.text} ${
						!roof.pilih2 ? `\n\nMenunggu lawan memilih` : ""
					}`,
				);
				if (!roof.pilih2)
					keila.sendMessage(roof.p2, {
						text: "_Lawan sudah memilih_\nSekarang giliran kamu",
					});
			}
			if (jwb2 && reg.test(m.text) && !roof.pilih2 && !m.isGroup) {
				roof.pilih2 = reg.exec(m.text.toLowerCase())[0];
				roof.text2 = m.text;
				m.reply(
					`Kamu telah memilih ${m.text} ${
						!roof.pilih ? `\n\nMenunggu lawan memilih` : ""
					}`,
				);
				if (!roof.pilih)
					keila.sendMessage(roof.p, {
						text: "_Lawan sudah memilih_\nSekarang giliran kamu",
					});
			}
			let stage = roof.pilih;
			let stage2 = roof.pilih2;
			if (roof.pilih && roof.pilih2) {
				clearTimeout(roof.waktu_milih);
				if (b.test(stage) && g.test(stage2)) win = roof.p;
				else if (b.test(stage) && k.test(stage2)) win = roof.p2;
				else if (g.test(stage) && k.test(stage2)) win = roof.p;
				else if (g.test(stage) && b.test(stage2)) win = roof.p2;
				else if (k.test(stage) && b.test(stage2)) win = roof.p;
				else if (k.test(stage) && g.test(stage2)) win = roof.p2;
				else if (stage == stage2) tie = true;
				global.db.users[roof.p == win ? roof.p : roof.p2].limit += tie
					? 0
					: 3;
				global.db.users[roof.p == win ? roof.p : roof.p2].uang += tie
					? 0
					: 3000;
				keila.sendMessage(
					roof.asal,
					{
						text: `_*Hasil Suit*_${tie ? "\nSERI" : ""}\n\n@${
							roof.p.split`@`[0]
						} (${roof.text}) ${
							tie
								? ""
								: roof.p == win
								? ` Menang \n`
								: ` Kalah \n`
						}\n@${roof.p2.split`@`[0]} (${roof.text2}) ${
							tie
								? ""
								: roof.p2 == win
								? ` Menang \n`
								: ` Kalah \n`
						}\n\nPemenang Mendapatkan\n*Hadiah :* Primogems(100) & Stamina(1)`.trim(),
						mentions: [roof.p, roof.p2],
					},
					{
						quoted: m,
					},
				);
				delete game.suit[roof.id];
			}
		}

		// Tebak Bomb
		let pilih = "🌀",
			bomb = "💣";
		if (m.sender in game.tebakbom) {
			if (!/^[1-9]|10$/i.test(body) && !isCmd && !isCreator) return !0;
			if (game.tebakbom[m.sender].petak[parseInt(body) - 1] === 1)
				return !0;
			if (game.tebakbom[m.sender].petak[parseInt(body) - 1] === 2) {
				game.tebakbom[m.sender].board[parseInt(body) - 1] = bomb;
				game.tebakbom[m.sender].pick++;
				keila.sendMessage(m.chat, {
					react: {
						text: "❌",
						key: m.key,
					},
				});
				game.tebakbom[m.sender].bomb--;
				game.tebakbom[m.sender].nyawa.pop();
				let brd = game.tebakbom[m.sender].board;
				if (game.tebakbom[m.sender].nyawa.length < 1) {
					global.db.users[m.sender].limit -= 1;
					await m.reply(
						`*GAME TELAH BERAKHIR*\nKamu terkena bomb\n\n ${brd.join(
							"",
						)}\n\n*Terpilih :* ${
							game.tebakbom[m.sender].pick
						}\n_Pengurangan Limit : 1_`,
					);
					keila.sendMessage(m.chat, {
						react: {
							text: "😂",
							key: m.key,
						},
					});
					delete game.tebakbom[m.sender];
				} else
					await m.reply(
						`*PILIH ANGKA*\n\nKamu terkena bomb\n ${brd.join(
							"",
						)}\n\nTerpilih: ${
							game.tebakbom[m.sender].pick
						}\nSisa nyawa: ${game.tebakbom[m.sender].nyawa}`,
					);
				return !0;
			}
			if (game.tebakbom[m.sender].petak[parseInt(body) - 1] === 0) {
				game.tebakbom[m.sender].petak[parseInt(body) - 1] = 1;
				game.tebakbom[m.sender].board[parseInt(body) - 1] = pilih;
				game.tebakbom[m.sender].pick++;
				game.tebakbom[m.sender].lolos--;
				let brd = game.tebakbom[m.sender].board;
				if (game.tebakbom[m.sender].lolos < 1) {
					global.db.users[m.sender].limit += 3;
					global.db.users[m.sender].uang += 3000;
					await m.reply(
						`*KAMU HEBAT ಠ⁠ᴥ⁠ಠ*\n\n${brd.join(
							"",
						)}\n\n*Terpilih :* ${
							game.tebakbom[m.sender].pick
						}\n*Sisa nyawa :* ${
							game.tebakbom[m.sender].nyawa
						}\n*Bomb :* ${
							game.tebakbom[m.sender].bomb
						}\n*Hadiah :* Uang(3000) & Limit(3)`,
					);
					delete game.tebakbom[m.sender];
				} else
					m.reply(
						`*PILIH ANGKA*\n\n${brd.join("")}\n\nTerpilih : ${
							game.tebakbom[m.sender].pick
						}\nSisa nyawa : ${
							game.tebakbom[m.sender].nyawa
						}\nBomb : ${game.tebakbom[m.sender].bomb}`,
					);
			}
		}

		// Math
if (game.kuismath.hasOwnProperty(m.sender.split("@")[0])) {
    kuis = true;
    jawaban = game.kuismath[m.sender.split("@")[0]].jawaban;
    const rewardMap = {
        noob: { stamina: 1, primogems: 5 },
        veasy: { stamina: 5, primogems: 20 },
        easy: { stamina: 10, primogems: 40 },
        normal: { stamina: 20, primogems: 80 },
        hard: { stamina: 30, primogems: 160 },
        pro: { stamina: 40, primogems: 250 },
        ex: { stamina: 50, primogems: 500 },
    };

    let hasilReward = rewardMap[game.kuismath[m.sender.split("@")[0]].mode];
    if (budy.toLowerCase() == jawaban) {
        global.db.users[m.sender].limit += hasilReward.stamina;
        global.db.users[m.sender].uang += hasilReward.primogems;
        await m.keila(
            `🎮 Kuis Matematika 🎮\n\nJawaban Benar 🎉\nKamu Mendapat Stamina *${hasilReward.stamina}* dan Primogems *${hasilReward.primogems}*\n\nIngin bermain lagi? kirim ${prefix}math mode`,
        );
        delete game.kuismath[m.sender.split("@")[0]];
    } else m.reply("*Jawaban Salah!*");
}

//Quiz
if (game.kuisquiz.hasOwnProperty(m.sender.split("@")[0])) {
    const { jawaban, clue } = game.kuisquiz[m.sender.split("@")[0]];

    if (budy.toLowerCase() === 'clue') {
        const randomClue = clue[Math.floor(Math.random() * clue.length)];
        return m.reply(`Clue: ${randomClue}`);
    }

    const userAnswer = budy.toLowerCase();
    const correctAnswer = jawaban.toLowerCase();
    const userAnswerWords = userAnswer.split(" ");
    const correctAnswerWords = correctAnswer.split(" ");
    const matchingWords = userAnswerWords.filter(word => correctAnswerWords.includes(word));
    const matchPercentage = (matchingWords.length / correctAnswerWords.length) * 100;

    if (matchPercentage >= 50) {
        global.db.users[m.sender].limit += 1;
        global.db.users[m.sender].uang += 15;

        await m.keila(
            `🎉 Jawaban benar! 🎉\n\nJawaban: \`${jawaban}\`\nKamu mendapatkan *1 Stamina* dan *15 Primogems*\n\nIngin bermain lagi? Ketik ${prefix}quiz`
        );

        delete game.kuisquiz[m.sender.split("@")[0]];
    } else if (userAnswer !== 'clue') {
        m.reply("Jawaban salah!");
    }
}


		// Menfes
		if (!m.isGroup) {
			if (
				game.menfes[m.sender] &&
				m.key.remoteJid !== "status@broadcast"
			) {
				if (!/^del(menfe(s|ss)|confe(s|ss))$/i.test(command)) {
					m.msg.contextInfo = {
						isForwarded: true,
						forwardingScore: 1,
						quotedMessage: {
							conversation: `*Pesan Dari ${
								game.menfes[m.sender].nama
									? game.menfes[m.sender].nama
									: "Seseorang"
							}*`,
						},
						key: {
							remoteJid: "0@s.whatsapp.net",
							fromMe: false,
							participant: "0@s.whatsapp.net",
						},
					};
					const pesan =
						m.type === "conversation"
							? {
									extendedTextMessage: {
										text: m.msg,
										contextInfo: {
											isForwarded: true,
											forwardingScore: 1,
											quotedMessage: {
												conversation: `*Pesan Dari ${
													game.menfes[m.sender].nama
														? game.menfes[m.sender]
																.nama
														: "Seseorang"
												}*`,
											},
											key: {
												remoteJid: "0@s.whatsapp.net",
												fromMe: false,
												participant: "0@s.whatsapp.net",
											},
										},
									},
							  }
							: {
									[m.type]: m.msg,
							  };
					await keila.relayMessage(
						game.menfes[m.sender].tujuan,
						pesan,
						{},
					);
				}
			}
		}

		// Afk
		let mentionUser = [
			...new Set([
				...(m.mentionedJid || []),
				...(m.quoted ? [m.quoted.sender] : []),
			]),
		];
		for (let jid of mentionUser) {
			let user = global.db.users[jid];
			if (!user) continue;
			let afkTime = user.afkTime;
			if (!afkTime || afkTime < 0) continue;
			let reason = user.afkReason || "";
			m.reply(
				`Jangan tag dia!\nDia sedang AFK ${
					reason ? "dengan alasan " + reason : "tanpa alasan"
				}\nSelama ${clockString(new Date() - afkTime)}`.trim(),
			);
		}
		if (global.db.users[m.sender].afkTime > -1) {
			let user = global.db.users[m.sender];
			m.reply(
				`@${m.sender.split("@")[0]} berhenti AFK${
					user.afkReason ? " setelah " + user.afkReason : ""
				}\nSelama ${clockString(new Date() - user.afkTime)}`,
			);
			user.afkTime = -1;
			user.afkReason = "";
		}

		switch (command) {
			// Owner Menu
			case "mode":
				{
					if (!isCreator) return m.reply(mess.owner);
					if (text === "public") {
						if (keila.public)
							return m.reply("*Sudah Aktif Sebelumnya*");
						keila.public = true;
						m.reply("*Sukse Change To Public Usage*");
					} else if (text === "self") {
						keila.public = false;
						m.reply("*Sukse Change To Self Usage*");
					} else {
						let buttonnya = [
							{
								name: "single_select",
								buttonParamsJson: {
									title: "Pilih",
									sections: [
										{
											title: "Mode Bot",
											rows: [
												{
													title: "Mode Public",
													description:
														"Mengaktifkan Mode Public",
													id: "mode public",
												},
												{
													title: "Mode Self",
													description:
														"Mengubah Ke Mode Self",
													id: "mode self",
												},
											],
										},
									],
								},
							},
						];
						await keila.sendButtonMsg(
							m.chat,
							"Mode Bot",
							ucapanWaktu,
							"Silahkan dipilih Owner🫡",
							null,
							buttonnya,
							m,
						);
					}
				}
				break;
			case "setbio":
				{
					if (!isCreator) return m.reply(mess.owner);
					if (!text) return m.reply("Mana text nya?");
					keila.setStatus(q);
					m.reply(`*Bio telah di ganti menjadi ${q}*`);
				}
				break;
			case "setppbot":
				{
					if (!isCreator) return m.reply(mess.owner);
					if (!/image/.test(mime))
						return m.reply(
							`Reply Image Dengan Caption ${prefix + command}`,
						);
					let media = await keila.downloadAndSaveMediaMessage(
						quoted,
						"ppbot.jpeg",
					);
					if (text.length > 0) {
						let { img } = await generateProfilePicture(media);
						await keila.query({
							tag: "iq",
							attrs: {
								to: botNumber,
								type: "set",
								xmlns: "w:profile:picture",
							},
							content: [
								{
									tag: "picture",
									attrs: {
										type: "image",
									},
									content: img,
								},
							],
						});
						await fs.unlinkSync(media);
						m.reply("Sukses");
					} else {
						await keila.updateProfilePicture(botNumber, {
							url: media,
						});
						await fs.unlinkSync(media);
						m.reply("Sukses");
					}
				}
				break;
			case "join":
				{
					if (!isCreator) return m.reply(mess.owner);
					if (!text) return m.reply("Masukkan Link Group!");
					if (!isUrl(args[0]) && !args[0].includes("whatsapp.com"))
						return m.reply("Link Invalid!");
					const result = args[0].split(
						"https://chat.whatsapp.com/",
					)[1];
					m.loading();
					await keila.groupAcceptInvite(result).catch(res => {
						if (res.data == 400)
							return m.reply("Grup Tidak Di Temukan❗");
						if (res.data == 401)
							return m.reply("Bot Di Kick Dari Grup Tersebut❗");
						if (res.data == 409)
							return m.reply("Bot Sudah Join Di Grup Tersebut❗");
						if (res.data == 410)
							return m.reply("Url Grup Telah Di Setel Ulang❗");
						if (res.data == 500) return m.reply("Grup Penuh❗");
					});
				}
				break;
			case "leave":
				{
					if (!isCreator) return m.reply(mess.owner);
					await keila.groupLeave(m.chat).then(() =>
						keila.sendFromOwner(
							global.owner,
							"Sukses Keluar Dari Grup",
							m,
							{
								contextInfo: {
									isForwarded: true,
								},
							},
						),
					);
				}
				break;
			case "blokir":
			case "block":
				{
					if (!isCreator) return m.reply(mess.owner);
					if (!text && !m.quoted) {
						m.reply(`Contoh: ${prefix + command} 62xxx`);
					} else {
						const numbersOnly = m.isGroup
							? text
								? text.replace(/\D/g, "") + "@s.whatsapp.net"
								: m.quoted?.sender
							: m.chat;
						await keila
							.updateBlockStatus(numbersOnly, "block")
							.then(a => m.reply(mess.done))
							.catch(err => m.reply("Gagal!"));
					}
				}
				break;
			case "openblokir":
			case "unblokir":
			case "openblock":
			case "unblock":
				{
					if (!isCreator) return m.reply(mess.owner);
					if (!text && !m.quoted) {
						m.reply(`Contoh: ${prefix + command} 62xxx`);
					} else {
						const numbersOnly = m.isGroup
							? text
								? text.replace(/\D/g, "") + "@s.whatsapp.net"
								: m.quoted?.sender
							: m.chat;
						await keila
							.updateBlockStatus(numbersOnly, "unblock")
							.then(a => m.reply(mess.done))
							.catch(err => m.reply("Gagal!"));
					}
				}
				break;
			case "listpc":
				{
					if (!isCreator) return m.reply(mess.owner);
					let anu = await store.chats
						.all()
						.filter(v => v.id.endsWith(".net"))
						.map(v => v.id);
					let teks = `⬣ *LIST PERSONAL CHAT*\n\nTotal Chat : ${anu.length} Chat\n\n`;
					for (let i of anu) {
						let nama = store.messages[i].array[0].pushName;
						teks += `⬡ *Nama :* ${nama}\n⬡ *User :* @${
							i.split("@")[0]
						}\n⬡ *Chat :* https://wa.me/${
							i.split("@")[0]
						}\n\n=====================\n\n`;
					}
					keila.sendTextMentions(m.chat, teks, m);
				}
				break;
			case "listgc":
				{
					if (!isCreator) return m.reply(mess.owner);
					let anu = await store.chats
						.all()
						.filter(v => v.id.endsWith("@g.us"))
						.map(v => v.id);
					let teks = `⬣ *LIST GROUP CHAT*\n\nTotal Group : ${anu.length} Group\n\n`;
					for (let i of anu) {
						let metadata = await keila.groupMetadata(i);
						teks += `⬡ *Nama :* ${metadata.subject}\n⬡ *Admin :* ${
							metadata.owner
								? `@${metadata.owner.split("@")[0]}`
								: "-"
						}\n⬡ *ID :* ${metadata.id}\n⬡ *Dibuat :* ${moment(
							metadata.creation * 1000,
						)
							.tz("Asia/Jakarta")
							.format("DD/MM/YYYY HH:mm:ss")}\n⬡ *Member :* ${
							metadata.participants.length
						}\n\n=====================\n\n`;
					}
					keila.sendTextMentions(m.chat, teks, m);
				}
				break;
			case "creategc":
			case "buatgc":
				{
					if (!isCreator) return m.reply(mess.owner);
					if (!text)
						return m.keila(
							`Example:\n${prefix + command} *Nama Gc*`,
						);
					let group = await keila.groupCreate(q, [m.sender]);
					let res = await keila.groupInviteCode(group.id);
					await keila.sendMessage(
						m.chat,
						{
							text: `*Link Group :* *https://chat.whatsapp.com/${res}*\n\n*Nama Group :* *${q}*`,
							detectLink: true,
						},
						{
							quoted: m,
						},
					);
					await keila.groupParticipantsUpdate(
						group.id,
						[m.sender],
						"promote",
					);
					await keila.sendMessage(group.id, {
						text: "Done",
					});
				}
				break;
			case "addpr":
			case "addprem":
			case "addpremium":
				{
					if (!isCreator) return m.reply(mess.owner);
					if (!text)
						return m.keila(
							`Example:\n${prefix + command} @tag|waktu(s/m/h/d)`,
						);
					let [teks1, teks2] = text.split`|`;
					const nmrnya =
						teks1.replace(/[^0-9]/g, "") + "@s.whatsapp.net";
					const onWa = await keila.onWhatsApp(nmrnya);
					if (!onWa.length > 0)
						return m.reply(
							"Nomer Tersebut Tidak Terdaftar Di Whatsapp!",
						);
					if (teks2) {
						prem.addPremiumUser(nmrnya, teks2, premium);
						m.reply(
							`Sukses ${command} @${
								nmrnya.split("@")[0]
							} Selama ${teks2}`,
						);
						global.db.users[nmrnya].limit = global.db.users[nmrnya]
							.vip
							? global.limit.vip
							: global.limit.premium;
						global.db.users[nmrnya].uang = global.db.users[nmrnya]
							.vip
							? global.uang.vip
							: global.uang.premium;
					} else {
						m.reply(
							`Masukkan waktunya!\nExample: ${
								prefix + command
							} @tag|waktu`,
						);
					}
				}
				break;
			case "delpr":
			case "delprem":
			case "delpremium":
				{
					if (!isCreator) return m.reply(mess.owner);
					if (!text)
						return m.keila(`Example:\n${prefix + command} @tag`);
					const nmrnya =
						text.replace(/[^0-9]/g, "") + "@s.whatsapp.net";
					if (prem.checkPremiumUser(nmrnya, premium)) {
						premium.splice(
							prem.getPremiumPosition(nmrnya, premium),
							1,
						);
						fs.writeFileSync(
							"./database/premium.json",
							JSON.stringify(premium),
						);
						m.reply(`Sukses ${command} @${nmrnya.split("@")[0]}`);
						global.db.users[nmrnya].limit = global.db.users[nmrnya]
							.vip
							? global.limit.vip
							: global.limit.free;
						global.db.users[nmrnya].uang = global.db.users[nmrnya]
							.vip
							? global.uang.vip
							: global.uang.free;
					} else {
						m.reply(
							`User @${nmrnya.split("@")[0]} Bukan Premium❗`,
						);
					}
				}
				break;
			case "listpr":
			case "listprem":
			case "listpremium":
				{
					if (!isCreator) return m.reply(mess.owner);
					let txt = `*------「 LIST PREMIUM 」------*\n\n`;
					for (let userprem of premium) {
						txt += `➸ *Nomer*: @${
							userprem.id.split("@")[0]
						}\n➸ *Limit*: ${
							global.db.users[userprem.id].limit
						}\n➸ *Uang*: ${global.db.users[
							userprem.id
						].uang.toLocaleString(
							"id-ID",
						)}\n➸ *Expired*: ${formatDate(userprem.expired)}\n\n`;
					}
					m.reply(txt);
				}
				break;

			// Group Menu
			
			case "add":
				{
					if (!m.isGroup) return m.reply(mess.group);
					if (!m.isAdmin) return m.reply(mess.admin);
					if (!m.isBotAdmin) return m.reply(mess.botAdmin);
					if (!text && !m.quoted) {
						m.keila(`Contoh: ${prefix + command} 62xxx`);
					} else {
						const numbersOnly = text
							? text.replace(/\D/g, "") + "@s.whatsapp.net"
							: m.quoted?.sender;
						try {
							await keila
								.groupParticipantsUpdate(
									m.chat,
									[numbersOnly],
									"add",
								)
								.then(async res => {
									for (let i of res) {
										let invv = await keila.groupInviteCode(
											m.chat,
										);
										if (i.status == 408)
											return m.reply(
												"Dia Baru-Baru Saja Keluar Dari Grub Ini!",
											);
										if (i.status == 401)
											return m.reply(
												"Dia Memblokir Bot!",
											);
										if (i.status == 409)
											return m.reply("Dia Sudah Join!");
										if (i.status == 500)
											return m.reply("Grub Penuh!");
										if (i.status == 403) {
											await keila.sendMessage(
												m.chat,
												{
													text: `@${
														numbersOnly.split(
															"@",
														)[0]
													} Tidak Dapat Ditambahkan\n\nKarena Target Private\n\nUndangan Akan Dikirimkan Ke\n-> wa.me/${numbersOnly.replace(
														/\D/g,
														"",
													)}\nMelalui Jalur Pribadi`,
													mentions: [numbersOnly],
												},
												{
													quoted: m,
												},
											);
											await keila
												.sendMessage(
													`${
														numbersOnly
															? numbersOnly
															: "6282113821188@s.whatsapp.net"
													}`,
													{
														text: `${
															"https://chat.whatsapp.com/" +
															invv
														}\n------------------------------------------------------\n\nAdmin: wa.me/${
															m.sender
														}\nMengundang anda ke group ini\nSilahkan masuk jika berkehendak🙇`,
														detectLink: true,
														mentions: [numbersOnly],
													},
													{
														quoted: floc2,
													},
												)
												.catch(err =>
													m.reply(
														"Gagal Mengirim Undangan!",
													),
												);
										} else {
											m.reply("Gagal Add User");
										}
									}
								});
						} catch (e) {
							m.reply("Gagal Add User");
						}
					}
				}
				break;
			case "kick":
				{
					if (!m.isGroup) return m.reply(mess.group);
					if (!m.isAdmin) return m.reply(mess.admin);
					if (!m.isBotAdmin) return m.reply(mess.botAdmin);
					if (!text && !m.quoted) {
						m.keila(`Contoh: ${prefix + command} 62xxx`);
					} else {
						const numbersOnly = text
							? text.replace(/\D/g, "") + "@s.whatsapp.net"
							: m.quoted?.sender;
						await keila
							.groupParticipantsUpdate(
								m.chat,
								[numbersOnly],
								"remove",
							)
							.catch(err => m.reply("Gagal Kick User!"));
					}
				}
				break;
			case "promote":
				{
					if (!m.isGroup) return m.reply(mess.group);
					if (!m.isAdmin) return m.reply(mess.admin);
					if (!m.isBotAdmin) return m.reply(mess.botAdmin);
					if (!text && !m.quoted) {
						m.keila(`Contoh: ${prefix + command} 62xxx`);
					} else {
						const numbersOnly = text
							? text.replace(/\D/g, "") + "@s.whatsapp.net"
							: m.quoted?.sender;
						await keila
							.groupParticipantsUpdate(
								m.chat,
								[numbersOnly],
								"promote",
							)
							.catch(err => m.reply("Gagal!"));
					}
				}
				break;
			case "demote":
				{
					if (!m.isGroup) return m.reply(mess.group);
					if (!m.isAdmin) return m.reply(mess.admin);
					if (!m.isBotAdmin) return m.reply(mess.botAdmin);
					if (!text && !m.quoted) {
						m.keila(`Contoh: ${prefix + command} 62xxx`);
					} else {
						const numbersOnly = text
							? text.replace(/\D/g, "") + "@s.whatsapp.net"
							: m.quoted?.sender;
						await keila
							.groupParticipantsUpdate(
								m.chat,
								[numbersOnly],
								"demote",
							)
							.catch(err => m.reply("Gagal!"));
					}
				}
				break;
			case "setname":
			case "setnamegc":
			case "setsubject":
			case "setsubjectgc":
				{
					if (!m.isGroup) return m.reply(mess.group);
					if (!m.isAdmin) return m.reply(mess.admin);
					if (!m.isBotAdmin) return m.reply(mess.botAdmin);
					if (!text && !m.quoted) {
						m.keila(`Contoh: ${prefix + command} textnya`);
					} else {
						const teksnya = text ? text : m.quoted.text;
						await keila
							.groupUpdateSubject(m.chat, teksnya)
							.catch(err => m.reply("Gagal!"));
					}
				}
				break;
			case "setdesc":
			case "setdescgc":
			case "setdesk":
			case "setdeskgc":
				{
					if (!m.isGroup) return m.reply(mess.group);
					if (!m.isAdmin) return m.reply(mess.admin);
					if (!m.isBotAdmin) return m.reply(mess.botAdmin);
					if (!text && !m.quoted) {
						m.keila(`Contoh: ${prefix + command} textnya`);
					} else {
						const teksnya = text ? text : m.quoted.text;
						await keila
							.groupUpdateDescription(m.chat, teksnya)
							.catch(err => m.reply("Gagal!"));
					}
				}
				break;
			case "setppgroups":
			case "setppgrup":
			case "setppgc":
				{
					if (!m.isGroup) return m.reply(mess.group);
					if (!m.isAdmin) return m.reply(mess.admin);
					if (!m.isBotAdmin) return m.reply(mess.botAdmin);
					if (!m.quoted)
						return m.reply(
							"Reply Gambar yang mau dipasang di Profile Bot",
						);
					if (!/image/.test(mime) && /webp/.test(mime))
						return m.keila(
							`Reply Image Dengan Caption ${prefix + command}`,
						);
					let media = await keila.downloadAndSaveMediaMessage(
						quoted,
						"ppgc.jpeg",
					);
					if (text.length > 0) {
						let { img } = await generateProfilePicture(media);
						await keila.query({
							tag: "iq",
							attrs: {
								to: m.chat,
								type: "set",
								xmlns: "w:profile:picture",
							},
							content: [
								{
									tag: "picture",
									attrs: {
										type: "image",
									},
									content: img,
								},
							],
						});
						await fs.unlinkSync(media);
						m.reply("Sukses");
					} else {
						await keila.updateProfilePicture(m.chat, {
							url: media,
						});
						await fs.unlinkSync(media);
						m.reply("Sukses");
					}
				}
				break;
			case "delete":
			case "del":
			case "d": {
    if (!m.quoted) 
        return m.reply("Reply pesan yang mau di delete");
    
    if (m.isAdmin || m.quoted.fromMe) {
        await keila.sendMessage(m.chat, {
            delete: {
                remoteJid: m.chat,
                fromMe: m.isBotAdmin ? false : true,
                id: m.quoted.id,
                participant: m.quoted.sender,
            },
        });
    }
}
break;
case "poll": {
    if (!text) 
        return m.keila(`Contoh Penggunaan: \n${usedPrefix + command} hello |yes|no`);

    let a = text.split('|').slice(1);
    if (!a[1]) 
        return m.keila(`Format\n${usedPrefix + command} hello |yes|no`);
    if (a[5]) 
        return m.keila(`Terlalu banyak opsi, maksimal 5.\nFormat\n${usedPrefix + command} hello |yes|no`);
    if (new Set(a).size !== a.length) 
        return m.reply('Terdapat opsi duplikat!');

    let cap = `*Polling Dari* ${m.pushName}\n*Pesan:* ${text.split('|')[0]}`;

    const pollMessage = {
        name: cap,
        values: a,
        multiselect: false,
        selectableCount: 1,
    };

    await keila.sendMessage(m.chat, {
        poll: pollMessage,
    });
}
break;
			case "linkgroup":
			case "linkgrup":
			case "linkgc":
			case "urlgroup":
			case "urlgrup":
			case "urlgc":
				{
					if (!m.isGroup) return m.reply(mess.group);
					if (!m.isAdmin) return m.reply(mess.admin);
					if (!m.isBotAdmin) return m.reply(mess.botAdmin);
					let response = await keila.groupInviteCode(m.chat);
					await keila.sendMessage(
						m.chat,
						{
							text: `https://chat.whatsapp.com/${response}\n\nLink Group : ${
								(await keila.groupMetadata(m.chat)).subject
							}`,
							detectLink: true,
						},
						{
							quoted: m,
						},
					);
				}
				break;
			case "revoke":
			case "newlink":
			case "newurl":
				{
					if (!m.isGroup) return m.reply(mess.group);
					if (!m.isAdmin) return m.reply(mess.admin);
					if (!m.isBotAdmin) return m.reply(mess.botAdmin);
					await keila
						.groupRevokeInvite(m.chat)
						.then(a => {
							m.reply(
								`Sukses Menyetel Ulang, Tautan Undangan Grup ${m.metadata.subject}`,
							);
						})
						.catch(err => m.reply("Gagal!"));
				}
				break;
			case "group":
			case "grup":
				{
					if (!m.isGroup) return m.reply(mess.group);
					if (!m.isAdmin) return m.reply(mess.admin);
					if (!m.isBotAdmin) return m.reply(mess.botAdmin);
					if (text === "close") {
						await keila
							.groupSettingUpdate(m.chat, "announcement")
							.then(res => m.reply(`*Sukses Menutup Group*`));
					} else if (text === "open") {
						await keila
							.groupSettingUpdate(m.chat, "not_announcement")
							.then(res => m.reply(`*Sukses Membuka Group*`));
					} else {
						let buttonnya = [
							{
								name: "single_select",
								buttonParamsJson: {
									title: "Pilih",
									sections: [
										{
											title: "Mode Group",
											rows: [
												{
													title: "Open Group",
													description:
														"Membuka Group",
													id: ".grup open",
												},
												{
													title: "Close Group",
													description:
														"Menutup Group",
													id: ".grup close",
												},
											],
										},
									],
								},
							},
						];
						await keila.sendButtonMsg(
							m.chat,
							"Mode Group",
							ucapanWaktu,
							"Silahkan dipilih 🎋",
							null,
							buttonnya,
							m,
						);
					}
				}
				break;
				case "mute":
{
	if (!m.isGroup) return m.reply(mess.group);
	if (!m.isAdmin) return m.reply(mess.admin);
	if (text === "on") {
		if (db.groups[m.chat].mute)
			return m.reply("*Sudah Aktif Sebelumnya*");
		db.groups[m.chat].mute = true;
		m.reply("*Group Telah Dimute !*");
	} else if (text === "off") {
		db.groups[m.chat].mute = false;
		m.reply("*Group Telah Dibuka !*");
	} else {
		let buttonnya = [
			{
				name: "single_select",
				buttonParamsJson: {
					title: "Pilih",
					sections: [
						{
							title: "Mute",
							rows: [
								{
									title: "Mute Aktif",
									description: "Mengaktifkan Mute",
									id: ".mute on",
								},
								{
									title: "Mute Tidak Aktif",
									description: "Mematikan Mute",
									id: ".mute off",
								},
							],
						},
					],
				},
			},
		];
		await keila.sendButtonMsg(
			m.chat,
			"Mode Group",
			ucapanWaktu,
			"Silahkan dipilih 🎋",
			null,
			buttonnya,
			m,
		);
	}
}
break;
case "nsfw":
{
	if (!m.isGroup) return m.reply(mess.group);
	if (!m.isAdmin) return m.reply(mess.admin);
	if (text === "on") {
		if (db.groups[m.chat].nsfw)
			return m.reply("*Sudah Aktif Sebelumnya*");
		db.groups[m.chat].nsfw = true;
		m.reply("*NSFW Aktif !*");
	} else if (text === "off") {
		db.groups[m.chat].nsfw = false;
		m.reply("*NSFW Non Aktif !*");
	} else {
		let buttonnya = [
			{
				name: "single_select",
				buttonParamsJson: {
					title: "Pilih",
					sections: [
						{
							title: "nsfw",
							rows: [
								{
									title: "nsfw Aktif",
									description: "Mengaktifkan nsfw",
									id: ".nsfw on",
								},
								{
									title: "nsfw Tidak Aktif",
									description: "Mematikan nsfw",
									id: ".nsfw off",
								},
							],
						},
					],
				},
			},
		];
		await keila.sendButtonMsg(
			m.chat,
			"Mode Group",
			ucapanWaktu,
			"Silahkan dipilih 🎋",
			null,
			buttonnya,
			m,
		);
	}
}
break;
case "antivirtex":
{
	if (!m.isGroup) return m.reply(mess.group);
	if (!m.isAdmin) return m.reply(mess.admin);
	if (text === "on") {
		if (db.groups[m.chat].antivirtex)
			return m.reply("*Sudah Aktif Sebelumnya*");
		db.groups[m.chat].antivirtex = true;
		m.reply("*Anti Virtex Hidup!*");
	} else if (text === "off") {
		db.groups[m.chat].antivirtex = false;
		m.reply("*Anti Virtex Mati !*");
	} else {
		let buttonnya = [
			{
				name: "single_select",
				buttonParamsJson: {
					title: "Pilih",
					sections: [
						{
							title: "antivirtex",
							rows: [
								{
									title: "antivirtex Aktif",
									description: "Mengaktifkan antivirtex",
									id: ".antivirtex on",
								},
								{
									title: "antivirtex Tidak Aktif",
									description: "Mematikan antivirtex",
									id: ".antivirtex off",
								},
							],
						},
					],
				},
			},
		];
		await keila.sendButtonMsg(
			m.chat,
			"Mode Group",
			ucapanWaktu,
			"Silahkan dipilih 🎋",
			null,
			buttonnya,
			m,
		);
	}
}
break;
case "antitoxic":
{
	if (!m.isGroup) return m.reply(mess.group);
	if (!m.isAdmin) return m.reply(mess.admin);
	if (text === "on") {
		if (db.groups[m.chat].antitoxic)
			return m.reply("*Sudah Aktif Sebelumnya*");
		db.groups[m.chat].antitoxic = true;
		m.reply("*Anti Toxic Aktif  !*");
	} else if (text === "off") {
		db.groups[m.chat].antitoxic = false;
		m.reply("*Anti Toxic Non Aktif !*");
	} else {
		let buttonnya = [
			{
				name: "single_select",
				buttonParamsJson: {
					title: "Pilih",
					sections: [
						{
							title: "antitoxic",
							rows: [
								{
									title: "antitoxic Aktif",
									description: "Mengaktifkan antitoxic",
									id: ".antitoxic on",
								},
								{
									title: "antitoxic Tidak Aktif",
									description: "Mematikan antitoxic",
									id: ".antitoxic off",
								},
							],
						},
					],
				},
			},
		];
		await keila.sendButtonMsg(
			m.chat,
			"Mode Group",
			ucapanWaktu,
			"Silahkan dipilih 🎋",
			null,
			buttonnya,
			m,
		);
	}
}
break;
case "setinfo":
{
	if (!m.isGroup) return m.reply(mess.group);
	if (!m.isAdmin) return m.reply(mess.admin);
	if (text === "on") {
		if (db.groups[m.chat].setinfo)
			return m.reply("*Sudah Aktif Sebelumnya*");
		db.groups[m.chat].setinfo = true;
		m.reply("*Group Info Hidup !*");
	} else if (text === "off") {
		db.groups[m.chat].setinfo = false;
		m.reply("*Group Info Mati !*");
	} else {
		let buttonnya = [
			{
				name: "single_select",
				buttonParamsJson: {
					title: "Pilih",
					sections: [
						{
							title: "setinfo",
							rows: [
								{
									title: "setinfo Aktif",
									description: "Mengaktifkan setinfo",
									id: ".setinfo on",
								},
								{
									title: "setinfo Tidak Aktif",
									description: "Mematikan setinfo",
									id: ".setinfo off",
								},
							],
						},
					],
				},
			},
		];
		await keila.sendButtonMsg(
			m.chat,
			"Mode Group",
			ucapanWaktu,
			"Silahkan dipilih 🎋",
			null,
			buttonnya,
			m,
		);
	}
}
break;
case "waktusholat":
{
	if (!m.isGroup) return m.reply(mess.group);
	if (!m.isAdmin) return m.reply(mess.admin);
	if (text === "on") {
		if (db.groups[m.chat].waktusholat)
			return m.reply("*Sudah Aktif Sebelumnya*");
		db.groups[m.chat].waktusholat = true;
		m.reply("*Sholat Info Aktif !*");
	} else if (text === "off") {
		db.groups[m.chat].waktusholat = false;
		m.reply("*Sholat Info Non Aktif !*");
	} else {
		let buttonnya = [
			{
				name: "single_select",
				buttonParamsJson: {
					title: "Pilih",
					sections: [
						{
							title: "waktusholat",
							rows: [
								{
									title: "waktusholat Aktif",
									description: "Mengaktifkan waktusholat",
									id: ".waktusholat on",
								},
								{
									title: "waktusholat Tidak Aktif",
									description: "Mematikan waktusholat",
									id: ".waktusholat off",
								},
							],
						},
					],
				},
			},
		];
		await keila.sendButtonMsg(
			m.chat,
			"Mode Group",
			ucapanWaktu,
			"Silahkan dipilih 🎋",
			null,
			buttonnya,
			m,
		);
	}
}
break;
			case "antibot":
{
    if (!m.isGroup) return m.reply(mess.group);
    if (!m.isAdmin) return m.reply(mess.admin);
    if (!m.isBotAdmin) return m.reply(mess.botAdmin);
    if (text === "on") {
        if (db.groups[m.chat].antiBot)
            return m.reply("*Anti Bot Sudah Aktif Sebelumnya*");
        db.groups[m.chat].antiBot = true;
        m.reply("*Anti Bot Aktif !*");
    } else if (text === "off") {
        db.groups[m.chat].antiBot = false;
        m.reply("*Anti Bot Tidak Aktif !*");
    } else {
        let buttonnya = [
            {
                name: "single_select",
                buttonParamsJson: {
                    title: "Pilih",
                    sections: [
                        {
                            title: "Anti Bot",
                            rows: [
                                {
                                    title: "Anti Bot Aktif",
                                    description: "Mengaktifkan Anti Bot",
                                    id: ".antibot on",
                                },
                                {
                                    title: "Anti Bot Tidak Aktif",
                                    description: "Mematikan Anti Bot",
                                    id: ".antibot off",
                                },
                            ],
                        },
                    ],
                },
            },
        ];
        await keila.sendButtonMsg(
            m.chat,
            "Mode Group",
            ucapanWaktu,
            "Silahkan dipilih 🎋",
            null,
            buttonnya,
            m,
        );
    }
}
break;
case "charai":
{
    if (!m.isGroup) return m.reply(mess.group);
    if (!m.isAdmin) return m.reply(mess.admin);
    if (text === "on") {
        if (db.groups[m.chat].charai)
            return m.reply("*Sudah Aktif Sebelumnya*");
        db.groups[m.chat].charai = true;
        m.reply("*CharAI Aktif !*");
    } else if (text === "off") {
        db.groups[m.chat].charai = false;
        m.reply("*CharAI Tidak Aktif !*");
    } else {
        let buttonnya = [
            {
                name: "single_select",
                buttonParamsJson: {
                    title: "Pilih",
                    sections: [
                        {
                            title: "CharAI",
                            rows: [
                                {
                                    title: "CharAI Aktif",
                                    description:
                                        "Mengaktifkan CharAI",
                                    id: ".charai on",
                                },
                                {
                                    title: "CharAI Tidak Aktif",
                                    description:
                                        "Mematikan CharAI",
                                    id: ".charai off",
                                },
                            ],
                        },
                    ],
                },
            },
        ];
        await keila.sendButtonMsg(
            m.chat,
            "Mode Group",
            ucapanWaktu,
            "Silahkan dipilih 🎋",
            null,
            buttonnya,
            m,
        );
    }
}
break;
case "sekrip":
{
    if (!m.isGroup) return m.reply(mess.group);
    if (!isCreator) return m.reply(mess.owner);
    if (text === "on") {
        if (db.groups[m.chat].sekrip)
            return m.reply("*Sudah Aktif Sebelumnya*");
        db.groups[m.chat].sekrip = true;
        m.reply("*Free Sc Aktif !*");
    } else if (text === "off") {
        db.groups[m.chat].sekrip = false;
        m.reply("*Free SC Tidak Aktif !*");
    } else {
        let buttonnya = [
            {
                name: "single_select",
                buttonParamsJson: {
                    title: "Pilih",
                    sections: [
                        {
                            title: "CharAI",
                            rows: [
                                {
                                    title: "Free SC Aktif",
                                    description:
                                        "Mengaktifkan CharAI",
                                    id: ".charai on",
                                },
                                {
                                    title: "Free SC Tidak Aktif",
                                    description:
                                        "Mematikan CharAI",
                                    id: ".charai off",
                                },
                            ],
                        },
                    ],
                },
            },
        ];
        await keila.sendButtonMsg(
            m.chat,
            "Mode Group",
            ucapanWaktu,
            "Silahkan dipilih 🎋",
            null,
            buttonnya,
            m,
        );
    }
}
break;
			case "antilink":
				{
					if (!m.isGroup) return m.reply(mess.group);
					if (!m.isAdmin) return m.reply(mess.admin);
					if (!m.isBotAdmin) return m.reply(mess.botAdmin);
					if (text === "on") {
						if (db.groups[m.chat].antilink)
							return m.reply("*Sudah Aktif Sebelumnya*");
						db.groups[m.chat].antilink = true;
						m.reply("*Anti Link Aktif !*");
					} else if (text === "off") {
						db.groups[m.chat].antilink = false;
						m.reply("*Anti Link Tidak Aktif !*");
					} else {
						let buttonnya = [
							{
								name: "single_select",
								buttonParamsJson: {
									title: "Pilih",
									sections: [
										{
											title: "Anti Link",
											rows: [
												{
													title: "Anti Link Aktif",
													description:
														"Mengaktifkan Antilink",
													id: ".antilink on",
												},
												{
													title: "Anti Link Tidak Aktif",
													description:
														"Mematikan Antilink",
													id: ".antilink off",
												},
											],
										},
									],
								},
							},
						];
						await keila.sendButtonMsg(
							m.chat,
							"Mode Group",
							ucapanWaktu,
							"Silahkan dipilih 🎋",
							null,
							buttonnya,
							m,
						);
					}
				}
				break;
				
			case "cekbot":
{
    if (!m.isGroup) return m.reply(mess.group);
    if (!m.isAdmin) return m.reply(mess.admin);
    if (!m.isBotAdmin) return m.reply(mess.botAdmin);
    
    if (m.isBaileys) {
        m.reply("*Pesan ini berasal dari bot*");
    } else {
        m.reply("*Pesan ini tidak berasal dari bot*");
    }
}
break;
case "totalfitur": {
    try {
        const fs = require('fs');
        const filePath = __filename;
        const fileContent = fs.readFileSync(filePath, 'utf-8');

        const caseCount = (fileContent.match(/case\s*["'`][^"'`]+["'`]/g) || []).length;
        
        const message = `*Total Fitur:*\n🔹${caseCount}`;
        
        await keila.sendMessage(m.chat, { text: message }, { quoted: fkontak });
    } catch (error) {
        console.error("Terjadi error saat menghitung jumlah fitur:", error);
        await keila.sendMessage(m.chat, { text: 'Gagal menghitung total fitur.' }, { quoted: fkontak });
    }
}
break;
case "getcase": {
    if (!isCreator) return keila.sendMessage(m.chat, { text: 'Fitur ini hanya untuk Creator.' }, { quoted: fkontak });
    try {
        const fs = require('fs');
        const path = require('path');
        const filePath = __filename;
        const fileContent = fs.readFileSync(filePath, 'utf-8');

        const caseName = args.join(' ');
        const regex = new RegExp(`case\\s*["'\\\`]${caseName}["'\\\`]:\\s*{([\\s\\S]*?)(?=break)`, 'g');
        const match = regex.exec(fileContent);

        if (match) {
            const caseCode = `case "${caseName}": {\n${match[1]}\n}`;
            const tempFilePath = path.join(__dirname, 'tmp', `${caseName}.js`);
            fs.writeFileSync(tempFilePath, caseCode, 'utf-8');
            await keila.sendMessage(m.chat, {
                document: { url: tempFilePath },
                fileName: `${caseName}.js`,
                mimetype: 'application/javascript'
            }, { quoted: fkontak });

            fs.unlinkSync(tempFilePath);
        } else {
            await keila.sendMessage(m.chat, { text: `Case *${caseName}* tidak ditemukan.` }, { quoted: fkontak });
        }
    } catch (error) {
        console.error("Terjadi error saat mengambil case:", error);
        await keila.sendMessage(m.chat, { text: 'Gagal mengambil case.' }, { quoted: fkontak });
    }
}
break;
case "listcase": {
    try {
        const fs = require('fs');
        const filePath = __filename;
        const fileContent = fs.readFileSync(filePath, 'utf-8');

        const regex = /case\s*["'\\`](.*?)["'\\`]:\s*{([\s\S]*?break)/g;
        let match;
        const caseList = [];

        while ((match = regex.exec(fileContent)) !== null) {
            caseList.push(match[1]);
        }

        if (caseList.length > 0) {
            let formattedList = '';
            for (let i = 0; i < caseList.length; i += 3) {
                formattedList += caseList.slice(i, i + 3).join('  |  ') + '\n';
            }

            const caseMessage = `Daftar Case:\n\n${formattedList}\nTotal: ${caseList.length} case.`;
            await keila.sendMessage(m.chat, { text: caseMessage }, { quoted: fkontak });
        } else {
            await keila.sendMessage(m.chat, { text: 'Tidak ada case yang ditemukan.' }, { quoted: fkontak });
        }
    } catch (error) {
        console.error("Terjadi error saat mengambil daftar case:", error);
        await keila.sendMessage(m.chat, { text: 'Gagal mengambil daftar case.' }, { quoted: fkontak });
    }
}
break;

			case "antidelete":
				{
					if (!m.isGroup) return m.reply(mess.group);
					if (!m.isAdmin) return m.reply(mess.admin);
					if (text === "on") {
						if (db.groups[m.chat].antidelete)
							return m.reply("*Sudah Aktif Sebelumnya*");
						db.groups[m.chat].antidelete = true;
						m.reply("*Anti Delete Aktif !*");
					} else if (text === "off") {
						db.groups[m.chat].antidelete = false;
						m.reply("*Anti Delete Tidak Aktif !*");
					} else {
						let buttonnya = [
							{
								name: "single_select",
								buttonParamsJson: {
									title: "Pilih",
									sections: [
										{
											title: "Anti Delete",
											rows: [
												{
													title: "Anti Delete Aktif",
													description:
														"Mengaktifkan Antidelete",
													id: ".antidelete on",
												},
												{
													title: "Anti Delete Tidak Aktif",
													description:
														"Mematikan Antidelete",
													id: ".antidelete off",
												},
											],
										},
									],
								},
							},
						];
						await keila.sendButtonMsg(
							m.chat,
							"Mode Group",
							ucapanWaktu,
							"Silahkan dipilih 🎋",
							null,
							buttonnya,
							m,
						);
					}
				}
				break;
			case "welcome":
				{
					if (!m.isGroup) return m.reply(mess.group);
					if (!m.isAdmin) return m.reply(mess.admin);
					if (text === "on") {
						if (db.groups[m.chat].welcome)
							return m.reply("*Sudah Aktif Sebelumnya*");
						db.groups[m.chat].welcome = true;
						m.reply("*Welcome Aktif !*");
					} else if (text === "off") {
						db.groups[m.chat].welcome = false;
						m.reply("*Welcome Tidak Aktif !*");
					} else {
						let buttonnya = [
							{
								name: "single_select",
								buttonParamsJson: {
									title: "Pilih",
									sections: [
										{
											title: "Welcome",
											rows: [
												{
													title: "Welcome Aktif",
													description:
														"Mengaktifkan Welcome",
													id: ".welcome on",
												},
												{
													title: "Welcome Tidak Aktif",
													description:
														"Mematikan Welcome",
													id: ".welcome off",
												},
											],
										},
									],
								},
							},
						];
						await keila.sendButtonMsg(
							m.chat,
							"Mode Group",
							ucapanWaktu,
							"Silahkan dipilih 🎋",
							null,
							buttonnya,
							m,
						);
					}
				}
				break;
			case "tagall":
				{
					if (!m.isGroup) return m.reply(mess.group);
					if (!m.isAdmin) return m.reply(mess.admin);
					if (!m.isBotAdmin) return m.reply(mess.botAdmin);
					let setv = pickRandom(global.listv);
					let teks = `*Tag All*\n\n*Pesan :* ${q ? q : ""}\n\n`;
					for (let mem of m.metadata.participants) {
						teks += `${setv} @${mem.id.split("@")[0]}\n`;
					}
					await keila.sendMessage(
						m.chat,
						{
							text: teks,
							mentions: m.metadata.participants.map(a => a.id),
						},
						{
							quoted: m,
						},
					);
				}
				break;
			case "hidetag":
			case "h":
				{
					if (!m.isGroup) return m.reply(mess.group);
					if (!m.isAdmin) return m.reply(mess.admin);
					if (!m.isBotAdmin) return m.reply(mess.botAdmin);
					keila.sendMessage(
						m.chat,
						{
							text: q ? q : "",
							mentions: m.metadata.participants.map(a => a.id),
						},
						{
							quoted: m,
						},
					);
				}
				break;
			case "all":
{
    if (!m.isGroup) return m.reply(mess.group);
    if (!m.isAdmin) return m.reply(mess.admin);
    if (!m.isBotAdmin) return m.reply(mess.botAdmin);

    let subject = text || 'everyone';

    keila.sendMessage(
        m.chat,
        {
            text: `@${m.chat}`,
            contextInfo: {
                mentionedJid: m.metadata.participants.map(a => a.id),
                groupMentions: [
                    {
                        groupJid: m.chat,
                        groupSubject: subject
                    }
                ]
            }
        },
        {
            quoted: fkontak,
        }
    );
}
break;
case "everyone": {

    if (!m.isGroup) return m.reply(mess.group);
    if (!m.isAdmin) return m.reply(mess.admin);
    if (!m.isBotAdmin) return m.reply(mess.botAdmin);

    let messageText = text || '';
    let subject = 'everyone';

    keila.sendMessage(
        m.chat,
        {
            text: `@${m.chat} ${messageText}`,
            contextInfo: {
                mentionedJid: m.metadata.participants.map(a => a.id),
                groupMentions: [
                    {
                        groupJid: m.chat,
                        groupSubject: subject
                    }
                ]
            }
        },
        {
            quoted: fkontak,
        }
    );
}
break;
case "admin":
case "here": {

    if (!m.isGroup) return m.reply(mess.group);
    if (!m.isBotAdmin) return m.reply(mess.botAdmin);

    let messageText = text || '';
    let subject = 'admin';

    let admins = m.metadata.participants
        .filter(participant => participant.admin === 'admin' || participant.admin === 'superadmin')
        .map(admin => admin.id);

    if (admins.length === 0) return m.reply('Tidak ada admin atau superadmin yang ditemukan.');

    keila.sendMessage(
        m.chat,
        {
            text: `@${m.chat} ${messageText}`,
            contextInfo: {
                mentionedJid: admins,
                groupMentions: [
                    {
                        groupJid: m.chat,
                        groupSubject: subject
                    }
                ]
            }
        },
        {
            quoted: fkontak,
        }
    );
}
break;
			case "totag":
				{
					if (!m.isGroup) return m.reply(mess.group);
					if (!m.isAdmin) return m.reply(mess.admin);
					if (!m.isBotAdmin) return m.reply(mess.botAdmin);
					if (!m.quoted)
						return m.keila(
							`Reply pesan dengan caption ${prefix + command}`,
						);
					delete m.quoted.chat;
					await keila.sendMessage(m.chat, {
						forward: m.quoted.fakeObj,
						mentions: m.metadata.participants.map(a => a.id),
					});
				}
				break;
			case "listonline":
			case "liston":
				{
					if (!m.isGroup) return m.reply(mess.group);
					let id =
						args && /\d+\-\d+@g.us/.test(args[0])
							? args[0]
							: m.chat;
					let online = [
						...Object.keys(store.presences[id]),
						botNumber,
					];
					await keila
						.sendMessage(
							m.chat,
							{
								text:
									"List Online:\n\n" +
									online.map(
										v => "⭔ @" + v.replace(/@.+/, ""),
									).join`\n`,
								mentions: online,
							},
							{
								quoted: m,
							},
						)
						.catch(e => m.reply("Gagal"));
				}
				break;

			// Bot Menu
			case "owner":
				{
					await keila.sendContact(m.chat, owner, m);
				}
				break;
			case "script":
			case "sc":
{
  try {
    if (!m.isGroup) {
      return keila.sendMessage(m.chat, { text: mess.group }, { quoted: fkontak });
    } else if (db.groups[m.chat]?.sekrip) {
      const scNya = fs.readFileSync('./src/media/Chioriya_V2.zip');
      await keila.sendMessage(m.chat, { document: scNya, mimetype: "application/zip", fileName: `Chioriya_V2.zip` }, { quoted: fkontak });
    } else {
      return keila.sendMessage(m.chat, { text: 'Maaf, creator tidak mempublikasikan ke grup ini.' }, { quoted: fkontak });
    }
  } catch (error) {
    console.error("Terjadi error saat mengirim pesan:", error);
    return keila.sendMessage(m.chat, { text: 'Sc Belum Di Publikasikan!' }, { quoted: fkontak });
  }
}
break;
case "giveaway": {
    const args = text.split(' ');
    const subCommand = args[0];
    const subArgs = args.slice(1).join(' ');

    if (subCommand === "mulai") {
        if (!isCreator) {
            await keila.sendMessage(
                m.chat,
                { text: mess.owner },
                { quoted: m }
            );
        } else if (!subArgs) {
            await keila.sendMessage(
                m.chat,
                { text: `Contoh:\n${prefix}giveaway mulai Uang 1k` },
                { quoted: m }
            );
        } else {
            giveawayStatus = true;
            giveawayName = subArgs;
            giveawayUser = {};
            await keila.sendMessage(
                m.chat,
                { text: `Giveaway "${subArgs}" telah dimulai!\nJika ingin ikut, ketik:\n${prefix}giveaway ikut` },
                { quoted: m }
            );
        }
    } else if (subCommand === "ikut") {
        if (!giveawayStatus) {
            await keila.sendMessage(
                m.chat,
                { text: `Tidak ada giveaway yang berlangsung saat ini.` },
                { quoted: m }
            );
        } else if (giveawayUser[m.sender]) {
            await keila.sendMessage(
                m.chat,
                { text: `Kamu sudah terdaftar dalam giveaway.` },
                { quoted: m }
            );
        } else {
            giveawayUser[m.sender] = true;
            await keila.sendMessage(
                m.chat,
                { text: `Kamu telah bergabung dalam giveaway "${giveawayName}"!` },
                { quoted: m }
            );
        }
    } else if (subCommand === "tutup") {
        if (!isCreator) {
            await keila.sendMessage(
                m.chat,
                { text: mess.owner },
                { quoted: m }
            );
        } else {
            giveawayStatus = false;
            await keila.sendMessage(
                m.chat,
                { text: `Giveaway "${giveawayName}" telah ditutup!` },
                { quoted: m }
            );
        }
    } else if (subCommand === "acak") {
        if (!isCreator) {
            await keila.sendMessage(
                m.chat,
                { text: mess.owner },
                { quoted: m }
            );
        } else {
            const users = Object.keys(giveawayUser);
            if (users.length === 0) {
                await keila.sendMessage(
                    m.chat,
                    { text: `Tidak ada peserta dalam giveaway.` },
                    { quoted: m }
                );
            } else {
                const initialMessage = await keila.sendMessage(
                    m.chat,
                    { text: `Memilih pemenang giveaway "${giveawayName}"...` },
                    { quoted: m }
                );

                const winner = users[Math.floor(Math.random() * users.length)];
                const winnerMention = `@${winner.split('@')[0]}`;

                const displayWinners = [];
                for (let i = 0; i < 8; i++) {
                    displayWinners.push(users[Math.floor(Math.random() * users.length)]);
                }

                const editMessageWithDelay = async (text, mentions, delay) => {
                    return new Promise((resolve) => {
                        setTimeout(async () => {
                            await keila.sendMessage(
                                m.chat,
                                {
                                    text: text,
                                    edit: initialMessage.key,
                                    mentions: mentions
                                },
                                { quoted: m }
                            );
                            resolve();
                        }, delay);
                    });
                };

                const delays = [100, 200, 300, 400, 500, 650, 800, 1000];
                for (let i = 0; i < displayWinners.length; i++) {
                    const currentWinner = displayWinners[i];
                    await editMessageWithDelay(
                        `Selamat! Pemenang dari giveaway "${giveawayName}" adalah @${currentWinner.split('@')[0]}`,
                        [currentWinner],
                        delays[i]
                    );
                }

                await editMessageWithDelay(
                    `Selamat! Pemenang dari giveaway "${giveawayName}" adalah @${winner.split('@')[0]}`,
                    [winner],
                    delays[delays.length - 1] + 1000
                );

                await keila.sendMessage(
                    m.chat,
                    {
                        text: `Harap Pemenang Konfirmasi Ke Penyelenggara Jika Tidak Akan Hangus!`,
                        mentions: [winner]
                    },
                    { quoted: m }
                );
            }
        }
    } else if (subCommand === "hapus") {
        if (!isCreator) {
            await keila.sendMessage(
                m.chat,
                { text: mess.owner },
                { quoted: m }
            );
        } else {
            giveawayStatus = false;
            giveawayName = '';
            giveawayUser = {};
            await keila.sendMessage(
                m.chat,
                { text: `Giveaway telah direset!` },
                { quoted: m }
            );
        }
    } else if (subCommand === "reroll") {
        if (!isCreator) {
            await keila.sendMessage(
                m.chat,
                { text: mess.owner },
                { quoted: m }
            );
        } else {
            const users = Object.keys(giveawayUser);
            if (users.length === 0) {
                await keila.sendMessage(
                    m.chat,
                    { text: `Tidak ada peserta dalam giveaway.` },
                    { quoted: m }
                );
            } else {
                let numToEliminate = Math.max(1, Math.floor(users.length * 0.25));
                
                if (users.length <= 5) {
                    numToEliminate = 1;
                }

                const eliminatedUsers = [];
                
                while (eliminatedUsers.length < numToEliminate) {
                    const index = Math.floor(Math.random() * users.length);
                    const user = users[index];
                    if (!eliminatedUsers.includes(user)) {
                        eliminatedUsers.push(user);
                        delete giveawayUser[user];
                    }
                }
                
                const remainingUsers = Object.keys(giveawayUser);
                
                if (remainingUsers.length <= 1) {
                    giveawayStatus = false;
                    const winner = remainingUsers[0];
                    await keila.sendMessage(
                        m.chat,
                        {
                            text: `Giveaway "${giveawayName}" telah selesai!\nPemenangnya adalah @${winner.split('@')[0]}!`,
                            mentions: [winner]
                        },
                        { quoted: m }
                    );
                } else {
                    await keila.sendMessage(
                        m.chat,
                        {
                            text: `Pengguna yang tereliminasi:\n${eliminatedUsers.map(user => `@${user.split('@')[0]}`).join('\n')}\nSisa peserta: ${remainingUsers.length}`,
                        },
                        { quoted: m }
                    );
                }
            }
        }
    } else {
        await keila.sendMessage(
            m.chat,
            { text: `Perintah tidak dikenal.\nGunakan salah satu dari: mulai, ikut, tutup, acak, hapus, reroll.\nContoh: ${prefix}giveaway ikut` },
            { quoted: m }
        );
    }
}
break;
case "button":
{
    const keilaDB = loadKeilaDB();
    const senderId = m.sender;

    if (!args[0]) {
        m.keila('Format salah! Gunakan .button <on/off>');
        break;
    }

    const status = args[0].toLowerCase();
    if (status !== 'on' && status !== 'off') {
        m.reply('Format salah! Gunakan .button <on/off>');
        break;
    }

    keilaDB[senderId].statusbt = (status === 'on');

    saveKeilaDB(keilaDB);
    m.reply(`Button telah ${status === 'on' ? 'diaktifkan' : 'dinonaktifkan'}.`);
    break;
}


			case "setlangguage":
				{
					if (args.length < 1) {
						m.reply(
							"Please specify the language code (ID for Indonesian, EN for English, JP for Japanese).",
						);
						return;
					}
					const languageId = args[0].toUpperCase();
					const userId = m.sender;
					const validLanguages = ["ID", "EN", "JP"];
					if (!validLanguages.includes(languageId)) {
						m.reply(
							"Invalid language code. Please use ID for Indonesian, EN for English, or JP for Japanese.",
						);
						return;
					}

					console.log("User ID:", userId);
					let database;
					try {
						database = JSON.parse(
							fs.readFileSync("./database/database.json", "utf8"),
						);
						console.log("Database before update:", database);
					} catch (error) {
						console.error("Error reading database file:", error);
						if (languageId === "ID") {
							m.reply(
								"Terjadi kesalahan saat membaca database. Silakan coba lagi nanti.",
							);
						} else if (languageId === "JP") {
							m.reply(
								"データベースの読み取り中にエラーが発生しました。後でもう一度お試しください。",
							);
						} else {
							m.reply(
								"Error reading database. Please try again later.",
							);
						}
						return;
					}

					if (!database.users[userId]) {
						database.users[userId] = {};
					}

					console.log("Updating language for user:", userId);
					database.users[userId].language = languageId;
					console.log("Database after update:", database);

					try {
						fs.writeFileSync(
							"./database/database.json",
							JSON.stringify(database, null, 2),
						);
						if (languageId === "ID") {
							m.reply(
								`Bahasa telah diatur ke ${languageId} untuk pengguna ${userId}`,
							);
						} else if (languageId === "JP") {
							m.reply(
								`ユーザー ${userId} の言語が ${languageId} に設定されました`,
							);
						} else {
							m.reply(
								`Language has been set to ${languageId} for user ${userId}`,
							);
						}
					} catch (error) {
						console.error("Error writing to database file:", error);
						if (languageId === "ID") {
							m.reply(
								"Terjadi kesalahan saat menyimpan perubahan ke database. Silakan coba lagi nanti.",
							);
						} else if (languageId === "JP") {
							m.reply(
								"データベースへの変更の保存中にエラーが発生しました。後でもう一度お試しください。",
							);
						} else {
							m.reply(
								"Error saving changes to database. Please try again later.",
							);
						}
					}
				}
				break;
			case "profile":
			case "cekme":
			case "cek":
				{
					const userId = m.sender;
					const user = global.db.users[userId];
					let database = JSON.parse(
						fs.readFileSync("./database/database.json", "utf8"),
					);
					const userLanguage = database.users[userId]
						? database.users[userId].language
						: "EN";

					let teks;
					if (userLanguage === "ID") {
						teks = `*Profil @${
							m.sender.split("@")[0]
						}* :\nUser Bot : ${
							user ? "Benar" : "Salah"
						}\nPengguna : ${
							user && user.vip
								? "VIP"
								: user && user.premium
								? "PREMIUM"
								: "GRATIS"
						}\nLimit : ${user.limit}\nUang : ${
							user ? user.uang.toLocaleString("id-ID") : "0"
						}`;
					} else if (userLanguage === "JP") {
						teks = `*プロファイル @${
							m.sender.split("@")[0]
						}* :\nボットユーザー : ${
							user ? "正しい" : "間違い"
						}\nユーザー : ${
							user && user.vip
								? "VIP"
								: user && user.premium
								? "プレミアム"
								: "無料"
						}\nリミット : ${user.limit}\nお金 : ${
							user ? user.uang.toLocaleString("ja-JP") : "0"
						}`;
					} else {
						teks = `*Profile @${
							m.sender.split("@")[0]
						}* :\nBot User : ${user ? "True" : "False"}\nUser : ${
							user && user.vip
								? "VIP"
								: user && user.premium
								? "PREMIUM"
								: "FREE"
						}\nEnergy : ${user.limit}\nPrimogems : ${
							user ? user.uang.toLocaleString("en-US") : "0"
						}`;
					}

					await m.reply(teks);
				}
				break;
			case "req":
			case "request":
				{
					if (!text) {
						let database = JSON.parse(
							fs.readFileSync("./database/database.json", "utf8"),
						);
						const userId = m.sender;
						const userLanguage = database.users[userId]
							? database.users[userId].language
							: "EN";

						if (userLanguage === "ID") {
							m.reply("Mau Request apa ke Owner?");
						} else if (userLanguage === "JP") {
							m.reply("オーナーに何をリクエストしますか？");
						} else {
							m.reply(
								"What would you like to request to the Owner?",
							);
						}
						return;
					}

					let database = JSON.parse(
						fs.readFileSync("./database/database.json", "utf8"),
					);
					const userId = m.sender;
					const userLanguage = database.users[userId]
						? database.users[userId].language
						: "EN";

					let requestConfirmation;
					if (userLanguage === "ID") {
						requestConfirmation =
							"*Request Telah Terkirim Ke Owner*\n_Terima Kasih_";
					} else if (userLanguage === "JP") {
						requestConfirmation =
							"*リクエストがオーナーに送信されました*\n_ありがとう_";
					} else {
						requestConfirmation =
							"*Request has been sent to the Owner*\n_Thank you_";
					}

					await keila.sendMessage(
						m.chat,
						{
							text: requestConfirmation,
						},
						{
							quoted: m,
						},
					);
					await keila.sendFromOwner(
						['6289646942000'],
						`Pesan Dari : @${
							m.sender.split("@")[0]
						}\nUntuk Owner\n\nRequest ${text}`,
						m,
						{
							contextInfo: {
								mentionedJid: [m.sender],
								isForwarded: true,
							},
						},
					);
				}
				break;
			case "addgems":
{
    if (!isCreator) {
        return m.reply("Hanya pemilik bot yang dapat menggunakan perintah ini.");
    }

    const mentionedJid = m.mentionedJid[0];
    if (!mentionedJid) {
        return m.keila("Silakan tag pengguna yang ingin Anda tambahkan Primogems.\nContoh penggunaan: `.addgems @user 500`");
    }

    const amount = parseInt(text.split(" ")[1]) || 0;
    if (amount <= 0 || amount > 1600) {
        return m.keila("Jumlah Primogems yang dapat ditambahkan harus lebih dari 0 dan maksimal 1600.\nContoh penggunaan: `.addgems @user 500`");
    }

    if (!global.db.users[mentionedJid]) {
        return m.reply("Pengguna yang ditag tidak ditemukan dalam database.");
    }

    global.db.users[mentionedJid].uang += amount;

    const responseText = `Anda telah menambahkan ${amount.toLocaleString("id-ID")} Primogems kepada ${mentionedJid}.\n\nPrimogems Dia: ${global.db.users[mentionedJid].uang.toLocaleString("id-ID")}`;

    await keila.sendMessage(m.chat, { text: responseText }, { quoted: fkontak }).then(response => {
        console.log("Message sent successfully", response);
    }).catch(error => {
        console.error("Error sending message", error);
    });
}
break;
case "daily":
{
    const amount = parseInt(text.split(" ")[0]) || 1;
    const limitCost = 25;
    const reward = 40;

    if (amount <= 0) {
        return m.keila("Jumlah daily yang diminta tidak valid.\nContoh penggunaan: `.daily 1`");
    }

    const totalLimitCost = limitCost * amount;
    const totalReward = reward * amount;

    if (global.db.users[m.sender].limit < totalLimitCost) {
        return m.reply("Limit stamina Anda tidak cukup untuk melakukan daily ini.");
    }

    global.db.users[m.sender].limit -= totalLimitCost;
    global.db.users[m.sender].uang += totalReward;

    const responseText = `Anda telah menyelesaikan ${amount} daily.\nAnda menerima ${totalReward.toLocaleString("id-ID")} Primogems.\n\nPrimogems Anda: ${global.db.users[m.sender].uang.toLocaleString("id-ID")}`;

    await keila.sendMessage(m.chat, { text: responseText }, { quoted: fkontak }).then(response => {
        console.log("Message sent successfully", response);
    }).catch(error => {
        console.error("Error sending message", error);
    });
}
break;
case "crc": {
    if (!isCreator) {
        return m.reply(`Hanya pemilik bot yang bisa menggunakan perintah ini.`);
    }
    
    const args = text.split(' ');
    if (args.length < 2) {
        return m.keila(`Contoh Penggunaannya: .crc <jumlah> <kode>`);
    }

    const reward = parseInt(args[0]);
    const code = args[1];

    if (isNaN(reward) || reward <= 0 || reward > 1600) {
        return m.reply(`Jumlah reward harus lebih dari 0 dan maksimal 1600.`);
    }

    const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString();

    const redeems = loadRedeems();
    redeems.push({
        code: code,
        reward: reward,
        expiry: expires,
        claimedBy: []
    });

    saveRedeems(redeems);
    keila.sendMessage(m.chat, { text: `Kode redeem **${code}** telah dibuat dengan reward **${reward.toLocaleString("id-ID")} Primogems** dan akan kedaluwarsa pada **${new Date(expires).toLocaleString("id-ID")}**.` }, { quoted: m });
}
break;
case "claim": {
    const args = text.split(' ');
    if (args.length < 1) {
        return m.keila(`Contoh Penggunaannya: .claim <kode>`);
    }

    const code = args[0];
    const redeems = loadRedeems();
    const redeem = redeems.find(r => r.code === code);

    if (!redeem) {
        return m.reply(`Kode redeem tidak ditemukan.`);
    }

    const now = new Date();
    const expiryDate = new Date(redeem.expiry);

    if (now > expiryDate) {
        return m.reply(`Kode redeem ini telah kedaluwarsa.`);
    }

    if (redeem.claimedBy.includes(m.sender)) {
        return m.reply(`Anda telah mengklaim kode ini sebelumnya.`);
    }

    redeem.claimedBy.push(m.sender);
    saveRedeems(redeems);

    global.db.users[m.sender].uang += redeem.reward;

    keila.sendMessage(m.chat, { text: `Anda telah berhasil mengklaim kode **${code}** dan menerima **${redeem.reward.toLocaleString("id-ID")} Primogems**.` }, { quoted: m });
}
break;
			case "transferlimit":
			case "tflimit":
				{
					transferLimit(keila, m, args, global.db.users);
				}
				break;
			case "transferuang":
			case "tfuang":
				{
					transferUang(keila, m, args, global.db.users);
				}
				break;
			case "react":
				{
					keila.sendMessage(m.chat, {
						react: {
							text: args[0],
							key: m.quoted ? m.quoted.key : m.key,
						},
					});
				}
				break;
			case "tagme":
				{
					keila.sendMessage(
						m.chat,
						{
							text: `@${m.sender.split("@")[0]}`,
							mentions: [m.sender],
						},
						{
							quoted: m,
						},
					);
				}
				break;
			case "sendsw":
{
    if (!isCreator) {
        m.reply('Anda tidak memiliki izin untuk menggunakan perintah ini.');
        return;
    }

    try {
        const mediaType = args[0];
        let media;
        let caption = args.slice(1).join(' ') || 'Status dari bot';
        const jidList = Object.keys(global.db.users);
        const jumlahJid = jidList.length;

        if (mediaType === 'text') {
            await keila.sendMessage('status@broadcast', {
                text: caption
            }, {
                backgroundColor: '#315575',
                font: 3,
                statusJidList: jidList
            });
            console.log(chalk.blue(`Upload: Teks berhasil dikirim ke status.`));
        } else if (mediaType === 'image' || mediaType === 'video' || mediaType === 'audio') {
            media = await (m.quoted ? m.quoted.download() : m.download());
            if (!media) {
                m.reply('Tidak ada media yang ditemukan.');
                console.log(chalk.red('Tidak ada media yang ditemukan.'));
                return;
            }

            let mimetype = mediaType === 'image' ? 'image/jpeg' : mediaType === 'video' ? 'video/mp4' : 'audio/mpeg';
            let options = {
                backgroundColor: '#315575',
                statusJidList: jidList
            };

            if (mediaType === 'audio') {
                options.ptt = true;
            }

            await keila.sendMessage('status@broadcast', {
                [mediaType]: media,
                mimetype: mimetype,
                caption: caption
            }, options);

            console.log(chalk.blue(`Upload: Media berhasil dikirim ke status.`));
        } else {
            m.reply('Tipe media tidak valid. Gunakan text, image, video, atau audio.');
            return;
        }

        const pesan = `Berhasil mengirim story ke ${jumlahJid} orang.`;
        await keila.sendMessage(m.chat, { text: pesan }, { quoted: fkontak });
    } catch (error) {
        console.error("Terjadi error saat mengirim status:", error);
        m.reply('Pengiriman status gagal.');
        console.log(chalk.red('Pengiriman status gagal:', error.message));
    }
}
break;
			case "runtime":
			case "tes":
			case "bot":
				{
				  const keilaDB = loadKeilaDB();
					if (text && text.startsWith("--") && isCreator) {
						let buttonnya = [
							{
								name: "single_select",
								buttonParamsJson: {
									title: "Pilih",
									sections: [
										{
											title: "Bot Settings",
											rows: [
												{
													title: "Anti Call On🟢",
													description:
														"Mengaktifkan Anti Call",
													id: ".bot anticall on",
												},
												{
													title: "Anti Call Off🔴",
													description:
														"Mematikan Anti Call",
													id: ".bot anticall off",
												},
												{
													title: "Auto Bio On🟢",
													description:
														"Mengaktifkan Auto Bio",
													id: ".bot autobio on",
												},
												{
													title: "Auto Bio Off🔴",
													description:
														"Mematikan Auto Bio",
													id: ".bot autobio off",
												},
												{
													title: "Auto Read On🟢",
													description:
														"Mengaktifkan Auto Read",
													id: ".bot autoread on",
												},
												{
													title: "Auto Read Off🔴",
													description:
														"Mematikan Auto Read",
													id: ".bot autoread off",
												},
												{
													title: "Auto Type On🟢",
													description:
														"Mengaktifkan Auto Type",
													id: ".bot autotype on",
												},
												{
													title: "Auto Type Off🔴",
													description:
														"Mematikan Auto Type",
													id: ".bot autotype off",
												},
												{
													title: "Read SW On🟢",
													description:
														"Mengaktifkan Read SW",
													id: ".bot readsw on",
												},
												{
													title: "Read SW Off🔴",
													description:
														"Mematikan Read SW",
													id: ".bot readsw off",
												},
												{
													title: "Multi Prefix On🟢",
													description:
														"Mengaktifkan Multi Prefix",
													id: ".bot multiprefix on",
												},
												{
													title: "Multi Prefix Off🔴",
													description:
														"Mematikan Multi Prefix",
													id: ".bot multiprefix off",
												},
												{
													title: "React Ch On🟢",
													description:
														"Mengaktifkan React Ch",
													id: ".bot reactch on",
												},
												{
													title: "React Ch Off🔴",
													description:
														"Mematikan React Ch",
													id: ".bot reactch off",
												},
											],
										},
									],
								},
							},
						];
						if (keilaDB[m.sender] && keilaDB[m.sender].statusbt === false) {
						  await m.keila(`*List Settings!*\n\n- anticall\n- autobio\n- autoread\n- autotype\n- readsw\n- multiprefix\n- reactch\n\nExample: .bot anticall on`);
						} else {
						  await keila.sendButtonMsg(
				  			m.chat,
					  		"Bot Settings",
				  			ucapanWaktu,
				  			"Silahkan dipilih Owner🫡",
					  		null,
					  		buttonnya,
					  		m,
					  	);
						};
					} else if (text && isCreator) {
						if (text === "anticall on")
							(global.settings.anticall = true),
								m.reply("Sukses Mengaktifkan Anticall");
						if (text === "anticall off")
							(global.settings.anticall = false),
								m.reply("Sukses Mematikan Anticall");
						if (text === "autobio on")
							(global.settings.autobio = true),
								m.reply("Sukses Mengaktifkan Autobio");
						if (text === "autobio off")
							(global.settings.autobio = false),
								m.reply("Sukses Mematikan Autobio");
						if (text === "autoread on")
							(global.settings.autoread = true),
								m.reply("Sukses Mengaktifkan Autoread");
						if (text === "autoread off")
							(global.settings.autoread = false),
								m.reply("Sukses Mematikan Autoread");
						if (text === "autotype on")
							(global.settings.autotype = true),
								m.reply("Sukses Mengaktifkan Autotype");
						if (text === "autotype off")
							(global.settings.autotype = false),
								m.reply("Sukses Mematikan Autotype");
						if (text === "readsw on")
							(global.settings.readsw = true),
								m.reply("Sukses Mengaktifkan Read SW");
						if (text === "readsw off")
							(global.settings.readsw = false),
								m.reply("Sukses Mematikan Read SW");
						if (text === "multiprefix on")
							(global.settings.multiprefix = true),
								m.reply("Sukses Mengaktifkan Multiprefix");
						if (text === "multiprefix off")
							(global.settings.multiprefix = false),
								m.reply("Sukses Mematikan Multiprefix");
						if (text === "reactch on")
							(global.settings.reactch = true),
								m.reply("Sukses Mengaktifkan React Ch");
						if (text === "reactch off")
							(global.settings.reactch = false),
								m.reply("Sukses Mematikan React Ch");
						let settingsBot = Object.entries(global.settings)
							.map(([key, value]) => {
								let qhk =
									typeof value === "boolean"
										? value
											? "on🟢"
											: "off🔴"
										: value;
								return `${
									key.charAt(0).toUpperCase() + key.slice(1)
								} : ${qhk}`;
							})
							.join("\n");
						if (text === "settings") m.reply(settingsBot);
					} else {
						keila.sendMessage(
							m.chat,
							{
								text: `*Bot Telah Online Selama*\n*${runtime(
									process.uptime(),
								)}*`,
							},
							{
								quoted: m,
							},
						);
					}
				}
				break;
			case "ping":
			case "botstatus":
			case "statusbot":
				{
					const used = process.memoryUsage();
					const cpus = os.cpus().map(cpu => {
						cpu.total = Object.keys(cpu.times).reduce(
							(last, type) => last + cpu.times[type],
							0,
						);
						return cpu;
					});
					const cpu = cpus.reduce(
						(last, cpu, _, { length }) => {
							last.total += cpu.total;
							last.speed += cpu.speed / length;
							last.times.user += cpu.times.user;
							last.times.nice += cpu.times.nice;
							last.times.sys += cpu.times.sys;
							last.times.idle += cpu.times.idle;
							last.times.irq += cpu.times.irq;
							return last;
						},
						{
							speed: 0,
							total: 0,
							times: {
								user: 0,
								nice: 0,
								sys: 0,
								idle: 0,
								irq: 0,
							},
						},
					);
					let timestamp = speed();
					let latensi = speed() - timestamp;
					neww = performance.now();
					oldd = performance.now();
					respon = `*Kecepatan Respon* ${latensi.toFixed(
						4,
					)} *Second* \n ${
						oldd - neww
					} *miliseconds*\n\nRuntime : ${runtime(
						process.uptime(),
					)}\n\n💻 *Info Server*\n*RAM*: \`${formatp(
						os.totalmem() - os.freemem(),
					)} / ${formatp(
						os.totalmem(),
					)}\`\n\n*NodeJS Memory Usaage*\n${Object.keys(used)
						.map(
							(key, _, arr) =>
								`${key.padEnd(
									Math.max(...arr.map(v => v.length)),
									" ",
								)}: ${formatp(used[key])}`,
						)
						.join("\n")}\n\n${
						cpus[0]
							? `*Total CPU Usage*\n\`\`\`${cpus[0].model.trim()} (${
									cpu.speed
							  } MHZ)\`\`\`\n${Object.keys(cpu.times)
									.map(
										type =>
											`   ›  *${(type + "*").padEnd(6)}: ${(
												(100 * cpu.times[type]) /
												cpu.total
											).toFixed(2)}%`,
									)
									.join("\n")}`
							: ""
					}`.trim();
					m.keila(respon);
				}
				break;
			case "speedtest":
			case "speed":
				{
					m.reply("Testing Speed...");
					let cp = require("child_process");
					let { promisify } = require("util");
					let exec = promisify(cp.exec).bind(cp);
					let o;
					try {
						o = await exec("python3 speed.py");
					} catch (e) {
						o = e;
					} finally {
						let { stdout, stderr } = o;
						if (stdout.trim()) m.reply(stdout);
						if (stderr.trim()) m.reply(stderr);
					}
				}
				break;
			case "afk":
				{
					let user = global.db.users[m.sender];
					user.afkTime = +new Date();
					user.afkReason = text;
					m.reply(
						`@${m.sender.split("@")[0]} Telah Afk${
							text ? ": " + text : ""
						}`,
					);
				}
				break;
			case 'afkclear': {
          Object.values(global.db.users).forEach(user => {
              if (user.afkTime && user.afkTime !== -1) {
                  user.afkTime = -1;
                  user.afkReason = '';
              }
          });
          m.reply('Semua Pengguna Telah Dibatalkan Dari Kondisi AFK Secara Paksa!');
      }
        break;
			case "readviewonce":
			case "readviewone":
			case "rvo":
				{
					if (!m.quoted)
						return m.reply(
							`Reply view once message\nExample: ${
								prefix + command
							}`,
						);
					if (m.quoted.msg.viewOnce) {
						m.quoted.msg.viewOnce = false;
						await keila.sendMessage(
							m.chat,
							{
								forward: m.quoted,
							},
							{
								quoted: m,
							},
						);
					} else if (
						m.quoted.msg.message &&
						m.quoted.msg.message.audioMessage &&
						m.quoted.msg.message.audioMessage.viewOnce
					) {
						m.quoted.msg.message.audioMessage.viewOnce = false;
						m.quoted.msg.message.audioMessage.contextInfo = {
							forwardingScore: 1,
							isForwarded: true,
							mentionedJid: [m.sender],
						};
						await keila.relayMessage(
							m.chat,
							m.quoted.msg.message,
							{},
						);
					} else {
						m.keila(
							`Reply view once message\nExample: ${
								prefix + command
							}`,
						);
					}
				}
				break;
			case "inspect":
				{
					if (!text) return m.reply("Masukkan Link Group!");
					let code = q.match(/chat.whatsapp.com\/([\w\d]*)/g);
					if (code === null)
						return m.reply("No invite url detected.");
					code = code[0].replace("chat.whatsapp.com/", "");
					await keila
						.groupGetInviteInfo(code)
						.then(anu => {
							let {
								id,
								subject,
								owner,
								subjectOwner,
								creation,
								desc,
								descId,
								participants,
								size,
								descOwner,
							} = anu;
							console.log(anu);
							let par = `*Nama Gc* : ${subject}\n*ID* : ${id}\n${
								owner
									? `*Creator* : @${owner.split("@")[0]}`
									: "*Creator* : -"
							}\n*Jumlah Member* : ${size}\n*Gc Dibuat Tanggal* : ${new Date(
								creation * 1000,
							).toLocaleString()}\n*DescID* : ${
								descId ? descId : "-"
							}\n${
								subjectOwner
									? `*Nama GC Diubah Oleh* : @${
											subjectOwner.split("@")[0]
									  }`
									: "*Nama GC Diubah Oleh* : -"
							}\n${
								descOwner
									? `*Desc diubah oleh* : @${
											descOwner.split("@")[0]
									  }`
									: "*Desc diubah oleh* : -"
							}\n\n*Desc* : ${desc ? desc : "-"}\n`;
							keila.sendTextMentions(m.chat, par, m);
						})
						.catch(res => {
							if (res.data == 406)
								return m.reply("Grup Tidak Di Temukan❗");
							if (res.data == 410)
								return m.reply(
									"Url Grup Telah Di Setel Ulang❗",
								);
						});
				}
				break;
			case "addmsg":
				{
					if (!m.quoted)
						return m.reply(
							"Reply Pesan Yang Ingin Disave Di Database",
						);
					if (!text)
						return m.keila(
							`Example : ${prefix + command} file name`,
						);
					let msgs = global.db.database;
					if (text.toLowerCase() in msgs)
						return m.reply(
							`'${text}' telah terdaftar di list pesan`,
						);
					msgs[text.toLowerCase()] = m.quoted;
					delete msgs[text.toLowerCase()].chat;
					m.reply(
						`Berhasil menambahkan pesan di list pesan sebagai '${text}'\nAkses dengan ${prefix}getmsg ${text}\nLihat list Pesan Dengan ${prefix}listmsg`,
					);
				}
				break;
			case "delmsg":
			case "deletemsg":
				{
					if (!text) return m.reply("Nama msg yg mau di delete?");
					let msgs = global.db.database;
					if (text == "allmsg") {
						global.db.database = {};
						m.reply(
							"Berhasil menghapus seluruh msg dari list pesan",
						);
					} else {
						if (!(text.toLowerCase() in msgs))
							return m.reply(
								`'${text}' tidak terdaftar didalam list pesan`,
							);
						delete msgs[text.toLowerCase()];
						m.reply(`Berhasil menghapus '${text}' dari list pesan`);
					}
				}
				break;
			case "getmsg":
				{
					if (!text)
						return m.keila(
							`Example : ${
								prefix + command
							} file name\n\nLihat list pesan dengan ${prefix}listmsg`,
						);
					let msgs = global.db.database;
					if (!(text.toLowerCase() in msgs))
						return m.reply(
							`'${text}' tidak terdaftar di list pesan`,
						);
					await keila.relayMessage(
						m.chat,
						msgs[text.toLowerCase()],
						{},
					);
				}
				break;
			case "listmsg":
				{
					let seplit = Object.entries(global.db.database).map(
						([nama, isi]) => {
							return {
								nama,
								...isi,
							};
						},
					);
					let teks = "「 LIST DATABASE 」\n\n";
					for (let i of seplit) {
						teks += `⬡ *Name :* ${
							i.nama
						}\n⬡ *Type :* ${getContentType(i.message)?.replace(
							/Message/i,
							"",
						)}\n────────────────────────\n\n`;
					}
					m.reply(teks);
				}
				break;
			case "q":
			case "quoted":
				{
					if (!m.quoted) return m.reply("Reply Pesannya!");
					const anu = await m.getQuotedObj();
					if (!anu) return m.reply("Format Tidak Tersedia!");
					if (!anu.quoted)
						return m.reply(
							"Pesan Yang Anda Reply Tidak Mengandung Reply",
						);
					await keila.relayMessage(
						m.chat,
						{
							[anu.quoted.type]: anu.quoted.msg,
						},
						{},
					);
				}
				break;
			case "confes":
			case "confess":
			case "menfes":
			case "menfess":
				{
					if (m.isGroup) return m.reply(mess.private);
					if (game.menfes[m.sender])
						return m.reply(
							`Kamu Sedang Berada Di Sesi ${command}!`,
						);
					if (!text)
						return m.keila(
							`Example : ${prefix + command} 62xxxx|Nama Samaran`,
						);
					let [teks1, teks2] = text.split`|`;
					if (!isNaN(teks1) && !teks1.startsWith("0") && teks1) {
						const tujuan =
							teks1.replace(/[^0-9]/g, "") + "@s.whatsapp.net";
						const onWa = await keila.onWhatsApp(tujuan);
						if (!onWa.length > 0)
							return m.reply(
								"Nomer Tersebut Tidak Terdaftar Di Whatsapp!",
							);
						game.menfes[m.sender] = {
							tujuan: tujuan,
							nama: teks2,
							waktu: setTimeout(() => {
								if (game.menfes[m.sender])
									m.reply(`_Waktu ${command} habis_`);
								delete game.menfes[m.sender];
							}, 600000),
						};
						game.menfes[tujuan] = {
							tujuan: m.sender,
							nama: "Penerima",
							waktu: setTimeout(() => {
								if (game.menfes[tujuan])
									keila.sendMessage(tujuan, {
										text: `_Waktu ${command} habis_`,
									});
								delete game.menfes[tujuan];
							}, 600000),
						};
						keila.sendMessage(tujuan, {
							text: `_${command} connected_\n*Note :* jika ingin mengakhiri ketik _*${prefix}del${command}*_`,
						});
						m.keila(
							`_Memulai ${command}..._\n*Silahkan Mulai kirim pesan/media*\n*Durasi ${command} hanya selama 10 menit*\n*Note :* jika ingin mengakhiri ketik _*${prefix}del${command}*_`,
						);
					} else {
						m.keila(
							`Masukkan Nomernya!\nExample : ${
								prefix + command
							} 62xxxx|Nama Samaran`,
						);
					}
				}
				break;
			case "delconfes":
			case "delconfess":
			case "delmenfes":
			case "delmenfess":
				{
					if (!game.menfes[m.sender])
						return m.reply(
							`Kamu Tidak Sedang Berada Di Sesi ${
								command.split("del")[1]
							}!`,
						);
					let anu = game.menfes[m.sender];
					keila.sendMessage(anu.tujuan, {
						text: `Chat Di Akhiri Oleh ${
							anu.nama ? anu.nama : "Seseorang"
						}`,
					});
					m.reply(
						`Sukses Mengakhiri Sesi ${command.split("del")[1]}!`,
					);
					delete game.menfes[anu.tujuan];
					delete game.menfes[m.sender];
				}
				break;
case "sendich": {
    try {
        const jid = global.my.nl;
        const media = await (m.quoted ? m.quoted.download() : m.download());
        const type = m.quoted ? m.quoted.msg.mimetype : m.msg.mimetype;
        const length = m.quoted ? m.quoted.msg.fileLength : m.msg.fileLength;
        const text = args.join(' ') || `Gambar dari @${m.sender.split('@')[0]}`;

        if (!media) return m.reply('Tidak ada media yang ditemukan.');

        let profile;
        try {
            profile = await keila.profilePictureUrl(m.sender, 'image');
        } catch (e) {
            profile = global.fake.anonim;
        }

        const anu = await TelegraPh(media);
        const options = {
            image: { url: anu },
            mimetype: type,
            fileLength: length,
            caption: text,
            contextInfo: {
                externalAdReply: {
                    title: `Pesan Dari: ${m.pushName}`,
                    body: 'Chioriya',
                    showAdAttribution: true,
                    thumbnailUrl: profile,
                    mediaType: 1,
                    previewType: 0,
                    renderLargerThumbnail: false,
                    mediaUrl: 'https://keilaapi.vercel.app',
                    sourceUrl: 'https://keilaapi.vercel.app',
                },
            },
        };

        await keila.sendMessage(jid, options);
    } catch (error) {
        console.error("Terjadi error saat mengirim gambar:", error);
        m.reply('Pengiriman gambar gagal.');
    }
}
break;
case "sendtch":
{
    try {
        const jid = global.my.nl;
        const text = args.join(' ') || `Pesan Dari @${m.sender.split('@')[0]}`;
        
        let profile;
        try {
            profile = await keila.profilePictureUrl(m.sender, 'image')
        } catch (e) {
            profile = global.fake.anonim;
        }

        const options = {
            text: text,
            contextInfo: {
                externalAdReply: {
                    title: `Pesan Dari: ${m.pushName}`,
                    body: 'Chioriya',
                    showAdAttribution: true,
                    thumbnailUrl: profile,
                    mediaType: 1,
                    previewType: 0,
                    renderLargerThumbnail: false,
                    mediaUrl: 'https://telegra.ph/file/6d9e1d40d53418c9627d0.jpg',
                    sourceUrl: 'https://keilaapi.vercel.app',
                },
            },
        };

        //await keila.sendMessageToNewsLetter(jid, null, text, options);
        await keila.sendMessage(jid, options);
    } catch (error) {
        console.error("Terjadi error saat mengirim pesan:", error);
        m.reply('Pengiriman pesan gagal.');
    }
}
break;

case "sendach":
{
    try {
        const jid = global.my.nl;
        const media = await (m.quoted ? m.quoted.download() : m.download());
        const length = m.quoted ? m.quoted.msg.fileLength : m.msg.fileLength;
        const text = args.join(' ') || `Chioriya`;

        if (!media) return m.reply('Tidak ada media yang ditemukan.');
        
        let profile;
        try {
            profile = await keila.profilePictureUrl(m.sender, 'image')
        } catch (e) {
            profile = global.fake.anonim;
        }

        const anu = await TelegraPh(media);
        const options = {
            audio: { url: anu },
            mimetype: 'audio/mp4',
            ptt: true,
            contextInfo: {
                externalAdReply: {
                    title: `Pesan Dari: ${m.pushName}`,
                    body: text,
                    showAdAttribution: true,
                    thumbnailUrl: profile,
                    mediaType: 1,
                    previewType: 0,
                    renderLargerThumbnail: false,
                    mediaUrl: 'https://keilaapi.vercel.app',
                    sourceUrl: 'https://keilaapi.vercel.app',
                },
            },
        };

        await keila.sendMessage(jid, options);
    } catch (error) {
        console.error("Terjadi error saat mengirim audio:", error);
        m.reply('Pengiriman audio gagal.');
    }
}
break;

case "sendvch":
{
    try {
        const jid = global.my.nl;
        const media = await (m.quoted ? m.quoted.download() : m.download());
        const text = args.join(' ') || `Pesan Dari @${m.sender.split('@')[0]}`;
        const type = m.quoted ? m.quoted.msg.mimetype : m.msg.mimetype;
        const length = m.quoted ? m.quoted.msg.fileLength : m.msg.fileLength;

        if (!media) return m.reply('Tidak ada media yang ditemukan.');
        
        let profile;
        try {
            profile = await keila.profilePictureUrl(m.sender, 'image')
        } catch (e) {
            profile = global.fake.anonim;
        }

        const anu = await TelegraPh(media);
        const options = {
            video: { url: anu },
            mimetype: type,
            fileName: length,
            caption: text,
            contextInfo: {
                externalAdReply: {
                    title: `Pesan Dari: ${m.pushName}`,
                    body: 'Chioriya',
                    showAdAttribution: true,
                    thumbnailUrl: profile,
                    mediaType: 1,
                    previewType: 0,
                    renderLargerThumbnail: false,
                    mediaUrl: 'https://keilaapi.vercel.app',
                    sourceUrl: 'https://keilaapi.vercel.app',
                },
            },
        };

        //await keila.sendMessageToNewsLetter(jid, anu, '', options);
        await keila.sendMessage(jid, options);
    } catch (error) {
        console.error("Terjadi error saat mengirim video:", error);
        m.reply('Pengiriman video gagal.');
    }
}
break;
case "tempmail": {
    try {
        const inbox = await tempmail.createInbox();
        const emailMessage = `*Alamat Email Sementara:*\n\n${inbox.address}\n\nToken untuk memeriksa inbox akan dikirim melalui pesan pribadi. Gunakan token tersebut dengan perintah .checkmail.`;
        await m.keila(emailMessage);
        await keila.sendMessage(m.sender, { text: inbox.token }, { quoted: fkontak });
    } catch (error) {
        console.error('Error:', error);
        m.reply('Gagal membuat alamat email sementara.');
    }
}
break;

case "checkmail": {
    if (!text) 
        return m.keila('Harap masukkan token dari email sementara yang ingin diperiksa.\n\nContoh: .checkmail <token>');

    try {
        const emails = await tempmail.checkInbox(text);
        if (!emails || emails.length === 0) 
            return m.reply('Tidak ada pesan atau inbox sudah kedaluwarsa.');

        const messages = emails.map(email => `
*Dari:* ${email.from}
*Subjek:* ${email.subject}
*Tanggal:* ${new Date(email.date).toLocaleString()}
*Isi Pesan:*
${email.body}
        `).join('\n\n---\n\n');

        const replyMessage = `*Pesan di Inbox:*\n\n${messages}`;
        await m.reply(replyMessage);
    } catch (error) {
        console.error('Error:', error);
        m.reply('Gagal memeriksa pesan di inbox.');
    }
}
break;

			// Tools Menu
			case "cc": {
    const allowedCurrencies = [
        'aud', 'bgn', 'brl', 'cad', 'chf', 'cny', 'czk', 'dkk', 'eur', 'gbp', 'hkd', 'hrk', 'huf', 'idr', 'ils', 'inr', 'isk', 'jpy', 'krw', 'mxn', 'myr', 'nok', 'nzd', 'php', 'pln', 'ron', 'rub', 'sek', 'sgd', 'thb', 'try', 'usd', 'zar'
    ];

    let args = text.split(' ');
    if (args.length < 2) return m.keila('Format Salah! \n\n Example: .cc <jumlah> <mata_uang_asal> <mata_uang_tujuan>');

    let amount = parseFloat(args[0]);
    let fromCurrency = args[1].toLowerCase();
    let toCurrency = args[2] ? args[2].toLowerCase() : 'usd';

    if (isNaN(amount)) return m.reply('Jumlah tidak valid.');
    if (!allowedCurrencies.includes(fromCurrency) || !allowedCurrencies.includes(toCurrency)) {
        return m.reply('Mata uang tidak valid. Hanya mendukung: AUD, BGN, BRL, CAD, CHF, CNY, CZK, DKK, EUR, GBP, dan lainnya.');
    }

    try {
        const result = await fx(amount, fromCurrency, toCurrency);
        m.reply(`${amount} ${fromCurrency.toUpperCase()} = ${result} ${toCurrency.toUpperCase()}`);
    } catch (error) {
        console.error(error);
        m.reply('Terjadi kesalahan saat mengonversi mata uang. Pastikan mata uang yang digunakan benar.');
    }
}
break;
    case "transkrip":
    case "stt": {
        if (!m.quoted) return m.keila("Silakan kirim audio yang ingin ditranskrip.");
        const mime = m.quoted.mime;
        if (!mime.includes('audio')) return m.keila("Tolong kirim audio yang valid.");
        
        const audioPath = await m.quoted.download();
        try {
            const transcription = await transcribeAudio(audioPath);
            m.reply(transcription);
        } catch (error) {
            m.reply("Terjadi kesalahan saat mentranskripsi audio.");
        }
    }
    break;
			case "fetch":
			case "get":
				{
					if (!text.startsWith("http"))
						return m.keila(
							`No Query?\n\nExample : ${
								prefix + command
							} https://google.com`,
						);
					try {
						const res = await axios.get(
							isUrl(text) ? isUrl(text)[0] : text,
						);
						if (
							!/json|html|plain/.test(res.headers["content-type"])
						) {
							await m.reply(text);
						} else {
							m.reply(util.format(res.data));
						}
					} catch (e) {
						m.keila(util.format(e));
					}
				}
				break;
			case "toaud":
			case "toaudio":
				{
					if (!/video/.test(mime) && !/audio/.test(mime))
						return m.keila(
							`Kirim/Reply Video/Audio Yang Ingin Dijadikan Audio Dengan Caption ${
								prefix + command
							}`,
						);
					m.loading();
					let media = await (m.quoted
						? m.quoted.download()
						: m.download());
					let audio = await toAudio(media, "mp4");
					await keila.sendMessage(
						m.chat,
						{
							audio: audio,
							mimetype: "audio/mpeg",
						},
						{
							quoted: m,
						},
					);
				}
				break;
		
			case "tomp3":
				{
					if (!/video/.test(mime) && !/audio/.test(mime))
						return m.keila(
							`Kirim/Reply Video/Audio Yang Ingin Dijadikan Audio Dengan Caption ${
								prefix + command
							}`,
						);
					m.loading();
					let media = await (m.quoted
						? m.quoted.download()
						: m.download());
					let audio = await toAudio(media, "mp4");
					await keila.sendMessage(
						m.chat,
						{
							document: audio,
							mimetype: "audio/mpeg",
							fileName: `Convert By Keila Bot.mp3`,
						},
						{
							quoted: m,
						},
					);
				}
				break;
			case "tovn":
			case "toptt":
			case "tovoice":
				{
					if (!/video/.test(mime) && !/audio/.test(mime))
						return m.keila(
							`Kirim/Reply Video/Audio Yang Ingin Dijadikan Audio Dengan Caption ${
								prefix + command
							}`,
						);
					m.loading();
					let media = await (m.quoted
						? m.quoted.download()
						: m.download());
					let audio = await toPTT(media, "mp4");
					await keila.sendMessage(
						m.chat,
						{
							audio: audio,
							mimetype: "audio/ogg; codecs=opus",
							ptt: true,
						},
						{
							quoted: m,
						},
					);
				}
				break;
			case "togif":
				{
					if (!/webp/.test(mime) && !/video/.test(mime))
						return m.keila(
							`Reply Video/Stiker dengan caption *${
								prefix + command
							}*`,
						);
					m.loading();
					let { webp2mp4File } = require("./lib/uploader");
					let media = await keila.downloadAndSaveMediaMessage(qmsg);
					let webpToMp4 = await webp2mp4File(media);
					await keila.sendMessage(
						m.chat,
						{
							video: {
								url: webpToMp4.result,
								caption: "Convert Webp To Video",
							},
							gifPlayback: true,
						},
						{
							quoted: m,
						},
					);
					await fs.unlinkSync(media);
				}
				break;
			case "tovideo":
			case "tomp4":
				{
					if (!/webp/.test(mime) && !/video/.test(mime))
						return m.keila(
							`Reply Video/Stiker dengan caption *${
								prefix + command
							}*`,
						);
					m.loading();
					let { webp2mp4File } = require("./lib/uploader");
					let media = await keila.downloadAndSaveMediaMessage(qmsg);
					let webpToMp4 = await webp2mp4File(media);
					await keila.sendMessage(
						m.chat,
						{
							video: {
								url: webpToMp4.result,
							},
							caption: "Convert Webp To Video",
						},
						{
							quoted: m,
						},
					);
					await fs.unlinkSync(media);
				}
				break;
			case "toimage":
			case "toimg":
				{
					if (!/webp/.test(mime))
						return m.keila(
							`Reply Video/Stiker dengan caption *${
								prefix + command
							}*`,
						);
					m.loading();
					let media = await keila.downloadAndSaveMediaMessage(qmsg);
					let ran = await getRandom(".png");
					exec(`ffmpeg -i ${media} ${ran}`, err => {
						fs.unlinkSync(media);
						if (err) return m.reply("Gagal❗");
						let buffer = fs.readFileSync(ran);
						keila.sendMessage(
							m.chat,
							{
								image: buffer,
							},
							{
								quoted: m,
							},
						);
						fs.unlinkSync(ran);
					});
				}
				break;
			case "toptv":
				{
					if (!/video/.test(mime))
						return m.keila(
							`Kirim/Reply Video Yang Ingin Dijadikan PTV Message Dengan Caption ${
								prefix + command
							}`,
						);
					if (
						(m.quoted ? m.quoted.type : m.type) === "videoMessage"
					) {
						const anu = await (m.quoted
							? m.quoted.download()
							: m.download());
						const msg = await generateWAMessageContent(
							{
								video: anu,
							},
							{
								upload: keila.waUploadToServer,
							},
						);
						await keila.relayMessage(
							m.chat,
							{
								ptvMessage: msg.videoMessage,
							},
							{},
						);
					} else {
						m.reply("Reply Video Yang Mau Di Ubah Ke PTV Message!");
					}
				}
				break;
			case "tourl":
				{
					let { fileIO, TelegraPh } = require("./lib/uploader");
					if (/jpg|jpeg|png/.test(mime)) {
						m.loading();
						let media = await (m.quoted
							? m.quoted.download()
							: m.download());
						let anu = await TelegraPh(media);
						m.reply("Url : " + anu);
					} else if (/webp|video|sticker|audio/.test(mime)) {
						m.loading();
						let media = await (m.quoted
							? m.quoted.download()
							: m.download());
						let anu = await TelegraPh(media);
						m.reply("Url : " + anu);
					} else {
						m.reply("Send Media yg ingin di Upload!");
					}
				}
				break;
			case "texttospech":
			case "tts":
			case "tospech":
				{
					if (!text)
						return m.keila(
							"Mana text yg mau diubah menjadi audio?",
						);
					let { tts } = require("./lib/tts");
					let anu = await tts(text);
					keila.sendMessage(
						m.chat,
						{
							audio: anu,
							ptt: true,
							mimetype: "audio/mpeg",
						},
						{
							quoted: m,
						},
					);
				}
				break;
			case "toqr":
			case "qr":
				{
					if (!text)
						return m.keila(
							`Ubah Text ke Qr dengan *${
								prefix + command
							}* textnya`,
						);
					m.loading();
					await keila.sendMessage(
						m.chat,
						{
							image: {
								url:
									"https://api.qrserver.com/v1/create-qr-code/?size=1000x1000&data=" +
									text,
							},
							caption: "Nih Bro",
						},
						{
							quoted: m,
						},
					);
				}
				break;
			case "ssweb":
				{
					if (!text)
						return m.keila(
							`Example: ${
								prefix + command
							} https://keilaapi.vercel.app`,
						);
					if (!text.startsWith("http")) {
						let buf =
							"https://image.thum.io/get/width/1900/crop/1000/fullpage/https://" +
							q;
						await keila.sendMessage(
							m.chat,
							{
								image: {
									url: buf,
								},
								caption: "Nih Kak Hasilnya!",
							},
							{
								quoted: m,
							},
						);
					} else {
						let buf =
							"https://image.thum.io/get/width/1900/crop/1000/fullpage/" +
							q;
						await keila.sendMessage(
							m.chat,
							{
								image: {
									url: buf,
								},
								caption: "Nih Kak!",
							},
							{
								quoted: m,
							},
						);
					}
				}
				break;
			case "hd":
			case "remini":
			case "upscale": {
    keila.enhancer = keila.enhancer ? keila.enhancer : {};
    if (Number(quoted.msg.fileLength.low) > 5000000) return m.reply("The file is too large.");
    if (m.sender in keila.enhancer) return m.reply("Please wait, there is still something in process");
    if (/image|webp/.test(quoted.msg.mimetype)) {
        keila.enhancer[m.sender] = true;
        try {
            let media = await (m.quoted ? m.quoted.download() : m.download());
            //let upload = await TelegraPh(media);
            //let res = await axios.get(upload, { responseType: 'arraybuffer' });
            let imageData = Buffer.from(media, 'binary');
            let pros = await processing(imageData, 'enhance');
            var error;
            keila.sendMessage(m.chat, { image: pros, caption: "Nih Kak!" }, { quoted: m });
        } catch (err) {
            console.log(err);
            keila.sendMessage(m.chat, `Terjadi Kesalahan: ${err}`, m);
            error = true;
            delete keila.enhancer[m.sender];
        } finally {
            if (error) return m.reply("Terjadi Kesalahan");
            delete keila.enhancer[m.sender];
        }
    } else {
        keila.sendMessage(m.chat, "Hanya Berlaku Untuk Gambar Saja", m);
    }
}
break;
case "rcl":
case "recolor":
case "colorize": {
    keila.recolor = keila.recolor ? keila.recolor : {};
    if (Number(quoted.msg.fileLength.low) > 5000000) return m.reply("The file is too large.");
    if (m.sender in keila.recolor) return m.reply("Please wait, there is still something in process");
    if (/image|webp/.test(quoted.msg.mimetype)) {
        keila.recolor[m.sender] = true;
        try {
            let media = await (m.quoted ? m.quoted.download() : m.download());
            //let upload = await TelegraPh(media);
            //let res = await axios.get(upload, { responseType: 'arraybuffer' });
            let imageData = Buffer.from(media, 'binary');
            let pros = await processing(imageData, 'recolor');
            var error;
            keila.sendMessage(m.chat, { image: pros, caption: "Nih Kak!" }, { quoted: m });
        } catch (err) {
            console.log(err);
            keila.sendMessage(m.chat, `Terjadi Kesalahan: ${err}`, m);
            error = true;
            delete keila.recolor[m.sender];
        } finally {
            if (error) return m.reply("Terjadi Kesalahan");
            delete keila.recolor[m.sender];
        }
    } else {
        keila.sendMessage(m.chat, "Hanya Berlaku Untuk Gambar Saja", m);
    }
}
break;
case "dhz":
case "dehaze": {
    keila.dehaze = keila.dehaze ? keila.dehaze : {};
    if (Number(quoted.msg.fileLength.low) > 5000000) return m.reply("The file is too large.");
    if (m.sender in keila.dehaze) return m.reply("Please wait, there is still something in process");
    if (/image|webp/.test(quoted.msg.mimetype)) {
        keila.dehaze[m.sender] = true;
        try {
            let media = await (m.quoted ? m.quoted.download() : m.download());
            let imageData = Buffer.from(media);
            let pros = await processing(imageData, 'dehaze');
            var error;
            keila.sendMessage(m.chat, { image: pros, caption: "Nih Kak!" }, { quoted: m });
        } catch (err) {
            console.log(err);
            keila.sendMessage(m.chat, `Terjadi Kesalahan: ${err}`, m);
            error = true;
            delete keila.dehaze[m.sender];
        } finally {
            if (error) return m.reply("Terjadi Kesalahan");
            delete keila.dehaze[m.sender];
        }
    } else {
        keila.sendMessage(m.chat, "Hanya Berlaku Untuk Gambar Saja", m);
    }
}
break;
case "rsz":
case "resize": {
    keila.resize = keila.resize ? keila.resize : {};
    if (Number(quoted.msg.fileLength.low) > 5000000) return m.reply("The file is too large.");
    if (m.sender in keila.resize) return m.reply("Please wait, there is still something in process");

    let scale = parseInt(text.trim());
    if (isNaN(scale) || scale < 1 || scale > 9) return m.reply("Please provide a valid scale from 1 to 9.");

    if (/image|webp/.test(quoted.msg.mimetype)) {
        keila.resize[m.sender] = true;
        try {
            let media = await (m.quoted ? m.quoted.download() : m.download());
            let tmpInputPath = './tmp/input_image.png';
            let tmpOutputPath = './tmp/output_image.png';

            fs.writeFileSync(tmpInputPath, media);

            let resizeFactor = 1 - (scale * 0.1);

            await new Promise((resolve, reject) => {
                ffmpeg(tmpInputPath)
                    .size(`${Math.round(resizeFactor * 100)}%`)
                    .output(tmpOutputPath)
                    .on('end', resolve)
                    .on('error', reject)
                    .run();
            });

            let resizedImage = fs.readFileSync(tmpOutputPath);
            keila.sendMessage(m.chat, { image: resizedImage, caption: `Gambar telah di-resize dengan skala ${scale}!` }, { quoted: m });

            fs.unlinkSync(tmpInputPath);
            fs.unlinkSync(tmpOutputPath);

        } catch (err) {
            console.log(err);
            keila.sendMessage(m.chat, `Terjadi Kesalahan: ${err}`, m);
            error = true;
            delete keila.resize[m.sender];
        } finally {
            if (error) return m.reply("Terjadi Kesalahan");
            delete keila.resize[m.sender];
        }
    } else {
        keila.sendMessage(m.chat, "Hanya Berlaku Untuk Gambar Saja", m);
    }
}
break;
case "cut": {
    keila.cut = keila.cut ? keila.cut : {};
    if (Number(quoted.msg.fileLength.low) > 10000000) return m.reply("The file is too large.");
    if (m.sender in keila.cut) return m.reply("Please wait, there is still something in process");

    const mimeType = quoted.msg.mimetype;
    const validMIMETypes = /audio\/|video\//;

    if (!validMIMETypes.test(mimeType)) {
        return m.reply("File must be of type audio or video.");
    }

    try {
        const [startTime, endTime] = text.trim().split(' ');

        if (!startTime || !endTime) return m.reply("Please provide both start and end times in the correct format.");

        const startSeconds = convertTimeToSeconds(startTime);
        const endSeconds = convertTimeToSeconds(endTime);

        if (isNaN(startSeconds) || isNaN(endSeconds) || startSeconds >= endSeconds) {
            return m.reply("Invalid time format or start time is greater than or equal to end time.");
        }

        keila.cut[m.sender] = true;
        let media = await (m.quoted ? m.quoted.download() : m.download());

        const extension = mimeType.split('/')[1];
        const tmpInputPath = `./tmp/input_media.${extension}`;
        const tmpConvertedPath = './tmp/converted_media.mp4';
        const tmpOutputPath = './tmp/output_media.mp4';

        fs.writeFileSync(tmpInputPath, media);

        await new Promise((resolve, reject) => {
            ffmpeg(tmpInputPath)
                .output(tmpConvertedPath)
                .on('end', resolve)
                .on('error', reject)
                .run();
        });

        await new Promise((resolve, reject) => {
            ffmpeg(tmpConvertedPath)
                .setStartTime(startSeconds)
                .setDuration(endSeconds - startSeconds)
                .output(tmpOutputPath)
                .on('end', resolve)
                .on('error', reject)
                .run();
        });

        let outputMedia = fs.readFileSync(tmpOutputPath);
        const outputMimeType = mimeType.includes('video') ? 'video/mp4' : 'audio/mp4';
        
        keila.sendMessage(m.chat, { [outputMimeType.includes('video') ? 'video' : 'audio']: outputMedia, mimetype: outputMimeType }, { quoted: m });

        fs.unlinkSync(tmpInputPath);
        fs.unlinkSync(tmpConvertedPath);
        fs.unlinkSync(tmpOutputPath);

    } catch (err) {
        console.log(err);
        keila.sendMessage(m.chat, `Terjadi Kesalahan: ${err}`, m);
        error = true;
        delete keila.cut[m.sender];
    } finally {
        if (error) return m.reply("Terjadi Kesalahan");
        delete keila.cut[m.sender];
    }
}
break;
case "teles":
case "tstiker":
case "ts":
case "telesticker":
case "tsticker":
case "telestiker": {
    if (args[1] && args[1].match(/(https:\/\/t.me\/addstickers\/)/gi)) {
        try {
            let page = parseInt(args[0]) || 1;
            let res = await Telesticker(args[1]);
            let limitss = 10;
            let lmits = 4;
            let startIndex = (page - 1) * limitss;
            let endIndex = startIndex + limitss;
            let stickersToSend = res.slice(startIndex, endIndex);

            if (stickersToSend.length === 0) {
                return m.keila('Tidak ada stiker untuk ditampilkan.');
            }

            m.react('⏳');

            let additionalText = '';
            let isToPrivate = false;
            if (m.isGroup && stickersToSend.length > lmits) {
                additionalText = ' Ke Pribadi!\nDikarenakan Melebihi ' + lmits + ' Stiker';
                isToPrivate = true;
            }

            await keila.sendMessage(m.chat, { text: 'Mengirim ' + stickersToSend.length + ' Stiker' + additionalText }, { quoted: fkontak });

            if (isToPrivate) {
                for (let i = 0; i < stickersToSend.length; i++) {
                    await keila.sendMessage(m.sender, { sticker: { url: stickersToSend[i].url } });
                    await new Promise(resolve => setTimeout(resolve, 2500));
                }
            } else {
                for (let i = 0; i < stickersToSend.length; i++) {
                    await keila.sendMessage(m.chat, { sticker: { url: stickersToSend[i].url } });
                    await new Promise(resolve => setTimeout(resolve, 2500));
                }
            }
            m.react('✅');
        } catch (error) {
            m.reply('Gagal mendapatkan stiker dari URL yang diberikan.');
        }
    } else {
        m.keila('Masukkan URL Stiker Nya! \n\n\nExample: .telestiker 2 <url_add_stiker>');
    }
}
break;
case "ttp":
    {
        if (!text) {
            return m.reply("Silakan masukkan teks yang ingin diubah menjadi stiker teks (TTP).");
        }

        try {
            const result = await ttp(text);
            const media = await axios.get(result.result, {
                responseType: 'arraybuffer'
            });

            await keila.sendAsSticker(
                m.chat,
                media.data,
                m,
                "image",
                {
                    packname: global.packname,
                    author: global.author,
                },
            );
        } catch (err) {
            console.error(err);
            return m.reply("Terjadi kesalahan saat membuat stiker teks.");
        }
    }
    break;
  case "yc":
    {
        if (!text) {
            return m.reply("Silakan masukkan teks yang ingin diubah menjadi stiker YouTube.");
        }

        let profile;
        try {
            profile = await keila.profilePictureUrl(m.sender, 'image');
        } catch {
            profile = global.fake.anonim;
        }

        try {
            const profilnya = await chatBox(profile);  // Upload URL profil menggunakan fungsi chatBox
            const response = `https://itzpire.com/maker/yt-comment?username=${encodeURIComponent(m.pushName)}&pp_user=${profilnya}&comment=${encodeURIComponent(text)}`;

            await keila.sendMessage(m.chat, { image: { url: response }, caption: 'Here is result image!' }, { quoted: fkontak });
        } catch (err) {
            console.error(err);
            return m.reply("Terjadi kesalahan saat membuat stiker.");
        }
    }
    break;
case "qc":
    {
        if (!text) {
            return m.reply("Silakan masukkan teks yang ingin diubah menjadi stiker quote.");
        }

        let profile;
        try {
            profile = await keila.profilePictureUrl(m.sender, 'image')
        } catch (e) {
            profile = global.fake.anonim;
        }

        try {
            const result = await qouted(text, m.pushName, profile);

            await keila.sendAsSticker(
                m.chat,
                result.result,
                m,
                "image",
                {
                    packname: global.packname,
                    author: global.author,
                },
            );
        } catch (err) {
            console.error(err);
            return m.reply("Terjadi kesalahan saat membuat stiker quote.");
        }
    }
    break;
  		case "sticker":
			case "stiker":
			case "s":
			case "stickergif":
			case "stikergif":
			case "sgif":
				{
					if (!/image|video|sticker/.test(quoted.type))
						return m.keila(
							`Kirim/reply gambar/video/gif dengan caption ${
								prefix + command
							}\nDurasi Image/Video/Gif 1-9 Detik`,
						);
					let media = await (m.quoted
						? m.quoted.download()
						: m.download());
					if (/image|webp/.test(mime)) {
						if (text == "meta") {
							await keila.sendAsSticker(
								m.chat,
								media,
								m,
								"image",
								{
									packname: global.packname,
									author: global.author,
									isAvatar: 1,
								},
							);
						} else {
							await keila.sendAsSticker(
								m.chat,
								media,
								m,
								"image",
								{
									packname: global.packname,
									author: global.author,
								},
							);
						}
					} else if (/video/.test(mime)) {
						if ((quoted.msg || quoted).seconds > 11)
							return m.reply("Maksimal 10 detik!");
						m.loading();
						await keila.sendAsSticker(m.chat, media, m, "video", {
							packname: global.packname,
							author: global.author,
						});
					} else {
						m.keila(
							`Kirim/reply gambar/video/gif dengan caption ${
								prefix + command
							}\nDurasi Image/Video/Gif 1-9 Detik`,
						);
					}
				}
				break;
			case "stickerwm":
			case "swm":
			case "wm":
			case "curi":
			case "colong":
			case "take":
			case "stickergifwm":
			case "sgifwm":
				{
					if (!/image|video|sticker/.test(quoted.type))
						return m.keila(
							`Kirim/reply gambar/video/gif dengan caption ${
								prefix + command
							}\nDurasi Image/Video/Gif 1-9 Detik`,
						);
					let media = await (m.quoted
						? m.quoted.download()
						: m.download());
					let teks1 = text.split`|`[0] ? text.split`|`[0] : " ";
					let teks2 = text.split`|`[1] ? text.split`|`[1] : " ";
					if (/image|webp/.test(mime)) {
						if (text == "meta") {
							await keila.sendAsSticker(
								m.chat,
								media,
								m,
								"image",
								{
									packname: teks1,
									author: teks2,
									isAvatar: 1,
								},
							);
						} else {
							await keila.sendAsSticker(
								m.chat,
								media,
								m,
								"image",
								{
									packname: teks1,
									author: teks2,
								},
							);
						}
					} else if (/video/.test(mime)) {
						if ((quoted.msg || quoted).seconds > 11)
							return m.reply("Maksimal 10 detik!");
						m.loading();
						await keila.sendAsSticker(m.chat, media, m, "video", {
							packname: teks1,
							author: teks2,
						});
					} else {
						m.keila(
							`Kirim/reply gambar/video/gif dengan caption ${
								prefix + command
							}\nDurasi Video/Gif 1-9 Detik`,
						);
					}
				}
				break;
			case "smeme":
			case "stickmeme":
			case "stikmeme":
			case "stickermeme":
			case "stikermeme":
				{
					try {
						if (!/image|webp/.test(mime))
							return m.keila(
								`Kirim/reply image/sticker\nDengan caption ${
									prefix + command
								} atas|bawah`,
							);
						if (!text)
							return m.keila(
								`Kirim/reply image/sticker dengan caption ${
									prefix + command
								} atas|bawah`,
							);
						m.loading();
						let atas = text.split`|`[0] ? text.split`|`[0] : "-";
						let bawah = text.split`|`[1] ? text.split`|`[1] : "-";
						let media = await (m.quoted
							? m.quoted.download()
							: m.download());
						let mem = await UguuSe(media);
						let smeme = `https://api.memegen.link/images/custom/${encodeURIComponent(
							atas,
						)}/${encodeURIComponent(bawah)}.png?background=${
							mem.url
						}`;
						await keila.sendAsSticker(m.chat, smeme, m, "image", {
							packname: global.packname,
							author: global.author,
						});
					} catch (e) {
						console.log(e);
						m.reply("Gagal!");
					}
				}
				break;
			case "nulis":
				{
					m.keila(
						`*Example*\n${prefix}nuliskiri\n${prefix}nuliskanan\n${prefix}foliokiri\n${prefix}foliokanan`,
					);
				}
				break;
			case "nuliskiri":
				{
					if (!text)
						return m.keila(
							`Kirim perintah *${prefix + command}* Teksnya`,
						);
					m.loading();
					const splitText = text.replace(/(\S+\s*){1,9}/g, "$&\n");
					const fixHeight = splitText
						.split("\n")
						.slice(0, 31)
						.join("\n");
					spawn("convert", [
						"./src/nulis/images/buku/sebelumkiri.jpg",
						"-font",
						"./src/nulis/font/Indie-Flower.ttf",
						"-size",
						"960x1280",
						"-pointsize",
						"23",
						"-interline-spacing",
						"2",
						"-annotate",
						"+140+153",
						fixHeight,
						"./src/nulis/images/buku/setelahkiri.jpg",
					])
						.on("error", () => m.reply(mess.error))
						.on("exit", () => {
							keila.sendMessage(
								m.chat,
								{
									image: fs.readFileSync(
										"./src/nulis/images/buku/setelahkiri.jpg",
									),
									caption:
										"Jangan Malas Lord. Jadilah siswa yang rajin ರ_ರ",
								},
								{
									quoted: m,
								},
							);
						});
				}
				break;
			case "nuliskanan":
				{
					if (!text)
						return m.keila(
							`Kirim perintah *${prefix + command}* Teksnya`,
						);
					m.loading();
					const splitText = text.replace(/(\S+\s*){1,9}/g, "$&\n");
					const fixHeight = splitText
						.split("\n")
						.slice(0, 31)
						.join("\n");
					spawn("convert", [
						"./src/nulis/images/buku/sebelumkanan.jpg",
						"-font",
						"./src/nulis/font/Indie-Flower.ttf",
						"-size",
						"960x1280",
						"-pointsize",
						"23",
						"-interline-spacing",
						"2",
						"-annotate",
						"+128+129",
						fixHeight,
						"./src/nulis/images/buku/setelahkanan.jpg",
					])
						.on("error", () => m.reply(mess.error))
						.on("exit", () => {
							keila.sendMessage(
								m.chat,
								{
									image: fs.readFileSync(
										"./src/nulis/images/buku/setelahkanan.jpg",
									),
									caption:
										"Jangan Malas Lord. Jadilah siswa yang rajin ರ_ರ",
								},
								{
									quoted: m,
								},
							);
						});
				}
				break;
			case "foliokiri":
				{
					if (!text)
						return m.keila(
							`Kirim perintah *${prefix + command}* Teksnya`,
						);
					m.loading();
					const splitText = text.replace(/(\S+\s*){1,9}/g, "$&\n");
					const fixHeight = splitText
						.split("\n")
						.slice(0, 38)
						.join("\n");
					spawn("convert", [
						"./src/nulis/images/folio/sebelumkiri.jpg",
						"-font",
						"./src/nulis/font/Indie-Flower.ttf",
						"-size",
						"1720x1280",
						"-pointsize",
						"23",
						"-interline-spacing",
						"4",
						"-annotate",
						"+48+185",
						fixHeight,
						"./src/nulis/images/folio/setelahkiri.jpg",
					])
						.on("error", () => m.reply(mess.error))
						.on("exit", () => {
							keila.sendMessage(
								m.chat,
								{
									image: fs.readFileSync(
										"./src/nulis/images/folio/setelahkiri.jpg",
									),
									caption:
										"Jangan Malas Lord. Jadilah siswa yang rajin ರ_ರ",
								},
								{
									quoted: m,
								},
							);
						});
				}
				break;
			case "foliokanan":
				{
					if (!text)
						return m.keila(
							`Kirim perintah *${prefix + command}* Teksnya`,
						);
					m.loading();
					const splitText = text.replace(/(\S+\s*){1,9}/g, "$&\n");
					const fixHeight = splitText
						.split("\n")
						.slice(0, 38)
						.join("\n");
					spawn("convert", [
						"./src/nulis/images/folio/sebelumkanan.jpg",
						"-font",
						"./src/nulis/font/Indie-Flower.ttf",
						"-size",
						"1720x1280",
						"-pointsize",
						"23",
						"-interline-spacing",
						"4",
						"-annotate",
						"+89+190",
						fixHeight,
						"./src/nulis/images/folio/setelahkanan.jpg",
					])
						.on("error", () => m.reply(mess.error))
						.on("exit", () => {
							keila.sendMessage(
								m.chat,
								{
									image: fs.readFileSync(
										"./src/nulis/images/folio/setelahkanan.jpg",
									),
									caption:
										"Jangan Malas Lord. Jadilah siswa yang rajin ರ_ರ",
								},
								{
									quoted: m,
								},
							);
						});
				}
				break;
				case "ssweb2": {
    if (!text) return keila.sendMessage(m.chat, { text: 'Masukkan URL yang ingin di-screenshot!' }, { quoted: m })

    const [device, url] = text.startsWith('desktop') || text.startsWith('mobile') || text.startsWith('tablet')
        ? text.split(' ').map(v => v.trim())
        : ['desktop', text.trim()]

    if (!url) return keila.sendMessage(m.chat, { text: 'URL tidak valid!' }, { quoted: m })

    try {
        const { result } = await sswebKei(url, device)
        await keila.sendMessage(m.chat, { image: result, caption: `Screenshot berhasil diambil.\n\nURL: ${url}\nDevice: ${device}` }, { quoted: m })
    } catch (err) {
        console.error(err)
        await keila.sendMessage(m.chat, { text: `Gagal mengambil screenshot.\n\nError: ${err.message || err}` }, { quoted: m })
    }
}
break;

				case "whatmusik": 
    if (!m.quoted) {
        keila.sendMessage(m.chat, { text: 'Balas pesan yang berisi audio atau video.' });
        break;
    }
    
    if (/audio|video/.test(mime)) {
        if ((m.quoted.msg || m.quoted).seconds > 20) {
            keila.sendMessage(m.chat, { text: 'File terlalu besar, potong jadi 10-20 detik.' });
            break;
        }
        
        keila.sendMessage(m.chat, { text: 'Sedang memproses...' });
        
        let media = await m.quoted.download();
        let ext = mime.split('/')[1];
        fs.writeFileSync(`./tmp/${m.sender}.${ext}`, media);
        
        try {
            let res = await acr.identify(fs.readFileSync(`./tmp/${m.sender}.${ext}`));
            let { code, msg } = res.status;
            
            if (code !== 0) throw msg;
            
            let { title, artists } = res.metadata.music[0];
            let txt = `*Info Music*\n\n_Maaf Jika Tidak Akurat_\nJudul: ${title}\nArtis: ${artists !== undefined ? artists.map(v => v.name).join(', ') : 'Tidak ditemukan'}
            `.trim();
            
            keila.sendMessage(m.chat, { text: txt });
        } catch (err) {
            keila.sendMessage(m.chat, { text: 'Gagal mengenali musik. Coba lagi.' });
        } finally {
            fs.unlinkSync(`./tmp/${m.sender}.${ext}`);
        }
    } else {
        keila.sendMessage(m.chat, { text: 'Terjadi kesalahan, balas audio atau video.' });
    }
    break;

			// Ai Menu
case "animedif":
{
    if (!text) {
        return m.reply('Please provide a description for the image.');
    }
    try {
        let response = await axios.get(`https://itzpire.com/ai/animediff2?prompt=${text}`);
        await keila.sendMessage(m.chat, { image: { url: response.data.result }, caption: 'Here is result image!' }, { quoted: fkontak });
    } catch (error) {
        m.keila("Error: " + error.message);
    }
}
break;
case "tonime":
case "toanime":
{
    if (/jpg|jpeg|png/.test(mime)) {
        m.loading();
        let media = await (m.quoted
            ? m.quoted.download()
            : m.download());
        try {
            let uploadUrl = await uploadImage(media);
            let response = await axios.get(`https://api.nyxs.pw/ai-image/jadianime?url=${uploadUrl}`);
            await keila.sendMessage(m.chat, { image: { url: response.data.result }, caption: 'Here is result image!' }, { quoted: fkontak });
        } catch (error) {
            m.keila("Error: " + error.message);
        }
    } else {
        m.reply("Send an image (jpg, jpeg, png) to convert it to anime style!");
    }
}
break;
case "hdr":
{
    if (/jpg|jpeg|png/.test(mime)) {
        m.loading();
        let media = await (m.quoted
            ? m.quoted.download()
            : m.download());
        try {
            let uploadUrl = await uploadImage(media);
            let response = await axios.get(`https://itzpire.com/tools/enhance?url=${uploadUrl}&type=modelx2`);
            await keila.sendMessage(m.chat, { image: { url: response.data.result.img }, caption: 'Here is result image!' }, { quoted: fkontak });
        } catch (error) {
            m.keila("Error: " + error.message);
        }
    } else {
        m.reply("Send an image (jpg, jpeg, png) to convert it to enhance!");
    }
}
break;
case "hdvid":
case "hdv":
case "hdvideo":
{
    if (!isCreator) return m.reply('Perintah ini hanya bisa digunakan oleh creator.');

    if (/mp4|mkv|mov/.test(mime)) {
        try {
            const videoDuration = (m.msg?.seconds || m.quoted?.msg?.seconds);
            if (videoDuration > 5) {
                return m.reply("Maksimal 5 detik!");
            }

            m.loading();

            let media = await (m.quoted
                ? m.quoted.download()
                : m.download());

            const inputFile = `./tmp/input_${Date.now()}.mp4`;
            const outputFile = `./tmp/output_${Date.now()}.mp4`;

            fs.writeFileSync(inputFile, media);

            exec(`ffmpeg -i ${inputFile} -vf "scale=iw*2:ih*2,hqdn3d=1.5:1.5,unsharp=3:3:0.5" -c:v libx264 -preset fast -crf 23 -c:a copy ${outputFile}`, async (error) => {
                if (error) {
                    m.keila("Error: " + error.message);
                    return;
                }

                await keila.sendMessage(m.chat, { video: { url: outputFile }, caption: 'Here is the enhanced video!' }, { quoted: fkontak });

                fs.unlinkSync(inputFile);
                fs.unlinkSync(outputFile);
            });
        } catch (error) {
            m.keila("Error: " + error.message);
        }
    } else {
        m.reply("Send a video (mp4, mkv, mov) to enhance it!");
    }
}
break;
case "rbg":
case "removebg":
{
    if (/jpg|jpeg|png/.test(mime)) {
        m.loading();
        let media = await (m.quoted
            ? m.quoted.download()
            : m.download());
        try {
            let uploadUrl = await uploadImage(media);
            let response = await axios.get(`https://api.nyxs.pw/tools/removebg?url=${uploadUrl}`);
            await keila.sendMessage(m.chat, { image: { url: response.data.result }, caption: 'Here is result image!' }, { quoted: fkontak });
        } catch (error) {
            m.keila("Error: " + error.message);
        }
    } else {
        m.reply("Send an image (jpg, jpeg, png) to remove background!");
    }
}
break;
case "dif":
case "stabledif":
case "diffusion":
case "stablediffusion": {
  if (!text) {
    return m.reply('Please provide a description for the image.');
  }

  const GPT4js = await getGPT4js();

  const options = {
    provider: 'StableDiffusion'
  };

  try {
    const provider = await GPT4js.createProvider(options.provider);
    const base64Image = await provider.imageGeneration(text, options);

    if (base64Image) {
      await keila.sendMessage(m.chat, { image: { url: base64Image[0] }, caption: `Here is your image!\n\nPrompt: ${text}` }, { quoted: fkontak });
    } else {
      m.reply('No image generated. Please try again later.');
    }
  } catch (error) {
    m.keila(`Error processing your request: ${error.message}`);
  }
}
break;
case "dalle": {
  if (!text) {
    return m.reply('Please provide a description for the image.');
  }

  const GPT4js = await getGPT4js();

  const options = {
    provider: 'DALLE2'
  };

  try {
    const provider = await GPT4js.createProvider(options.provider);
    const base64Image = await provider.imageGeneration(text, options);

    if (base64Image) {
      await keila.sendMessage(m.chat, { image: { url: base64Image[0] }, caption: `Here is your image! \n\nPrompt: ${text}` }, { quoted: fkontak });
    } else {
      m.reply('No image generated. Please try again later.');
    }
  } catch (error) {
    m.keila(`Error processing your request: ${error.message}`);
  }
}
break;
case "ai": {
  if (!text) {
    return m.reply('Please provide a message to send to the AI.');
  }

  const GPT4js = await getGPT4js();

  const options = {
    provider: 'Aryahcr',
    model: 'gpt-4'
  };

  try {
    const provider = await GPT4js.createProvider(options.provider);
    const messages = [
      { role: "system", content: "You're an Indonesia expert bot owned by KeiLaSenpai. Always respond in Indonesian language only." },
      { role: 'user', content: text }
    ];
    const responseText = await provider.chatCompletion(messages, options);
    
    const gptResponse = responseText.match(/"gpt":"(.*?)"/s);
    const hasil = gptResponse ? ` ${gptResponse[1].replace(/\\n/g, '\n')}` : 'No valid response from AI.';
    
    await keila.sendMessage(m.chat, { text: responseText }, { quoted: fkontak });
    
  } catch (error) {
    m.reply(`Error processing your request: ${error.message}`);
  }
}
break;
			case "gpt":
			case "openai":
				{
					if (!text)
						return m.keila(`Example: ${prefix + command} query`);
					const hasil = await chatGpt(text);
					m.reply(hasil);
				}
				break;
			case "tl":
{
  try {
    let lang = args[0];
    let text = m.quoted?.msg || args.slice(1).join(' ');

    if (!args[0] && !m.quoted) {
      return m.keila(`*• Example* :  ${usedPrefix}${command} id how are you`);
    }

    if ((args[0] || '').length !== 2) {
      lang = 'id';
      text = m.quoted?.msg || args.join(' ');
    }

    if (!text) return m.reply('Reply atau masukkan teks.');

    let result = await translate(text, { to: lang, autoCorrect: true }).catch(_ => null);

    if (!result) return m.reply('Terjemahan gagal.');

    await keila.sendMessage(m.chat, { text: result.text.toString() }, { quoted: fkontak });

  } catch (error) {
    console.error("Terjadi error saat melakukan terjemahan:", error);
    m.reply('Terjemahan gagal.');
  }
}
break;
				case "cai":
    {
        const args = text.split(' ');
        const subCommand = args[0];
        const subArgs = args.slice(1);

        const databasePath = path.join(__dirname, 'database', 'cai.json');
        let database = {};

        switch(subCommand) {
            case "n":
            case "new":
            case "add":
            if (subArgs.length < 2) return m.keila(`Contoh:\n${prefix}cai new <charid> <name>`);

            const charId = subArgs[0];
            let charName = subArgs[1];

            const nameRegex = /^[a-z]+$/;
            if (!nameRegex.test(charName)) {
                return m.reply(`Nama karakter harus berupa huruf kecil, tanpa spasi, dan tanpa simbol/angka.`);
            }

            if (fs.existsSync(databasePath)) {
                const fileContent = fs.readFileSync(databasePath, 'utf8');
                database = JSON.parse(fileContent);
            }

            const sender = m.sender;

            if (!database[sender]) {
                database[sender] = { status: false, data: [] };
            }

            const existingCharName = database[sender].data.find(entry => entry.charname === charName);
            if (existingCharName) {
                return m.reply(`Nama karakter "${charName}" sudah ada. Gunakan nama lain.`);
            }

            const newChatUrl = `https://keilaapi.vercel.app/api/newchat?q=${encodeURIComponent(charId)}`;

            try {
                const response = await fetch(newChatUrl);
                if (!response.ok) throw new Error('API tidak merespons dengan benar');

                const data = await response.json();

                if (data.id && data.name) {
                    const existingEntryIndex = database[sender].data.findIndex(entry => entry.charid === charId);
                    if (existingEntryIndex > -1) {
                        database[sender].data[existingEntryIndex] = {
                            charid: charId,
                            chatid: data.id,
                            charname: charName
                        };
                        m.reply(`Data karakter dengan ID ${charId} telah diperbarui.`);
                    } else {
                        database[sender].data.push({
                            charid: charId,
                            chatid: data.id,
                            charname: charName
                        });
                        m.reply(`Chat baru dibuat dan disimpan!\nID: ${data.id}\nNama: ${charName}`);
                    }

                    fs.writeFileSync(databasePath, JSON.stringify(database, null, 2));
                } else {
                    m.reply(`Gagal membuat chat baru. Periksa ID karakter atau coba lagi nanti.`);
                }
            } catch (error) {
                m.reply(`Terjadi kesalahan: ${error.message}. Coba lagi nanti.`);
            }
            break;
            
            case "rst":
            case "reset":
            case "newchat":
                if (subArgs.length < 1) return m.keila(`Contoh:\n${prefix}cai rst <charname>`);

                const resetCharName = subArgs.join(' ');

                if (fs.existsSync(databasePath)) {
                    const fileContent = fs.readFileSync(databasePath, 'utf8');
                    database = JSON.parse(fileContent);
                }

                const resetSender = m.sender;

                if (!database[resetSender] || database[resetSender].data.length === 0) {
                    return m.reply(`Tidak ada data karakter yang tersimpan untuk ${resetSender}.`);
                }

                const resetEntry = database[resetSender].data.find(entry => entry.charname === resetCharName);
                if (!resetEntry) {
                    return m.reply(`Tidak ditemukan karakter dengan nama "${resetCharName}" di data Anda.`);
                }

                const resetChatUrl = `https://keilaapi.vercel.app/api/newchat?q=${encodeURIComponent(resetEntry.charid)}`;

                try {
                    const resetResponse = await fetch(resetChatUrl);
                    if (!resetResponse.ok) throw new Error('API tidak merespons dengan benar');

                    const resetData = await resetResponse.json();

                    if (resetData.id) {
                        resetEntry.chatid = resetData.id;
                        fs.writeFileSync(databasePath, JSON.stringify(database, null, 2));
                        m.reply(`Data untuk karakter "${resetCharName}" direset dan telah diperbarui dengan data yang baru!`);
                    } else {
                        m.reply(`Gagal mereset karakter "${resetCharName}".`);
                    }
                } catch (error) {
                    m.reply(`Terjadi kesalahan: ${error.message}. Coba lagi nanti.`);
                }
            break;
                
            case "s":
            case "search":
                if (!subArgs[0]) return m.keila(`Contoh:\n${prefix + command} search Hutao`);

                const searchUrl = `https://keilaapi.vercel.app/api/search?q=${encodeURIComponent(subArgs.join(' '))}`;
                try {
                    const searchResponse = await fetch(searchUrl);
                    if (!searchResponse.ok) throw new Error('API tidak merespons dengan benar');

                    const searchData = await searchResponse.json();
                    
                    if (searchData.characters && searchData.characters.length > 0) {
                        const characters = searchData.characters.slice(0, 10);
                        let replyText = `Hasil pencarian untuk "${subArgs.join(' ')}":\n`;

                        characters.forEach((char, index) => {
                            replyText += `
${index + 1}. Nama: *${char.participant__name}*
   Char ID: ${char.external_id}
   Title: ${char.title || 'No title'}
`;
                        });

                        m.reply(replyText);
                    } else {
                        m.reply(`Tidak ada karakter ditemukan untuk "${subArgs.join(' ')}".`);
                    }
                } catch (error) {
                    m.reply(`Terjadi kesalahan: ${error.message}. Coba lagi nanti.`);
                }
                break;
                
            case "trending":
            case "tren":
                try {
                    if (!fs.existsSync(databasePath)) {
                        database = {};
                    } else {
                        const fileContent = fs.readFileSync(databasePath, 'utf8');
                        database = JSON.parse(fileContent);
                    }

                    const allData = Object.values(database).flatMap(user => user.data);
                    const charCount = allData.reduce((count, entry) => {
                        count[entry.charid] = (count[entry.charid] || 0) + 1;
                        return count;
                    }, {});

                    const sortedChars = Object.entries(charCount).sort((a, b) => b[1] - a[1]);
                    const trendingChars = sortedChars.slice(0, 5).map(([charid]) => {
                        const charData = allData.find(entry => entry.charid === charid);
                        return charData;
                    });

                    if (trendingChars.length > 0) {
                        let replyText = `Karakter trending saat ini:\n`;

                        trendingChars.forEach((char, index) => {
                            replyText += `
${index + 1}. Nama: *${char.charname}*
   Char ID: ${char.charid}
   Jumlah Pengguna: ${charCount[char.charid]}
`;
                        });

                        m.reply(replyText);
                    } else {
                        m.reply(`Tidak ada karakter trending saat ini.`);
                    }
                } catch (error) {
                    m.reply(`Terjadi kesalahan: ${error.message}. Coba lagi nanti.`);
                }
                break;
                
            case "rekomen":
            case "rekomendasi":
            case "rec":
                try {
                    if (!fs.existsSync(databasePath)) {
                        database = {};
                    } else {
                        const fileContent = fs.readFileSync(databasePath, 'utf8');
                        database = JSON.parse(fileContent);
                    }

                    const targetUser = '6289646942000@s.whatsapp.net';
                    if (!database[targetUser] || database[targetUser].data.length === 0) {
                        m.reply(`Belum Ada Rekomendasi Dari Owner.`);
                        return;
                    }

                    const recChars = database[targetUser].data.slice(0, 5); // Maksimum 5

                    let replyText = `Karakter rekomendasi dari Owner:\n`;

                    recChars.forEach((char, index) => {
                        replyText += `
${index + 1}. Nama: *${char.charname}*
   Char ID: ${char.charid}
`;
                    });

                    m.reply(replyText);
                } catch (error) {
                    m.reply(`Terjadi kesalahan: ${error.message}. Coba lagi nanti.`);
                }
                break;

            case "on":
            case "off":
                const status = subCommand === "on";
                const user = m.sender;

                try {
                    if (!fs.existsSync(databasePath)) {
                        database = {};
                    } else {
                        const fileContent = fs.readFileSync(databasePath, 'utf8');
                        database = JSON.parse(fileContent);
                    }

                    if (!database[user]) {
                        database[user] = { status: false, data: [] };
                    }

                    database[user].status = status;
                    fs.writeFileSync(databasePath, JSON.stringify(database, null, 2));
                    keila.sendMessage(m.chat, { text: `Status ${status ? 'diaktifkan' : 'dinonaktifkan'} untuk @${user.split('@')[0]}`, mentions: [user] }, { quoted: fkontak })
                    //m.reply(`Status ${status ? 'diaktifkan' : 'dinonaktifkan'} untuk ${user}.`);
                } catch (error) {
                    m.reply(`Terjadi kesalahan: ${error.message}. Coba lagi nanti.`);
                }
                break;
                
            case "char":
            case "list":
            case "view":
                const viewUser = m.sender;

                try {
                    if (!fs.existsSync(databasePath)) {
                        database = {};
                    } else {
                        const fileContent = fs.readFileSync(databasePath, 'utf8');
                        database = JSON.parse(fileContent);
                    }

                    if (!database[viewUser] || database[viewUser].data.length === 0) {
                        //m.reply(`Tidak ada data karakter yang disimpan untuk ${viewUser}.`);
                        keila.sendMessage(m.chat, { text: `Tidak ada data Karakter Yang Disimpan Untuk @${viewUser.split('@')[0]}`, mentions: [viewUser] }, { quoted: fkontak });
                        return;
                    }

                    let viewText = `Data karakter untuk @${viewUser.split('@')[0]}:\n`;
                    database[viewUser].data.forEach((entry, index) => {
                        viewText += `
${index + 1}. Nama: *${entry.charname}*
   Char ID: ${entry.charid}
`;
                    });

                    //m.reply(viewText);
                    keila.sendMessage(m.chat, { text: viewText, mentions: [viewUser] }, { quoted: fkontak });
                } catch (error) {
                    m.reply(`Terjadi kesalahan: ${error.message}. Coba lagi nanti.`);
                }
                break;

            case "delall":
                const deleteUser = m.sender;

                try {
                    if (!fs.existsSync(databasePath)) {
                        database = {};
                    } else {
                        const fileContent = fs.readFileSync(databasePath, 'utf8');
                        database = JSON.parse(fileContent);
                    }

                    if (database[deleteUser]) {
                        delete database[deleteUser];
                        fs.writeFileSync(databasePath, JSON.stringify(database, null, 2));
                        //m.reply(`Semua data karakter untuk ${deleteUser} telah dihapus.`);
                        keila.sendMessage(m.chat, { text: `Semua Data Karakter Untuk @${deleteUser.split('@')[0]} Telah Dihapus!`, mentions: [deleteUser] }, { quoted: fkontak });
                    } else {
                        //m.reply(`Tidak ada data karakter yang ditemukan untuk ${deleteUser}.`);
                        keila.sendMessage(m.chat, { text: `Tidak ada data Karakter ditemukan Untuk @${deleteUser.split('@')[0]}`, mentions: [deleteUser] }, { quoted: fkontak });
                    }
                } catch (error) {
                    m.reply(`Terjadi kesalahan: ${error.message}. Coba lagi nanti.`);
                }
                break;

            case "del":
                if (subArgs.length < 1) return m.keila(`Contoh:\n${prefix + command} dell <charname>`);

                const deleteName = subArgs.join(' ');
                const dellUser = m.sender;

                try {
                    if (!fs.existsSync(databasePath)) {
                        database = {};
                    } else {
                        const fileContent = fs.readFileSync(databasePath, 'utf8');
                        database = JSON.parse(fileContent);
                    }

                    if (database[dellUser]) {
                        const initialLength = database[dellUser].data.length;
                        database[dellUser].data = database[dellUser].data.filter(entry => entry.charname !== deleteName);

                        if (database[dellUser].data.length < initialLength) {
                            fs.writeFileSync(databasePath, JSON.stringify(database, null, 2));
                            m.reply(`Data dengan nama "${deleteName}" telah dihapus.`);
                        } else {
                            m.reply(`Tidak ditemukan data dengan nama "${deleteName}".`);
                        }
                    } else {
                        //m.reply(`Tidak ada data karakter yang ditemukan untuk ${dellUser}.`);
                        keila.sendMessage(m.chat, { text: `Tidak ada data Karakter ditemukan Untuk @${dellUser.split('@')[0]}`, mentions: [dellUser] }, { quoted: fkontak });
                    }
                } catch (error) {
                    m.reply(`Terjadi kesalahan: ${error.message}. Coba lagi nanti.`);
                }
                break;
                
        case "set":
            const userSet = m.sender;
            const charNameToSet = subArgs[0];

            try {
                if (!fs.existsSync(databasePath)) {
                    database = {};
                } else {
                    const fileContent = fs.readFileSync(databasePath, 'utf8');
                    database = JSON.parse(fileContent);
                }

                if (!database[userSet]) {
                    database[userSet] = { activeChar: null, data: [] };
                }

                const charData = database[userSet].data.find(entry => entry.charname === charNameToSet);
                if (charData) {
                    database[userSet].activeChar = charNameToSet;
                    fs.writeFileSync(databasePath, JSON.stringify(database, null, 2));
                    m.reply(`Karakter aktif telah diatur menjadi ${charNameToSet}.`);
                } else {
                    m.reply(`Karakter ${charNameToSet} tidak ditemukan.`);
                }
            } catch (error) {
                m.reply(`Terjadi kesalahan: ${error.message}. Coba lagi nanti.`);
            }
            break;

        case "setats":
            const setatsuser = m.sender;
            const setatus = subArgs[0] === "on";

            try {
                if (!fs.existsSync(databasePath)) {
                    database = {};
                } else {
                    const fileContent = fs.readFileSync(databasePath, 'utf8');
                    database = JSON.parse(fileContent);
                }

                if (!database[setatsuser]) {
                    database[setatsuser] = { activeChar: null, data: [] };
                }

                database[setatsuser].setatus = setatus;
                fs.writeFileSync(databasePath, JSON.stringify(database, null, 2));
                keila.sendMessage(m.chat, { text: `Status ${setatus ? 'diaktifkan' : 'dinonaktifkan'} untuk @${setatsuser.split('@')[0]}`, mentions: [setatsuser] }, { quoted: fkontak });
                //m.reply(`Status ${setatus ? 'diaktifkan' : 'dinonaktifkan'} untuk ${setatsuser}.`);
            } catch (error) {
                m.reply(`Terjadi kesalahan: ${error.message}. Coba lagi nanti.`);
            }
            break;

            case "tutor":
            case "help":
            case "t":
            case "tutorial":
                const tutorialText = `
*Tutorial Penggunaan Perintah Cai:*

1. *new <ID> <charname>*
   - Menambahkan data karakter baru berdasarkan ID dan nama karakter ke data anda.
   - Contoh: \`${prefix}cai new 1234 Hutao\`
   
2. *newchat <charname>*
   - Mereset Memori Karakter.
   - Contoh: \`${prefix}cai newchat Hutao\`

3. *search <keyword>*
   - Mencari karakter berdasarkan keyword.
   - Contoh: \`${prefix}cai search Hutao\`
   - Bisa Juga: \`${prefix}cais Hutao\`

4. *tren*
   - Menampilkan karakter trending saat ini.
   - Contoh: \`${prefix}cai tren\`

5. *rec*
   - Menampilkan karakter rekomendasi saat ini.
   - Contoh: \`${prefix}cai rec\`

6. *on/off*
   - Mengaktifkan/Menonaktifkan status untuk pengguna saat ini.
   - Contoh: \`${prefix}cai on/off\`

7. *view*
   - Menampilkan data karakter yang telah disimpan untuk pengguna saat ini.
   - Contoh: \`${prefix}cai char\`

8. *delall*
   - Menghapus semua data karakter yang disimpan untuk pengguna saat ini.
   - Contoh: \`${prefix}cai delall\`

9. *del <charname>*
   - Menghapus data karakter yang diinginkan dari data anda.
   - Contoh: \`${prefix}cai dell Hutao\`
   
10. *Chat Dengan Ai*
    - Berbicara Dengan Ai
    - Command: <name> <message>
    - Contoh: \`hutao Halo\`
    
    
*Chat In Private Message*
 
 1. *set <charname>*
    - Menfaktifkan Karakter Yang Diinginkan.
    - Contoh: \`.set hutao\`
    
 2. *setats on/off*
    - Mengaktifkan/Menghidupkan Cai Di Private Message.
    - Contoh: \`.setats on\`
    
 3. *Chat Dengan Ai*
    - Berbicara Layaknya Orang Lain Tanpa Prefix/Charname.
`;

                m.keila(tutorialText);
                break;

            default:
                m.keila(`Perintah tidak dikenal.\nGunakan salah satu dari: new, newchat, search, tren, rec, on, off, char, delall, del, tutorial.\nContoh: ${prefix}cai tutorial`);
        }
    }
    break;
case 'cais': {
    if (!text) return keila.sendMessage(m.chat, "Silakan berikan kueri pencarian.", m);

    const query = text;
    const count = 10;

    if (!query) return keila.sendMessage(m.chat, "Silakan berikan kueri pencarian.", m);

    async function createImage() {
        const { imageMessage } = await generateWAMessageContent({
            image: {
                url: 'https://telegra.ph/file/6d9e1d40d53418c9627d0.jpg'
            }
        }, {
            upload: keila.waUploadToServer
        });
        return imageMessage;
    }

    try {
        const axios = require('axios');
        const res = await axios.get(`https://keilaapi.vercel.app/api/search?q=${encodeURIComponent(query)}`);
        const results = res.data.characters;

        if (!results || results.length === 0) return keila.sendMessage(m.chat, "Tidak ada hasil ditemukan.", m);

        function shuffleArray(array) {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
        }

        shuffleArray(results);
        const images = results.slice(0, count).map(item => ({
            caption: `
*Title:* ${item.title || 'N/A'}
*External ID:* ${item.external_id}
*Search Score:* ${item.search_score}
*Creator:* ${item.user__username}
            `.trim(),
            name: item.participant__name,
            externalId: item.external_id
        }));

        const push = await Promise.all(images.map(async (image) => ({
            body: proto.Message.InteractiveMessage.Body.fromObject({
                text: image.caption
            }),
            footer: proto.Message.InteractiveMessage.Footer.fromObject({
                text: 'KeiLaSenpai'
            }),
            header: proto.Message.InteractiveMessage.Header.fromObject({
                title: image.name,
                hasMediaAttachment: true,
                imageMessage: await createImage()
            }),
            nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.fromObject({
                buttons: [
                    {
                        name: "cta_copy",
                        buttonParamsJson: JSON.stringify({
                            display_text: "Salin ID Karakter!",
                            copy_code: image.externalId
                        })
                    }
                ]
            })
        })));

        const msg = generateWAMessageFromContent(m.chat, {
            viewOnceMessage: {
                message: {
                    messageContextInfo: {
                        deviceListMetadata: {},
                        deviceListMetadataVersion: 2
                    },
                    interactiveMessage: proto.Message.InteractiveMessage.fromObject({
                        body: proto.Message.InteractiveMessage.Body.create({
                            text: 'Hai\nDibawah ini Adalah hasil dari Pencarian Kamu'
                        }),
                        footer: proto.Message.InteractiveMessage.Footer.create({
                            text: ucapanWaktu
                        }),
                        header: proto.Message.InteractiveMessage.Header.create({
                            hasMediaAttachment: false
                        }),
                        carouselMessage: proto.Message.InteractiveMessage.CarouselMessage.fromObject({
                            cards: push
                        })
                    })
                }
            }
        }, {});

        await keila.relayMessage(m.chat, msg.message, {
            messageId: msg.key.id
        });
    } catch (error) {
        console.error(error);
        return keila.sendMessage(m.chat, "Terjadi kesalahan. Silakan coba lagi nanti.", m);
    }
}
break;

			// Search Menu
case "splay":
{
    if (!text) {
        return m.keila(
            `Example: ${prefix + command} query_spotify`,
        );
    };
    const keilaDB = loadKeilaDB();
    
    if (keilaDB[m.sender] && keilaDB[m.sender].statusbt === false) {
      return m.keila(`Maaf Fitur Ini Khusus Button On!\n\nGunakan: .playsp`);
    };

    m.loading();

    try {
        if (m.quoted && m.quoted.fromMe && m.quoted.mentions.includes(m.sender)) {
            await keila.sendMessage(m.chat, {
                delete: {
                    remoteJid: m.chat,
                    fromMe: true,
                    id: m.quoted.id,
                    participant: m.quoted.sender,
                },
            });
        }

        const accessToken = await getAccessToken();
        if (!accessToken) {
            return m.reply('Failed to get access token.');
        }

        const searchResults = await searchSpotify(accessToken, text);
        if (!searchResults || searchResults.length === 0) {
            return m.reply('No results found.');
        }

        const formattedResults = formatSearchResults(searchResults);

        const randomIndex = Math.floor(Math.random() * formattedResults.length);
        const selectedResult = formattedResults[randomIndex];

        const bodyText = 
            `**Title:** ${selectedResult.name}\n**Artist:** ${selectedResult.artist}\n**Album:** ${selectedResult.album}\n**URL:** ${selectedResult.url}`;

        const buttonOptions = [
            { "name": "quick_reply", "buttonParamsJson": `{"display_text":"Audio","id":".spotify ${selectedResult.url}"}` },
            { "name": "quick_reply", "buttonParamsJson": `{"display_text":"Lirik","id":".spotifylirik ${selectedResult.url}"}` },
            { "name": "quick_reply", "buttonParamsJson": `{"display_text":"Cari Lagi","id":".splay ${text}"}` }
        ];

        let msg = generateWAMessageFromContent(m.chat, {
            viewOnceMessage: {
                message: {
                    messageContextInfo: {
                        deviceListMetadata: {},
                        deviceListMetadataVersion: 2
                    },
                    interactiveMessage: proto.Message.InteractiveMessage.create({
                        contextInfo: {
                            mentionedJid: [m.sender],
                            isForwarded: true,
                            forwardedNewsletterMessageInfo: {
                                newsletterJid: global.my.nl,
                                serverMessageId: 100,
                                newsletterName: global.mess.ucpnl
                            },
                            businessMessageForwardInfo: { businessOwnerJid: keila.decodeJid(keila.user.id) },
                        },
                        body: proto.Message.InteractiveMessage.Body.create({
                            text: `Here are the results for your search query "${text}":\n\n${bodyText}`
                        }),
                        footer: proto.Message.InteractiveMessage.Footer.create({
                            text: ucapanWaktu
                        }),
                        header: proto.Message.InteractiveMessage.Header.create({
                            title: `❍「 *Spotify Search* 」❍`,
                            subtitle: "KeiLaSenpai",
                            hasMediaAttachment: true, 
                            ...(await prepareWAMessageMedia({ image: { url: selectedResult.thumb } }, { upload: keila.waUploadToServer }))
                        }),
                        nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
                            buttons: buttonOptions
                        })
                    })
                }
            }
        }, {});

        await keila.relayMessage(msg.key.remoteJid, msg.message, {
            messageId: msg.key.id
        }).then(response => {
            console.log("Message sent successfully", response);
        }).catch(error => {
            console.error("Error sending message", error);
        });

    } catch (error) {
        console.error('Error during Spotify search:', error.message);
        m.reply('An error occurred while searching Spotify.');
    }
}
break;
case "playsp":
{
    if (!text) {
        return m.keila(
            `Example: ${prefix + command} song_name`,
        );
    }

    m.loading();

    const spotify = new Spotify();

    try {
        const accessToken = await getAccessToken();
        if (!accessToken) {
            return m.reply('Failed to get access token.');
        }

        const searchResults = await searchSpotify(accessToken, text);
        if (!searchResults || searchResults.length === 0) {
            return m.reply('No results found.');
        }

        const formattedResults = formatSearchResults(searchResults);
        const randomIndex = Math.floor(Math.random() * formattedResults.length);
        const selectedResult = formattedResults[randomIndex];
        const url = selectedResult.url;

        const details = await spotify.getDetails(url);
        const downloadLink = await spotify.download(url);

        const response = await axios.get(downloadLink, { responseType: 'arraybuffer' });
        const audioBuffer = Buffer.from(response.data, 'binary');

        const docs = {
            audio: audioBuffer,
            mimetype: 'audio/mp4',
            fileName: details.title,
            contextInfo: {
                mentionedJid: [
                    m.sender
                ],
                forwardingScore: 10,
                isForwarded: true,
                externalAdReply: {
                    title: details.title,
                    body: `Artist: ${details.artist}\nRelease Date: ${details.date}`,
                    showAdAttribution: true,
                    thumbnailUrl: details.thumbnail,
                    mediaType: 1,
                    previewType: 0,
                    renderLargerThumbnail: false,
                    mediaUrl: downloadLink,
                    sourceUrl: url,
                },
            },
        };

        await keila.sendMessage(m.chat, docs, { quoted: m });

    } catch (error) {
        console.error("Error processing Spotify search", error);
        m.reply("An error occurred while processing the search.");
    }
}
break;
case "play":
{
    if (!text) {
        return m.keila(
            `Example: ${prefix + command} query_youtube`,
        );
    }
    const keilaDB = loadKeilaDB();
    
    if (keilaDB[m.sender] && keilaDB[m.sender].statusbt === false) {
      return m.keila(`Maaf Fitur Ini Khusus Button On!\n\nGunakan: .playaudio / .playvideo`);
    };

    m.loading();

    try {
        if (m.quoted && m.quoted.fromMe && m.quoted.mentions.includes(m.sender)) {
            await keila.sendMessage(m.chat, {
                delete: {
                    remoteJid: m.chat,
                    fromMe: true,
                    id: m.quoted.id,
                    participant: m.quoted.sender,
                },
            });
        }
        
        const result = await ytSearch(text);
        let videos = result.videos;
        
        const validURLPattern = /^https:\/\/youtube\.com\/watch\?v=[^&]+$/;
        videos = videos.filter(video => validURLPattern.test(video.url));

        if (videos.length === 0) {
            return m.reply(`No suitable videos found for "${text}" :/`);
        }

        const selectedVideo = videos[Math.floor(Math.random() * videos.length)];

        const buttonOptions = [
            { "name": "quick_reply", "buttonParamsJson": `{"display_text":"Audio","id":".ytaudio ${selectedVideo.url}"}` },
            { "name": "quick_reply", "buttonParamsJson": `{"display_text":"Video","id":".ytvideo ${selectedVideo.url}"}` },
            { "name": "quick_reply", "buttonParamsJson": `{"display_text":"Cari Lagi","id":".play ${text}"}` }
        ];

        let msg = generateWAMessageFromContent(m.chat, {
            viewOnceMessage: {
                message: {
                    messageContextInfo: {
                        deviceListMetadata: {},
                        deviceListMetadataVersion: 2
                    },
                    interactiveMessage: proto.Message.InteractiveMessage.create({
                        contextInfo: {
                            mentionedJid: [m.sender],
                            isForwarded: true,
                            forwardedNewsletterMessageInfo: {
                                newsletterJid: global.my.nl,
                                serverMessageId: 100,
                                newsletterName: global.mess.ucpnl
                            },
                            businessMessageForwardInfo: { businessOwnerJid: keila.decodeJid(keila.user.id) },
                        },
                        body: proto.Message.InteractiveMessage.Body.create({
                            text: `Title: ${selectedVideo.title}\nURL: ${selectedVideo.url}\nChoose the format:`
                        }),
                        footer: proto.Message.InteractiveMessage.Footer.create({
                            text: ucapanWaktu
                        }),
                        header: proto.Message.InteractiveMessage.Header.create({
                            title: `❍「 *Youtube Play* 」❍`,
                            subtitle: "KeiLaSenpai",
                            hasMediaAttachment: true, ...(await prepareWAMessageMedia({ image: { url: selectedVideo.thumbnail } }, { upload: keila.waUploadToServer }))
                        }),
                        nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
                            buttons: buttonOptions
                        })
                    })
                }
            }
        }, {});

        await keila.relayMessage(msg.key.remoteJid, msg.message, {
            messageId: msg.key.id
        }).then(response => {
            console.log("Message sent successfully", response);
        }).catch(error => {
            console.error("Error sending message", error);
        });
    } catch (error) {
        console.error("Error searching YouTube", error);
        m.reply("An error occurred while searching.");
    }
}
break;
case "play2":
{
    if (!text) {
        return m.keila(
            `Example: ${prefix + command} query_youtube`,
        );
      }
    
    const keilaDB = loadKeilaDB();
    
    if (keilaDB[m.sender] && keilaDB[m.sender].statusbt === false) {
      return m.keila(`Maaf Fitur Ini Khusus Button On!\n\nGunakan: .playaudio2 / .playvideo2`);
    };

    m.loading();

    try {
        if (m.quoted && m.quoted.fromMe && m.quoted.mentions.includes(m.sender)) {
            await keila.sendMessage(m.chat, {
                delete: {
                    remoteJid: m.chat,
                    fromMe: true,
                    id: m.quoted.id,
                    participant: m.quoted.sender,
                },
            });
        }
        
        const result = await ytSearch(text);
        let videos = result.videos;
        
        const validURLPattern = /^https:\/\/youtube\.com\/watch\?v=[^&]+$/;
        videos = videos.filter(video => validURLPattern.test(video.url));

        if (videos.length === 0) {
            return m.reply(`No suitable videos found for "${text}" :/`);
        }

        const selectedVideo = videos[Math.floor(Math.random() * videos.length)];

        const buttonOptions = [
            { "name": "quick_reply", "buttonParamsJson": `{"display_text":"Audio","id":".yta2 ${selectedVideo.url}"}` },
            { "name": "quick_reply", "buttonParamsJson": `{"display_text":"Video","id":".ytv2 ${selectedVideo.url}"}` },
            { "name": "quick_reply", "buttonParamsJson": `{"display_text":"Cari Lagi","id":".play2 ${text}"}` }
        ];

        let msg = generateWAMessageFromContent(m.chat, {
            viewOnceMessage: {
                message: {
                    messageContextInfo: {
                        deviceListMetadata: {},
                        deviceListMetadataVersion: 2
                    },
                    interactiveMessage: proto.Message.InteractiveMessage.create({
                        contextInfo: {
                            mentionedJid: [m.sender],
                            isForwarded: true,
                            forwardedNewsletterMessageInfo: {
                                newsletterJid: global.my.nl,
                                serverMessageId: 100,
                                newsletterName: global.mess.ucpnl
                            },
                            businessMessageForwardInfo: { businessOwnerJid: keila.decodeJid(keila.user.id) },
                        },
                        body: proto.Message.InteractiveMessage.Body.create({
                            text: `Title: ${selectedVideo.title}\nURL: ${selectedVideo.url}\nChoose the format:`
                        }),
                        footer: proto.Message.InteractiveMessage.Footer.create({
                            text: ucapanWaktu
                        }),
                        header: proto.Message.InteractiveMessage.Header.create({
                            title: `❍「 *Youtube Play 2* 」❍`,
                            subtitle: "KeiLaSenpai",
                            hasMediaAttachment: true, ...(await prepareWAMessageMedia({ image: { url: selectedVideo.thumbnail } }, { upload: keila.waUploadToServer }))
                        }),
                        nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
                            buttons: buttonOptions
                        })
                    })
                }
            }
        }, {});

        await keila.relayMessage(msg.key.remoteJid, msg.message, {
            messageId: msg.key.id
        }).then(response => {
            console.log("Message sent successfully", response);
        }).catch(error => {
            console.error("Error sending message", error);
        });
    } catch (error) {
        console.error("Error searching YouTube", error);
        m.reply("An error occurred while searching.");
    }
}
break;
case "yt":
{
    if (!text) {
        return m.keila(
            `Example: ${prefix + command} url_youtube`,
        );
    }
    
    const keilaDB = loadKeilaDB();
    
    if (keilaDB[m.sender] && keilaDB[m.sender].statusbt === false) {
      return m.keila(`Maaf Fitur Ini Khusus Button On!\n\nGunakan: .yta / .ytv / .yta2 / .ytv2`);
    };

    m.loading();

    const hasil = await ytdl2(text);

    const buttonOptions = [
        { "name": "quick_reply", "buttonParamsJson": `{"display_text":"Audio","id":".ytaudio ${hasil.urlyt}"}` },
        { "name": "quick_reply", "buttonParamsJson": `{"display_text":"Video","id":".ytvideo ${hasil.urlyt}"}` }
    ];

    let msg = generateWAMessageFromContent(m.chat, {
        viewOnceMessage: {
            message: {
                messageContextInfo: {
                    deviceListMetadata: {},
                    deviceListMetadataVersion: 2
                },
                interactiveMessage: proto.Message.InteractiveMessage.create({
                    contextInfo: {
                        mentionedJid: [m.sender],
                        isForwarded: true,
                        forwardedNewsletterMessageInfo: {
                            newsletterJid: global.my.nl,
                            serverMessageId: 100,
                            newsletterName: global.mess.ucpnl
                        },
                        businessMessageForwardInfo: { businessOwnerJid: keila.decodeJid(keila.user.id) },
                    },
                    body: proto.Message.InteractiveMessage.Body.create({
                        text: `Title: ${hasil.title}\nURL: ${hasil.urlyt}\nChoose the format:`
                    }),
                    footer: proto.Message.InteractiveMessage.Footer.create({
                        text: ucapanWaktu
                    }),
                    header: proto.Message.InteractiveMessage.Header.create({
                        title: `❍「 *Youtube Downloader* 」❍`,
                        subtitle: "KeiLaSenpai",
                        hasMediaAttachment: true, ...(await prepareWAMessageMedia({ image: { url: hasil.thumb } }, { upload: keila.waUploadToServer }))
                    }),
                    nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
                        buttons: buttonOptions
                    })
                })
            }
        }
    }, {});

    await keila.relayMessage(msg.key.remoteJid, msg.message, {
        messageId: msg.key.id
    }).then(response => {
        console.log("Message sent successfully", response);
    }).catch(error => {
        console.error("Error sending message", error);
    });
}
break;
case "playmp3":
case "playa":
case "playaudio":
{
    if (!text) {
        return m.keila(`Example: ${prefix + command} video_url`);
    }

    try {
        const result = await ytSearch(text);
        const videos = result.videos;
        if (videos.length === 0) throw `No videos found for "${text}" :/`;
        const randomIndex = Math.floor(Math.random() * videos.length);
        const videoURL = videos[randomIndex].url;
        const info = await ytdl.getInfo(videoURL, { agentYT2 });

        const audioFormat = ytdl.chooseFormat(info.formats, { quality: 'highestaudio' });
        const audioStream = ytdl.downloadFromInfo(info, { format: audioFormat, agentYT2 });

        const playaudioBuffer = [];  // Buffer sebagai array kosong

        audioStream.on('data', chunk => {
            playaudioBuffer.push(chunk);
        });

        audioStream.on('end', async () => {
            const finalBuffer = Buffer.concat(playaudioBuffer);  // Buffer akhir sebagai `const`

            const hasil = {
                title: info.videoDetails.title,
                thumb: info.videoDetails.thumbnails[0].url,
                urlyt: videoURL,
            };

            console.log(`Sending audio from URL: ${videoURL}`);

            const doc = {
                audio: finalBuffer, // Gunakan buffer akhir
                mimetype: 'audio/mp4',
                fileName: hasil.title,
            };

            try {
                await keila.sendMessage(m.chat, doc, { quoted: m });
                console.log("Audio sent successfully");
            } catch (error) {
                console.error("Error sending audio", error);
                m.reply(`Error: ${error.message}`);
            }
        });

        audioStream.on('error', error => {
            console.error('Error streaming audio', error);
            m.reply(`Error: ${error.message}`);
        });

    } catch (error) {
        m.reply(`Error: ${error.message}`);
    }
}
break;
case "yta":
case "ytmp3":
case "ytaudio":
{
    if (!text) {
        return m.keila(`Example: ${prefix + command} video_url`);
    }
    m.react('⏳');

    try {
        const videoURL = text;
        const info = await ytdl.getInfo(videoURL, { agent: agentYT2 });
        const videoFormat = ytdl.chooseFormat(info.formats, { quality: '18' });
        const audioStream = ytdl.downloadFromInfo(info, { format: videoFormat, agent: agentYT2 });

        const sanitizedTitle = info.videoDetails.title.replace(/[\/\\:\*\?"<>\|]/g, '');
        const tmpFilePath = `./tmp/${sanitizedTitle}.mp4`;
        const fileStream = fs.createWriteStream(tmpFilePath);

        audioStream.pipe(fileStream);

        fileStream.on('finish', async () => {
            const hasil = {
                title: info.videoDetails.title,
                thumb: info.videoDetails.thumbnails[0].url,
                urlyt: videoURL,
            };

            try {
                const processedFilePath = `./tmp/${sanitizedTitle}_processed.mp4`;
                await new Promise((resolve, reject) => {
                    ffmpeg(tmpFilePath)
                        .noVideo()
                        .audioCodec('aac')
                        .toFormat('mp4')
                        .on('end', resolve)
                        .on('error', reject)
                        .save(processedFilePath);
                });

                const audioBuffer = fs.readFileSync(processedFilePath);

                const doc = {
                    audio: audioBuffer,
                    mimetype: 'audio/mp4',
                    fileName: hasil.title,
                };

                await keila.sendMessage(m.chat, doc, { quoted: m });
                m.react('✅')

                fs.unlink(tmpFilePath, err => {
                    if (err) console.error("Error deleting temp file", err);
                });
                fs.unlink(processedFilePath, err => {
                    if (err) console.error("Error deleting processed file", err);
                });
            } catch (error) {
                console.error("Error processing or sending audio", error);
                m.keila(`Error: ${error.message}`);
            }
        });

        fileStream.on('error', error => {
            console.error('Error writing file', error);
            m.keila(`Error: ${error.message}`);
        });

    } catch (error) {
        m.keila(`Error: ${error.message}`);
    }
}
break;
case "ytv":
case "ytmp4":
case "ytvideo":
{
    if (!text) {
        return m.keila(
            `Example: ${prefix + command} video_url`,
        );
    }
    m.react('⏳');

    try {
        const videoURL = text;
        const info = await ytdl.getInfo(videoURL, { agent: agentYT2 });

        const videoFormat = ytdl.chooseFormat(info.formats, { quality: '18' });

        const videoStream = ytdl.downloadFromInfo(info, { format: videoFormat, agent: agentYT2 });
        const passThrough = new PassThrough();
        videoStream.pipe(passThrough);

        const buffers = [];
        passThrough.on('data', (chunk) => buffers.push(chunk));
        passThrough.on('end', async () => {
            const videoBuffer = Buffer.concat(buffers);

            const hasil = {
                title: info.videoDetails.title,
                thumb: info.videoDetails.thumbnails[0].url,
                urlyt: videoURL,
            };

            console.log(`Sending video from URL: ${videoURL}`);

            let doc = {
                video: videoBuffer, // Use the buffer directly
                mimetype: 'video/mp4',
                fileName: hasil.title,
                /*contextInfo: {
                    externalAdReply: {
                        showAdAttribution: true,
                        mediaType: 2,
                        mediaUrl: videoURL,
                        title: hasil.title,
                        body: 'KeiLa',
                        sourceUrl: 'https://youtube.com/@KeiLaSenpai',
                        thumbnail: hasil.thumb,
                    },
                },*/
            };

            await keila.sendMessage(m.chat, doc, { quoted: m }).then(response => {
                console.log("Video sent successfully", response);
            }).catch(error => {
                console.error("Error sending video", error);
            });
            m.react('✅');
        });
    } catch (error) {
        m.keila(`Error: ${error}`);
    }
}
break;
case "playmp4":
case "playv":
case "playvideo":
{
    if (!text) {
        return m.keila(
            `Example: ${prefix + command} video_url`,
        );
    }

    try {
        const result = await ytSearch(text);
        const videos = result.videos;
        if (videos.length === 0) throw `No videos found for "${text}" :/`;
        const randomIndex = Math.floor(Math.random() * videos.length);
        const videoURL = videos[randomIndex].url;
        const info = await ytdl.getInfo(videoURL, { agent: agentYT2 });

        const videoFormat = ytdl.chooseFormat(info.formats, { quality: '18' });

        const videoStream = ytdl.downloadFromInfo(info, { format: videoFormat, agent: agentYT2 });
        const passThrough = new PassThrough();
        videoStream.pipe(passThrough);

        const buffers = [];
        passThrough.on('data', (chunk) => buffers.push(chunk));
        passThrough.on('end', async () => {
            const videoBuffer = Buffer.concat(buffers);
            
            const hasil = {
                title: info.videoDetails.title,
                thumb: info.videoDetails.thumbnails[0].url,
                urlyt: videoURL,
            };

            console.log(`Sending video from URL: ${text}`);

            let doc = {
                video: videoBuffer, // Use the buffer directly
                mimetype: 'video/mp4',
                fileName: hasil.title,
                /*contextInfo: {
                    externalAdReply: {
                        showAdAttribution: true,
                        mediaType: 2,
                        mediaUrl: text,
                        title: hasil.title,
                        body: 'KeiLa',
                        sourceUrl: 'https://youtube.com/@KeiLaSenpai',
                        thumbnail: hasil.thumb,
                    },
                },*/
            };

            await keila.sendMessage(m.chat, doc, { quoted: m }).then(response => {
                console.log("Video sent successfully", response);
            }).catch(error => {
                console.error("Error sending video", error);
            });
        });
    } catch (error) {
        m.reply(`Error: ${error}`);
    }
}
break;
case "yta2":
case "ytaudio2":
{
    if (!text) {
        return m.keila(`Example: ${prefix + command} video_url`);
    }

    const regex = /^(?:https?:\/\/)?(?:youtu\.be\/|(?:www\.|m\.)?youtube\.com\/(?:watch\?v=|v\/|embed\/|shorts\/)?)([a-zA-Z0-9_-]+)/;
    const match = text.match(regex);

    if (!match) {
        return m.reply('Invalid YouTube URL');
    }

    const videoId = match[1];
    const videoURL = `https://www.youtube.com/watch?v=${videoId}`;

    try {
        for (const version of ['V2', 'V1']) {
            const { status, result } = await download[version](videoURL, { type: 'audio', quality: 128 });

            console.log(`Download Version: ${version}`);
            console.log('Status:', status);
            console.log('Result:', result);
            
            const urlToUse = result.audio.url || result.audio.buffer;

            if (status) {
                const doc = {
                    audio: { url: urlToUse },
                    mimetype: 'audio/mp4',
                    fileName: result.title
                };

                await keila.sendMessage(m.chat, doc, { quoted: m });
                break;
            }
        }
    } catch (error) {
        m.reply(`Error: ${error.message}`);
    }
}
break;
case "ytv2":
case "ytvideo2":
{
    if (!text) {
        return m.keila(`Example: ${prefix + command} video_url`);
    }

    const regex = /^(?:https?:\/\/)?(?:youtu\.be\/|(?:www\.|m\.)?youtube\.com\/(?:watch\?v=|v\/|embed\/|shorts\/)?)([a-zA-Z0-9_-]+)/;
    const match = text.match(regex);

    if (!match) {
        return m.reply('Invalid YouTube URL');
    }

    const videoId = match[1];
    const videoURL = `https://www.youtube.com/watch?v=${videoId}`;

    try {
        for (const version of ['V2', 'V1']) {
            const { status, result } = await download[version](videoURL, { type: 'video', quality: 360 });

            console.log(`Download Version: ${version}`);
            console.log('Status:', status);
            console.log('Result:', result);
            
            const urlToUse = result.video.url || result.video.buffer;

            if (status) {
                const doc = {
                    video: { url: urlToUse },
                    mimetype: 'video/mp4',
                    fileName: result.title
                };

                await keila.sendMessage(m.chat, doc, { quoted: m });
                break;
            }
        }
    } catch (error) {
        m.reply(`Error: ${error.message}`);
    }
}
break;
case "spotify":
{
    if (!text) {
        return m.keila(
            `Example: ${prefix + command} spotify_url`,
        );
    }

    m.loading();

    const spotify = new Spotify();

    try {
        const url = text;
        const isValidURL = url.includes("open.spotify.com");

        if (!isValidURL) {
            return m.reply("Invalid Spotify URL");
        }

        const details = await spotify.getDetails(url);
        const downloadLink = await spotify.download(url);

        const response = await axios.get(downloadLink, { responseType: 'arraybuffer' });
        const audioBuffer = Buffer.from(response.data, 'binary');

        const docs = {
            audio: audioBuffer,
            mimetype: 'audio/mp4',
            fileName: details.title,
            contextInfo: {
                mentionedJid: [
                    m.sender
                ],
                forwardingScore: 10,
                isForwarded: true,
                externalAdReply: {
                    title: details.title,
                    body: `Artist: ${details.artist}\nRelease Date: ${details.date}`,
                    showAdAttribution: true,
                    thumbnailUrl: details.thumbnail,
                    mediaType: 1,
                    previewType: 0,
                    renderLargerThumbnail: false,
                    mediaUrl: downloadLink,
                    sourceUrl: url,
                },
            },
        };

        await keila.sendMessage(m.chat, docs, { quoted: m });

    } catch (error) {
        console.error("Error processing Spotify URL", error);
        m.reply("An error occurred while processing the Spotify URL.");
    }
}
break;
case "spotifylirik":
    {
        const query = text.trim();
        
        if (!query) {
            return m.keila(`No Query?\n\nExample: ${prefix + command} https://open.spotify.com/track/6hBPSAsflvq3VVl3O34FfW`);
        }

        const spotify = new Spotify();

        try {
            const trackIdMatch = query.match(/track\/([a-zA-Z0-9]{22})/);
            const trackId = trackIdMatch ? trackIdMatch[1] : null;
            if (!trackId) {
                return m.reply("Invalid Spotify track URL.");
            }

            const details = await spotify.getDetails(query);
            const { title, artist, date } = details;

            const lyricsRes = await axios.get(`https://spotify-lyrics-api-pi.vercel.app/?trackid=${trackId}`);
            
            if (lyricsRes.status !== 200) {
                return m.reply("Failed to fetch lyrics from API.");
            }

            const lyricsData = lyricsRes.data;

            if (lyricsData.error || !lyricsData.lines || lyricsData.lines.length === 0) {
                return m.reply("Lirik tidak tersedia untuk track ini.");
            }

            const captionLyrics = `Title: ${title}\nArtist: ${artist}\nRelease Date: ${date}\n\nLyrics:\n`;
            const lyrics = lyricsData.lines.map(line => line.words).join('\n');

            const message = captionLyrics + lyrics;

            const doc = {
                text: message,
                contextInfo: {
                    mentionedJid: [
                        m.sender
                    ],
                    forwardingScore: 10,
                    isForwarded: true,
                    externalAdReply: {
                        title: title,
                        body: artist,
                        showAdAttribution: true,
                        mediaType: 1,
                        previewType: 0,
                        renderLargerThumbnail: false,
                        mediaUrl: query,
                        sourceUrl: query,
                    },
                },
            };

            await keila.sendMessage(m.chat, doc);

        } catch (e) {
            m.reply(`Error: ${e.message}`);
        }
    }
    break;
    case "gitrepo": {
    try {
        const fetch = require('node-fetch');
        const regex = /(?:https|git)(?::\/\/|@)github\.com[\/:]([^\/:]+)\/(.+)/i;

        if (!args[0]) return m.keila(`Link GitHub tidak ditemukan.\n\n📌 Contoh: ${usedPrefix + command} https://github.com/TerserahGw/KeiLaApi`);
        if (!regex.test(args[0])) return m.reply(`⚠️ Link GitHub tidak valid.`);

        let [_, user, repo] = args[0].match(regex) || [];
        repo = repo.replace(/.git$/, '');
        let url = `https://api.github.com/repos/${user}/${repo}/zipball`;
        let response = await fetch(url, { method: 'HEAD' });
        let filename = response.headers.get('content-disposition').match(/attachment; filename=(.*)/)[1];

        await keila.sendMessage(m.chat, { react: { text: '⏳', key: m.key } });

        await keila.sendMessage(m.chat, {
            document: { url: url },
            fileName: filename,
            mimetype: 'application/zip'
        }, { quoted: fkontak });

        await keila.sendMessage(m.chat, { react: { text: '✅', key: m.key } });

    } catch (error) {
        console.error("Terjadi error saat mengambil repository GitHub:", error);
        await keila.sendMessage(m.chat, { react: { text: '⚠️', key: m.key } });
        m.keila('⚠️ Gagal mengambil repository GitHub.');
    }
}
break;
case "mega": {
            try {
                if (!text) 
                    return m.keila(`Linknya? \n\nContoh: .mega <link mega>`);

                const file = File.fromURL(text);
                await file.loadAttributes();

                if (file.size >= 50000000)
                    return m.reply('Error: File size is too large (Maximum Size: 50MB)');

                let caption = `*Done!*\n\nFile: ${file.name}\nSize: ${formatBytes(file.size)}`;

                const data = await file.downloadBuffer();
                const fileExtension = path.extname(file.name).toLowerCase();
                const mimeTypes = {
                    '.mp4': 'video/mp4',
                    '.pdf': 'application/pdf',
                    '.zip': 'application/zip',
                    '.rar': 'application/x-rar-compressed',
                    '.7z': 'application/x-7z-compressed',
                    '.jpg': 'image/jpeg',
                    '.jpeg': 'image/jpeg',
                    '.png': 'image/png',
                };

                let mimetype = mimeTypes[fileExtension] || 'application/octet-stream';

                await keila.sendMessage(m.chat, data, file.name, caption, m, null, { mimetype, asDocument: true });
            } catch (error) {
                return m.reply(`Error: ${error.message}`);
            }
        }
        break;
        case "mediafire": {
    let limit = 50;

    if (!text) return m.reply(`✳️ Masukkan link MediaFire setelah perintah`);
    m.react('⏳');

    try {
        console.log(`Memulai pengunduhan dari: ${text}`);
        const res = await mediafireDl(text);
        console.log(`Respon dari mediafireDl:`, res);

        if (!res || res.length === 0) {
            return m.reply('Error: Tidak ada data yang ditemukan dari link tersebut');
        }

        const sizeInMB = parseFloat(res[0].size.split('MB')[0]);

        if (sizeInMB >= limit) {
            return m.reply(`Error: Ukuran file terlalu besar (Maksimal: ${limit}MB)`);
        }

        let caption = `*File:* ${res[0].nama}\n*Ukuran:* ${res[0].size}`;

        await m.reply(caption);

        await keila.sendMessage(
            m.chat,
            { document: { url: res[0].link }, fileName: res[0].nama, mimetype: res[0].mime },
            { quoted: m }
        );
        m.react('✅');
    } catch (error) {
        console.error('Terjadi kesalahan:', error);
        m.reply('Error: Periksa link atau coba link lain');
    }
}
break;
        case "gdrive": {
            let limit = 50000000;

            if (!text) return m.keila(`Masukkan link Google Drive setelah perintah\n\nContoh: .gdrive <link>`);
            m.react('⏳');

            try {
                let res = await fg.GDriveDl(text);

                if (res.fileSize >= limit) {
                    return m.reply('Error: Ukuran file terlalu besar (Maksimal: 50MB)');
                }

                let caption = `*File:* ${res.fileName}\n*Ukuran:* ${res.fileSize}`;

                await m.reply(caption);

                await keila.sendMessage(
                    m.chat,
                    { document: { url: res.downloadUrl }, fileName: res.fileName, mimetype: res.mimetype },
                    { quoted: m }
                );
                m.react('✅');
            } catch {
                m.reply('Error: Periksa link atau coba link lain');
            }
        }
        break;


			case 'pixiv': {
    if (!text) return keila.sendMessage(m.chat, "Silakan berikan kueri pencarian.", m);

    const textParts = text.split(" ");
    let count = 1;
    let query;

    if (!isNaN(textParts[0])) {
        count = parseInt(textParts[0]);
        query = textParts.slice(1).join(" ");
    } else {
        query = text;
    }

    if (!query) return keila.sendMessage(m.chat, "Silakan berikan kueri pencarian.", m);
    if (count > 5) return keila.sendMessage(m.chat, 'Maksimal 5 hasil.', m);

    async function createImage(url) {
        const { imageMessage } = await generateWAMessageContent({
            image: {
                url
            }
        }, {
            upload: keila.waUploadToServer
        });
        return imageMessage;
    }

    try {
        const axios = require('axios');
        const res = await axios.get(`https://keila-api.vercel.app/pixiv?q=${encodeURIComponent(query)}`);
        const results = res.data.result;

        if (!results || results.length === 0) return keila.sendMessage(m.chat, "Tidak ada hasil ditemukan.", m);

        if (count === 1) {
            const randomIndex = Math.floor(Math.random() * results.length);
            const selectedResult = results[randomIndex];
            await keila.sendMessage(
                m.chat,
                {
                    image: {
                        url: selectedResult.image,
                    },
                    caption: selectedResult.title,
                },
                {
                    quoted: m,
                }
            );
        } else {
            function shuffleArray(array) {
                for (let i = array.length - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1));
                    [array[i], array[j]] = [array[j], array[i]];
                }
            }

            shuffleArray(results);
            const images = results.slice(0, count).map(item => ({
                url: item.image,
                caption: item.title
            }));

            const push = await Promise.all(images.map(async (image, index) => ({
                body: proto.Message.InteractiveMessage.Body.fromObject({
                    text: `Image ke - ${index + 1}`
                }),
                footer: proto.Message.InteractiveMessage.Footer.fromObject({
                    text: 'KeiLaSenpai'
                }),
                header: proto.Message.InteractiveMessage.Header.fromObject({
                    title: image.caption,
                    hasMediaAttachment: true,
                    imageMessage: await createImage(image.url)
                }),
                nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.fromObject({
                    buttons: [
                        {
                            name: "cta_url",
                            buttonParamsJson: `{"display_text":"Lihat","Klik disini":"https://keilaapi.vercel.app","merchant_url":"https://www.google.com"}`
                        }
                    ]
                })
            })));

            const msg = generateWAMessageFromContent(m.chat, {
                viewOnceMessage: {
                    message: {
                        messageContextInfo: {
                            deviceListMetadata: {},
                            deviceListMetadataVersion: 2
                        },
                        interactiveMessage: proto.Message.InteractiveMessage.fromObject({
                            body: proto.Message.InteractiveMessage.Body.create({
                                text: 'Hai\nDibawah ini Adalah hasil dari Pencarian Kamu'
                            }),
                            footer: proto.Message.InteractiveMessage.Footer.create({
                                text: ucapanWaktu
                            }),
                            header: proto.Message.InteractiveMessage.Header.create({
                                hasMediaAttachment: false
                            }),
                            carouselMessage: proto.Message.InteractiveMessage.CarouselMessage.fromObject({
                                cards: push
                            })
                        })
                    }
                }
            }, {});

            await keila.relayMessage(m.chat, msg.message, {
                messageId: msg.key.id
            });
        }
    } catch (error) {
        console.error(error);
        return keila.sendMessage(m.chat, "Terjadi kesalahan. Silakan coba lagi nanti.", m);
    }
}
break;

			case 'pixivn': {
    if (!text) return keila.sendMessage(m.chat, "Silakan berikan kueri pencarian.", m);

    const textParts = text.split(" ");
    let count = 1;
    let query;

    if (!isNaN(textParts[0])) {
        count = parseInt(textParts[0]);
        query = textParts.slice(1).join(" ");
    } else {
        query = text;
    }

    if (!query) return keila.sendMessage(m.chat, "Silakan berikan kueri pencarian.", m);
    if (count > 5) return keila.sendMessage(m.chat, 'Maksimal 5 hasil.', m);

    async function createImage(url) {
        const { imageMessage } = await generateWAMessageContent({
            image: {
                url
            }
        }, {
            upload: keila.waUploadToServer
        });
        return imageMessage;
    }

    try {
        const axios = require('axios');
        const res = await axios.get(`https://keilapixiv.vercel.app/search?q=${encodeURIComponent(query)}`);
        const results = res.data;

        if (!results || results.length === 0) return keila.sendMessage(m.chat, "Tidak ada hasil ditemukan.", m);

        if (count === 1) {
            const randomIndex = Math.floor(Math.random() * results.length);
            const selectedResult = results[randomIndex];
            await keila.sendMessage(
                m.chat,
                {
                    image: {
                        url: selectedResult.origin_url,
                    },
                    caption: selectedResult.title,
                },
                {
                    quoted: m,
                }
            );
        } else {
            function shuffleArray(array) {
                for (let i = array.length - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1));
                    [array[i], array[j]] = [array[j], array[i]];
                }
            }

            shuffleArray(results);
            const images = results.slice(0, count).map(item => ({
                url: item.origin_url,
                caption: item.title
            }));

            const push = await Promise.all(images.map(async (image, index) => ({
                body: proto.Message.InteractiveMessage.Body.fromObject({
                    text: `Gambar ke - ${index + 1}`
                }),
                footer: proto.Message.InteractiveMessage.Footer.fromObject({
                    text: 'KeiLaSenpai'
                }),
                header: proto.Message.InteractiveMessage.Header.fromObject({
                    title: image.caption,
                    hasMediaAttachment: true,
                    imageMessage: await createImage(image.url)
                }),
                nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.fromObject({
                    buttons: [
                        {
                            name: "cta_url",
                            buttonParamsJson: `{"display_text":"Lihat","Klik disini":"https://keilaapi.vercel.app","merchant_url":"https://www.google.com"}`
                        }
                    ]
                })
            })));

            const msg = generateWAMessageFromContent(m.chat, {
                viewOnceMessage: {
                    message: {
                        messageContextInfo: {
                            deviceListMetadata: {},
                            deviceListMetadataVersion: 2
                        },
                        interactiveMessage: proto.Message.InteractiveMessage.fromObject({
                            body: proto.Message.InteractiveMessage.Body.create({
                                text: 'Hai\nDibawah ini Adalah hasil dari Pencarian Kamu'
                            }),
                            footer: proto.Message.InteractiveMessage.Footer.create({
                                text: ucapanWaktu
                            }),
                            header: proto.Message.InteractiveMessage.Header.create({
                                hasMediaAttachment: false
                            }),
                            carouselMessage: proto.Message.InteractiveMessage.CarouselMessage.fromObject({
                                cards: push
                            })
                        })
                    }
                }
            }, {});

            await keila.relayMessage(m.chat, msg.message, {
                messageId: msg.key.id
            });
        }
    } catch (error) {
        console.error(error);
        return m.keila("Terjadi kesalahan. Silakan coba lagi nanti.");
    }
}
break;
case "pin":
case 'pinterest': {
    if (!text) return keila.sendMessage(m.chat, "Silakan berikan kueri pencarian.", m);

    const textParts = text.split(" ");
    let count = 1;
    let query;

    if (!isNaN(textParts[0])) {
        count = parseInt(textParts[0]);
        query = textParts.slice(1).join(" ");
    } else {
        query = text;
    }

    if (!query) return keila.sendMessage(m.chat, "Silakan berikan kueri pencarian.", m);
    if (count > 5) return keila.sendMessage(m.chat, 'Maksimal 5 hasil.', m);

    async function createImage(url) {
        const { imageMessage } = await generateWAMessageContent({
            image: {
                url
            }
        }, {
            upload: keila.waUploadToServer
        });
        return imageMessage;
    }

    try {
        const results = await pinterest(query);

        if (!results || results.length === 0) return keila.sendMessage(m.chat, "Tidak ada hasil ditemukan.", m);

        if (count === 1) {
            const randomIndex = Math.floor(Math.random() * results.length);
            const selectedResult = results[randomIndex];
            await keila.sendMessage(
                m.chat,
                {
                    image: {
                        url: selectedResult,
                    },
                    caption: "Gambar dari Pinterest",
                },
                {
                    quoted: m,
                }
            );
        } else {
            function shuffleArray(array) {
                for (let i = array.length - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1));
                    [array[i], array[j]] = [array[j], array[i]];
                }
            }

            shuffleArray(results);
            const images = results.slice(0, count).map((url, index) => ({
                url,
                caption: `Pinterest`
            }));

            const cards = await Promise.all(images.map(async (image, index) => ({
                body: proto.Message.InteractiveMessage.Body.fromObject({
                    text: `Image ke - ${index + 1}`
                }),
                footer: proto.Message.InteractiveMessage.Footer.fromObject({
                    text: 'KeiLaSenpai'
                }),
                header: proto.Message.InteractiveMessage.Header.fromObject({
                    title: image.caption,
                    hasMediaAttachment: true,
                    imageMessage: await createImage(image.url)
                }),
                nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.fromObject({
                    buttons: [
                        {
                            name: "cta_url",
                            buttonParamsJson: '{"display_text":"Lihat!","url":"https://keilaapi.vercel.app/,"merchant_url":"https://www.google.com"}',
                        }
                    ]
                })
            })));

            const msg = generateWAMessageFromContent(m.chat, {
                viewOnceMessage: {
                    message: {
                        messageContextInfo: {
                            deviceListMetadata: {},
                            deviceListMetadataVersion: 2
                        },
                        interactiveMessage: proto.Message.InteractiveMessage.fromObject({
                            body: proto.Message.InteractiveMessage.Body.create({
                                text: 'Hai\nDibawah ini Adalah hasil dari Pencarian Kamu'
                            }),
                            footer: proto.Message.InteractiveMessage.Footer.create({
                                text: ucapanWaktu
                            }),
                            header: proto.Message.InteractiveMessage.Header.create({
                                hasMediaAttachment: false
                            }),
                            carouselMessage: proto.Message.InteractiveMessage.CarouselMessage.fromObject({
                                cards
                            })
                        })
                    }
                }
            }, {});

            await keila.relayMessage(m.chat, msg.message, {
                messageId: msg.key.id
            });
        }
    } catch (error) {
        console.error(error);
        return m.keila("Terjadi kesalahan. Silakan coba lagi nanti.");
    }
}
break;
case "doujin":
case "nhentai":
    {
        const query = text.trim();
        
        if (!query) {
            return m.reply(`No Query?\n\nExample: ${prefix + command} Hutao`);
        }

        // Memberitahu pengguna bahwa permintaan sedang diproses
        await m.loading();

        try {
            const res = await axios.get(`https://yearning-avivah-keilasenpai-fa13db75.koyeb.app/doujin?q=${encodeURIComponent(query)}`);
            
            if (res.status !== 200 || !res.data) {
                return m.keila("Failed to fetch data from API.");
            }

            const data = res.data;

            if (!data || !data.fileUrl) {
                return m.keila("No doujin found or invalid response from API.");
            }

            const { title, fileUrl: pdfUrl, cover: coverUrl, nhentai: nhentaiLink } = data;

            const captionPdf = `Title: ${title}\nSource: ${nhentaiLink}`;
            
            const docs = {
                document: { url: pdfUrl },
                mimetype: 'application/pdf',
                caption: captionPdf,
                contextInfo: {
                    mentionedJid: [
                        m.sender
                    ],
                    forwardingScore: 10,
                    isForwarded: true,
                    externalAdReply: {
                        title: title,
                        body: 'nhentai',
                        showAdAttribution: true,
                        thumbnailUrl: coverUrl,
                        mediaType: 1,
                        previewType: 0,
                        renderLargerThumbnail: false,
                        mediaUrl: pdfUrl,
                        sourceUrl: nhentaiLink,
                    },
                },
            };

            await keila.sendMessage(m.chat, docs);

        } catch (e) {
            m.keila(`Error: ${e.message}`);
        }
    }
    break;

			case "waifu":
    {
        try {
            let response = await axios.get('https://api.waifu.pics/sfw/waifu');
            let imageUrl = response.data.url; // Akses URL gambar dari data

            if (!imageUrl) {
                m.keila("Tidak ditemukan!");
            } else {
                await keila.sendMessage(
                    m.chat,
                    {
                        image: {
                            url: imageUrl,
                        },
                        caption: `*Nih Kak*`,
                    },
                    {
                        quoted: m,
                    }
                );
            }
        } catch (error) {
            m.keila("Terjadi kesalahan saat mengambil data!");
        }
    }
    break;

			case "wallpaper":
				{
					if (!text)
						return m.reply(`Example: ${prefix + command} hu tao`);
					let anu = await wallpaper(text);
					let result = pickRandom(anu);
					await keila.sendMessage(
						m.chat,
						{
							image: {
								url: result.image[0],
							},
							caption: `⭔ title : ${q}\n⭔ category : ${
								result.type
							}\n⭔ media url : ${
								result.image[2] ||
								result.image[1] ||
								result.image[0]
							}`,
						},
						{
							quoted: m,
						},
					);
				}
				break;
			case "ringtone":
				{
					if (!text)
						return m.reply(
							`Example: ${prefix + command} black rover`,
						);
					let anu = await ringtone(text);
					let result = pickRandom(anu);
					await keila.sendMessage(
						m.chat,
						{
							audio: {
								url: result.audio,
							},
							fileName: result.title + ".mp3",
							mimetype: "audio/mpeg",
						},
						{
							quoted: m,
						},
					);
				}
				break;

			// Downloader Menu
			case "ytplayaudio":
				{
					if (!text)
						return m.keila(
							`Example: ${prefix + command} url_youtube`,
						);
					if (!text.includes("youtu"))
						return m.keila(
							"Url Tidak Mengandung Result Dari Youtube!",
						);
					const hasil = await ytMp3(text);
					m.loading();
					await keila.sendMessage(
						m.chat,
						{
							audio: {
								url: hasil.result,
							},
							mimetype: "audio/mpeg",
							contextInfo: {
								externalAdReply: {
									title: hasil.title,
									body: hasil.channel,
									previewType: "PHOTO",
									thumbnailUrl: hasil.thumb,
									mediaType: 1,
									renderLargerThumbnail: true,
									sourceUrl: text,
								},
							},
						},
						{
							quoted: m,
						},
					);
				}
				break;
			case "ytplayvideo":
				{
					if (!text)
						return m.keila(
							`Example: ${prefix + command} url_youtube`,
						);
					if (!text.includes("youtu"))
						return m.keila(
							"Url Tidak Mengandung Result Dari Youtube!",
						);
					const hasil = await ytMp4(text);
					m.loading();
					await keila.sendMessage(
						m.chat,
						{
							video: {
								url: hasil.result,
							},
							caption: `*📍Title:* ${
								hasil.title
							}\n*✏Description:* ${
								hasil.desc ? hasil.desc : ""
							}\n*🚀Channel:* ${hasil.channel}\n*🗓Upload at:* ${
								hasil.uploadDate
							}`,
						},
						{
							quoted: m,
						},
					);
				}
				break;
			case "ig2":
{
    if (!text) {
        return m.keila(`Example: ${prefix + command} video_url`);
    }

    try {
        const videoURL = text;
        let info;

        // Deteksi metode yang akan digunakan berdasarkan URL
        if (videoURL.includes("/reel/")) {
            info = await instagramKei('reels', videoURL);
        } else if (videoURL.includes("/stories/")) {
            info = await instagramKei('story', videoURL);
        } else {
            info = await instagramKei('post', videoURL);
        }

        if (info.status !== 200) {
            return m.keila(info.message || "Error: Unable to retrieve content.");
        }

        // Loop through all results in the JSON
        for (const hasil of info.result) {
            // Sesuaikan pengiriman berdasarkan tipe konten
            const doc = hasil.type === "image"
                ? {
                    image: { url: hasil.url },
                    caption: `Source: ${videoURL}`,
                    contextInfo: {
                        mentionedJid: [
                            m.sender
                        ],
                        forwardingScore: 10,
                        isForwarded: true,
                    },
                }
                : {
                    video: { url: hasil.url },
                    caption: `Source: ${videoURL}`,
                    mimetype: 'video/mp4',
                    fileName: 'instagram',
                    contextInfo: {
                        mentionedJid: [
                            m.sender
                        ],
                        forwardingScore: 10,
                        isForwarded: true,
                    },
                };

            await keila.sendMessage(m.chat, doc, { quoted: m });
            console.log(`${hasil.type === "image" ? "Image" : "Video"} sent successfully`);
        }
    } catch (error) {
        m.keila(`Error: ${error.message}`);
    }
}
break;
case "ig":
case "instagram":
{
    if (!text) {
        return m.keila(`Example: ${prefix + command} <url>`);
    }

    try {
        const args = text.split(' ');
        const flag = args.length > 1 && args[0].toLowerCase() === 'a';
        const videoURL = flag ? args[1] : args[0];

        const info = await igdl(videoURL);
        const mediaList = info.data;
        const sentUrls = new Set();

        if (flag) {
            for (const media of mediaList) {
                if (!sentUrls.has(media.url)) {
                    const isVideo = !media.url.includes('scontent.cdninstagram.com');
                    const doc = {
                        [isVideo ? 'video' : 'image']: { url: media.url },
                        mimetype: isVideo ? 'video/mp4' : 'image/jpeg',
                        fileName: 'instagram'
                    };

                    await keila.sendMessage(m.chat, doc, { quoted: m });
                    sentUrls.add(media.url);
                    await new Promise(resolve => setTimeout(resolve, 2000));
                }
            }
        } else {
            const media = mediaList[0];
            const isVideo = !media.url.includes('scontent.cdninstagram.com');
            const doc = {
                [isVideo ? 'video' : 'image']: { url: media.url },
                caption: `Source: ${videoURL}`,
                mimetype: isVideo ? 'video/mp4' : 'image/jpeg',
                fileName: 'instagram',
                contextInfo: {
                    mentionedJid: [m.sender],
                    forwardingScore: 10,
                    isForwarded: true,
                    externalAdReply: {
                        title: 'Instagram DL',
                        body: `KeiLaSenpai`,
                        showAdAttribution: true,
                        thumbnailUrl: media.thumbnail,
                        mediaType: 0,
                        previewType: 0,
                        mediaUrl: media.url,
                        sourceUrl: videoURL
                    },
                },
            };

            await keila.sendMessage(m.chat, doc, { quoted: m });
        }

    } catch (error) {
        m.keila(`Error: ${error.message}`);
    }
}
break;
			case "instag":
{
    if (!text) {
        return m.keila(`Example: ${prefix + command} video_url`);
    }

    try {
        const videoURL = text;
        const info = await igDlKei(videoURL);

        const hasil = {
            thumb: info.data.thumb,
            url: info.data.url,
        };

        const doc = {
            video: { url: hasil.url },
            caption: `Source: ${videoURL}`,
            mimetype: 'video/mp4',
            fileName: 'instagram',
            contextInfo: {
                mentionedJid: [
                    m.sender
                ],
                forwardingScore: 10,
                isForwarded: true,
                externalAdReply: {
                    title: 'Instagram DL',
                    body: `KeiLaSenpai`,
                    showAdAttribution: true,
                    thumbnailUrl: hasil.thumb,
                    mediaType: 0,
                    previewType: 0,
                    mediaUrl: hasil.url,
                    sourceUrl: videoURL
                },
            },
        };

        await keila.sendMessage(m.chat, doc, { quoted: m });
        console.log("Video sent successfully");
    } catch (error) {
        m.keila(`Error: ${error.message}`);
    }
}
break;
			case "instadl":
			case "igdown":
			case "igdl":
				{
					if (!text)
						return m.keila(
							`Example: ${prefix + command} url_instagram`,
						);
					if (!text.includes("instagram.com"))
						return m.reply(
							"Url Tidak Mengandung Result Dari Instagram!",
						);
					const hasil = await instaDl(text);
					if (hasil.length < 1)
						return m.reply("Postingan Tidak Tersedia atau Privat!");
					m.loading();
					for (let i = 0; i < hasil.length; i++) {
						await keila.sendFileUrl(
							m.chat,
							hasil[i].url,
							"Done",
							m,
						);
					}
				}
				break;
			case "igstory":
			case "instagramstory":
			case "instastory":
			case "storyig":
				{
					if (!text)
						return m.keila(
							`Example: ${prefix + command} usernamenya`,
						);
					try {
						const hasil = await instaStory(text);
						m.loading();
						for (let i = 0; i < hasil.results.length; i++) {
							await keila.sendFileUrl(
								m.chat,
								hasil.results[i].url,
								"Done",
								m,
							);
						}
					} catch (e) {
						m.reply("Username tidak ditemukan atau Privat!");
					}
				}
				break;
			case "tplay":
{
    if (!text) {
        return m.keila(`Example: ${prefix + command} Hutao Edit`);
    }
    const keilaDB = loadKeilaDB();
    
    if (keilaDB[m.sender] && keilaDB[m.sender].statusbt === false) {
      return m.keila(`Maaf Fitur Ini Khusus Button On!\n\nGunakan: .ttsearch`);
    };

    m.loading();

    try {
        if (m.quoted && m.quoted.fromMe && m.quoted.mentions.includes(m.sender)) {
            await keila.sendMessage(m.chat, {
                delete: {
                    remoteJid: m.chat,
                    fromMe: true,
                    id: m.quoted.id,
                    participant: m.quoted.sender,
                },
            });
        }

        const searchResults = await tiktokSearchKei(text);
        console.log(searchResults);
        if (!searchResults || searchResults.length === 0) {
            return m.reply('No results found.');
        }

        // Memilih hasil acak dari searchResults
        const randomIndex = Math.floor(Math.random() * searchResults.length);
        const selectedResult = searchResults[randomIndex];

        const bodyText = `*Title:* ${selectedResult.title}\n*Author:* ${selectedResult.author}\n*URL:* ${selectedResult.url}`;

        const buttonOptions = [
            { "name": "quick_reply", "buttonParamsJson": `{"display_text":"Video","id":".tiktokmp4 ${selectedResult.url}"}` },
            { "name": "quick_reply", "buttonParamsJson": `{"display_text":"Video HD","id":".tiktokhd ${selectedResult.url}"}` },
            { "name": "quick_reply", "buttonParamsJson": `{"display_text":"Audio","id":".tiktokmp3 ${selectedResult.url}"}` },
            { "name": "quick_reply", "buttonParamsJson": `{"display_text":"Cari Lagi","id":".tplay ${text}"}` }
        ];

        let msg = generateWAMessageFromContent(m.chat, {
            viewOnceMessage: {
                message: {
                    messageContextInfo: {
                        deviceListMetadata: {},
                        deviceListMetadataVersion: 2
                    },
                    interactiveMessage: proto.Message.InteractiveMessage.create({
                        contextInfo: {
                            mentionedJid: [m.sender],
                            isForwarded: true,
                            forwardedNewsletterMessageInfo: {
                                newsletterJid: global.my.nl,
                                serverMessageId: 100,
                                newsletterName: global.mess.ucpnl
                            },
                            businessMessageForwardInfo: { businessOwnerJid: keila.decodeJid(keila.user.id) },
                        },
                        body: proto.Message.InteractiveMessage.Body.create({
                            text: `Here are the results for your search query "${text}":\n\n${bodyText}`
                        }),
                        footer: proto.Message.InteractiveMessage.Footer.create({
                            text: ucapanWaktu
                        }),
                        header: proto.Message.InteractiveMessage.Header.create({
                            title: `❍「 *TikTok Search* 」❍`,
                            subtitle: "KeiLaSenpai",
                            hasMediaAttachment: true, 
                            ...(await prepareWAMessageMedia({ image: { url: selectedResult.thumb } }, { upload: keila.waUploadToServer }))
                        }),
                        nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
                            buttons: buttonOptions
                        })
                    })
                }
            }
        }, {});

        await keila.relayMessage(msg.key.remoteJid, msg.message, {
            messageId: msg.key.id
        }).then(response => {
            console.log("Message sent successfully", response);
        }).catch(error => {
            console.error("Error sending message", error);
        });

    } catch (error) {
        console.error('Error during TikTok search:', error.message);
        m.keila('Error during Tiktok Search.');
    }
}
break;
case "ttm":
{
    if (!text) {
        return m.keila(`Example: ${prefix + command} Hutao Edit`);
    }
    const keilaDB = loadKeilaDB();
    
    if (keilaDB[m.sender] && keilaDB[m.sender].statusbt === false) {
      return m.keila(`Maaf Fitur Ini Khusus Button On!\n\nGunakan: .playaudio / .playvideo`);
    };

    m.loading();

    try {
        if (m.quoted && m.quoted.fromMe && m.quoted.mentions.includes(m.sender)) {
            await keila.sendMessage(m.chat, {
                delete: {
                    remoteJid: m.chat,
                    fromMe: true,
                    id: m.quoted.id,
                    participant: m.quoted.sender,
                },
            });
        }

        const selectedResult = await tiktokDlKei(text);
        if (!selectedResult || selectedResult.length === 0) {
            return m.reply('No results found.');
        }

        const bodyText = `*Title:* ${selectedResult.title}\n*Author:* ${selectedResult.author.fullname}\n*URL:* ${text}`;

        const buttonOptions = [
            { "name": "quick_reply", "buttonParamsJson": `{"display_text":"Video","id":".tiktokmp4 ${text}"}` },
            { "name": "quick_reply", "buttonParamsJson": `{"display_text":"Video HD","id":".tiktokhd ${text}"}` },
            { "name": "quick_reply", "buttonParamsJson": `{"display_text":"Audio","id":".tiktokmp3 ${text}"}` },
            { "name": "quick_reply", "buttonParamsJson": `{"display_text":"All","id":".tiktok ${text}"}` }
        ];

        let msg = generateWAMessageFromContent(m.chat, {
            viewOnceMessage: {
                message: {
                    messageContextInfo: {
                        deviceListMetadata: {},
                        deviceListMetadataVersion: 2
                    },
                    interactiveMessage: proto.Message.InteractiveMessage.create({
                        contextInfo: {
                            mentionedJid: [m.sender],
                            isForwarded: true,
                            forwardedNewsletterMessageInfo: {
                                newsletterJid: global.my.nl,
                                serverMessageId: 100,
                                newsletterName: global.mess.ucpnl
                            },
                            businessMessageForwardInfo: { businessOwnerJid: keila.decodeJid(keila.user.id) },
                        },
                        body: proto.Message.InteractiveMessage.Body.create({
                            text: `Here are the results for your search query "${text}":\n\n${bodyText}`
                        }),
                        footer: proto.Message.InteractiveMessage.Footer.create({
                            text: ucapanWaktu
                        }),
                        header: proto.Message.InteractiveMessage.Header.create({
                            title: `❍「 *Tiktok Downloader* 」❍`,
                            subtitle: "KeiLaSenpai",
                            hasMediaAttachment: true, 
                            ...(await prepareWAMessageMedia({ image: { url: selectedResult.cover } }, { upload: keila.waUploadToServer }))
                        }),
                        nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
                            buttons: buttonOptions
                        })
                    })
                }
            }
        }, {});

        await keila.relayMessage(msg.key.remoteJid, msg.message, {
            messageId: msg.key.id
        }).then(response => {
            console.log("Message sent successfully", response);
        }).catch(error => {
            console.error("Error sending message", error);
        });

    } catch (error) {
        console.error('Error during TikTok search:', error.message);
        m.keila('An error occurred while searching TikTok.');
    }
}
break;
case "ttsearch": {
    if (!text) {
        return m.keila(`Example: ${prefix + command} query`);
    }

    try {
        const searchResults = await tiktokSearchKei(text);
        console.log(searchResults);

        if (!searchResults || searchResults.length === 0) {
            return m.reply("No results found.");
        }

        const randomIndex = Math.floor(Math.random() * searchResults.length);
        const selectedResult = searchResults[randomIndex];

        const result = await tiktokDlKei(selectedResult.url);
        if (result.length === 0) {
            return m.reply("No valid results found.");
        }

        const hasil = {
            aurl: result.data[3].url,
            vurl: result.data[1].url,
            title: result.title,
            thumb: result.cover
        };

        const videoDoc = {
            video: { url: hasil.vurl },
            caption: `*Title:* ${selectedResult.title}\n*Author:* ${selectedResult.author}\n*URL:* ${selectedResult.url}`,
            mimetype: 'video/mp4',
            fileName: hasil.title,
            contextInfo: {
                mentionedJid: [
                    m.sender
                ],
                forwardingScore: 10,
                isForwarded: true,
                externalAdReply: {
                    title: hasil.title,
                    body: `Duration: ${result.duration}`,
                    showAdAttribution: true,
                    thumbnailUrl: hasil.thumb,
                    mediaType: 1,
                    previewType: 0,
                    mediaUrl: hasil.vurl,
                    sourceUrl: selectedResult.url
                },
            },
        };

        const audioDoc = {
            audio: { url: hasil.aurl },
            mimetype: 'audio/mp4',
            fileName: `${hasil.title} - Audio`,
            contextInfo: {
                mentionedJid: [
                    m.sender
                ],
                forwardingScore: 10,
                isForwarded: true,
                externalAdReply: {
                    title: hasil.title,
                    body: `Duration: ${result.duration}`,
                    showAdAttribution: true,
                    thumbnailUrl: hasil.thumb,
                    mediaType: 1,
                    previewType: 0,
                    mediaUrl: hasil.aurl,
                    sourceUrl: selectedResult.url
                },
            },
        };

        await keila.sendMessage(m.chat, videoDoc, { quoted: m });
        await keila.sendMessage(m.chat, audioDoc, { quoted: m });

        console.log("Video and audio search result sent successfully");
    } catch (error) {
        m.keila(`Error: ${error.message}`);
    }
}
break;
case "tiktokmp4":
{
    if (!text) {
        return m.keila(`Example: ${prefix + command} video_url`);
    }

    try {
        const videoURL = text;
        const info = await tiktokDlKei(videoURL);

        const hasil = {
            title: info.title,
            thumb: info.cover,
            url: info.data[1].url
        };

        const doc = {
            video: { url: hasil.url },
            mimetype: 'video/mp4',
            fileName: hasil.title,
            contextInfo: {
                mentionedJid: [
                    m.sender
                ],
                forwardingScore: 10,
                isForwarded: true,
                externalAdReply: {
                    title: hasil.title,
                    body: `Duration: ${info.duration}`,
                    showAdAttribution: true,
                    thumbnailUrl: hasil.thumb,
                    mediaType: 1,
                    previewType: 0,
                    mediaUrl: hasil.url,
                    sourceUrl: videoURL
                },
            },
        };

        await keila.sendMessage(m.chat, doc, { quoted: m });
        console.log("Video sent successfully");
    } catch (error) {
        m.reply(`Error: ${error.message}`);
    }
}
break;
case "tiktokhd":
{
    if (!text) {
        return m.keila(`Example: ${prefix + command} video_url`);
    }

    try {
        const videoURL = text;
        const info = await tiktokDlKei(videoURL);

        const hasil = {
            title: info.title,
            thumb: info.cover,
            url: info.data[2].url
        };

        const doc = {
            video: { url: hasil.url },
            mimetype: 'video/mp4',
            fileName: hasil.title,
            contextInfo: {
                mentionedJid: [
                    m.sender
                ],
                forwardingScore: 10,
                isForwarded: true,
                externalAdReply: {
                    title: hasil.title,
                    body: `Duration: ${info.duration}`,
                    showAdAttribution: true,
                    thumbnailUrl: hasil.thumb,
                    mediaType: 1,
                    previewType: 0,
                    mediaUrl: hasil.url,
                    sourceUrl: videoURL
                },
            },
        };

        await keila.sendMessage(m.chat, doc, { quoted: m });
        console.log("Video sent successfully");
    } catch (error) {
        m.reply(`Error: ${error.message}`);
    }
}
break;
case "tiktokmp3":
{
    if (!text) {
        return m.keila(`Example: ${prefix + command} video_url`);
    }

    try {
        const videoURL = text;
        const info = await tiktokDlKei(videoURL);

        const hasil = {
            title: info.title,
            thumb: info.cover,
            url: info.data[3].url
        };

        const doc = {
            audio: { url: hasil.url },
            mimetype: 'audio/mp4',
            fileName: hasil.title,
            contextInfo: {
                mentionedJid: [
                    m.sender
                ],
                forwardingScore: 10,
                isForwarded: true,
                externalAdReply: {
                    title: hasil.title,
                    body: `Duration: ${info.duration}`,
                    showAdAttribution: true,
                    thumbnailUrl: hasil.thumb,
                    mediaType: 1,
                    previewType: 0,
                    mediaUrl: hasil.url,
                    sourceUrl: videoURL
                },
            },
        };

        await keila.sendMessage(m.chat, doc, { quoted: m });
        console.log("Audio sent successfully");
    } catch (error) {
        m.keila(`Error: ${error.message}`);
    }
}
break;

case "tt":
case "tiktok":
{
    if (!text) {
        return m.keila(`Example: ${prefix + command} video_url`);
    }

    try {
        const videoURL = text;
        const result = await tiktokDlKei(videoURL);

        if (result.length === 0) {
            return m.reply('No valid results found.');
        }
        const hasil = {
          aurl: result.data[3].url,
          vurl: result.data[1].url,
          title: result.title,
          thumb: result.cover
        }


        const videoDoc = {
            video: { url: hasil.vurl },
            mimetype: 'video/mp4',
            fileName: hasil.title,
            contextInfo: {
                mentionedJid: [
                    m.sender
                ],
                forwardingScore: 10,
                isForwarded: true,
                externalAdReply: {
                    title: hasil.title,
                    body: `Duration: ${result.duration}`,
                    showAdAttribution: true,
                    thumbnailUrl: hasil.thumb,
                    mediaType: 1,
                    previewType: 0,
                    mediaUrl: hasil.vurl,
                    sourceUrl: videoURL
                },
            },
        };

        const audioDoc = {
            audio: { url: hasil.aurl },
            mimetype: 'audio/mp4',
            fileName: hasil.title,
            contextInfo: {
                mentionedJid: [
                    m.sender
                ],
                forwardingScore: 10,
                isForwarded: true,
                externalAdReply: {
                    title: hasil.title,
                    body: `Duration: ${result.duration}`,
                    showAdAttribution: true,
                    thumbnailUrl: hasil.thumb,
                    mediaType: 1,
                    previewType: 0,
                    mediaUrl: hasil.aurl,
                    sourceUrl: videoURL
                },
            },
        };

        await keila.sendMessage(m.chat, videoDoc, { quoted: m });
        await keila.sendMessage(m.chat, audioDoc, { quoted: m });

        console.log("Video and Audio sent successfully");
    } catch (error) {
        m.keila(`Error: ${error.message}`);
    }
}
break;
case "fb":
case "facebook":
{
    if (!text) {
        return m.keila(`Example: ${prefix + command} video_url`);
    }

    try {
        const videoURL = text;
        const info = await savefrom(videoURL);

        const hasil = {
            title: info[0].meta.title,
            thumb: info[0].thumb,
            url: info[0].meta.source,
            sd: info[0].sd.url
        };

        const doc = {
            video: { url: hasil.sd },
            caption: `Title: ${hasil.title}\nSource: ${hasil.url}`,
            mimetype: 'video/mp4',
            fileName: hasil.title,
            contextInfo: {
                mentionedJid: [
                    m.sender
                ],
                forwardingScore: 10,
                isForwarded: true,
                externalAdReply: {
                    title: hasil.title,
                    body: `Fb Downloader!`,
                    showAdAttribution: true,
                    thumbnailUrl: hasil.thumb,
                    mediaType: 0,
                    previewType: 0,
                    mediaUrl: hasil.sd,
                    sourceUrl: hasil.url
                },
            },
        };

        await keila.sendMessage(m.chat, doc, { quoted: m });
        console.log("Video sent successfully");
    } catch (error) {
        m.keila(`Error: ${error.message}`);
    }
}
break;
			case "fbdl":
			case "fbdown":
			case "facebookdl":
			case "facebookdown":
			case "fbdownload":
			case "fbmp4":
			case "fbvideo":
				{
					if (!text)
						return m.keila(
							`Example: ${prefix + command} url_facebook`,
						);
					if (!text.includes("facebook.com"))
						return m.keila(
							"Url Tidak Mengandung Result Dari Facebook!",
						);
					const hasil = await facebookDl(text);
					if (hasil.results.length < 1) {
						m.keila("Video Tidak ditemukan!");
					} else {
						m.loading();
						await keila.sendMessage(
							m.chat,
							{
								video: {
									url: hasil.results[0].url,
								},
								caption: `*🎐Title:* ${hasil.caption}`,
							},
							{
								quoted: m,
							},
						);
					}
				}
				break;

			// Fun Menu
			case "dadu":
				{
					let ddsa = [
						{
							url: "https://telegra.ph/file/9f60e4cdbeb79fc6aff7a.png",
							no: 1,
						},
						{
							url: "https://telegra.ph/file/797f86e444755282374ef.png",
							no: 2,
						},
						{
							url: "https://telegra.ph/file/970d2a7656ada7c579b69.png",
							no: 3,
						},
						{
							url: "https://telegra.ph/file/0470d295e00ebe789fb4d.png",
							no: 4,
						},
						{
							url: "https://telegra.ph/file/a9d7332e7ba1d1d26a2be.png",
							no: 5,
						},
						{
							url: "https://telegra.ph/file/99dcd999991a79f9ba0c0.png",
							no: 6,
						},
					];
					let media = pickRandom(ddsa);
					await keila.sendAsSticker(m.chat, media.url, m, "image", {
						packname: global.packname,
						author: global.author,
						isAvatar: 1,
					});
				}
				break;
			case "halah":
			case "hilih":
			case "huluh":
			case "heleh":
			case "holoh":
				{
					if (!m.quoted && !text)
						return m.keila(
							`Kirim/reply text dengan caption ${
								prefix + command
							}`,
						);
					ter = command[1].toLowerCase();
					tex = m.quoted
						? m.quoted.text
							? m.quoted.text
							: q
							? q
							: m.text
						: q
						? q
						: m.text;
					m.reply(
						tex
							.replace(/[aiueo]/g, ter)
							.replace(/[AIUEO]/g, ter.toUpperCase()),
					);
				}
				break;
			case "bisakah":
				{
					if (!text)
						return m.keila(
							`Example : ${prefix + command} saya menang?`,
						);
					let bisa = [
						"Bisa",
						"Coba Saja",
						"Pasti Bisa",
						"Mungkin Saja",
						"Tidak Bisa",
						"Tidak Mungkin",
						"Coba Ulangi",
						"Ngimpi kah?",
						"yakin bisa?",
					];
					let keh = bisa[Math.floor(Math.random() * bisa.length)];
					m.reply(`*Bisakah ${text}*\nJawab : ${keh}`);
				}
				break;
			case "apakah":
				{
					if (!text)
						return m.keila(
							`Example : ${prefix + command} saya bisa menang?`,
						);
					let apa = [
						"Iya",
						"Tidak",
						"Bisa Jadi",
						"Coba Ulangi",
						"Mungkin Saja",
						"Mungkin Tidak",
						"Mungkin Iya",
						"Ntahlah",
					];
					let kah = apa[Math.floor(Math.random() * apa.length)];
					m.reply(`*${command} ${text}*\nJawab : ${kah}`);
				}
				break;
			case "kapan":
			case "kapankah":
				{
					if (!text)
						return m.keila(
							`Example : ${prefix + command} saya menang?`,
						);
					let kapan = [
						"Besok",
						"Lusa",
						"Nanti",
						"4 Hari Lagi",
						"5 Hari Lagi",
						"6 Hari Lagi",
						"1 Minggu Lagi",
						"2 Minggu Lagi",
						"3 Minggu Lagi",
						"1 Bulan Lagi",
						"2 Bulan Lagi",
						"3 Bulan Lagi",
						"4 Bulan Lagi",
						"5 Bulan Lagi",
						"6 Bulan Lagi",
						"1 Tahun Lagi",
						"2 Tahun Lagi",
						"3 Tahun Lagi",
						"4 Tahun Lagi",
						"5 Tahun Lagi",
						"6 Tahun Lagi",
						"1 Abad lagi",
						"3 Hari Lagi",
						"Bulan Depan",
						"Ntahlah",
						"Tidak Akan Pernah",
					];
					let koh = kapan[Math.floor(Math.random() * kapan.length)];
					m.reply(`*${command} ${text}*\nJawab : ${koh}`);
				}
				break;
			case "tanyakerang":
			case "kerangajaib":
			case "kerang":
				{
					if (!text)
						return m.keila(
							`Example : ${prefix + command} boleh pinjam 100?`,
						);
					let krng = [
						"Mungkin suatu hari",
						"Tidak juga",
						"Tidak keduanya",
						"Kurasa tidak",
						"Ya",
						"Tidak",
						"Coba tanya lagi",
						"Tidak ada",
					];
					let jwb = pickRandom(krng);
					m.reply(`*Pertanyaan : ${text}*\n*Jawab : ${jwb}*`);
				}
				break;
			case "cekmati":
				{
					if (!text)
						return m.keila(`Example : ${prefix + command} nama lu`);
					let teksnya = text
						.replace(/[\uD800-\uDBFF][\uDC00-\uDFFF]/g, "")
						.replace(/\d/g, "");
					let { data } = await axios.get(
						`https://api.agify.io/?name=${
							teksnya ? teksnya : "bot"
						}`,
					);
					let jawab = `Nama : ${text}\n*Mati Pada Umur :* ${
						data.age == null
							? Math.floor(Math.random() * 100)
							: data.age
					} Tahun.\n\n_Cepet Cepet Tobat Bro_\n_Soalnya Mati ga ada yang tau_`;
					m.reply(jawab);
				}
				break;
			case "rate":
			case "nilai":
				{
					let rate = Math.floor(Math.random() * 100);
					m.reply(`Rate Bot : *${rate}%*`);
				}
				break;
				case "wish":
{
    let amount = 1;
    let cost = 0;

    if (text === "10") {
        amount = 10;
        cost = 1600;
    } else if (text === "1") {
        amount = 1;
        cost = 160;
    } else if (text === "") {
        amount = 1;
        cost = 160;
    } else {
        return m.keila(`Contoh: ${prefix + command} 1 atau ${prefix + command} 10`);
    }

    if (global.db.users[m.sender].uang < cost) {
        return m.reply("Uang tidak cukup untuk melakukan gacha.");
    }
    
    const keilaDB = loadKeilaDB();

    global.db.users[m.sender].uang -= cost;

    const gachaResult = await gacha(m.sender, amount);
    let mediaUrl;

    const hasB5 = gachaResult.some(item => item.rarity === 'B5');
    const hasB4 = gachaResult.some(item => item.rarity === 'B4');

    if (hasB5) {
        mediaUrl = "https://files.catbox.moe/qbe0z8.mp4";
    } else if (hasB4) {
        mediaUrl = "https://files.catbox.moe/2fr9ay.mp4";
    } else {
        mediaUrl = "https://files.catbox.moe/61gthn.mp4";
    }

    const obtainedItems = gachaResult.map(item => {
        const starCount = item.rarity === 'B5' ? '✦✦✦✦✦' : item.rarity === 'B4' ? '✦✦✦✦✧' : '✦✦✦✧✧';
        const pityText = item.rarity === 'B5' ? ` ${item.pity}` : '  ';
        return `${pityText} •   ${item.name}   ${starCount}`;
    }).join('\n');

    const remainingPrimogems = global.db.users[m.sender].uang.toLocaleString("id-ID");

    const msg = generateWAMessageFromContent(m.chat, {
        viewOnceMessage: {
            message: {
                messageContextInfo: {
                    deviceListMetadata: {},
                    deviceListMetadataVersion: 2
                },
                interactiveMessage: proto.Message.InteractiveMessage.create({
                    contextInfo: {
                        mentionedJid: [m.sender],
                        isForwarded: true,
                        forwardedNewsletterMessageInfo: {
                            newsletterJid: global.my.nl,
                            serverMessageId: 100,
                            newsletterName: global.mess.ucpnl
                        },
                        businessMessageForwardInfo: { businessOwnerJid: keila.decodeJid(keila.user.id) },
                    },
                    body: proto.Message.InteractiveMessage.Body.create({
                        text: `Obtained:\n${obtainedItems}\n\nSisa Primogems: ${remainingPrimogems}`,
                    }),
                    footer: proto.Message.InteractiveMessage.Footer.create({
                        text: ucapanWaktu
                    }),
                    header: proto.Message.InteractiveMessage.Header.create({
                        title: `❍「 *Genshin Wish Simulator* 」❍`,
                        subtitle: "KeiLaSenpai",
                        hasMediaAttachment: true, ...(await prepareWAMessageMedia({ video: { url: mediaUrl }, gifPlayback: true }, { upload: keila.waUploadToServer }))
                    }),
                    nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
                        buttons: [
                            { "name": "quick_reply", "buttonParamsJson": `{"display_text":"Wish 1 (160 Primogems)","id":".wish 1"}` },
                            { "name": "quick_reply", "buttonParamsJson": `{"display_text":"Wish 10 (1600 Primogems)","id":".wish 10"}` }
                        ]
                    })
                })
            }
        }
    }, {});

    if (keilaDB[m.sender] && keilaDB[m.sender].statusbt === false) {
      await keila.sendMessage(m.chat, { video: { url: mediaUrl }, caption: `Obtained:\n${obtainedItems}\n\nSisa Primogems: ${remainingPrimogems}`}, { quoted: fkontak });
    } else {
      await keila.relayMessage(msg.key.remoteJid, msg.message, {
        messageId: msg.key.id
      }).then(response => {
        console.log("Message sent successfully", response);
      }).catch(error => {
        console.error("Error sending message", error);
      });
    }
}
break;
case "wishhst":
case "wishhistory": {
    let page = 1;
    let rarityFilter = null;

    if (text) {
        const args = text.split(" ");
        if (args.length === 1) {
            if (["B5", "B4", "B3"].includes(args[0])) {
                rarityFilter = args[0];
            } else {
                page = parseInt(args[0]);
                if (isNaN(page) || page < 1) return m.reply(`Page harus berupa angka yang valid.`);
            }
        } else if (args.length === 2) {
            rarityFilter = args[0];
            page = parseInt(args[1]);
            if (isNaN(page) || page < 1) return m.reply(`Page harus berupa angka yang valid.`);
        } else {
            return m.keila(`Format salah. Gunakan: ${prefix + command} [rarity] [page]`);
        }
    }
    const keilaDB = loadKeilaDB();

    let history;
    if (rarityFilter) {
        history = await historyGacha(m.sender, rarityFilter);
    } else {
        history = await historyGacha(m.sender);
    }

    if (!history || history.length === 0) {
        return m.reply(`Tidak ada data history gacha yang ditemukan.`);
    }

    const itemsPerPage = 25;
    const totalPages = Math.ceil(history.length / itemsPerPage);
    if (page > totalPages) {
        return m.reply(`Page terlalu besar. Hanya ada ${totalPages} halaman.`);
    }

    const startIndex = (page - 1) * itemsPerPage;
    const paginatedHistory = history.slice(startIndex, startIndex + itemsPerPage);

    const historyText = paginatedHistory.map(item => {
        const starCount = item.rarity === 'B5' ? '✦✦✦✦✦' : item.rarity === 'B4' ? '✦✦✦✦✧' : '✦✦✦✧✧';
        const pityText = item.rarity === 'B5' ? ` ${item.pity}` : '';
        const name = item.rarity === 'B5' ? `*${item.name}*` : item.name;
        return `> ${item.pity || ''}   •   ${starCount} ${name}   ${pityText}`;
    }).join('\n');

    const buttons = [];

    if (page > 1) {
        buttons.push({
            "name": "quick_reply", 
            "buttonParamsJson": `{"display_text":"Previous Page","id":".wishhistory ${rarityFilter ? rarityFilter + ' ' : ''}${page - 1}"}`
        });
    }

    if (page < totalPages) {
        buttons.push({
            "name": "quick_reply", 
            "buttonParamsJson": `{"display_text":"Next Page","id":".wishhistory ${rarityFilter ? rarityFilter + ' ' : ''}${page + 1}"}`
        });
    }

    const msg = generateWAMessageFromContent(m.chat, {
        viewOnceMessage: {
            message: {
                messageContextInfo: {
                    deviceListMetadata: {},
                    deviceListMetadataVersion: 2
                },
                interactiveMessage: proto.Message.InteractiveMessage.create({
                    contextInfo: {
                        mentionedJid: [m.sender],
                        isForwarded: true,
                        forwardedNewsletterMessageInfo: {
                            newsletterJid: global.my.nl,
                            serverMessageId: 100,
                            newsletterName: global.mess.ucpnl
                        },
                        businessMessageForwardInfo: { businessOwnerJid: keila.decodeJid(keila.user.id) },
                    },
                    body: proto.Message.InteractiveMessage.Body.create({
                        text: `\n\nHistory Wish (Page ${page}/${totalPages}):\n\n${historyText}`,
                    }),
                    footer: proto.Message.InteractiveMessage.Footer.create({
                        text: ucapanWaktu
                    }),
                    header: proto.Message.InteractiveMessage.Header.create({
                        title: `❍「 *GI Wish Simulator History* 」❍`,
                        subtitle: "KeiLaSenpai",
                        hasMediaAttachment: true, ...(await prepareWAMessageMedia({ image: { url: "https://files.catbox.moe/qtq0gg.jpg" } }, { upload: keila.waUploadToServer }))
                    }),
                    nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
                        buttons: buttons
                    })
                })
            }
        }
    }, {});

    if (keilaDB[m.sender] && keilaDB[m.sender].statusbt === false) {
      await keila.sendMessage(m.chat, { image: { url: 'https://files.catbox.moe/qtq0gg.jpg' }, caption: `\n\nHistory Wish (Page ${page}/${totalPages}):\n\n${historyText}`}, { quoted: fkontak });
    } else {
      await keila.relayMessage(msg.key.remoteJid, msg.message, {
        messageId: msg.key.id
      }).then(response => {
        console.log("Message sent successfully", response);
      }).catch(error => {
        console.error("Error sending message", error);
      });
    }
}
break;
case "wishinv":
case "wishinventory": {
    let page = 1;
    if (text) {
        page = parseInt(text);
        if (isNaN(page) || page < 1) return m.reply(`Page harus berupa angka yang valid.`);
    }

    let inventory = await inventoryGacha(m.sender);
    if (!inventory || inventory.length === 0) {
        return m.reply(`Tidak ada item di inventory.`);
    }
    const keilaDB = loadKeilaDB();

    let characters = inventory.filter(item => item.ischaracter);
    let weapons = inventory.filter(item => !item.ischaracter);

    const charactersPerPage = 10;
    const weaponsPerPage = 10;
    const totalItems = characters.length + weapons.length;
    const itemsPerPage = charactersPerPage + weaponsPerPage;
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    if (page > totalPages) {
        return m.reply(`Page terlalu besar. Hanya ada ${totalPages} halaman.`);
    }

    const startCharacterIndex = (page - 1) * charactersPerPage;
    const startWeaponIndex = (page - 1) * weaponsPerPage;

    const paginatedCharacters = characters.slice(startCharacterIndex, startCharacterIndex + charactersPerPage);
    const paginatedWeapons = weapons.slice(startWeaponIndex, startWeaponIndex + weaponsPerPage);

    const characterListText = paginatedCharacters.map(item => {
        const starCount = item.rarity === 'B5' ? '✦✦✦✦✦' : item.rarity === 'B4' ? '✦✦✦✦✧' : '✦✦✦✧✧';
        return `> ${starCount}   •   ${item.name}   C${item.jumlah}`;
    }).join('\n');

    const weaponListText = paginatedWeapons.map(item => {
        const starCount = item.rarity === 'B5' ? '✦✦✦✦✦' : item.rarity === 'B4' ? '✦✦✦✦✧' : '✦✦✦✧✧';
        return `> ${starCount}  •  ${item.name}   R${item.jumlah}`;
    }).join('\n');

    if (!characterListText && !weaponListText) {
        return m.reply(`Tidak ada item pada halaman ini.`);
    }

    const buttons = [];
    if (page < totalPages) {
        buttons.push({ "name": "quick_reply", "buttonParamsJson": `{"display_text":"Next Page","id":".wishinventory ${page + 1}"}` });
    }
    if (page > 1) {
        buttons.push({ "name": "quick_reply", "buttonParamsJson": `{"display_text":"Previous Page","id":".wishinventory ${page - 1}"}` });
    }

    const msg = generateWAMessageFromContent(m.chat, {
        viewOnceMessage: {
            message: {
                messageContextInfo: {
                    deviceListMetadata: {},
                    deviceListMetadataVersion: 2
                },
                interactiveMessage: proto.Message.InteractiveMessage.create({
                    contextInfo: {
                        mentionedJid: [m.sender],
                        isForwarded: true,
                        forwardedNewsletterMessageInfo: {
                            newsletterJid: global.my.nl,
                            serverMessageId: 100,
                            newsletterName: global.mess.ucpnl
                        },
                        businessMessageForwardInfo: { businessOwnerJid: keila.decodeJid(keila.user.id) },
                    },
                    body: proto.Message.InteractiveMessage.Body.create({
                        text: `Page ${page}/${totalPages}\n\n\nCharacter List:\n\n${characterListText || 'Tidak ada karakter di halaman ini.'}\n\nWeapons List:\n\n${weaponListText || 'Tidak ada senjata di halaman ini.'}`,
                    }),
                    footer: proto.Message.InteractiveMessage.Footer.create({
                        text: ucapanWaktu
                    }),
                    header: proto.Message.InteractiveMessage.Header.create({
                        title: `❍「*GI Wish Simulator Inventory*」❍`,
                        subtitle: "KeiLaSenpai",
                        hasMediaAttachment: true, ...(await prepareWAMessageMedia({ image: { url: "https://files.catbox.moe/uaes8c.jpg" } }, { upload: keila.waUploadToServer }))
                    }),
                    nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
                        buttons: buttons
                    })
                })
            }
        }
    }, {});

    if (keilaDB[m.sender] && keilaDB[m.sender].statusbt === false) {
      await keila.sendMessage(m.chat, { image: { url: 'https://files.catbox.moe/uaes8c.jpg' }, caption: `Page ${page}/${totalPages}\n\n\nCharacter List:\n\n${characterListText || 'Tidak ada karakter di halaman ini.'}\n\nWeapons List:\n\n${weaponListText || 'Tidak ada senjata di halaman ini.'}`}, { quoted: fkontak });
    } else {
      await keila.relayMessage(msg.key.remoteJid, msg.message, {
        messageId: msg.key.id
      }).then(response => {
        console.log("Message sent successfully", response);
      }).catch(error => {
        console.error("Error sending message", error);
      });
    }
}
break;

case "jodoh":
{
    if (!m.isGroup) {
        m.reply('Perintah ini hanya bisa digunakan di grup.');
        break;
    }

    const keilaDB = loadKeilaDB();
    const groupId = m.chat;
    const senderId = m.sender;

    if (m.quoted) {
        const target = m.quoted.sender;
        if (keilaDB[target]) {
            const jodohData = keilaDB[target];
            const jadianDate = new Date(jodohData.timestamp).toLocaleString('id-ID', { dateStyle: 'long', timeStyle: 'short' });

            m.reply(`💘 Jodoh @${target.split('@')[0]} adalah: @${jodohData.jodoh.split('@')[0]}.\nMereka telah berjodoh sejak ${jadianDate}.`);
        } else {
            m.reply(`💘 @${target.split('@')[0]} belum memiliki jodoh.`);
        }
        break;
    }

    if (m.message.extendedTextMessage && m.message.extendedTextMessage.contextInfo.mentionedJid.length > 0) {
        const target = m.message.extendedTextMessage.contextInfo.mentionedJid[0];
        if (keilaDB[target]) {
            const jodohData = keilaDB[target];
            const jadianDate = new Date(jodohData.timestamp).toLocaleString('id-ID', { dateStyle: 'long', timeStyle: 'short' });

            m.reply(`💘 Jodoh @${target.split('@')[0]} adalah: @${jodohData.jodoh.split('@')[0]}.\nMereka telah berjodoh sejak ${jadianDate}.`);
        } else {
            m.reply(`💘 @${target.split('@')[0]} belum memiliki jodoh.`);
        }
        break;
    }

    if (args.length === 0) {
        if (keilaDB[senderId] && keilaDB[senderId].jodoh) {
            const jodohData = keilaDB[senderId];
            const jadianDate = new Date(jodohData.timestamp).toLocaleString('id-ID', { dateStyle: 'long', timeStyle: 'short' });

            m.reply(`💘 Jodoh Anda adalah: @${jodohData.jodoh.split('@')[0]}.\nMereka telah berjodoh sejak ${jadianDate}.`);
        } else {
            try {
                const participants = m.metadata.participants.map(a => a.id);
                const sfsData = loadSfsData();
                
                const choice = Math.random();
                let jodoh;

                if (choice < 0.5) {
                    const randomIndex = Math.floor(Math.random() * participants.length);
                    jodoh = participants[randomIndex];
                    
                    if (jodoh === senderId) {
                        m.reply('Sepertinya kamu adalah jodoh terbaik untuk dirimu sendiri!');
                        break;
                    }
                } else {
                    const randomIndex = Math.floor(Math.random() * sfsData.length);
                    jodoh = `fiksi-${sfsData[randomIndex]}`;
                }

                if (!keilaDB[senderId]) {
                    keilaDB[senderId] = {};
                }
                
                keilaDB[senderId].jodoh = jodoh;
                keilaDB[senderId].timestamp = new Date().toISOString();
                
                saveKeilaDB(keilaDB);

                m.reply(`💘 Jodoh Anda adalah: ${jodoh.startsWith('fiksi-') ? jodoh.substring(6) : `@${jodoh.split('@')[0]}`}.`);
            } catch (error) {
                m.reply('Gagal mengambil anggota grup atau karakter fiksi. Silakan coba lagi.');
            }
        }
    }
}
break;
case "jdh":
{
    const args = text.split(' ');
    const subCommand = args[0];
    const page = parseInt(args[1], 10) || 1;
    const itemsPerPage = 50;
    const searchName = args.slice(1).join(' ');

    switch(subCommand) {
        case "hapus":
            if (!m.isGroup) {
                m.reply('Perintah ini hanya bisa digunakan di grup.');
                break;
            }

            const keilaDB = loadKeilaDB();
            if (!keilaDB[m.sender].jodoh) {
                m.reply('Anda belum memiliki jodoh yang bisa dihapus.');
                break;
            }
            delete keilaDB[m.sender].jodoh;
            delete keilaDB[m.sender].timestamp;
            saveKeilaDB(keilaDB);
            m.reply('Jodoh Anda telah dihapus.');
            break;

        case "sfs":
            if (!isCreator) return m.reply('Perintah ini hanya bisa digunakan oleh creator.');
            if (!searchName) {
                m.reply('Silakan berikan nama karakter fiksi yang ingin ditambahkan.');
                break;
            }
            
            const charactersToAdd = searchName.split(',').map(char => char.trim());
            let addedCharacters = [], existingCharacters = [];
            
            charactersToAdd.forEach(character => {
                const result = addToSfsData(character);
                if (result.includes('telah ditambahkan')) {
                    addedCharacters.push(character);
                } else {
                    existingCharacters.push(character);
                }
            });
            
            let addResponse = '';
            if (addedCharacters.length > 0) {
                addResponse += `*Karakter* "${addedCharacters.join('", "')}" *telah ditambahkan ke daftar karakter fiksi.*`;
            }
            if (existingCharacters.length > 0) {
                addResponse += ` *Karakter* "${existingCharacters.join('", "')}" *sudah ada dalam daftar.*`;
            }

            m.reply(addResponse);
            break;

        case "dsfs":
            if (!isCreator) return m.reply('Perintah ini hanya bisa digunakan oleh creator.');
            if (!searchName) {
                m.reply('Silakan berikan nama karakter fiksi yang ingin dihapus.');
                break;
            }
            
            const charactersToRemove = searchName.split(',').map(char => char.trim());
            let removedCharacters = [], notFoundCharacters = [];
            
            charactersToRemove.forEach(character => {
                const result = removeFromSfsData(character);
                if (result.includes('telah dihapus')) {
                    removedCharacters.push(character);
                } else {
                    notFoundCharacters.push(character);
                }
            });
            
            let removeResponse = '';
            if (removedCharacters.length > 0) {
                removeResponse += `*Karakter* "${removedCharacters.join('", "')}" *telah dihapus dari daftar karakter fiksi.*`;
            }
            if (notFoundCharacters.length > 0) {
                removeResponse += ` *Karakter* "${notFoundCharacters.join('", "')}" *tidak ditemukan dalam daftar.*`;
            }

            m.reply(removeResponse);
            break;

        case "lsfs":
            const sfsData = loadSfsData();
            const totalItems = sfsData.length;
            const totalPages = Math.ceil(totalItems / itemsPerPage);
            
            if (page < 1 || page > totalPages) {
                m.reply(`Halaman tidak valid. Harap pilih halaman antara 1 dan ${totalPages}.`);
                break;
            }
            
            const startIndex = (page - 1) * itemsPerPage;
            const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
            const pageData = sfsData.slice(startIndex, endIndex);

            const response = `*List Character Available*    (${page}/${totalPages})\n\n` + pageData.map(name => `- ${name}`).join('\n');
            m.reply(response);
            break;

        case "ssfs":
            if (!searchName) {
                m.reply('Silakan berikan nama karakter fiksi yang ingin dicari.');
                break;
            }

            const sfsList = loadSfsData();
            const searchResults = sfsList.filter(name => name.toLowerCase().includes(searchName.toLowerCase()));

            let ssfsResponse = '';
            if (searchResults.length > 0) {
                const displayResults = searchResults.slice(0, 10).map(name => `- ${name}`);
                ssfsResponse = `*Search Result Available!*\n\n${displayResults.join('\n')}`;

                if (searchResults.length > 10) {
                    ssfsResponse += '\n\n_Dan Lain Sebagainya!_';
                }
            } else {
                ssfsResponse = 'Tidak ditemukan karakter yang sesuai dengan pencarian.';
            }

            m.reply(ssfsResponse);
            break;

        default:
            m.keila(`Perintah tidak dikenal.\nGunakan salah satu dari: hapus, sfs, dsfs, lsfs, ssfs.\nEx: ${prefix}jdh sfs NamaKarakter`);
    }
}
break;


			// Game Menu
			case "akinator":
{
    try {
        const response = await fetch('https://keilanator.vercel.app/start');
        const data = await response.json();

        // Verifikasi apakah user_token ada dalam respons
        if (!data.user_token || !data.question) {
            m.reply("Terjadi kesalahan saat memulai permainan. Silakan coba lagi.");
            console.error("Error: Tidak ada user_token atau pertanyaan dalam respons.");
            break;
        }

        // Simpan user_token dari respons
        const user_token = data.user_token;

        const buttonOptions = [
            { "name": "quick_reply", "buttonParamsJson": `{"display_text":"Ya","id":".answer y ${user_token}"}` },
            { "name": "quick_reply", "buttonParamsJson": `{"display_text":"Tidak","id":".answer n ${user_token}"}` },
            { "name": "quick_reply", "buttonParamsJson": `{"display_text":"Tidak Tahu","id":".answer idk ${user_token}"}` },
            { "name": "quick_reply", "buttonParamsJson": `{"display_text":"Mungkin","id":".answer p ${user_token}"}` },
            { "name": "quick_reply", "buttonParamsJson": `{"display_text":"Mungkin Tidak","id":".answer pn ${user_token}"}` }
        ];

        const teks = `Pertanyaan Akinator: ${data.question}`;

        await keila.sendButtonMsg(
            m.chat,
            teks,
            ucapanWaktu,
            "Silakan pilih jawaban:",
            null,
            buttonOptions,
            m
        );

        console.log(`Pertanyaan dikirim: ${data.question}`);
        console.log(`User Token: ${user_token}`);
    } catch (error) {
        console.error("Terjadi kesalahan saat memulai permainan:", error);
        m.reply("Terjadi kesalahan, coba lagi.");
    }
}
break;
case "answer":
{
    console.log("Input yang diterima:", text);

    const parts = text.trim().split(" ");
    console.log("Bagian yang dipisahkan:", parts);

    if (parts.length < 2) {
        m.keila("Format jawaban salah. Harap gunakan format: '.answer <jawaban> <user_token>'");
        break;
    }

    const answer = parts[0]; // e.g., 'y'
    const user_token = parts[1]; // e.g., 'b9983db5-c336-43fc-b129-b1bbf9711430'

    console.log(`Jawaban: ${answer}, User Token: ${user_token}`);

    try {
        const response = await fetch(`https://keilanator.vercel.app/answer?q=${answer}&user_token=${user_token}`);
        console.log(`Status: ${response.status}`);

        if (!response.ok) {
            m.reply(`Terjadi kesalahan saat berkomunikasi dengan API: ${response.status}`);
            console.log("Respons tidak ok:", await response.text());
            break;
        }

        const data = await response.json();
        console.log('Data:', data);

        if (data.name) {
            if (data.question) {
                const buttonOptions = [
                    { "name": "quick_reply", "buttonParamsJson": `{"display_text":"Ya","id":".answer y ${user_token}"}` },
                    { "name": "quick_reply", "buttonParamsJson": `{"display_text":"Tidak","id":".answer n ${user_token}"}` },
                    { "name": "quick_reply", "buttonParamsJson": `{"display_text":"Tidak Tahu","id":".answer idk ${user_token}"}` },
                    { "name": "quick_reply", "buttonParamsJson": `{"display_text":"Mungkin","id":".answer p ${user_token}"}` },
                    { "name": "quick_reply", "buttonParamsJson": `{"display_text":"Mungkin Tidak","id":".answer pn ${user_token}"}` }
                ];

                const teks = `Pertanyaan Akinator: ${data.question}`;

                await keila.sendButtonMsg(
                    m.chat,
                    teks,
                    ucapanWaktu,
                    "Silakan pilih jawaban:",
                    null,
                    buttonOptions,
                    m
                );
                console.log("Button message berhasil dikirim");
            } else {
                m.reply(`Karakter yang Anda pikirkan adalah ${data.name}: ${data.description}`);
                console.log("Karakter ditemukan:", data.name);
            }
        } else {
            if (data.question) {
                const buttonOptions = [
                    { "name": "quick_reply", "buttonParamsJson": `{"display_text":"Ya","id":".answer y ${user_token}"}` },
                    { "name": "quick_reply", "buttonParamsJson": `{"display_text":"Tidak","id":".answer n ${user_token}"}` },
                    { "name": "quick_reply", "buttonParamsJson": `{"display_text":"Tidak Tahu","id":".answer idk ${user_token}"}` },
                    { "name": "quick_reply", "buttonParamsJson": `{"display_text":"Mungkin","id":".answer p ${user_token}"}` },
                    { "name": "quick_reply", "buttonParamsJson": `{"display_text":"Mungkin Tidak","id":".answer pn ${user_token}"}` }
                ];

                const teks = `Pertanyaan Akinator: ${data.question}`;

                await keila.sendButtonMsg(
                    m.chat,
                    teks,
                    ucapanWaktu,
                    "Silakan pilih jawaban:",
                    null,
                    buttonOptions,
                    m
                );
                console.log("Button message berhasil dikirim");
            } else {
                m.reply("Karakter tidak ditemukan atau terjadi kesalahan.");
                console.log("Data tidak mengandung nama dan pertanyaan:", data);
            }
        }
        
        // Hapus pesan sebelumnya setelah respons baru dikirim
        await keila.sendMessage(m.chat, {
            delete: {
                remoteJid: m.chat,
                fromMe: m.isBotAdmin ? false : true,
                id: m.quoted.id,
                participant: m.quoted.sender,
            },
        });
    } catch (error) {
        console.error("Terjadi kesalahan saat menghubungi API:", error);
        m.reply("Terjadi kesalahan, coba lagi.");
    }
}
break;

			case "slot":
				{
					await gameSlot(keila, m, global.db.users);
				}
				break;
			case "casino":
				{
					await gameCasinoSolo(keila, m, prefix, global.db.users);
				}
				break;
			case "rampok":
			case "merampok":
				{
					await gameMerampok(m, global.db.users);
				}
				break;
			case "suitpvp":
			case "suit":
				{
					let poin = 10;
					let poin_lose = 10;
					let timeout = 60000;
					if (
						Object.values(game.suit).find(
							roof =>
								roof.id.startsWith("suit") &&
								[roof.p, roof.p2].includes(m.sender),
						)
					)
						m.reply(`Selesaikan suit mu yang sebelumnya`);
					if (m.mentionedJid[0] === m.sender)
						return m.reply(
							`Tidak bisa bermain dengan diri sendiri !`,
						);
					if (!m.mentionedJid[0])
						return m.keila(
							`_Siapa yang ingin kamu tantang?_\nTag orangnya..\n\nContoh : ${prefix}suit @${owner[0]}`,
							m.chat,
							{
								mentions: [owner[1] + "@s.whatsapp.net"],
							},
						);
					if (
						Object.values(game.suit).find(
							roof =>
								roof.id.startsWith("suit") &&
								[roof.p, roof.p2].includes(m.mentionedJid[0]),
						)
					)
						return m.reply(
							`Orang yang kamu tantang sedang bermain suit bersama orang lain :(`,
						);
					let id = "suit_" + new Date() * 1;
					let caption = `_*SUIT PvP*_\n\n@${
						m.sender.split`@`[0]
					} menantang @${
						m.mentionedJid[0].split`@`[0]
					} untuk bermain suit\n\nSilahkan @${
						m.mentionedJid[0].split`@`[0]
					} untuk ketik terima/tolak`;
					game.suit[id] = {
						chat: m.reply(caption),
						id: id,
						p: m.sender,
						p2: m.mentionedJid[0],
						status: "wait",
						waktu: setTimeout(() => {
							if (game.suit[id]) m.reply(`_Waktu suit habis_`);
							delete game.suit[id];
						}, 60000),
						poin,
						poin_lose,
						timeout,
					};
				}
				break;
			case "ttc":
			case "ttt":
			case "tictactoe":
				{
					let TicTacToe = require("./lib/tictactoe");
					if (
						Object.values(game.tictactoe).find(
							room =>
								room.id.startsWith("tictactoe") &&
								[room.game.playerX, room.game.playerO].includes(
									m.sender,
								),
						)
					)
						return m.keila(
							`Kamu masih didalam game!\nKetik *${prefix}del${command}* Jika Ingin Mengakhiri sesi`,
						);
					let room = Object.values(game.tictactoe).find(
						room =>
							room.state === "WAITING" &&
							(text ? room.name === text : true),
					);
					if (room) {
						m.reply("Partner ditemukan!");
						room.o = m.chat;
						room.game.playerO = m.sender;
						room.state = "PLAYING";
						let arr = room.game.render().map(v => {
							return {
								X: "❌",
								O: "⭕",
								1: "1️⃣",
								2: "2️⃣",
								3: "3️⃣",
								4: "4️⃣",
								5: "5️⃣",
								6: "6️⃣",
								7: "7️⃣",
								8: "8️⃣",
								9: "9️⃣",
							}[v];
						});
						let str = `Room ID: ${room.id}\n\n${arr
							.slice(0, 3)
							.join("")}\n${arr.slice(3, 6).join("")}\n${arr
							.slice(6)
							.join("")}\n\nMenunggu @${
							room.game.currentTurn.split("@")[0]
						}\n\nKetik *nyerah* untuk menyerah dan mengakui kekalahan`;
						if (room.x !== room.o)
							await keila.sendMessage(
								room.x,
								{
									texr: str,
									mentions: parseMention(str),
								},
								{
									quoted: m,
								},
							);
						await keila.sendMessage(
							room.o,
							{
								text: str,
								mentions: parseMention(str),
							},
							{
								quoted: m,
							},
						);
					} else {
						room = {
							id: "tictactoe-" + +new Date(),
							x: m.chat,
							o: "",
							game: new TicTacToe(m.sender, "o"),
							state: "WAITING",
							waktu: setTimeout(() => {
								if (game.tictactoe[roomnya.id])
									m.reply(`_Waktu ${command} habis_`);
								delete game.tictactoe[roomnya.id];
							}, 300000),
						};
						if (text) room.name = text;
						keila.sendMessage(
							m.chat,
							{
								text:
									"Menunggu partner" +
									(text
										? ` mengetik command dibawah ini ${prefix}${command} ${text}`
										: ""),
								mentions: m.mentionedJid,
							},
							{
								quoted: m,
							},
						);
						game.tictactoe[room.id] = room;
					}
				}
				break;
			case "pkn":
			case "pno":
			case "pilihkotak":
    {
        const args = text.split(' ');
        const subCommand = args[0];
        const subArgs = args.slice(1).join(' ');

        // Load game data
        let games = readGamesData();
        const userId = m.sender;

        switch(subCommand) {
            case "start":
                if (games[userId]) return m.reply("Permainan Pilih Kotak sudah dimulai.");

                games[userId] = {
                    level: 1,
                    correctBox: Math.floor(Math.random() * 2) + 1, // Kotak yang benar pada level awal (2 kotak)
                    status: "playing"
                };

                writeGamesData(games);
                m.reply(`Permainan Pilih Kotak dimulai!\nLevel saat ini: 1\nPilih kotak nomor 1 hingga 2.`);

            case "choose":
                if (!games[userId]) return m.reply("Permainan Pilih Kotak belum dimulai. Ketik 'pilihkotak start' untuk memulai permainan.");

                const boxNumber = parseInt(subArgs);
                if (isNaN(boxNumber) || boxNumber <= 0) return m.reply("Pilihan kotak tidak valid.");

                const game = games[userId];
                const boxesCount = Math.floor((game.level - 1) / 5) + 2; // Penambahan kotak setiap 5 level, mulai dari 2 kotak

                if (boxNumber === game.correctBox) {
                    // Player chose correctly
                    game.level++;
                    if (Math.random() < 0.30) { // 30% chance to increase number of boxes
                        game.correctBox = Math.floor(Math.random() * (boxesCount + 1)) + 1; // Update correct box for next level
                    } else {
                        game.correctBox = Math.floor(Math.random() * boxesCount) + 1; // Update correct box for next level
                    }

                    writeGamesData(games);

                    return m.reply(`Selamat! Kamu memilih kotak yang benar.\nLevel saat ini: ${game.level}\nPilih kotak nomor 1 hingga ${boxesCount}.`);
                } else {
                    delete games[userId]; // End game if player chooses wrong
                    writeGamesData(games);
                    return m.reply(`Kamu memilih kotak yang salah. Permainan berakhir pada level ${game.level}.`);
                }

            case "status":
                if (!games[userId]) return m.reply("Permainan Pilih Kotak belum dimulai.");

                const gameStatus = games[userId];
                const currentBoxesCount = Math.floor((gameStatus.level - 1) / 5) + 2; // Penambahan kotak setiap 5 level, mulai dari 2 kotak
                const statusMessage = `Level saat ini: ${gameStatus.level}\nPilih kotak nomor 1 hingga ${currentBoxesCount}.`;
                return m.reply(statusMessage);

            case "end":
                if (!games[userId]) return m.reply("Permainan Pilih Kotak belum dimulai.");

                const gameEnd = games[userId];
                delete games[userId];
                writeGamesData(games);
                return m.reply(`Permainan Pilih Kotak dihentikan. Level terakhir adalah ${gameEnd.level}.`);

            default:
                m.keila(`Command tidak dikenal.\nGunakan salah satu dari: start, choose <nomor_kotak>, status, end.\nEx: ${prefix}pilihkotak start`);
        }
    }
    break;
    case "uno":
    {
        if (!m.isGroup) {
            return m.reply("Perintah ini hanya bisa digunakan dalam chat grup.");
        }

        const games = readUnoGameData();
        const args = text.split(' ');
        const command = args[0];
        const subCommand = args.slice(1).join(' ');

        if (!games[m.chat]) {
            games[m.chat] = {
                players: [],
                deck: createDeck(),
                discardPile: [],
                currentPlayer: 0,
                direction: 1,
                currentCard: null,
                drawStack: 0,
                blockCardPlayed: false,
                reverseCardPlayed: false,
                stopVotes: new Set(),
                awaitingColorChoice: false
            };
            writeUnoGameData(games);
            return m.reply("Permainan UNO dimulai! Ketik 'uno join' untuk bergabung.");
        }

        const game = games[m.chat];

        switch (command) {
            case "join":
                if (game.players.find(player => player.id === m.sender)) {
                    return m.reply("Kamu sudah bergabung dalam permainan.");
                }
                game.players.push({ id: m.sender, hand: [] });
                writeUnoGameData(games);
                return m.reply("Kamu telah bergabung dalam permainan UNO!");

            case "start":
                if (game.players.length < 2) {
                    return m.reply("Minimal 2 pemain untuk memulai permainan.");
                }
                game.deck = shuffle(game.deck);
                game.players.forEach(player => {
                    for (let i = 0; i < 7; i++) {
                        player.hand.push(game.deck.pop());
                    }
                });
                game.currentCard = game.deck.pop();
                game.discardPile.push(game.currentCard);
                writeUnoGameData(games);
                return sendGameStatus(m.chat);

            case "info":
                return m.reply(`
Aturan dan Cara Bermain UNO:

1. Bergabung ke permainan:
   - Gunakan \`uno join\` untuk bergabung ke permainan.
   - Gunakan \`uno start\` untuk memulai permainan setelah ada minimal 2 pemain.

2. Menarik kartu:
   - Gunakan \`uno draw\` untuk menarik kartu dari dek. Jika ada kartu spesial yang menyebabkan penarikan, kamu akan menarik semua kartu tersebut.

3. Memainkan kartu:
   - Gunakan \`uno play <index_kartu>\` untuk memainkan kartu. Kartu harus sesuai dengan warna atau angka kartu di tumpukan buang, atau gunakan kartu hitam untuk mengganti warna.
   - Kartu spesial:
     - \`12\`: Pemain berikutnya menarik dua kartu dan dilewatkan.
     - \`14\`: Pemain berikutnya menarik empat kartu dan dilewatkan.
     - \`10\`: Pemain berikutnya dilewatkan.
     - \`11\`: Arah permainan dibalik.
     - \`wild13\`: Pemain memilih warna baru.
     - \`wild14\`: Pemain berikutnya menarik empat kartu dan dilewatkan.

4. Melewatkan giliran:
   - Gunakan \`uno pass\` jika tidak bisa atau tidak ingin memainkan kartu pada giliranmu.

5. Mengecek kartu tangan:
   - Gunakan \`uno hand\` untuk melihat kartu yang ada di tanganmu.

6. Mengecek gambar kartu:
   - Gunakan \`uno card <index_kartu>\` untuk memeriksa gambar kartu yang ada di tanganmu.

7. Mengakhiri permainan:
   - Pemain pertama yang menghabiskan semua kartunya memenangkan permainan.

8. Menghentikan permainan:
   - Gunakan \`uno stop\` untuk meminta penghentian permainan. Semua pemain harus setuju, atau admin/creator dapat langsung menghentikan permainan.
`);

            case "stop":
                const player = game.players.find(p => p.id === m.sender);
                if (!player) {
                    return m.reply("Kamu belum bergabung dalam permainan.");
                }

                if (m.isAdmin || m.isCreator) {
                    delete games[m.chat];
                    writeUnoGameData(games);
                    return m.reply("Permainan UNO dihentikan oleh admin/creator.");
                }

                game.stopVotes.add(m.sender);
                if (game.stopVotes.size === game.players.length) {
                    delete games[m.chat];
                    writeUnoGameData(games);
                    return m.reply("Permainan UNO dihentikan atas persetujuan semua pemain.");
                }

                writeUnoGameData(games);
                return m.reply(`Permintaan penghentian permainan diterima. ${game.players.length - game.stopVotes.size} pemain lagi harus setuju.`);

            case "hand":
                const playerHand = game.players.find(p => p.id === m.sender);
                if (!playerHand) {
                    return m.reply("Kamu belum bergabung dalam permainan.");
                }
                const hand = playerHand.hand.map((card, index) => `${index}: ${card.color} ${card.value}`).join("\n");
                const iniHandText = `*Uno Game KeiLa 3*\n_masih dalam pengerjaan_\n\nIni Kartu Nya:\n${hand}`;
                await keila.sendMessage(m.sender, { text: iniHandText }, { quoted: m });
                return m.reply('Cek Kartumu!');

            case "card":
                const cardIndex = parseInt(subCommand);
                if (isNaN(cardIndex) || cardIndex < 0 || cardIndex >= game.players.find(p => p.id === m.sender).hand.length) {
                    return m.reply("Kartu tidak valid.");
                }
                const card = game.players.find(p => p.id === m.sender).hand[cardIndex];
                const cardImageUrl = getCardImageUrl(card);
                const cardText = `${card.color} ${card.value}`;
                await keila.sendMessage(m.sender, { image: { url: cardImageUrl }, caption: cardText }, { quoted: m });
                return m.reply('Gambar kartu dikirimkan!');

            case "play":
                const currentPlayer = game.players[game.currentPlayer];
                if (currentPlayer.id !== m.sender) {
                    return m.reply("Bukan giliranmu!");
                }

                const playCardIndex = parseInt(subCommand);
                if (isNaN(playCardIndex) || playCardIndex < 0 || playCardIndex >= currentPlayer.hand.length) {
                    return m.reply("Kartu tidak valid.");
                }

                const playCard = currentPlayer.hand[playCardIndex];
                if (!isValidPlay(game.currentCard, playCard)) {
                    return m.reply("Kartu tidak bisa dimainkan.");
                }

                if (playCard.value === "12") {
                    game.drawStack += 2;
                } else if (playCard.value === "wild14") {
                    if (hasPlayableCard(currentPlayer, game.currentCard)) {
                        return m.reply("Kartu Wild Draw Four hanya boleh dimainkan jika kamu tidak memiliki kartu yang sesuai.");
                    }
                    game.drawStack += 4;
                    game.currentCard.color = "black";
                    game.awaitingColorChoice = true;
                } else if (playCard.value === "10") {
                    game.currentPlayer = getNextPlayer(game);
                } else if (playCard.value === "11") {
                    game.direction *= -1;
                }

                game.currentCard = playCard;
                game.discardPile.push(playCard);
                currentPlayer.hand.splice(playCardIndex, 1);

                if (currentPlayer.hand.length === 0) {
                    delete games[m.chat];
                    writeUnoGameData(games);
                    return m.reply(`Pemain ${m.sender} menang!`);
                }

                game.currentPlayer = getNextPlayer(game);
                game.reverseCardPlayed = false;
                writeUnoGameData(games);
                return sendGameStatus(m.chat);

            case "pass":
                const passPlayer = game.players[game.currentPlayer];
                if (passPlayer.id !== m.sender) {
                    return m.reply("Bukan giliranmu!");
                }
                game.currentPlayer = getNextPlayer(game);
                game.reverseCardPlayed = false;
                writeUnoGameData(games);
                return sendGameStatus(m.chat);

            case "color":
                if (!game.awaitingColorChoice || game.players[game.currentPlayer].id !== m.sender) {
                    return m.reply("Tidak ada warna yang perlu dipilih saat ini.");
                }

                const chosenColor = subCommand.trim().toLowerCase();
                if (!["red", "yellow", "green", "blue"].includes(chosenColor)) {
                    return m.reply("Warna tidak valid. Pilih salah satu dari: red, yellow, green, blue.");
                }

                game.currentCard.color = chosenColor;
                game.awaitingColorChoice = false;
                game.currentPlayer = getNextPlayer(game);
                writeUnoGameData(games);
                return sendGameStatus(m.chat);

            default:
                return m.keila("Perintah tidak dikenali. Gunakan \`uno info\` untuk melihat daftar perintah.");
        }

        function createDeck() {
            const colors = ["red", "yellow", "green", "blue"];
            const values = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];
            const deck = [];
            colors.forEach(color => {
                values.forEach(value => {
                    deck.push({ color, value });
                    if (value !== "1") deck.push({ color, value });
                });
            });
            ["wild13", "wild14"].forEach(value => {
                deck.push({ color: "black", value });
                deck.push({ color: "black", value });
            });
            return shuffle(deck);
        }

        function shuffle(array) {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
            return array;
        }

        function isValidPlay(currentCard, playCard) {
            return playCard.color === "black" || currentCard.color === playCard.color || currentCard.value === playCard.value;
        }

        function getNextPlayer(game) {
            const nextIndex = (game.currentPlayer + game.direction + game.players.length) % game.players.length;
            return nextIndex;
        }

        function hasPlayableCard(player, currentCard) {
            return player.hand.some(card => isValidPlay(currentCard, card));
        }

        function getCardImageUrl(card) {
            const baseUrl = "https://raw.githubusercontent.com/abhisheks008/UNO/main/images/";
            if (card.color === "black") {
                return `${baseUrl}${card.value}.png`;
            }
            return `${baseUrl}${card.color}${card.value}.png`;
        }

        async function sendGameStatus(chat) {
            const currentCardText = `Kartu Saat Ini: ${game.currentCard.color} ${game.currentCard.value}`;
            const currentCardImageUrl = getCardImageUrl(game.currentCard);
            const handsText = game.players.map((player, index) => `${index}: ${player.id} (${player.hand.length} kartu)`).join("\n");
            const iniGameStatusText = `*Uno Game KeiLa*\n\n${currentCardText}\nGiliran: ${game.players[game.currentPlayer].id}\n\nKartu Pemain:\n${handsText}`;
            
            await keila.sendMessage(chat, { text: iniGameStatusText });
            await keila.sendMessage(chat, { image: { url: currentCardImageUrl }, caption: `Kartu Saat Ini: ${game.currentCard.color} ${game.currentCard.value}` });
        }
    }
break;
			case "tebakbom":
				{
					if (game.tebakbom[m.sender])
						return m.reply(
							"Masih Ada Sesi Yang Belum Diselesaikan!",
						);
					function shuffle(array) {
						return array.sort(() => Math.random() - 0.5);
					}
					game.tebakbom[m.sender] = {
						petak: shuffle([0, 0, 0, 2, 0, 2, 0, 2, 0, 0]),
						board: [
							"1️⃣",
							"2️⃣",
							"3️⃣",
							"4️⃣",
							"5️⃣",
							"6️⃣",
							"7️⃣",
							"8️⃣",
							"9️⃣",
							"🔟",
						],
						bomb: 3,
						lolos: 7,
						pick: 0,
						nyawa: ["❤️", "❤️", "❤️"],
						waktu: setTimeout(() => {
							if (game.tebakbom[m.sender])
								m.reply(`_Waktu ${command} habis_`);
							delete game.tebakbom[m.sender];
						}, 120000),
					};
					m.reply(
						`*TEBAK BOM*\n\n${game.tebakbom[m.sender].board.join(
							"",
						)}\n\nPilih lah nomor tersebut! dan jangan sampai terkena Bom!\nBomb : ${
							game.tebakbom[m.sender].bomb
						}\nNyawa : ${game.tebakbom[m.sender].nyawa.join("")}`,
					);
				}
				break;
			case "kuismath":
      case "math": {
    const { handlerMath } = require("./lib/exmath");
    const inputMode = ["noob", "veasy", "easy", "normal", "hard", "pro", "ex"];
    
    if (!text) {
        return m.reply(
            `Mode: ${inputMode.join(" | ")}\nContoh penggunaan: ${prefix}math veasy`
        );
    }

    if (!inputMode.includes(text.toLowerCase())) {
        return m.reply("Mode tidak ditemukan!");
    }

    if (game.kuismath.hasOwnProperty(m.sender.split("@")[0])) {
        return m.reply("Masih Ada Sesi Yang Belum Diselesaikan!");
    }

    let result = await handlerMath(text.toLowerCase());
    
    m.reply(
        `*Berapa hasil dari: ${result.question.toLowerCase()}*?\n\nWaktu: 30 detik`
    ).then(() => {
        game.kuismath[m.sender.split("@")[0]] = {
            jawaban: result.answer,
            mode: text.toLowerCase(),
        };
    });

    await sleep(30000);

    if (game.kuismath.hasOwnProperty(m.sender.split("@")[0])) {
        m.reply(
            "Waktu Habis\nJawaban: " + game.kuismath[m.sender.split("@")[0]].jawaban
        );
        delete game.kuismath[m.sender.split("@")[0]];
    }
}
break;
case "kuis":
case "quiz": {
    const modes = [
        "sejarah", "astronomi", "fisika", "manhua", 
        "anime", "game", "film", "otomotif", 
        "hewan", "geografi", "politik", "komik",
        "novel", "agama", "artis", "dongeng",
        "indonesia", "kapal", "pesawat", "komputer",
        "hacker", "makanan", "peralatan", "seni",
        "musik", "tarian", "manga", "donghua",
        "biologi", "manhwa"
    ];

    if (!text || !modes.includes(text.toLowerCase())) {
        return m.keila(
            `Mode yang tersedia: ${modes.join(" : ")}\n\nContoh penggunaan: ${prefix}kuis sejarah`
        );
    }

    const selectedMode = text.toLowerCase();
    const GPT4js = await getGPT4js();

    const options = {
        provider: 'Aryahcr',
        model: 'gpt-4'
    };

    try {
        const provider = await GPT4js.createProvider(options.provider);
        const messages = [
            { 
                role: "system", 
                content: `You're an Indonesia expert bot owned by KeiLaSenpai. Always respond in Indonesian language only.` 
            },
            { 
                role: "user", 
                content: `Buatkan 1 Json Quiz Acak Dengan Jawaban Singkat Yang Berisi Soal, Clue (minimal 3 dan maksimal 5), dan Jawaban Tentang ${selectedMode} Yang Jarang diketahui. 
                contoh jsonnya { "soal": "Kapan indonesia merdeka?", "clue": ["Bulan Agustus", "Bom Atom Amerika", "Tahun 1945"], "jawaban": "17 Agustus 1945" }

                Note: Ingat Jawabnya Harus Singkat Max 2 Kata, Clue Jangan Langsung Kasih Tau Jawabannya didalam clue, Json nya harus bentuk json tanpa ada hal lain!` 
            }
        ];

        const responseText = await provider.chatCompletion(messages, options);
        const jsonMatch = responseText.match(/{.*}/s);
        const quizData = jsonMatch ? JSON.parse(jsonMatch[0]) : null;

        if (!quizData || !quizData.soal || !quizData.clue || !quizData.jawaban) {
            return m.reply('Respon AI tidak valid atau tidak sesuai format JSON.');
        }

        const { soal, clue, jawaban } = quizData;

        if (clue.length < 1 || clue.length > 5) {
            return m.reply('Ulangi Lagi Karena Tidak Ada Clue.');
        }

        await m.reply(
            `*Pertanyaan (${selectedMode}): ${soal}*\n\nJawabanmu? Waktu: 30 detik\nKetik "clue" untuk mendapatkan petunjuk.`
        );

        game.kuisquiz[m.sender.split("@")[0]] = { jawaban, clue };

        await sleep(30000);

        if (game.kuisquiz.hasOwnProperty(m.sender.split("@")[0])) {
            m.reply(`Waktu habis! Jawaban yang benar adalah: *${jawaban}*`);
            delete game.kuisquiz[m.sender.split("@")[0]];
        }
    } catch (error) {
        m.reply(`Terjadi kesalahan: ${error.message}`);
    }
}
break;

case "enka":
case "giprofile":
case "gip":
{
  let keilaDB = loadKeilaDB();
  let userUID = text || (keilaDB[m.sender] && keilaDB[m.sender].uidgi);

  if (!userUID) {
    m.keila(`Please provide a UID by running the command with a valid UID first.\nExample: .enka 830980536`);
  }
  
  if (!keilaDB[m.sender]) {
    keilaDB[m.sender] = {};
  }
  
  keilaDB[m.sender].uidgi = userUID;
  saveKeilaDB(keilaDB);
  
  try {
    const separatorChar = pickRandom(global.listv);
    const response = await axios(`https://enka.network/api/uid/${userUID}`);
    
    if (response.status === 200) {
      const { playerInfo } = response.data;
      const nickname = playerInfo.nickname || 'Unknown';
      const arLevel = playerInfo.level || 'Unknown';
      const signature = playerInfo.signature || 'Unknown';
      const worldLevel = playerInfo.worldLevel || 'Unknown';
      const achievement = playerInfo.finishAchievementNum || 'Unknown';
      const spiralFloorIndex = playerInfo.towerFloorIndex || 'Unknown';
      const spiralLevelIndex = playerInfo.towerLevelIndex || 'Unknown';

      const imgEnka = `https://image.thum.io/get/width/1900/crop/1000/fullpage/https://enka.network/u/${userUID}`;
      const profileMessage = `
╭───【 *Traveler Info* 】───
│
│ ${separatorChar} Traveler Name  : ${nickname} (AR ${arLevel}) | WL ${worldLevel}
│ ${separatorChar} Signature      : ${signature}
│ ${separatorChar} Achievement    : ${achievement}
│
╰───┬─────────────────────┬───
╭───【 *End Game Challenge* 】───
│
│ ${separatorChar} Spiral Abyss    : Floor ${spiralFloorIndex} - Level ${spiralLevelIndex}
│ ${separatorChar} Imaginarium     : Status Unknown
│
╰───┴─────────────────────┴───`;

      await keila.sendMessage(m.chat, { image: { url: imgEnka }, caption: profileMessage }, { quoted: m });
      
    } else {
      switch (response.status) {
        case 400:
          m.reply('Invalid UID format. Please enter a valid UID.');
          break;
        case 404:
          m.reply('Player not found. Please check the UID or player name again.');
          break;
        case 424:
          m.reply('Server is under maintenance or experiencing issues after a game update. Please try again later.');
          break;
        case 429:
          m.reply('You have reached the request limit. Please wait a moment before making another request.');
          break;
        case 500:
          m.reply('Server error occurred. Please try again later.');
          break;
        case 503:
          m.reply('Major error with the application. We will fix it as soon as possible.');
          break;
        default:
          m.reply('Error loading data. Please try again later.');
          break;
      }
    }
    
  } catch (error) {
    m.reply('Error loading data. Please try again later.');
  }
}
break;

			// Menu
case "allmenu":
{
    const userId = m.sender;
    const keilaDB = loadKeilaDB();
    const jodohData = keilaDB[userId];
    const setv = pickRandom(global.listv);
    let database = JSON.parse(fs.readFileSync("./database/database.json", "utf8"));

    let teks = `${ucapanWktu} ${m.pushName ? m.pushName : "Kak"}!
Silahkan Gunakan Aku Dengan Bijak Ya kak!
    
*▩* ─────「 \`\`\`Info Bot\`\`\` 」 °\` ※,

   ${setv} › Nama : ${global.botname}
   ${setv} › Creator : @${"6289646942000@s.whatsapp.net".split("@")[0]}
   ${setv} › Owner : @${global.owner[0].split("@")[0]}
  
*▩* ─────「 \`\`\`Info User\`\`\` 」 °\` ※,

   ${setv} › Nama : ${m.pushName ? m.pushName : "Si Misterius"}
   ${setv} › Jodoh : ${(jodohData && jodohData.jodoh) ? `@${jodohData.jodoh.split('@')[0]}` : "Belum Berjodoh"}
   ${setv} › Stamina : ${isVip ? "Developer" : global.db.users[m.sender].limit}
   ${setv} › Primogems : ${global.db.users[m.sender] ? global.db.users[m.sender].uang.toLocaleString("id-ID") : "0"}

\`\`\`Berikut List Menunya!\`\`\`
${readmore}

*❖* ┬─────「 \`\`\`Bot\`\`\` 」 °\` ※,

   ${setv},    profile
   ${setv},    claim
   ${setv},    daily
   ${setv},    tfuang (nominal) (@tag)
   ${setv},    tflimit (nominal) (@tag)
   ${setv},    request (text)
   ${setv},    react (emoji)
   ${setv},    tagme
   ${setv},    runtime
   ${setv},    ping
   ${setv},    afk
   ${setv},    afkclear
   ${setv},    rvo (reply pesan viewone)
   ${setv},    inspect (url gc)
   ${setv},    addmsg
   ${setv},    delmsg
   ${setv},    getmsg
   ${setv},    listmsg
   ${setv},    q (reply pesan)
   ${setv},    menfes (62xxx|nama samaran)
   ${setv},    sendtch
   ${setv},    sendich
   ${setv},    sendach
   ${setv},    sendvch
   ${setv},    totalfitur
   ${setv},    nobutton (on/off)

 
*✾* ┬─────「 \`\`\`Grup\`\`\` 」 °\` ※,

   ${setv},    add (62xxx)
   ${setv},    kick (@tag/62xxx)
   ${setv},    promote (@tag/62xxx)
   ${setv},    demote (@tag/62xxx)
   ${setv},    setname (nama baru gc)
   ${setv},    setdesc (desk)
   ${setv},    setppgc (reply imgnya)
   ${setv},    delete (reply pesan)
   ${setv},    linkgrup
   ${setv},    revoke
   ${setv},    tagall
   ${setv},    hidetag
   ${setv},    totag (reply pesan)
   ${setv},    listonline
   ${setv},    antilink (on/off)
   ${setv},    antidelete (on/off)
   ${setv},    setinfo (on/off)
   ${setv},    antibot (on/off)
   ${setv},    all
   ${setv},    everyone
   ${setv},    here

 
*❖* ┬─────「 \`\`\`Search\`\`\` 」 °\` ※,

   ${setv},    play (query)
   ${setv},    play2 (query)
   ${setv},    tplay (query)
   ${setv},    splay (query)
   ${setv},    pixiv (query)
   ${setv},    pixivn (query)
   ${setv},    pinterest (query)
   ${setv},    nhentai (query)
   ${setv},    wallpaper (query)
   ${setv},    ringtone (query)

 
*✾* ┬─────「 \`\`\`Download\`\`\` 」 °\` ※,

   ${setv},    ytmp3 (url)
   ${setv},    ytmp4 (url)
   ${setv},    yta2 (url)
   ${setv},    ytv2 (url)
   ${setv},    spotify (url)
   ${setv},    spotifylirik (url)
   ${setv},    instagram (url)
   ${setv},    tiktok (url)
   ${setv},    facebook (url)
   ${setv},    gitrepo (url)
   ${setv},    mediafire (url)
   ${setv},    gdrive (url)
   ${setv},    mega (url)

 
*❖* ┬─────「 \`\`\`Tools\`\`\` 」 °\` ※,

   ${setv},    get (url)
   ${setv},    toaudio (reply pesan)
   ${setv},    tomp3 (reply pesan)
   ${setv},    tovn (reply pesan)
   ${setv},    togif (reply pesan)
   ${setv},    tovideo (reply pesan)
   ${setv},    toimage (reply pesan)
   ${setv},    toptv (reply pesan)
   ${setv},    tourl (reply pesan)
   ${setv},    tts (textnya)
   ${setv},    toqr (textnya)
   ${setv},    ssweb (url)
   ${setv},    sticker (send/reply img)
   ${setv},    wm (reply stiker)
   ${setv},    smeme (send/reply img)
   ${setv},    qc (query)
   ${setv},    yc (query)
   ${setv},    ttp (query)
   ${setv},    telestiker (number) (url)
   ${setv},    nulis
   ${setv},    giveaway
   ${setv},    whatmusik
   ${setv},    cut
   ${setv},    resize
   ${setv},    cc (amt) (crc) (to crc)
   ${setv},    poll
   ${setv},    tempmail
   ${setv},    checkmail

 
*✾* ┬─────「 \`\`\`Ai\`\`\` 」 °\` ※,

   ${setv},    ai (query)
   ${setv},    tl
   ${setv},    gpt (query)
   ${setv},    cai
   ${setv},    cais (query)
   ${setv},    hdr
   ${setv},    dif
   ${setv},    dale
   ${setv},    animedif
   ${setv},    rbg
   ${setv},    toanime

 
*❖* ┬─────「 \`\`\`Game\`\`\` 」 °\` ※,

   ${setv},    tictactoe
   ${setv},    math (level)
   ${setv},    kuis (mode)
   ${setv},    suit
   ${setv},    tebakbom
   ${setv},    slot
   ${setv},    casino (nominal)
   ${setv},    rampok (@tag)
   ${setv},    uno
   ${setv},    wish
   ${setv},    wishinv
   ${setv},    wishhst

 
*✾* ┬─────「 \`\`\`Fun\`\`\` 」 °\` ※,

   ${setv},    dadu
   ${setv},    bisakah (text)
   ${setv},    apakah (text)
   ${setv},    kapan (text)
   ${setv},    kerangajaib (text)
   ${setv},    cekmati (text)
   ${setv},    rate (reply pesan)
   ${setv},    halah (text)
   ${setv},    hilih (text)
   ${setv},    huluh (text)
   ${setv},    heleh (text)
   ${setv},    holoh (text)
   ${setv},    jodoh
   ${setv},    jdh

 
*❖* ┬─────「 \`\`\`Owner\`\`\` 」 °\` ※,

   ${setv},    mode (public or self)
   ${setv},    setbio
   ${setv},    setppbot
   ${setv},    join
   ${setv},    leave
   ${setv},    block
   ${setv},    openblock
   ${setv},    listpc
   ${setv},    listgc
   ${setv},    creategc
   ${setv},    addprem
   ${setv},    delprem
   ${setv},    listprem
   ${setv},    bot --settings
   ${setv},    bot set
   ${setv},    getcase
   ${setv},    sendsw
   ${setv},    crc
   ${setv},    addgems
   ${setv},    $
   ${setv},    >
   ${setv},    <


\`\`\`Bot Masih Dalam Tahap Pengembangan!\`\`\`
    `;
    
    let buttonOptions = [
        {
            name: "quick_reply",
            buttonParamsJson: '{"display_text":"Skrip","id":".script"}',
        },
        {
            name: "cta_url",
            buttonParamsJson: '{"display_text":"「 YouTube 」","url":"https://youtube.com/@KeiLaSenpai","merchant_url":"https://www.google.com"}',
        },
    ];
    let thumbMenu = global.fake.menunya;
    let msg = generateWAMessageFromContent(m.chat, {
        viewOnceMessage: {
            message: {
                messageContextInfo: {
                    deviceListMetadata: {},
                    deviceListMetadataVersion: 2
                },
                interactiveMessage: proto.Message.InteractiveMessage.create({
                    contextInfo: {
                        mentionedJid: [m.sender],
                        isForwarded: true,
                        forwardedNewsletterMessageInfo: {
                            newsletterJid: global.my.nl,
                            serverMessageId: 100,
                            newsletterName: global.mess.ucpnl
                        },
                        businessMessageForwardInfo: { businessOwnerJid: keila.decodeJid(keila.user.id) },
                    },
                    body: proto.Message.InteractiveMessage.Body.create({
                        text: `${teks}`
                    }),
                    footer: proto.Message.InteractiveMessage.Footer.create({
                        text: ucapanWaktu
                    }),
                    header: proto.Message.InteractiveMessage.Header.create({
                        subtitle: "KeiLaSenpai",
                        hasMediaAttachment: true, ...(await prepareWAMessageMedia({ image: { url: thumbMenu } }, { upload: keila.waUploadToServer }))
                    }),
                    nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
                        buttons: buttonOptions
                    })
                })
            }
        }
    }, {});

    if (keilaDB[m.sender] && keilaDB[m.sender].statusbt === false) {
      await m.smedia('gvideo', global.fake.menuvid, teks);
    } else {
      await keila.relayMessage(msg.key.remoteJid, msg.message, {
        messageId: msg.key.id
      }).then(response => {
        console.log("Message sent successfully", response);
      }).catch(error => {
        console.error("Error sending message", error);
      });
    };
    const audioMj = fs.readFileSync('./src/media/keilaYa.opus');
    await keila.sendMessage(m.chat, { audio: audioMj, mimetype: "audio/ogg; codecs=opus", ptt: true, }, {	quoted: fkontak, },)
}
break;
case "botmenu":
{
    const userId = m.sender;
    const keilaDB = loadKeilaDB();
    const jodohData = keilaDB[userId];
    const setv = pickRandom(global.listv);
    let database = JSON.parse(fs.readFileSync("./database/database.json", "utf8"));

    let teks = `${ucapanWktu} ${m.pushName ? m.pushName : "Kak"}!
Silahkan Gunakan Aku Dengan Bijak Ya kak!
    
*▩* ─────「 \`\`\`Info Bot\`\`\` 」 °\` ※,

   ${setv} › Nama : ${global.botname}
   ${setv} › Creator : @${"6289646942000@s.whatsapp.net".split("@")[0]}
   ${setv} › Owner : @${global.owner[0].split("@")[0]}
  
*▩* ─────「 \`\`\`Info User\`\`\` 」 °\` ※,

   ${setv} › Nama : ${m.pushName ? m.pushName : "Si Misterius"}
   ${setv} › Jodoh : ${(jodohData && jodohData.jodoh) ? `@${jodohData.jodoh.split('@')[0]}` : "Belum Berjodoh"}
   ${setv} › Stamina : ${isVip ? "Developer" : global.db.users[m.sender].limit}
   ${setv} › Primogems : ${global.db.users[m.sender] ? global.db.users[m.sender].uang.toLocaleString("id-ID") : "0"}

\`\`\`Berikut List Menunya!\`\`\`
${readmore}

*❖* ┬─────「 \`\`\`Bot\`\`\` 」 °\` ※,

   ${setv},    profile
   ${setv},    claim
   ${setv},    daily
   ${setv},    tfuang (nominal) (@tag)
   ${setv},    tflimit (nominal) (@tag)
   ${setv},    request (text)
   ${setv},    react (emoji)
   ${setv},    tagme
   ${setv},    runtime
   ${setv},    ping
   ${setv},    afk
   ${setv},    afkclear
   ${setv},    rvo (reply pesan viewone)
   ${setv},    inspect (url gc)
   ${setv},    addmsg
   ${setv},    delmsg
   ${setv},    getmsg
   ${setv},    listmsg
   ${setv},    q (reply pesan)
   ${setv},    menfes (62xxx|nama samaran)
   ${setv},    sendtch
   ${setv},    sendich
   ${setv},    sendach
   ${setv},    sendvch
   ${setv},    totalfitur
   ${setv},    nobutton (on/off)


\`\`\`Bot Masih Dalam Tahap Pengembangan!\`\`\`
    `;
    
    let buttonOptions = [
        {
            name: "quick_reply",
            buttonParamsJson: '{"display_text":"Skrip","id":".script"}',
        },
        {
            name: "cta_url",
            buttonParamsJson: '{"display_text":"「 YouTube 」","url":"https://youtube.com/@KeiLaSenpai","merchant_url":"https://www.google.com"}',
        },
    ];
    let thumbMenu = global.fake.menunya;
    let msg = generateWAMessageFromContent(m.chat, {
        viewOnceMessage: {
            message: {
                messageContextInfo: {
                    deviceListMetadata: {},
                    deviceListMetadataVersion: 2
                },
                interactiveMessage: proto.Message.InteractiveMessage.create({
                    contextInfo: {
                        mentionedJid: [m.sender],
                        isForwarded: true,
                        forwardedNewsletterMessageInfo: {
                            newsletterJid: global.my.nl,
                            serverMessageId: 100,
                            newsletterName: global.mess.ucpnl
                        },
                        businessMessageForwardInfo: { businessOwnerJid: keila.decodeJid(keila.user.id) },
                    },
                    body: proto.Message.InteractiveMessage.Body.create({
                        text: `${teks}`
                    }),
                    footer: proto.Message.InteractiveMessage.Footer.create({
                        text: ucapanWaktu
                    }),
                    header: proto.Message.InteractiveMessage.Header.create({
                        subtitle: "KeiLaSenpai",
                        hasMediaAttachment: true, ...(await prepareWAMessageMedia({ image: { url: thumbMenu } }, { upload: keila.waUploadToServer }))
                    }),
                    nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
                        buttons: buttonOptions
                    })
                })
            }
        }
    }, {});

    if (keilaDB[m.sender] && keilaDB[m.sender].statusbt === false) {
      await m.smedia('gvideo', global.fake.menuvid, teks);
    } else {
      await keila.relayMessage(msg.key.remoteJid, msg.message, {
        messageId: msg.key.id
      }).then(response => {
        console.log("Message sent successfully", response);
      }).catch(error => {
        console.error("Error sending message", error);
      });
    };
    const audioMj = fs.readFileSync('./src/media/keilaYa.opus');
    await keila.sendMessage(m.chat, { audio: audioMj, mimetype: "audio/ogg; codecs=opus", ptt: true, }, {	quoted: fkontak, },)
}
break;
case "groupmenu":
{
    const userId = m.sender;
    const keilaDB = loadKeilaDB();
    const jodohData = keilaDB[userId];
    const setv = pickRandom(global.listv);
    let database = JSON.parse(fs.readFileSync("./database/database.json", "utf8"));

    let teks = `${ucapanWktu} ${m.pushName ? m.pushName : "Kak"}!
Silahkan Gunakan Aku Dengan Bijak Ya kak!
    
*▩* ─────「 \`\`\`Info Bot\`\`\` 」 °\` ※,

   ${setv} › Nama : ${global.botname}
   ${setv} › Creator : @${"6289646942000@s.whatsapp.net".split("@")[0]}
   ${setv} › Owner : @${global.owner[0].split("@")[0]}
  
*▩* ─────「 \`\`\`Info User\`\`\` 」 °\` ※,

   ${setv} › Nama : ${m.pushName ? m.pushName : "Si Misterius"}
   ${setv} › Jodoh : ${(jodohData && jodohData.jodoh) ? `@${jodohData.jodoh.split('@')[0]}` : "Belum Berjodoh"}
   ${setv} › Stamina : ${isVip ? "Developer" : global.db.users[m.sender].limit}
   ${setv} › Primogems : ${global.db.users[m.sender] ? global.db.users[m.sender].uang.toLocaleString("id-ID") : "0"}

\`\`\`Berikut List Menunya!\`\`\`
${readmore}

*❖* ┬─────「 \`\`\`Grup\`\`\` 」 °\` ※,

   ${setv},    add (62xxx)
   ${setv},    kick (@tag/62xxx)
   ${setv},    promote (@tag/62xxx)
   ${setv},    demote (@tag/62xxx)
   ${setv},    setname (nama baru gc)
   ${setv},    setdesc (desk)
   ${setv},    setppgc (reply imgnya)
   ${setv},    delete (reply pesan)
   ${setv},    linkgrup
   ${setv},    revoke
   ${setv},    tagall
   ${setv},    hidetag
   ${setv},    totag (reply pesan)
   ${setv},    listonline
   ${setv},    antilink (on/off)
   ${setv},    antidelete (on/off)
   ${setv},    antibot (on/off)
   ${setv},    charai (on/off)
   ${setv},    setinfo (on/off)
   ${setv},    antibot (on/off)
   ${setv},    all
   ${setv},    everyone
   ${setv},    here


\`\`\`Bot Masih Dalam Tahap Pengembangan!\`\`\`
    `;
    
    let buttonOptions = [
        {
            name: "quick_reply",
            buttonParamsJson: '{"display_text":"Skrip","id":".script"}',
        },
        {
            name: "cta_url",
            buttonParamsJson: '{"display_text":"「 YouTube 」","url":"https://youtube.com/@KeiLaSenpai","merchant_url":"https://www.google.com"}',
        },
    ];
    let thumbMenu = global.fake.menunya;
    let msg = generateWAMessageFromContent(m.chat, {
        viewOnceMessage: {
            message: {
                messageContextInfo: {
                    deviceListMetadata: {},
                    deviceListMetadataVersion: 2
                },
                interactiveMessage: proto.Message.InteractiveMessage.create({
                    contextInfo: {
                        mentionedJid: [m.sender],
                        isForwarded: true,
                        forwardedNewsletterMessageInfo: {
                            newsletterJid: global.my.nl,
                            serverMessageId: 100,
                            newsletterName: global.mess.ucpnl
                        },
                        businessMessageForwardInfo: { businessOwnerJid: keila.decodeJid(keila.user.id) },
                    },
                    body: proto.Message.InteractiveMessage.Body.create({
                        text: `${teks}`
                    }),
                    footer: proto.Message.InteractiveMessage.Footer.create({
                        text: ucapanWaktu
                    }),
                    header: proto.Message.InteractiveMessage.Header.create({
                        subtitle: "KeiLaSenpai",
                        hasMediaAttachment: true, ...(await prepareWAMessageMedia({ image: { url: thumbMenu } }, { upload: keila.waUploadToServer }))
                    }),
                    nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
                        buttons: buttonOptions
                    })
                })
            }
        }
    }, {});

    if (keilaDB[m.sender] && keilaDB[m.sender].statusbt === false) {
      await m.smedia('gvideo', global.fake.menuvid, teks);
    } else {
      await keila.relayMessage(msg.key.remoteJid, msg.message, {
        messageId: msg.key.id
      }).then(response => {
        console.log("Message sent successfully", response);
      }).catch(error => {
        console.error("Error sending message", error);
      });
    };
    const audioMj = fs.readFileSync('./src/media/keilaYa.opus');
    await keila.sendMessage(m.chat, { audio: audioMj, mimetype: "audio/ogg; codecs=opus", ptt: true, }, {	quoted: fkontak, },)
}
break;
case "searchmenu":
{
    const userId = m.sender;
    const keilaDB = loadKeilaDB();
    const jodohData = keilaDB[userId];
    const setv = pickRandom(global.listv);
    let database = JSON.parse(fs.readFileSync("./database/database.json", "utf8"));

    let teks = `${ucapanWktu} ${m.pushName ? m.pushName : "Kak"}!
Silahkan Gunakan Aku Dengan Bijak Ya kak!
    
*▩* ─────「 \`\`\`Info Bot\`\`\` 」 °\` ※,

   ${setv} › Nama : ${global.botname}
   ${setv} › Creator : @${"6289646942000@s.whatsapp.net".split("@")[0]}
   ${setv} › Owner : @${global.owner[0].split("@")[0]}
  
*▩* ─────「 \`\`\`Info User\`\`\` 」 °\` ※,

   ${setv} › Nama : ${m.pushName ? m.pushName : "Si Misterius"}
   ${setv} › Jodoh : ${(jodohData && jodohData.jodoh) ? `@${jodohData.jodoh.split('@')[0]}` : "Belum Berjodoh"}
   ${setv} › Stamina : ${isVip ? "Developer" : global.db.users[m.sender].limit}
   ${setv} › Primogems : ${global.db.users[m.sender] ? global.db.users[m.sender].uang.toLocaleString("id-ID") : "0"}

\`\`\`Berikut List Menunya!\`\`\`
${readmore}
 
*❖* ┬─────「 \`\`\`Search\`\`\` 」 °\` ※,

   ${setv},    play (query)
   ${setv},    play2 (query)
   ${setv},    tplay (query)
   ${setv},    splay (query)
   ${setv},    pixiv (query)
   ${setv},    pixivn (query)
   ${setv},    nhentai (query)
   ${setv},    pinterest (query)
   ${setv},    wallpaper (query)
   ${setv},    ringtone (query)


\`\`\`Bot Masih Dalam Tahap Pengembangan!\`\`\`
    `;
    
    let buttonOptions = [
        {
            name: "quick_reply",
            buttonParamsJson: '{"display_text":"Skrip","id":".script"}',
        },
        {
            name: "cta_url",
            buttonParamsJson: '{"display_text":"「 YouTube 」","url":"https://youtube.com/@KeiLaSenpai","merchant_url":"https://www.google.com"}',
        },
    ];
    let thumbMenu = global.fake.menunya;
    let msg = generateWAMessageFromContent(m.chat, {
        viewOnceMessage: {
            message: {
                messageContextInfo: {
                    deviceListMetadata: {},
                    deviceListMetadataVersion: 2
                },
                interactiveMessage: proto.Message.InteractiveMessage.create({
                    contextInfo: {
                        mentionedJid: [m.sender],
                        isForwarded: true,
                        forwardedNewsletterMessageInfo: {
                            newsletterJid: global.my.nl,
                            serverMessageId: 100,
                            newsletterName: global.mess.ucpnl
                        },
                        businessMessageForwardInfo: { businessOwnerJid: keila.decodeJid(keila.user.id) },
                    },
                    body: proto.Message.InteractiveMessage.Body.create({
                        text: `${teks}`
                    }),
                    footer: proto.Message.InteractiveMessage.Footer.create({
                        text: ucapanWaktu
                    }),
                    header: proto.Message.InteractiveMessage.Header.create({
                        subtitle: "KeiLaSenpai",
                        hasMediaAttachment: true, ...(await prepareWAMessageMedia({ image: { url: thumbMenu } }, { upload: keila.waUploadToServer }))
                    }),
                    nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
                        buttons: buttonOptions
                    })
                })
            }
        }
    }, {});

    if (keilaDB[m.sender] && keilaDB[m.sender].statusbt === false) {
      await m.smedia('gvideo', global.fake.menuvid, teks);
    } else {
      await keila.relayMessage(msg.key.remoteJid, msg.message, {
        messageId: msg.key.id
      }).then(response => {
        console.log("Message sent successfully", response);
      }).catch(error => {
        console.error("Error sending message", error);
      });
    };
    const audioMj = fs.readFileSync('./src/media/keilaYa.opus');
    await keila.sendMessage(m.chat, { audio: audioMj, mimetype: "audio/ogg; codecs=opus", ptt: true, }, {	quoted: fkontak, },)
}
break;
case "downloadmenu":
{
    const userId = m.sender;
    const keilaDB = loadKeilaDB();
    const jodohData = keilaDB[userId];
    const setv = pickRandom(global.listv);
    let database = JSON.parse(fs.readFileSync("./database/database.json", "utf8"));

    let teks = `${ucapanWktu} ${m.pushName ? m.pushName : "Kak"}!
Silahkan Gunakan Aku Dengan Bijak Ya kak!
    
*▩* ─────「 \`\`\`Info Bot\`\`\` 」 °\` ※,

   ${setv} › Nama : ${global.botname}
   ${setv} › Creator : @${"6289646942000@s.whatsapp.net".split("@")[0]}
   ${setv} › Owner : @${global.owner[0].split("@")[0]}
  
*▩* ─────「 \`\`\`Info User\`\`\` 」 °\` ※,

   ${setv} › Nama : ${m.pushName ? m.pushName : "Si Misterius"}
   ${setv} › Jodoh : ${(jodohData && jodohData.jodoh) ? `@${jodohData.jodoh.split('@')[0]}` : "Belum Berjodoh"}
   ${setv} › Stamina : ${isVip ? "Developer" : global.db.users[m.sender].limit}
   ${setv} › Primogems : ${global.db.users[m.sender] ? global.db.users[m.sender].uang.toLocaleString("id-ID") : "0"}

\`\`\`Berikut List Menunya!\`\`\`
${readmore}
 
*❖* ┬─────「 \`\`\`Downloader\`\`\` 」 °\` ※,

   ${setv},    ytmp3 (url)
   ${setv},    ytmp4 (url)
   ${setv},    yta2 (url)
   ${setv},    ytv2 (url)
   ${setv},    spotify (url)
   ${setv},    spotifylirik (url)
   ${setv},    instagram (url)
   ${setv},    tiktok (url)
   ${setv},    facebook (url)
   ${setv},    gitrepo (url)
   ${setv},    mediafire (url)
   ${setv},    gdrive (url)
   ${setv},    mega (url)


\`\`\`Bot Masih Dalam Tahap Pengembangan!\`\`\`
    `;
    
    let buttonOptions = [
        {
            name: "quick_reply",
            buttonParamsJson: '{"display_text":"Skrip","id":".script"}',
        },
        {
            name: "cta_url",
            buttonParamsJson: '{"display_text":"「 YouTube 」","url":"https://youtube.com/@KeiLaSenpai","merchant_url":"https://www.google.com"}',
        },
    ];
    let thumbMenu = global.fake.menunya;
    let msg = generateWAMessageFromContent(m.chat, {
        viewOnceMessage: {
            message: {
                messageContextInfo: {
                    deviceListMetadata: {},
                    deviceListMetadataVersion: 2
                },
                interactiveMessage: proto.Message.InteractiveMessage.create({
                    contextInfo: {
                        mentionedJid: [m.sender],
                        isForwarded: true,
                        forwardedNewsletterMessageInfo: {
                            newsletterJid: global.my.nl,
                            serverMessageId: 100,
                            newsletterName: global.mess.ucpnl
                        },
                        businessMessageForwardInfo: { businessOwnerJid: keila.decodeJid(keila.user.id) },
                    },
                    body: proto.Message.InteractiveMessage.Body.create({
                        text: `${teks}`
                    }),
                    footer: proto.Message.InteractiveMessage.Footer.create({
                        text: ucapanWaktu
                    }),
                    header: proto.Message.InteractiveMessage.Header.create({
                        subtitle: "KeiLaSenpai",
                        hasMediaAttachment: true, ...(await prepareWAMessageMedia({ image: { url: thumbMenu } }, { upload: keila.waUploadToServer }))
                    }),
                    nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
                        buttons: buttonOptions
                    })
                })
            }
        }
    }, {});

    if (keilaDB[m.sender] && keilaDB[m.sender].statusbt === false) {
      await m.smedia('gvideo', global.fake.menuvid, teks);
    } else {
      await keila.relayMessage(msg.key.remoteJid, msg.message, {
        messageId: msg.key.id
      }).then(response => {
        console.log("Message sent successfully", response);
      }).catch(error => {
        console.error("Error sending message", error);
      });
    };
    const audioMj = fs.readFileSync('./src/media/keilaYa.opus');
    await keila.sendMessage(m.chat, { audio: audioMj, mimetype: "audio/ogg; codecs=opus", ptt: true, }, {	quoted: fkontak, },)
}
break;
case "toolsmenu":
{
    const userId = m.sender;
    const keilaDB = loadKeilaDB();
    const jodohData = keilaDB[userId];
    const setv = pickRandom(global.listv);
    let database = JSON.parse(fs.readFileSync("./database/database.json", "utf8"));

    let teks = `${ucapanWktu} ${m.pushName ? m.pushName : "Kak"}!
Silahkan Gunakan Aku Dengan Bijak Ya kak!
    
*▩* ─────「 \`\`\`Info Bot\`\`\` 」 °\` ※,

   ${setv} › Nama : ${global.botname}
   ${setv} › Creator : @${"6289646942000@s.whatsapp.net".split("@")[0]}
   ${setv} › Owner : @${global.owner[0].split("@")[0]}
  
*▩* ─────「 \`\`\`Info User\`\`\` 」 °\` ※,

   ${setv} › Nama : ${m.pushName ? m.pushName : "Si Misterius"}
   ${setv} › Jodoh : ${(jodohData && jodohData.jodoh) ? `@${jodohData.jodoh.split('@')[0]}` : "Belum Berjodoh"}
   ${setv} › Stamina : ${isVip ? "Developer" : global.db.users[m.sender].limit}
   ${setv} › Primogems : ${global.db.users[m.sender] ? global.db.users[m.sender].uang.toLocaleString("id-ID") : "0"}

\`\`\`Berikut List Menunya!\`\`\`
${readmore}

*❖* ┬─────「 \`\`\`Tools\`\`\` 」 °\` ※,

   ${setv},    get (url)
   ${setv},    toaudio (reply pesan)
   ${setv},    tomp3 (reply pesan)
   ${setv},    tovn (reply pesan)
   ${setv},    togif (reply pesan)
   ${setv},    tovideo (reply pesan)
   ${setv},    toimage (reply pesan)
   ${setv},    toptv (reply pesan)
   ${setv},    tourl (reply pesan)
   ${setv},    tts (textnya)
   ${setv},    toqr (textnya)
   ${setv},    ssweb (url)
   ${setv},    sticker (send/reply img)
   ${setv},    colong (reply stiker)
   ${setv},    smeme (send/reply img)
   ${setv},    qc (query)
   ${setv},    yc (query)
   ${setv},    ttp (query)
   ${setv},    telestiker (number) (url)
   ${setv},    nulis
   ${setv},    whatmusik
   ${setv},    giveaway
   ${setv},    cc (amt) (crc) (to crc)
   ${setv},    poll
   ${setv},    tempmail
   ${setv},    checkmail


\`\`\`Bot Masih Dalam Tahap Pengembangan!\`\`\`
    `;
    
    let buttonOptions = [
        {
            name: "quick_reply",
            buttonParamsJson: '{"display_text":"Skrip","id":".script"}',
        },
        {
            name: "cta_url",
            buttonParamsJson: '{"display_text":"「 YouTube 」","url":"https://youtube.com/@KeiLaSenpai","merchant_url":"https://www.google.com"}',
        },
    ];
    let thumbMenu = global.fake.menunya;
    let msg = generateWAMessageFromContent(m.chat, {
        viewOnceMessage: {
            message: {
                messageContextInfo: {
                    deviceListMetadata: {},
                    deviceListMetadataVersion: 2
                },
                interactiveMessage: proto.Message.InteractiveMessage.create({
                    contextInfo: {
                        mentionedJid: [m.sender],
                        isForwarded: true,
                        forwardedNewsletterMessageInfo: {
                            newsletterJid: global.my.nl,
                            serverMessageId: 100,
                            newsletterName: global.mess.ucpnl
                        },
                        businessMessageForwardInfo: { businessOwnerJid: keila.decodeJid(keila.user.id) },
                    },
                    body: proto.Message.InteractiveMessage.Body.create({
                        text: `${teks}`
                    }),
                    footer: proto.Message.InteractiveMessage.Footer.create({
                        text: ucapanWaktu
                    }),
                    header: proto.Message.InteractiveMessage.Header.create({
                        subtitle: "KeiLaSenpai",
                        hasMediaAttachment: true, ...(await prepareWAMessageMedia({ image: { url: thumbMenu } }, { upload: keila.waUploadToServer }))
                    }),
                    nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
                        buttons: buttonOptions
                    })
                })
            }
        }
    }, {});

    if (keilaDB[m.sender] && keilaDB[m.sender].statusbt === false) {
      await m.smedia('gvideo', global.fake.menuvid, teks);
    } else {
      await keila.relayMessage(msg.key.remoteJid, msg.message, {
        messageId: msg.key.id
      }).then(response => {
        console.log("Message sent successfully", response);
      }).catch(error => {
        console.error("Error sending message", error);
      });
    };
    const audioMj = fs.readFileSync('./src/media/keilaYa.opus');
    await keila.sendMessage(m.chat, { audio: audioMj, mimetype: "audio/ogg; codecs=opus", ptt: true, }, {	quoted: fkontak, },)
}
break;
case "aimenu":
{
    const userId = m.sender;
    const keilaDB = loadKeilaDB();
    const jodohData = keilaDB[userId];
    const setv = pickRandom(global.listv);
    let database = JSON.parse(fs.readFileSync("./database/database.json", "utf8"));

    let teks = `${ucapanWktu} ${m.pushName ? m.pushName : "Kak"}!
Silahkan Gunakan Aku Dengan Bijak Ya kak!
    
*▩* ─────「 \`\`\`Info Bot\`\`\` 」 °\` ※,

   ${setv} › Nama : ${global.botname}
   ${setv} › Creator : @${"6289646942000@s.whatsapp.net".split("@")[0]}
   ${setv} › Owner : @${global.owner[0].split("@")[0]}
  
*▩* ─────「 \`\`\`Info User\`\`\` 」 °\` ※,

   ${setv} › Nama : ${m.pushName ? m.pushName : "Si Misterius"}
   ${setv} › Jodoh : ${(jodohData && jodohData.jodoh) ? `@${jodohData.jodoh.split('@')[0]}` : "Belum Berjodoh"}
   ${setv} › Stamina : ${isVip ? "Developer" : global.db.users[m.sender].limit}
   ${setv} › Primogems : ${global.db.users[m.sender] ? global.db.users[m.sender].uang.toLocaleString("id-ID") : "0"}

\`\`\`Berikut List Menunya!\`\`\`
${readmore}

*❖* ┬─────「 \`\`\`Ai\`\`\` 」 °\` ※,

   ${setv},    ai (query)
   ${setv},    tl
   ${setv},    gpt (query)
   ${setv},    cai
   ${setv},    cais (query)
   ${setv},    hdr
   ${setv},    dif
   ${setv},    dale
   ${setv},    animedif
   ${setv},    rbg
   ${setv},    toanime


\`\`\`Bot Masih Dalam Tahap Pengembangan!\`\`\`
    `;
    
    let buttonOptions = [
        {
            name: "quick_reply",
            buttonParamsJson: '{"display_text":"Skrip","id":".script"}',
        },
        {
            name: "cta_url",
            buttonParamsJson: '{"display_text":"「 YouTube 」","url":"https://youtube.com/@KeiLaSenpai","merchant_url":"https://www.google.com"}',
        },
    ];
    let thumbMenu = global.fake.menunya;
    let msg = generateWAMessageFromContent(m.chat, {
        viewOnceMessage: {
            message: {
                messageContextInfo: {
                    deviceListMetadata: {},
                    deviceListMetadataVersion: 2
                },
                interactiveMessage: proto.Message.InteractiveMessage.create({
                    contextInfo: {
                        mentionedJid: [m.sender],
                        isForwarded: true,
                        forwardedNewsletterMessageInfo: {
                            newsletterJid: global.my.nl,
                            serverMessageId: 100,
                            newsletterName: global.mess.ucpnl
                        },
                        businessMessageForwardInfo: { businessOwnerJid: keila.decodeJid(keila.user.id) },
                    },
                    body: proto.Message.InteractiveMessage.Body.create({
                        text: `${teks}`
                    }),
                    footer: proto.Message.InteractiveMessage.Footer.create({
                        text: ucapanWaktu
                    }),
                    header: proto.Message.InteractiveMessage.Header.create({
                        subtitle: "KeiLaSenpai",
                        hasMediaAttachment: true, ...(await prepareWAMessageMedia({ image: { url: thumbMenu } }, { upload: keila.waUploadToServer }))
                    }),
                    nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
                        buttons: buttonOptions
                    })
                })
            }
        }
    }, {});

    if (keilaDB[m.sender] && keilaDB[m.sender].statusbt === false) {
      await m.smedia('gvideo', global.fake.menuvid, teks);
    } else {
      await keila.relayMessage(msg.key.remoteJid, msg.message, {
        messageId: msg.key.id
      }).then(response => {
        console.log("Message sent successfully", response);
      }).catch(error => {
        console.error("Error sending message", error);
      });
    };
    const audioMj = fs.readFileSync('./src/media/keilaYa.opus');
    await keila.sendMessage(m.chat, { audio: audioMj, mimetype: "audio/ogg; codecs=opus", ptt: true, }, {	quoted: fkontak, },)
}
break;
case "gamemenu":
{
    const userId = m.sender;
    const keilaDB = loadKeilaDB();
    const jodohData = keilaDB[userId];
    const setv = pickRandom(global.listv);
    let database = JSON.parse(fs.readFileSync("./database/database.json", "utf8"));

    let teks = `${ucapanWktu} ${m.pushName ? m.pushName : "Kak"}!
Silahkan Gunakan Aku Dengan Bijak Ya kak!
    
*▩* ─────「 \`\`\`Info Bot\`\`\` 」 °\` ※,

   ${setv} › Nama : ${global.botname}
   ${setv} › Creator : @${"6289646942000@s.whatsapp.net".split("@")[0]}
   ${setv} › Owner : @${global.owner[0].split("@")[0]}
  
*▩* ─────「 \`\`\`Info User\`\`\` 」 °\` ※,

   ${setv} › Nama : ${m.pushName ? m.pushName : "Si Misterius"}
   ${setv} › Jodoh : ${(jodohData && jodohData.jodoh) ? `@${jodohData.jodoh.split('@')[0]}` : "Belum Berjodoh"}
   ${setv} › Stamina : ${isVip ? "Developer" : global.db.users[m.sender].limit}
   ${setv} › Primogems : ${global.db.users[m.sender] ? global.db.users[m.sender].uang.toLocaleString("id-ID") : "0"}

\`\`\`Berikut List Menunya!\`\`\`
${readmore}

*❖* ┬─────「 \`\`\`Game\`\`\` 」 °\` ※,

   ${setv},    tictactoe
   ${setv},    math (level)
   ${setv},    kuis (mode)
   ${setv},    suit
   ${setv},    tebakbom
   ${setv},    slot
   ${setv},    casino (nominal)
   ${setv},    rampok (@tag)
   ${setv},    uno
   ${setv},    wish
   ${setv},    wishinv
   ${setv},    wishhst


\`\`\`Bot Masih Dalam Tahap Pengembangan!\`\`\`
    `;
    
    let buttonOptions = [
        {
            name: "quick_reply",
            buttonParamsJson: '{"display_text":"Skrip","id":".script"}',
        },
        {
            name: "cta_url",
            buttonParamsJson: '{"display_text":"「 YouTube 」","url":"https://youtube.com/@KeiLaSenpai","merchant_url":"https://www.google.com"}',
        },
    ];
    let thumbMenu = global.fake.menunya;
    let msg = generateWAMessageFromContent(m.chat, {
        viewOnceMessage: {
            message: {
                messageContextInfo: {
                    deviceListMetadata: {},
                    deviceListMetadataVersion: 2
                },
                interactiveMessage: proto.Message.InteractiveMessage.create({
                    contextInfo: {
                        mentionedJid: [m.sender],
                        isForwarded: true,
                        forwardedNewsletterMessageInfo: {
                            newsletterJid: global.my.nl,
                            serverMessageId: 100,
                            newsletterName: global.mess.ucpnl
                        },
                        businessMessageForwardInfo: { businessOwnerJid: keila.decodeJid(keila.user.id) },
                    },
                    body: proto.Message.InteractiveMessage.Body.create({
                        text: `${teks}`
                    }),
                    footer: proto.Message.InteractiveMessage.Footer.create({
                        text: ucapanWaktu
                    }),
                    header: proto.Message.InteractiveMessage.Header.create({
                        subtitle: "KeiLaSenpai",
                        hasMediaAttachment: true, ...(await prepareWAMessageMedia({ image: { url: thumbMenu } }, { upload: keila.waUploadToServer }))
                    }),
                    nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
                        buttons: buttonOptions
                    })
                })
            }
        }
    }, {});

    if (keilaDB[m.sender] && keilaDB[m.sender].statusbt === false) {
      await m.smedia('gvideo', global.fake.menuvid, teks);
    } else {
      await keila.relayMessage(msg.key.remoteJid, msg.message, {
        messageId: msg.key.id
      }).then(response => {
        console.log("Message sent successfully", response);
      }).catch(error => {
        console.error("Error sending message", error);
      });
    };
    const audioMj = fs.readFileSync('./src/media/keilaYa.opus');
    await keila.sendMessage(m.chat, { audio: audioMj, mimetype: "audio/ogg; codecs=opus", ptt: true, }, {	quoted: fkontak, },)
}
break;
case "funmenu":
{
    const userId = m.sender;
    const keilaDB = loadKeilaDB();
    const jodohData = keilaDB[userId];
    const setv = pickRandom(global.listv);
    let database = JSON.parse(fs.readFileSync("./database/database.json", "utf8"));

    let teks = `${ucapanWktu} ${m.pushName ? m.pushName : "Kak"}!
Silahkan Gunakan Aku Dengan Bijak Ya kak!
    
*▩* ─────「 \`\`\`Info Bot\`\`\` 」 °\` ※,

   ${setv} › Nama : ${global.botname}
   ${setv} › Creator : @${"6289646942000@s.whatsapp.net".split("@")[0]}
   ${setv} › Owner : @${global.owner[0].split("@")[0]}
  
*▩* ─────「 \`\`\`Info User\`\`\` 」 °\` ※,

   ${setv} › Nama : ${m.pushName ? m.pushName : "Si Misterius"}
   ${setv} › Jodoh : ${(jodohData && jodohData.jodoh) ? `@${jodohData.jodoh.split('@')[0]}` : "Belum Berjodoh"}
   ${setv} › Stamina : ${isVip ? "Developer" : global.db.users[m.sender].limit}
   ${setv} › Primogems : ${global.db.users[m.sender] ? global.db.users[m.sender].uang.toLocaleString("id-ID") : "0"}

\`\`\`Berikut List Menunya!\`\`\`
${readmore}

*❖* ┬─────「 \`\`\`Fun\`\`\` 」 °\` ※,

   ${setv},    dadu
   ${setv},    bisakah (text)
   ${setv},    apakah (text)
   ${setv},    kapan (text)
   ${setv},    kerangajaib (text)
   ${setv},    cekmati (text)
   ${setv},    rate (reply pesan)
   ${setv},    halah (text)
   ${setv},    hilih (text)
   ${setv},    huluh (text)
   ${setv},    heleh (text)
   ${setv},    holoh (text)
   ${setv},    jodoh
   ${setv},    jdh


\`\`\`Bot Masih Dalam Tahap Pengembangan!\`\`\`
    `;
    
    let buttonOptions = [
        {
            name: "quick_reply",
            buttonParamsJson: '{"display_text":"Skrip","id":".script"}',
        },
        {
            name: "cta_url",
            buttonParamsJson: '{"display_text":"「 YouTube 」","url":"https://youtube.com/@KeiLaSenpai","merchant_url":"https://www.google.com"}',
        },
    ];
    let thumbMenu = global.fake.menunya;
    let msg = generateWAMessageFromContent(m.chat, {
        viewOnceMessage: {
            message: {
                messageContextInfo: {
                    deviceListMetadata: {},
                    deviceListMetadataVersion: 2
                },
                interactiveMessage: proto.Message.InteractiveMessage.create({
                    contextInfo: {
                        mentionedJid: [m.sender],
                        isForwarded: true,
                        forwardedNewsletterMessageInfo: {
                            newsletterJid: global.my.nl,
                            serverMessageId: 100,
                            newsletterName: global.mess.ucpnl
                        },
                        businessMessageForwardInfo: { businessOwnerJid: keila.decodeJid(keila.user.id) },
                    },
                    body: proto.Message.InteractiveMessage.Body.create({
                        text: `${teks}`
                    }),
                    footer: proto.Message.InteractiveMessage.Footer.create({
                        text: ucapanWaktu
                    }),
                    header: proto.Message.InteractiveMessage.Header.create({
                        subtitle: "KeiLaSenpai",
                        hasMediaAttachment: true, ...(await prepareWAMessageMedia({ image: { url: thumbMenu } }, { upload: keila.waUploadToServer }))
                    }),
                    nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
                        buttons: buttonOptions
                    })
                })
            }
        }
    }, {});

    if (keilaDB[m.sender] && keilaDB[m.sender].statusbt === false) {
      await m.smedia('gvideo', global.fake.menuvid, teks);
    } else {
      await keila.relayMessage(msg.key.remoteJid, msg.message, {
        messageId: msg.key.id
      }).then(response => {
        console.log("Message sent successfully", response);
      }).catch(error => {
        console.error("Error sending message", error);
      });
    };
    const audioMj = fs.readFileSync('./src/media/keilaYa.opus');
    await keila.sendMessage(m.chat, { audio: audioMj, mimetype: "audio/ogg; codecs=opus", ptt: true, }, {	quoted: fkontak, },)
}
break;
case "ownermenu":
{
    const userId = m.sender;
    const keilaDB = loadKeilaDB();
    const jodohData = keilaDB[userId];
    const setv = pickRandom(global.listv);
    let database = JSON.parse(fs.readFileSync("./database/database.json", "utf8"));
    
    let teks = `${ucapanWktu} ${m.pushName ? m.pushName : "Kak"}!
Silahkan Gunakan Aku Dengan Bijak Ya kak!
    
*▩* ─────「 \`\`\`Info Bot\`\`\` 」 °\` ※,

   ${setv} › Nama : ${global.botname}
   ${setv} › Creator : @${"6289646942000@s.whatsapp.net".split("@")[0]}
   ${setv} › Owner : @${global.owner[0].split("@")[0]}
  
*▩* ─────「 \`\`\`Info User\`\`\` 」 °\` ※,

   ${setv} › Nama : ${m.pushName ? m.pushName : "Si Misterius"}
   ${setv} › Jodoh : ${(jodohData && jodohData.jodoh) ? `@${jodohData.jodoh.split('@')[0]}` : "Belum Berjodoh"}
   ${setv} › Stamina : ${isVip ? "Developer" : global.db.users[m.sender].limit}
   ${setv} › Primogems : ${global.db.users[m.sender] ? global.db.users[m.sender].uang.toLocaleString("id-ID") : "0"}

\`\`\`Berikut List Menunya!\`\`\`
${readmore}

*❖* ┬─────「 \`\`\`Owner\`\`\` 」 °\` ※,

   ${setv},    mode (public or self)
   ${setv},    setbio
   ${setv},    setppbot
   ${setv},    join
   ${setv},    leave
   ${setv},    block
   ${setv},    openblock
   ${setv},    listpc
   ${setv},    listgc
   ${setv},    creategc
   ${setv},    addprem
   ${setv},    delprem
   ${setv},    listprem
   ${setv},    bot --settings
   ${setv},    bot set
   ${setv},    getcase
   ${setv},    sendsw
   ${setv},    crc
   ${setv},    addgems
   ${setv},    $
   ${setv},    >
   ${setv},    <


\`\`\`Bot Masih Dalam Tahap Pengembangan!\`\`\`
    `;
    
    let buttonOptions = [
        {
            name: "quick_reply",
            buttonParamsJson: '{"display_text":"Skrip","id":".script"}',
        },
        {
            name: "cta_url",
            buttonParamsJson: '{"display_text":"「 YouTube 」","url":"https://youtube.com/@KeiLaSenpai","merchant_url":"https://www.google.com"}',
        },
    ];
    let thumbMenu = global.fake.menunya;
    let msg = generateWAMessageFromContent(m.chat, {
        viewOnceMessage: {
            message: {
                messageContextInfo: {
                    deviceListMetadata: {},
                    deviceListMetadataVersion: 2
                },
                interactiveMessage: proto.Message.InteractiveMessage.create({
                    contextInfo: {
                        mentionedJid: [m.sender],
                        isForwarded: true,
                        forwardedNewsletterMessageInfo: {
                            newsletterJid: global.my.nl,
                            serverMessageId: 100,
                            newsletterName: global.mess.ucpnl
                        },
                        businessMessageForwardInfo: { businessOwnerJid: keila.decodeJid(keila.user.id) },
                    },
                    body: proto.Message.InteractiveMessage.Body.create({
                        text: `${teks}`
                    }),
                    footer: proto.Message.InteractiveMessage.Footer.create({
                        text: ucapanWaktu
                    }),
                    header: proto.Message.InteractiveMessage.Header.create({
                        subtitle: "KeiLaSenpai",
                        hasMediaAttachment: true, ...(await prepareWAMessageMedia({ image: { url: thumbMenu } }, { upload: keila.waUploadToServer }))
                    }),
                    nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
                        buttons: buttonOptions
                    })
                })
            }
        }
    }, {});

    if (keilaDB[m.sender] && keilaDB[m.sender].statusbt === false) {
      await m.smedia('gvideo', global.fake.menuvid, teks);
    } else {
      await keila.relayMessage(msg.key.remoteJid, msg.message, {
        messageId: msg.key.id
      }).then(response => {
        console.log("Message sent successfully", response);
      }).catch(error => {
        console.error("Error sending message", error);
      });
    };
    const audioMj = fs.readFileSync('./src/media/keilaYa.opus');
    await keila.sendMessage(m.chat, { audio: audioMj, mimetype: "audio/ogg; codecs=opus", ptt: true, }, {	quoted: fkontak, },)
}
break;

			case "hoyomenu":
				{
					const userId = m.sender;
					const user = global.db.users[userId];
					let database = JSON.parse(
						fs.readFileSync("./database/database.json", "utf8"),
					);
					const userLanguage = database.users[userId]
						? database.users[userId].language
						: "EN";

					let profile;
					try {
						profile = await keila.profilePictureUrl(
							m.sender,
							"image",
						);
					} catch (e) {
						profile = global.fake.anonim;
					}
					const setv = pickRandom(global.listv);
					const userInfo = getUserInfo(
						m,
						user,
						isVip,
						isPremium,
						userLanguage,
					);
					const botInfo = getBotInfo(userLanguage);
					const about = getAbout(tanggal, hari, jam, userLanguage);

					const menunya = `${userInfo}${botInfo}${about}
╭──❍「 *HOYOVERSE* 」❍
│${setv} ${prefix} enka (genshin/hsr) (uid)
│${setv} ${prefix} build (genshin/hsr) (character)
│${setv} ${prefix} ascend (genshin/hsr) (character)
│${setv} ${prefix} wikigenshin
│${setv} ${prefix} wikihsr
│${setv} ${prefix} leak (genshin/hsr)
╰──────❍`;

					await keila.sendMessage(
						m.chat,
						{
							image: { url: global.fake.menunya },
							caption: menunya,
							contextInfo: {
								mentionedJid: [
									m.sender
								],
								forwardingScore: 10,
								isForwarded: true,
								forwardedNewsletterMessageInfo: {
									newsletterJid: '48459262621@s.whatsapp.net',
									serverMessageId: null,
									newsletterName: "Join For More Info",
								},
								externalAdReply: {
									title: global.author,
									body: global.packname,
									showAdAttribution: true,
									thumbnailUrl: profile,
									mediaType: 1,
									previewType: 0,
									renderLargerThumbnail: false,
									mediaUrl: global.my.gh,
									sourceUrl: global.my.gh,
								},
							},
						},
						{
							quoted: m,
						},
					);
					/*
					await keila.sendMessage(m.chat, { audio: 'https://f.uguu.se/iHKlnyHj.mp3', mimetype: "audio/ogg; codecs=opus", ptt: true, }, {	quoted: m, },); */
				}
				break;
case "menu":
{
    const userId = m.sender;
    const keilaDB = loadKeilaDB();
    const jodohData = keilaDB[userId];
    const setv = pickRandom(global.listv);
    let database = JSON.parse(fs.readFileSync("./database/database.json", "utf8"));
    
    let tks = `${ucapanWktu} ${m.pushName ? m.pushName : "Kak"}!
Silahkan Gunakan Aku Dengan Bijak Ya kak!
    
*▩* ─────「 \`\`\`Info Bot\`\`\` 」 °\` ※,

   ${setv} › Nama : ${global.botname}
   ${setv} › Creator : @${"6289646942000@s.whatsapp.net".split("@")[0]}
   ${setv} › Owner : @${global.owner[0].split("@")[0]}
  
*▩* ─────「 \`\`\`Info User\`\`\` 」 °\` ※,

   ${setv} › Nama : ${m.pushName ? m.pushName : "Si Misterius"}
   ${setv} › Jodoh : ${(jodohData && jodohData.jodoh) ? `@${jodohData.jodoh.split('@')[0]}` : "Belum Berjodoh"}
   ${setv} › Stamina : ${isVip ? "Developer" : global.db.users[m.sender].limit}
   ${setv} › Primogems : ${global.db.users[m.sender] ? global.db.users[m.sender].uang.toLocaleString("id-ID") : "0"}

\`\`\`Berikut List Menunya!\`\`\`
${readmore}

*✾* ┬────「 \`\`\`List Menu\`\`\` 」 °\` ※,

   ${setv},    menu
   ${setv},    aimenu
   ${setv},    botmenu
   ${setv},    groupmenu
   ${setv},    toolsmenu
   ${setv},    funmenu
   ${setv},    gamemenu
   ${setv},    downloadmenu
   ${setv},    searchmenu
   ${setv},    hoyomenu
   ${setv},    ownermenu
   
   
\`\`\`Bot Masih Dalam Tahap Pengembangan!\`\`\`
`
    let sections = [
      {
        title: 'All Menu',
        highlight_label: 'All Features',
        rows: [
          {
            title: 'Semua Fitur',
            description: `Pilih Untuk Melanjutkan!`,
            id: `${prefix}allmenu`
          }
        ]
      },
      {
        title: 'User Area',
        highlight_label: 'User Features',
        rows: [
          {
            title: 'Bot Menu',
            description: `Pilih Untuk Melanjutkan!`,
            id: `${prefix}botmenu`
          },
          {
            title: 'Group Menu',
            description: `Pilih Untuk Melanjutkan`,
            id: `${prefix}groupmenu`
          },
          {
            title: 'Download Menu',
            description: `Pilih Untuk Melanjutkan`,
            id: `${prefix}downloadmenu`
          },
          {
            title: 'Tools Menu',
            description: `Pilih Untuk Melanjutkan`,
            id: `${prefix}toolsmenu`
          },
          {
            title: 'Game Menu',
            description: `Pilih Untuk Melanjutkan`,
            id: `${prefix}gamemenu`
          },
          {
            title: 'Fun Menu',
            description: `Pilih Untuk Melanjutkan`,
            id: `${prefix}funmenu`
          },
          {
            title: 'Online Game Menu',
            description: `Pilih Untuk Melanjutkan`,
            id: `${prefix}hoyomenu`
          },
          {
            title: 'AI Menu',
            description: `Pilih Untuk Melanjutkan`,
            id: `${prefix}aimenu`
          },
          {
            title: 'Search Menu',
            description: `Pilih Untuk Melanjutkan`,
            id: `${prefix}searchmenu`
          },
        ]
      },
      {
        title: 'Owner Area',
        highlight_label: 'Owner Only',
        rows: [
          {
            title: 'Owner Menu',
            description: `Pilih Untuk Melanjutkan!`,
            id: `${prefix}ownermenu`
          }
        ]
      }
    ]
    let listMessage = {
      title: '「 List Menu 」',
      sections
    };
    
    let buttonOptions = [
       {
           name: "single_select",
           buttonParamsJson: JSON.stringify(listMessage) 
        },
        {
            name: "quick_reply",
            buttonParamsJson: '{"display_text":"Skrip","id":".script"}',
        },
        {
            name: "cta_url",
            buttonParamsJson: '{"display_text":"「 YouTube 」","url":"https://youtube.com/@KeiLaSenpai","merchant_url":"https://www.google.com"}',
        },
    ];
    let thumbMenu = global.fake.menunya;
    let msg = generateWAMessageFromContent(m.chat, {
        viewOnceMessage: {
            message: {
                messageContextInfo: {
                    deviceListMetadata: {},
                    deviceListMetadataVersion: 2
                },
                interactiveMessage: proto.Message.InteractiveMessage.create({
                    contextInfo: {
                        mentionedJid: [m.sender],
                        isForwarded: true,
                        forwardedNewsletterMessageInfo: {
                            newsletterJid: global.my.nl,
                            serverMessageId: 100,
                            newsletterName: global.mess.ucpnl
                        },
                        businessMessageForwardInfo: { businessOwnerJid: keila.decodeJid(keila.user.id) },
                        externalAdReply: {
                          title: 'KeiLa 3',
                          body: 'Join For More Info!',
                          showAdAttribution: true,
                          thumbnailUrl: thumbMenu,
                          mediaType: 1,
                          previewType: 0,
                          renderLargerThumbnail: false,
                          mediaUrl: thumbMenu,
                          sourceUrl: 'https://whatsapp.com/channel/0029VafeXnbDTkK4EwjVay2T',
                        }
                    },
                    body: proto.Message.InteractiveMessage.Body.create({
                        text: `${tks}`
                    }),
                    footer: proto.Message.InteractiveMessage.Footer.create({
                        text: ucapanWaktu
                    }),
                    header: proto.Message.InteractiveMessage.Header.create({
                        subtitle: "KeiLaSenpai",
                        hasMediaAttachment: true, ...(await prepareWAMessageMedia({ image: { url: thumbMenu } }, { upload: keila.waUploadToServer }))
                    }),
                    nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
                        buttons: buttonOptions
                    })
                })
            }
        }
    }, {});

    if (keilaDB[m.sender] && keilaDB[m.sender].statusbt === false) {
      await m.smedia('gvideo', global.fake.menuvid, tks);
    } else {
      await keila.relayMessage(msg.key.remoteJid, msg.message, {
        messageId: msg.key.id
      }).then(response => {
        console.log("Message sent successfully", response);
      }).catch(error => {
        console.error("Error sending message", error);
      });
    };
    const audioMj = fs.readFileSync('./src/media/keilaYa.opus');
    await keila.sendMessage(m.chat, { audio: audioMj, mimetype: "audio/ogg; codecs=opus", ptt: true, }, {	quoted: fkontak, },)
}
break;

			default:
				if (budy.startsWith(">")) {
					if (!isCreator) return;
					try {
						let evaled = await eval(budy.slice(2));
						if (typeof evaled !== "string")
							evaled = require("util").inspect(evaled);
						await m.reply(evaled);
					} catch (err) {
						await m.reply(String(err));
					}
				}
				if (budy.startsWith("<")) {
					if (!isCreator) return;
					try {
						let evaled = await eval(
							`(async () => { ${budy.slice(2)} })()`,
						);
						if (typeof evaled !== "string")
							evaled = require("util").inspect(evaled);
						await m.reply(evaled);
					} catch (err) {
						await m.reply(String(err));
					}
				}
				if (budy.startsWith("$")) {
					if (!isCreator) return;
					if (!text) return;
					exec(budy.slice(2), (err, stdout) => {
						if (err) return m.reply(`${err}`);
						if (stdout) return m.reply(stdout);
					});
				}
		}
	} catch (err) {
		console.log(util.format(err));
		//m.reply('*❗ Internal server error️*');
		keila.sendFromOwner(
			global.owner,
			"Halo sayang, sepertinya ada yang error nih, jangan lupa diperbaiki ya\n\n*Log error:*\n\n" +
				util.format(err),
			m,
			{
				contextInfo: {
					isForwarded: true,
				},
			},
		);
	}
};


let file = require.resolve(__filename);
fs.watchFile(file, () => {
	fs.unwatchFile(file);
	console.log(chalk.redBright(`Update ${__filename}`));
	delete require.cache[file];
	require(file);
});
