const axios = require('axios');
const cheerio = require('cheerio');
const request = require('request');

async function ttp(text) {
    return new Promise((resolve, reject) => {
        const options = {
            method: "POST",
            url: `https://www.picturetopeople.org/p2p/text_effects_generator.p2p/transparent_text_effect`,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "User-Agent":
                    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.0.0 Safari/537.36",
                Cookie:
                    "_ga=GA1.2.1667267761.1655982457; _gid=GA1.2.77586860.1655982457; __gads=ID=c5a896288a559a38-224105aab0d30085:T=1655982456:RT=1655982456:S=ALNI_MbtHcmgQmVUZI-a2agP40JXqeRnyQ; __gpi=UID=000006149da5cba6:T=1655982456:RT=1655982456:S=ALNI_MY1RmQtva14GH-aAPr7-7vWpxWtmg; _gat_gtag_UA_6584688_1=1",
            },
            formData: {
                TextToRender: text,
                FontSize: "100",
                Margin: "30",
                LayoutStyle: "0",
                TextRotation: "0",
                TextColor: "ffffff",
                TextTransparency: "0",
                OutlineThickness: "3",
                OutlineColor: "000000",
                FontName: "Lekton",
                ResultType: "view",
            },
        };
        request(options, async function (error, response, body) {
            if (error) throw new Error(error);
            const $ = cheerio.load(body);
            const result =
                "https://www.picturetopeople.org" + $("#idResultFile").attr("value");
            resolve({
                status: 200,
                author: "By FongsiDev",
                result: result,
            });
        });
    });
}

async function qouted(text, username, avatar) {
    return new Promise((resolve, reject) => {
        const json = {
            type: "quote",
            format: "png",
            backgroundColor: "#FFFFFF",
            width: 512,
            height: 768,
            scale: 2,
            messages: [
                {
                    entities: [],
                    avatar: true,
                    from: {
                        id: 1,
                        name: username,
                        photo: {
                            url: avatar,
                        },
                    },
                    text: text,
                    replyMessage: {},
                },
            ],
        };
        axios
            .post("https://bot.lyo.su/quote/generate", json, {
                headers: { "Content-Type": "application/json" },
            })
            .then((res) => {
                try {
                    const result = Buffer.from(res.data.result.image, "base64");
                    resolve({
                        status: 200,
                        author: "By FongsiDev",
                        result: result,
                    });
                } catch (e) {
                    throw new Error(e);
                }
            })
            .catch((error) => {
                throw new Error(error);
            });
    });
}

module.exports = { ttp, qouted };
