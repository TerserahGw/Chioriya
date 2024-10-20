const fs = require('fs');
const chalk = require('chalk');

global.owner = ['6289646942000']
global.mods = ['6289646942000']
global.packname = 'Chioriya'
global.author = 'KeiLaSenpai'
global.botname = 'Chioriya - KeiLa'
global.listv = ['•','●','■','✿','▲','➩','➢','➣','➤','✦','✧','△','❀','○','□','♤','♡','◇','♧','々','〆']
global.tempatDB = 'database.json'

global.fake = {
	anonim: 'https://telegra.ph/file/95670d63378f7f4210f03.png',
	thumbnailUrl: 'https://telegra.ph/file/fe4843a1261fc414542c4.jpg',
	thumbnail: fs.readFileSync('./src/media/keila.png'),
	docs: fs.readFileSync('./src/media/fake.pdf'),
	listfakedocs: ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet','application/vnd.openxmlformats-officedocument.presentationml.presentation','application/vnd.openxmlformats-officedocument.wordprocessingml.document','application/pdf'],
	menunya: 'https://files.catbox.moe/5ie0yi.jpg',
}

global.my = {
	yt: 'https://youtube.com/c/KeiLaSenpai',
	gh: 'https://github.com/TerserahGw',
	gc: 'none',
	ch: 'none',
     nl: '120363302370199557@newsletter',
     wb: 'https://keilaapi.vercel.app/',
}

global.limit = {
	free: 100,
	premium: 150,
	vip: 200
}

global.uang = {
	free: 1600,
	premium: 6400,
	vip: 16000
}

global.mess = {
	owner: 'Owner Nya Bukan Kamu!',
	admin: 'Lu Admin Kah?',
	botAdmin: 'Maaf Tidak Punya Akses!',
	group: 'Pakai Di Grup Lah!',
	private: 'Di Grup Mana Bisa!',
	prem: 'Kamu Gak Premiun!',
	wait: 'Tunggu Ya!',
	error: 'Kok Gini?',
	done: 'Nih Kak!',
	ucpnl: 'Semangat Ya!!'
}

global.settings = {
	lang: 'id',
	anticall: true,
	autobio: false,
	autoread: true,
	autotype: false,
	readsw: true,
	template: 'textMessage',
	multiprefix: false,
}

global.bot = {
	limit: 0,
	uang: 0
}

global.game = {
	suit: {},
	menfes: {},
	tictactoe: {},
	kuismath: {},
	kuisquiz: {},
	tebakbom: {},
}

global.APIs = {
	zaynn: 'https://api.zaynn.my.id/api',
}
global.APIKeys = {
	'https://api.zaynn.my.id/api': 'Najedev',
}

//~~~~~~~~~~~~~~~< PROCESS >~~~~~~~~~~~~~~~\\

let file = require.resolve(__filename)
fs.watchFile(file, () => {
	fs.unwatchFile(file)
	console.log(chalk.redBright(`Update ${__filename}`))
	delete require.cache[file]
	require(file)
});