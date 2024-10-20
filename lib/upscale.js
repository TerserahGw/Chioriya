const FormData = require('form-data');

async function processing(imageBuffer, method) {
    try {
        return new Promise((resolve, reject) => {
            let Methods = ["enhance", "recolor", "dehaze"];
            method = Methods.includes(method) ? method : Methods[0];

            let Form = new FormData();
            let scheme = "https://inferenceengine.vyro.ai/" + method;

            Form.append("model_version", 1, {
                "Content-Transfer-Encoding": "binary",
                contentType: "multipart/form-data; charset=utf-8",
            });
            Form.append("image", imageBuffer, {
                filename: "enhance_image_body.jpg",
                contentType: "image/jpeg",
            });

            Form.submit(
                {
                    url: scheme,
                    host: "inferenceengine.vyro.ai",
                    path: "/" + method,
                    protocol: "https:",
                    headers: {
                        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_3) AppleWebKit/537.75.14 (KHTML, like Gecko) Version/7.0.3 Safari/7046A194A",
                        Connection: "Keep-Alive",
                        "Accept-Encoding": "gzip",
                    },
                    rejectUnauthorized: false,
                },
                function (err, res) {
                    if (err) return reject(err);
                    let data = [];
                    res.on("data", function (chunk) {
                        data.push(chunk);
                    }).on("end", () => {
                        resolve(Buffer.concat(data));
                    }).on("error", (e) => {
                        reject(e);
                    });
                }
            );
        });
    } catch (e) {
        console.log(e);
    }
}

module.exports = processing;
