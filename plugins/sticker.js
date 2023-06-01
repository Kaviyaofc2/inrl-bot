const { delay } = require("@adiwajshing/baileys");
const {inrl,getVar} = require("../lib/");
const fs = require("fs");
const path = require("path");

inrl(
  {
    pattern: "sticker",
    desc: "It cnvert image to sticker",
    sucReact: "🔁",
    category: ["all", "create"],
    type : 'converter',
    usage : "to convert short video or image to sticker fromate, ex:- sticker[repleyed_msg]"
  },
  async (message, client) => {
  let data = await getVar();
  let {STICKER_DATA} = data.data[0];
    if (!/image|video|webp/.test(message.client.mime)) return await message.send(
          "Reply to Supported media With Caption"
        );
    try {
     if (message.quoted) {
        let download = await message.quoted.download();
        client.sendFile(message.from, download, "", message, {
          asSticker: true,
          author: STICKER_DATA.split(';')[0],
          packname: STICKER_DATA.split(';')[1],
          categories: ["😄", "😊"],
        });
      } else if (/image|video|webp/.test(message.client.mime)) {
        let download = await client.downloadMediaMessage(message);
        client.sendFile(message.from, download, "", message, {
          asSticker: true,
          author: STICKER_DATA.split(';')[0],
          packname: STICKER_DATA.split(';')[1],
          categories: ["😄", "😊"],
        });
      } else {
        return await message.send(
          "Reply to Supported media With Caption"
        );
      }
    } catch (error) {
      return await message.send(
        error
      );
    }
  }
);
