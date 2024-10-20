const axios = require('axios');

async function igDlKei(text) {
    console.log('Request text:', text);

    const config = {
        method: 'post',
        url: 'https://v3.igdownloader.app/api/ajaxSearch',
        headers: {
            'Accept': '*/*',
            'Accept-Encoding': 'gzip, deflate, br',
            'Accept-Language': 'id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7,es;q=0.6,zh-CN;q=0.5,zh;q=0.4',
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            'Origin': 'https://igdownloader.app',
            'Referer': 'https://igdownloader.app/',
            'Sec-Fetch-Dest': 'empty',
            'Sec-Fetch-Mode': 'cors',
            'Sec-Fetch-Site': 'same-site',
            'User-Agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Mobile'
        },
        data: new URLSearchParams({
            'q': text,
            't': 'media',
            'lang': 'en'
        }).toString()
    };

    try {
        const response = await axios(config);

        const dataHtml = response.data.data;

        // Pencarian thumbnail dan URL video
        const thumbMatch = dataHtml.match(/<img src="([^"]+)" alt="igdownloader">/);
        const urlMatch = dataHtml.match(/<a[^>]+href="([^"]+)"[^>]+class="abutton is-success/);

        const thumb = thumbMatch ? thumbMatch[1] : null;
        const videoUrl = urlMatch ? urlMatch[1] : null;

        const result = {
            status: 200,
            author: 'KeiLaSenpai',
            data: {
                thumb: thumb,
                url: videoUrl
            }
        };

        console.log('Result:', result);
        return result;

    } catch (error) {
        console.error('Error fetching data:', error.response?.data || error.message || error);
        return { status: 500, message: 'Internal Server Error' };
    }
}

async function sswebKei(url, device = 'desktop'){
     return new Promise((resolve, reject) => {
          const base = 'https://www.screenshotmachine.com'
          const param = {
            url: url,
            device: device,
            cacheLimit: 0,
            full: true
          }
          axios({url: base + '/capture.php',
               method: 'POST',
               data: new URLSearchParams(Object.entries(param)),
               headers: {
                    'content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
               }
          }).then((data) => {
               const cookies = data.headers['set-cookie']
               if (data.data.status == 'success') {
                    axios.get(base + '/' + data.data.link, {
                         headers: {
                              'cookie': cookies.join('')
                         },
                         responseType: 'arraybuffer'
                    }).then(({ data }) => {
                       const result = {
                            status: 200,
                            author: 'KeiLa',
                            result: data
                        }
                         resolve(result)
                    })
               } else {
                    reject({ status: 404, author: 'KeiLa', message: data.data })
               }
          }).catch(reject)
     })
}


module.exports = { igDlKei, sswebKei };
