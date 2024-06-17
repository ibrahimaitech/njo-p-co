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
❒▭▬▭▬▭▬▭▬▭▬▭▬▬▭▬▭▬▬▬▭▬▭▬▬▭▬▭▬▭▬❒

| *𝖡𝖠𝖱𝖠𝖪𝖠_𝖬𝖣 |𝖢𝖮𝖭𝖭𝖤𝖢𝖳𝖤𝖣 𝖠 𝖲𝖨𝖬𝖯𝖫𝖤 𝖶𝖧𝖠𝖳𝖲𝖠𝖯𝖯 𝖡𝖮𝖳𝖬𝖠𝖣𝖤 𝖡𝖸  ||𝖡𝖠𝖱𝖠𝖪𝖠_𝖳𝖤𝖢𝖧*|

*𝖣𝖤𝖵𝖤𝖫𝖮𝖯𝖤𝖱𝖲*
| 𝖡𝖠𝖱𝖠𝖪𝖠 𝖡𝖤𝖦𝖠: https://wa.me/message/I6BCZA76PFIYH1
| 𝖨𝖡𝖱𝖠𝖧𝖨𝖬 𝖠𝖣𝖠𝖬𝖲: https://wa.me/message/74F2PC4JA4F3P1

*𝖮𝖶𝖭𝖤𝖱𝖲 𝖨𝖭𝖥𝖮*
| 𝖸𝖮𝖴𝖳𝖴𝖡𝖤: https://www.youtube.com/@ibrahimaitech
| 𝖠𝖯𝖯𝖳𝖤𝖭𝖹: https://wa.me/message/I6BCZA76PFIYH13

| 𝖶𝖠𝖢𝖧𝖠𝖭𝖭𝖤𝖫: https://whatsapp.com/channel/0029VaZuGSxEawdxZK9CzM0Y

| 𝖡𝖠𝖱𝖠𝖪𝖠_𝖬𝖣 |•••••| 𝖶𝖧𝖠𝖳𝖲𝖠𝖯𝖯_𝖡𝖮𝖳 |

| *𝖣𝖮𝖭'𝖳 𝖥𝖮𝖱𝖦𝖤𝖳 𝖳𝖮 𝖦𝖨𝖵𝖤 𝖠 𝖲𝖳𝖠𝖱 🌟 𝖳𝖮 𝖬𝖸 𝖱𝖤𝖯𝖮 𝖠𝖭𝖣 𝖥𝖮𝖱𝖪 𝖨𝖳* 

||❒▭▬▭▬▭▬▭▬▬▭▬▭▬▬▭▬▭▬▬▬▭▬▭▬▭▬▭▬▭▬❒`
					
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
