const fs = require('fs');
const axios = require('axios');
const cheerio = require('cheerio');
const fetch = require('node-fetch');
const FormData = require('form-data');
const { fromBuffer } = require('file-type'); 


async function TelegraPh(buffer) {
    try {
        const { ext } = await fromBuffer(buffer);
        const form = new FormData();
        form.append("fileToUpload", buffer, { filename: "file." + ext });
        form.append("reqtype", "fileupload");

        const res = await fetch("https://catbox.moe/user/api.php", {
            method: "POST",
            body: form,
        });

        const data = await res.text();
        return data;
    } catch (e) {
        console.error('Error:', e.message);
        throw e;
    }
}

async function UguuSe(buffer) {
    return new Promise(async (resolve, reject) => {
        try {
            const form = new FormData();
            const input = Buffer.from(buffer);
            const { ext } = await fromBuffer(buffer);
            form.append('files[]', input, { filename: 'data.' + ext });
            const data = await axios.post('https://uguu.se/upload.php', form, {
                headers: {
                    ...form.getHeaders()
                },
                data: form
            });
            resolve(data.data.files[0]);
        } catch (e) {
            reject(e);
        }
    });
}

async function webp2mp4File(path) {
    return new Promise((resolve, reject) => {
        const form = new FormData();
        form.append('new-image-url', '');
        form.append('new-image', fs.createReadStream(path));
        axios({
            method: 'post',
            url: 'https://s6.ezgif.com/webp-to-mp4',
            data: form,
            headers: {
                'Content-Type': `multipart/form-data; boundary=${form._boundary}`
            }
        }).then(({ data }) => {
            const formThen = new FormData();
            const $ = cheerio.load(data);
            const file = $('input[name="file"]').attr('value');
            formThen.append('file', file);
            formThen.append('convert', "Convert WebP to MP4!");
            axios({
                method: 'post',
                url: 'https://ezgif.com/webp-to-mp4/' + file,
                data: formThen,
                headers: {
                    'Content-Type': `multipart/form-data; boundary=${formThen._boundary}`
                }
            }).then(({ data }) => {
                const $ = cheerio.load(data);
                const result = 'https:' + $('div#output > p.outfile > video > source').attr('src');
                resolve({
                    status: true,
                    message: "Created By MRHRTZ",
                    result: result
                });
            }).catch(reject);
        }).catch(reject);
    });
}

module.exports = { TelegraPh, UguuSe, webp2mp4File };
