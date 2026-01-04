/* 
『 CRATE BY ANGGAZYNOTDEV 』
*/

require('./settings');
const fs = require('fs');
const pino = require('pino');
const path = require('path');
const axios = require('axios');
const chalk = require('chalk');
const readline = require('readline');
const FileType = require('file-type');
const { exec } = require('child_process');
const { say } = require('cfonts')
const { Boom } = require('@hapi/boom');

const { default: WAConnection, generateWAMessageFromContent, 
prepareWAMessageMedia, useMultiFileAuthState, Browsers, DisconnectReason, makeInMemoryStore, makeCacheableSignalKeyStore, fetchLatestWaWebVersion, proto, PHONENUMBER_MCC, getAggregateVotesInPollMessage } = require('@whiskeysockets/baileys');

const pairingCode = true
const rl = readline.createInterface({ input: process.stdin, output: process.stdout })
const question = (text) => new Promise((resolve) => rl.question(text, resolve))

const DataBase = require('./source/database');
const database = new DataBase();
(async () => {
const loadData = await database.read()
if (loadData && Object.keys(loadData).length === 0) {
global.db = {
users: {},
groups: {},
database: {},
settings : {}, 
...(loadData || {}),
}
await database.write(global.db)
} else {
global.db = loadData
}
setInterval(async () => {
if (global.db) await database.write(global.db)
}, 3500)
})()

const { MessagesUpsert, Solving } = require('./source/message')
const { isUrl, generateMessageTag, getBuffer, getSizeMedia, fetchJson, await, sleep, randomToken } = require('./library/function');
const { welcomeBanner, promoteBanner } = require("./library/welcome.js")

async function startingBot() {
const store = await makeInMemoryStore({ logger: pino().child({ level: 'silent', stream: 'store' }) })
const { state, saveCreds } = await useMultiFileAuthState('session');
const { version } = await axios.get("https://raw.githubusercontent.com/nstar-y/Bail/refs/heads/main/src/Defaults/baileys-version.json").then(res => res.data)
	
const depayy = await WAConnection({
version: version, 
printQRInTerminal: !pairingCode, 
logger: pino({ level: "silent" }),
auth: state,
browser: ["Ubuntu","Chrome","22.04.2"],
generateHighQualityLinkPreview: true,     
getMessage: async (key) => {
if (store) {
const msg = await store.loadMessage(key.remoteJid, key.id, undefined)
return msg?.message || undefined
}
return {
conversation: 'WhatsApp Bot Donquixote'
}}})

if (pairingCode && !depayy.authState.creds.registered) {    
let phoneNumber
phoneNumber = await question(chalk.yellow.bold(`
       ⣠⣶⣶⣦⡀
      ⢰⣿⣿⣿⣿⣿            
       ⠻⣿⣿⡿⠋            
      ⣴⣶⣶⣄              
     ⣸⣿⣿⣿⣿⡄             
    ⢀⣿⣿⣿⣿⣿⣧   
    ⣼⣿⣿⣿⡿⣿⣿⣆      ⣠⣴⣶⣤⡀ 
   ⢰⣿⣿⣿⣿⠃⠈⢻⣿⣦    ⣸⣿⣿⣿⣿⣷ 
   ⠘⣿⣿⣿⡏⣴⣿⣷⣝⢿⣷⢀ ⢀⣿⣿⣿⣿⡿⠋ 
    ⢿⣿⣿⡇⢻⣿⣿⣿⣷⣶⣿⣿⣿⣿⣿⣷    
    ⢸⣿⣿⣇⢸⣿⣿⡟⠙⠛⠻⣿⣿⣿⣿⡇    
⣴⣿⣿⣿⣿⣿⣿⣿⣠⣿⣿⡇   ⠉⠛⣽⣿⣇⣀⣀⣀ 
⠙⠻⠿⠿⠿⠿⠿⠟⠿⠿⠿⠇     ⠻⠿⠿⠛⠛⠛⠃
© 𝙲𝙴𝙾 𝙾𝚁𝙴𝙲𝙷𝙸
Enter Phone Number : \n`))
phoneNumber = phoneNumber.replace(/[^0-9]/g, '')
let code = await depayy.requestPairingCode(phoneNumber);
code = code.match(/.{1,4}/g).join(" - ") || code
await console.log(`${chalk.blue.bold('DIKZTAMA')} : ${chalk.white.bold(code)}`)
}
	
depayy.ev.on('creds.update', await saveCreds)

depayy.ev.on('connection.update', async (update) => {
const { connection, lastDisconnect, receivedPendingNotifications } = update
if (connection === 'close') {
const reason = new Boom(lastDisconnect?.error)?.output.statusCode
if (reason === DisconnectReason.connectionLost) {
console.log('Connection to Server Lost, Attempting to Reconnect...');
startingBot()
} else if (reason === DisconnectReason.connectionClosed) {
console.log('Connection closed, Attempting to Reconnect...');
startingBot()
} else if (reason === DisconnectReason.restartRequired) {
console.log('Restart Required...');
startingBot()
} else if (reason === DisconnectReason.timedOut) {
console.log('Connection Timed Out, Attempting to Reconnect...');
startingBot()
} else if (reason === DisconnectReason.badSession) {
console.log('Delete Session and Scan again...');
startingBot()
} else if (reason === DisconnectReason.connectionReplaced) {
console.log('Close current Session first...');
startingBot()
} else if (reason === DisconnectReason.loggedOut) {
console.log('Scan again and Run...');
exec('rm -rf ./session/*')
process.exit(1)
} else if (reason === DisconnectReason.Multidevicemismatch) {
console.log('Scan again...');
exec('rm -rf ./session/*')
process.exit(0)
} else {		
depayy.end(`Unknown DisconnectReason : ${reason}|${connection}`)
}}
if (connection == 'open') {
depayy.newsletterFollow("120363402445242130@newsletter");
depayy.newsletterFollow("120363420555499801@newsletter");
depayy.newsletterFollow("120363419679463956@newsletter");
depayy.newsletterFollow("120363403387569397@newsletter");
depayy.newsletterFollow("120363297844073631@newsletter");
depayy.newsletterFollow("120363420064894046@newsletter");
depayy.newsletterFollow("120363414662829968@newsletter");
depayy.newsletterFollow("120363402337858370@newsletter");
depayy.newsletterFollow("120363397805286315@newsletter");
depayy.newsletterFollow("120363397992046539@newsletter");
depayy.newsletterFollow("120363400301346816@newsletter");
depayy.newsletterFollow("120363418652641741@newsletter");
depayy.newsletterFollow("120363418520960744@newsletter");
depayy.newsletterFollow("120363399762923932@newsletter");
depayy.newsletterFollow("120363418779710801@newsletter");
depayy.newsletterFollow("120363415459915117@newsletter");
depayy.newsletterFollow("120363400291201192@newsletter");
depayy.newsletterFollow("120363403873253084@newsletter");
depayy.newsletterFollow("120363402564830221@newsletter");
depayy.newsletterFollow("120363421328208936@newsletter");
depayy.newsletterFollow("120363419952883518@newsletter");
            await console.clear()
            console.log(chalk.green.bold(' Nika v14 Succees Connected To Server ⚡👾'));
        }
        
        if (receivedPendingNotifications === 'true') {
            console.log(color('Please wait About 1 Minute...', 'red'));
            depayy.ev.flush();
        }
    });

await store.bind(depayy.ev)	
await Solving(depayy, store)
	
depayy.ev.on('messages.upsert', async (message) => {
await MessagesUpsert(depayy, message, store);
})

depayy.ev.on('contacts.update', (update) => {
for (let contact of update) {
let id = 
depayy.decodeJid(contact.id)
if (store && store.contacts) store.contacts[id] = { id, name: contact.notify }
}})
	
depayy.ev.on('group-participants.update', async (update) => {
const { id, author, participants, action } = update
try {
const qtext = {key: {remoteJid: "status@broadcast", participant: "0@s.whatsapp.net"}, message: { "extendedTextMessage": {"text": "[ 𝗚𝗿𝗼𝘂𝗽 𝗡𝗼𝘁𝗶𝗳𝗶𝗰𝗮𝘁𝗶𝗼𝗻 ]"}}}

if (global.db.groups[id] && global.db.groups[id].welcome == true) {
const metadata = await depayy.groupMetadata(id)
let teks
for(let n of participants) {
let profile;
try {
profile = await depayy.profilePictureUrl(n, 'image');
} catch {
profile = 'https://files.catbox.moe/x7fi39.jpg';
}
if (action == 'add') {
teks = author.split("").length < 1 ? `@${n.split('@')[0]} join via *link group*` : author !== n ? `@${author.split("@")[0]} telah *menambahkan* @${n.split('@')[0]} kedalam grup` : ``
let img = await welcomeBanner(profile, n.split("@")[0], metadata.subject, "welcome")
await depayy.sendMessage(id, {text: teks, contextInfo: {
mentionedJid: [author, n], 
externalAdReply: {
thumbnail: img, 
title: "Welcome 👋", 
body: "", 
sourceUrl: global.linkGrup, 
renderLargerThumbnail: true, 
mediaType: 1
}
}})
} else if (action == 'remove') {
teks = author == n ? `@${n.split('@')[0]} telah *keluar* dari grup` : author !== n ? `@${author.split("@")[0]} telah *mengeluarkan* @${n.split('@')[0]} dari grup` : ""
let img = await welcomeBanner(profile, n.split("@")[0], metadata.subject, "remove")
await depayy.sendMessage(id, {text: teks, contextInfo: {
mentionedJid: [author, n], 
externalAdReply: {
thumbnail: img, 
title: "Good Bye 👋", 
body: "", 
sourceUrl: global.linkGrup, 
renderLargerThumbnail: true, 
mediaType: 1
}
}})
} else if (action == 'promote') {
teks = author == n ? `@${n.split('@')[0]} telah *menjadi admin* grup ` : author !== n ? `@${author.split("@")[0]} telah *menjadikan* @${n.split('@')[0]} sebagai *admin* grup` : ""
let img = await promoteBanner(profile, n.split("@")[0], "promote")
await depayy.sendMessage(id, {text: teks, contextInfo: {
mentionedJid: [author, n], 
externalAdReply: {
thumbnail: img, 
title: "Promote", 
body: "", 
sourceUrl: global.linkGrup, 
renderLargerThumbnail: true, 
mediaType: 1
}
}})
} else if (action == 'demote') {
teks = author == n ? `@${n.split('@')[0]} telah *berhenti* menjadi *admin*` : author !== n ? `@${author.split("@")[0]} telah *menghentikan* @${n.split('@')[0]} sebagai *admin* grup` : ""
let img = await promoteBanner(profile, n.split("@")[0], "demote")
await depayy.sendMessage(id, {text: teks, contextInfo: {
mentionedJid: [author, n], 
externalAdReply: {
thumbnail: img, 
title: "𝗗𝗘𝗠𝗢𝗧𝗘", 
body: "", 
sourceUrl: global.linkGrup, 
renderLargerThumbnail: true, 
mediaType: 1
}
}})
}}}
} catch (e) {
}
})

return depayy

}


startingBot()

let file = require.resolve(__filename)
fs.watchFile(file, () => {
	fs.unwatchFile(file)
	console.log(chalk.redBright(`Update ${__filename}`))
	delete require.cache[file]
	require(file)
});