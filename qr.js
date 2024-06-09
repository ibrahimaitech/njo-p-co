const PastebinAPI = require('pastebin-js'),
pastebin = new PastebinAPI('EMWTMkQAVfJa9kM-MRUrxd5Oku1U7pgL')
const {makeid} = require('./id');
const QRCode = require('qrcode');
const express = require('express');
const path = require('path');
const fs = require('fs');
let router = express.Router()
const pino = require("pino");
const {
	default: Maher_Zubair,
	useMultiFileAuthState,
	jidNormalizedUser,
	Browsers,
	delay,
	makeInMemoryStore,
} = require("maher-zubair-baileys");

function removeFile(FilePath) {
	if (!fs.existsSync(FilePath)) return false;
	fs.rmSync(FilePath, {
		recursive: true,
		force: true
	})
};
const {
	readFile
} = require("node:fs/promises")
router.get('/', async (req, res) => {
	const id = makeid();
	async function SIGMA_MD_QR_CODE() {
		const {
			state,
			saveCreds
		} = await useMultiFileAuthState('./temp/' + id)
		try {
			let Qr_Code_By_Maher_Zubair = Maher_Zubair({
				auth: state,
				printQRInTerminal: false,
				logger: pino({
					level: "silent"
				}),
				browser: Browsers.macOS("Desktop"),
			});

			Qr_Code_By_Maher_Zubair.ev.on('creds.update', saveCreds)
			Qr_Code_By_Maher_Zubair.ev.on("connection.update", async (s) => {
				const {
					connection,
					lastDisconnect,
					qr
				} = s;
				if (qr) await res.end(await QRCode.toBuffer(qr));
				if (connection == "open") {
					await delay(5000);
					let data = fs.readFileSync(__dirname + `/temp/${id}/creds.json`);
					await delay(800);
				   let b64data = Buffer.from(data).toString('base64');
				   let session = await Qr_Code_By_Maher_Zubair.sendMessage(Qr_Code_By_Maher_Zubair.user.id, { text: '' + b64data });
	
				   let SIGMA_MD_TEXT = `
*𝗕𝗔𝗥𝗔𝗞𝗔 𝗠𝗗 𝗖𝗢𝗡𝗡𝗘𝗖𝗧𝗘𝗗*
*𝗕𝗔𝗥𝗔𝗞𝗔_𝗧𝗘𝗖𝗛*
*𝗟𝗘𝗚𝗜𝗧_𝗕𝗢𝗧*
____________________________________
╔════◇
║『 𝗗𝗘𝗩𝗘𝗟𝗢𝗣𝗘𝗥𝗦』

║ ❒Baraka bega  : _https://wa.me/255762190568_

║ ❒ *Ibrahim Adams*: _https://wa.me/message/74F2PC4JA4F3P1_

╚════════════════════❒
╔═════◇
║ 『••• 𝗢𝗪𝗡𝗘𝗥 𝗜𝗡𝗙𝗢 •••』
║ ❒ 𝗬𝗼𝘂𝘁𝘂𝗯𝗲: _https://www.youtube.com/@ibrahimaitech_

║ ❒ 𝗢𝘄𝗻𝗲𝗿: _https://wa.me/255762190568_

║ ❒ 𝗪𝗮𝗰𝗵𝗮𝗻𝗻𝗲𝗹: _https://whatsapp.com/channel/0029VaZuGSxEawdxZK9CzM0Y_

║ 
╚════════════════════╝ 
 *𝗕𝗔𝗥𝗔𝗞𝗔_𝗠𝗗*
___________________________________

Don't Forget To Give Star🌟 To My Repo`
					
	 await Qr_Code_By_Maher_Zubair.sendMessage(Qr_Code_By_Maher_Zubair.user.id,{text:SIGMA_MD_TEXT},{quoted:session})



					await delay(100);
					await Qr_Code_By_Maher_Zubair.ws.close();
					return await removeFile("temp/" + id);
				} else if (connection === "close" && lastDisconnect && lastDisconnect.error && lastDisconnect.error.output.statusCode != 401) {
					await delay(10000);
					SIGMA_MD_QR_CODE();
				}
			});
		} catch (err) {
			if (!res.headersSent) {
				await res.json({
					code: "Service Unavailable"
				});
			}
			console.log(err);
			await removeFile("temp/" + id);
		}
	}
	return await SIGMA_MD_QR_CODE()
});
module.exports = router
