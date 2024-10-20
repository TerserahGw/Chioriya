const axios = require("axios");
const cheerio = require("cheerio");

const apiURL = "https://v3.igdownloader.app/api/ajaxSearch";

class Instagram {
    async request(url) {
        try {
            const { data } = await axios({
                url: apiURL,
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
                    "User-Agent": "Mozilla/5.0 (X11; Linux x86_64; rv:120.0) Gecko/20100101 Firefox/120.0",
                },
                data: new URLSearchParams({
                    recaptchaToken: "",
                    q: url,
                    t: "media",
                    lang: "en"
                }),
            });
            return data;
        } catch (err) {
            throw err;
        }
    }

    async post(url) {
        return this.processResponse(url, "post");
    }

    async reels(url) {
        return this.processResponse(url, "reels");
    }

    async story(url) {
        return this.processResponse(url, "story");
    }

    async processResponse(url, type) {
        try {
            const data = await this.request(url);
            if (data.status === "ok") {
                const $ = cheerio.load(data.data);
                const result = [];

                $("div.download-items")
                    .get()
                    .forEach((res) => {
                        const title = $(res).find("a").attr("title").trim().toLowerCase();
                        const itemUrl = $(res).find("a").attr("href");
                        if (title.includes("photo"))
                            result.push({
                                type: "image",
                                url: itemUrl,
                            });
                        else if (title.includes("video"))
                            result.push({
                                type: "video",
                                url: itemUrl,
                            });
                    });

                if (result.length > 0) {
                    return {
                        status: 200,
                        type: type,
                        result,
                    };
                } else {
                    return {
                        status: 404,
                        message: `${type.charAt(0).toUpperCase() + type.slice(1)} not found or account is private`,
                    };
                }
            } else {
                return {
                    status: 404,
                    message: `${type.charAt(0).toUpperCase() + type.slice(1)} not found or account is private`,
                };
            }
        } catch (err) {
            return {
                status: 500,
                message: "An error occurred",
                error: err.message,
            };
        }
    }
}

async function instagramKei(type, url) {
    const instagram = new Instagram();

    try {
        switch (type) {
            case "post":
                return await instagram.post(url);
            case "reels":
                return await instagram.reels(url);
            case "story":
                return await instagram.story(url);
            default:
                return {
                    status: 400,
                    message: "Invalid type specified",
                };
        }
    } catch (error) {
        return {
            status: 500,
            message: "An error occurred",
            error: error.message,
        };
    }
}

module.exports = { instagramKei };
