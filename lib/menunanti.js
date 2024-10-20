const chalk = require('chalk');
const fs = require('fs');

const Keitext = (text, style = 1) => {
  var abc = 'abcdefghijklmnopqrstuvwxyz1234567890'.split('');
  var ehz = {
    1: 'ᴀʙᴄᴅᴇꜰɢʜɪᴊᴋʟᴍɴᴏᴘǫʀꜱᴛᴜᴠᴡxʏᴢ1234567890'
  };
  var replacer = [];
  abc.map((v, i) =>
    replacer.push({
      original: v,
      convert: ehz[style].split('')[i]
    })
  );
  var str = text.split('');
  var output = [];
  str.map((v) => {
    if (v.toUpperCase() !== v.toLowerCase() && v === v.toUpperCase()) {
      // If the character is uppercase, push it unchanged
      output.push(v);
    } else {
      // If the character is lowercase or not a letter, find and convert it
      const find = replacer.find((x) => x.original == v.toLowerCase());
      find ? output.push(find.convert) : output.push(v);
    }
  });
  return output.join('');
};

global.menugrup = (prefix) => {
  const setv = pickRandom(global.listv);
  return Keitext(`
â•­â”€â”€âã€Œ *GROUP* ã€â
â”‚${setv} ${prefix} add (62xxx)
â”‚${setv} ${prefix} kick (@tag/62xxx)
â”‚${setv} ${prefix} promote (@tag/62xxx)
â”‚${setv} ${prefix} demote (@tag/62xxx)
â”‚${setv} ${prefix} setname (nama baru gc)
â”‚${setv} ${prefix} setdesc (desk)
â”‚${setv} ${prefix} setppgc (reply imgnya)
â”‚${setv} ${prefix} delete (reply pesan)
â”‚${setv} ${prefix} linkgrup
â”‚${setv} ${prefix} revoke
â”‚${setv} ${prefix} tagall
â”‚${setv} ${prefix} hidetag
â”‚${setv} ${prefix} totag (reply pesan)
â”‚${setv} ${prefix} listonline
â”‚${setv} ${prefix} antilink (on/off)
â”‚${setv} ${prefix} antidelete (on/off)
â•°â”€â”¬â”€â”€â”€â”€â
`, 1);
};

global.menusearch = (prefix) => {
  const setv = pickRandom(global.listv);
  return Keitext(`
â•­â”€â”´âã€Œ *SEARCH* ã€â
â”‚${setv} ${prefix} ytsearch (query)
â”‚${setv} ${prefix} pixiv (query)
â”‚${setv} ${prefix} pinterest (query)
â”‚${setv} ${prefix} wallpaper (query)
â”‚${setv} ${prefix} ringtone (query)
â•°â”€â”¬â”€â”€â”€â”€â
`, 1);
};

global.menubot = (prefix) => {
  const setv = pickRandom(global.listv);
  return Keitext(`
â•­â”€â”€âã€Œ *BOT* ã€â
â”‚${setv} ${prefix} profile
â”‚${setv} ${prefix} claim
â”‚${setv} ${prefix} tfuang (nominal) (@tag)
â”‚${setv} ${prefix} tflimit (nominal) (@tag)
â”‚${setv} ${prefix} request (text)
â”‚${setv} ${prefix} react (emoji)
â”‚${setv} ${prefix} tagme
â”‚${setv} ${prefix} runtime
â”‚${setv} ${prefix} ping
â”‚${setv} ${prefix} afk
â”‚${setv} ${prefix} rvo (reply pesan viewone)
â”‚${setv} ${prefix} inspect (url gc)
â”‚${setv} ${prefix} addmsg
â”‚${setv} ${prefix} delmsg
â”‚${setv} ${prefix} getmsg
â”‚${setv} ${prefix} listmsg
â”‚${setv} ${prefix} q (reply pesan)
â”‚${setv} ${prefix} menfes (62xxx|nama samaran)
â•°â”€â”¬â”€â”€â”€â”€â
`, 1);
};

global.menudownload = (prefix) => {
  const setv = pickRandom(global.listv);
  return Keitext(`
â•­â”€â”€âã€Œ *DOWNLOAD* ã€â
â”‚${setv} ${prefix} ytmp3 (url)
â”‚${setv} ${prefix} ytmp4 (url)
â”‚${setv} ${prefix} instagram (url)
â”‚${setv} ${prefix} tiktok (url)
â•°â”€â”¬â”€â”€â”€â”€â
`, 1);
};

global.menutools = (prefix) => {
  const setv = pickRandom(global.listv);
  return Keitext(`
â•­â”€â”€âã€Œ *TOOLS* ã€â
â”‚${setv} ${prefix} get (url)
â”‚${setv} ${prefix} toaudio (reply pesan)
â”‚${setv} ${prefix} tomp3 (reply pesan)
â”‚${setv} ${prefix} tovn (reply pesan)
â”‚${setv} ${prefix} togif (reply pesan)
â”‚${setv} ${prefix} tovideo (reply pesan)
â”‚${setv} ${prefix} toimage (reply pesan)
â”‚${setv} ${prefix} toptv (reply pesan)
â”‚${setv} ${prefix} tourl (reply pesan)
â”‚${setv} ${prefix} tts (textnya)
â”‚${setv} ${prefix} toqr (textnya)
â”‚${setv} ${prefix} ssweb (url)
â”‚${setv} ${prefix} sticker (send/reply img)
â”‚${setv} ${prefix} colong (reply stiker)
â”‚${setv} ${prefix} smeme (send/reply img)
â”‚${setv} ${prefix} nulis
â•°â”€â”¬â”€â”€â”€â”€â
`, 1);
};

global.menuai = (prefix) => {
  const setv = pickRandom(global.listv);
  return Keitext(`
â•­â”€â”€âã€Œ *AI* ã€â
â”‚${setv} ${prefix} ai (query)
â”‚${setv} ${prefix} gpt (query)
â•°â”€â”¬â”€â”€â”€â”€â
`, 1);
};

global.menugame = (prefix) => {
  const setv = pickRandom(global.listv);
  return Keitext(`
â•­â”€â”´âã€Œ *GAME* ã€â
â”‚${setv} ${prefix} tictactoe
â”‚${setv} ${prefix} math (level)
â”‚${setv} ${prefix} suit
â”‚${setv} ${prefix} tebakbom
â”‚${setv} ${prefix} slot
â”‚${setv} ${prefix} casino (nominal)
â”‚${setv} ${prefix} rampok (@tag)
â•°â”€â”¬â”€â”€â”€â”€â
`, 1);
};

global.menufun = (prefix) => {
  const setv = pickRandom(global.listv);
  return Keitext(`
â•­â”€â”´âã€Œ *FUN* ã€â
â”‚${setv} ${prefix} dadu
â”‚${setv} ${prefix} bisakah (text)
â”‚${setv} ${prefix} apakah (text)
â”‚${setv} ${prefix} kapan (text)
â”‚${setv} ${prefix} kerangajaib (text)
â”‚${setv} ${prefix} cekmati (text)
â”‚${setv} ${prefix} rate (reply pesan)
â”‚${setv} ${prefix} halah (text)
â”‚${setv} ${prefix} hilih (text)
â”‚${setv} ${prefix} huluh (text)
â”‚${setv} ${prefix} heleh (text)
â”‚${setv} ${prefix} holoh (text)
â•°â”€â”¬â”€â”€â”€â”€â
`, 1);
};

global.menuongame = (prefix) => {
  const setv = pickRandom(global.listv);
  return Keitext(`
â•­â”€â”€âã€Œ *ONLINE GAME* ã€â
â”‚${setv} ${prefix} enka (genshin/hsr) (uid)
â”‚${setv} ${prefix} build (genshin/hsr) (character)
â”‚${setv} ${prefix} ascend (genshin/hsr) (character)
â”‚${setv} ${prefix} wikigenshin
â”‚${setv} ${prefix} wikihsr
â”‚${setv} ${prefix} leak (genshin/hsr)
â•°â”€â”€â”€â”€â”€â”€â
`, 1);
};

global.menuowner = (prefix) => {
  const setv = pickRandom(global.listv);
  return Keitext(`
â•­â”€â”´âã€Œ *OWNER* ã€â
â”‚${setv} ${prefix} mode (public or self)
â”‚${setv} ${prefix} setbio
â”‚${setv} ${prefix} setppbot
â”‚${setv} ${prefix} join
â”‚${setv} ${prefix} leave
â”‚${setv} ${prefix} block
â”‚${setv} ${prefix} openblock
â”‚${setv} ${prefix} listpc
â”‚${setv} ${prefix} listgc
â”‚${setv} ${prefix} creategc
â”‚${setv} ${prefix} addprem
â”‚${setv} ${prefix} delprem
â”‚${setv} ${prefix} listprem
â”‚${setv} ${prefix} bot --settings
â”‚${setv} ${prefix} bot set
â”‚${setv} $
â”‚${setv} >
â”‚${setv} <
â•°â”€â”€â”€â”€â”€â”€â
`, 1);
};

const file = require.resolve(__filename);
fs.watchFile(file, () => {
  fs.unwatchFile(file);
  console.log(chalk.redBright(`Updated '${__filename}'`));
  delete require.cache[file];
  require(file);
});