const axios = require('axios');

class Spotify {
    constructor() {
        this.baseURL = {
            api: "https://api.spotifydown.com",
            base: "https://spotifydown.com"
        };
    }

    urlToID(url) {
        return url.split("/")[4].split("?")[0];
    }

    getDetails(url) {
        return new Promise(async (resolve, reject) => {
            if (url.includes("open.spotify.com")) {
                let id = this.urlToID(url);

                try {
                    const { data } = await axios({
                        url: `${this.baseURL.api}/metadata/track/${id}`,
                        method: "GET",
                        headers: {
                            Origin: this.baseURL.base,
                            Referer: this.baseURL.base + '/'
                        }
                    });
                    resolve({
                        title: data.title,
                        artist: data.artists,
                        thumbnail: data.cover,
                        date: data.releaseDate
                    });
                } catch (error) {
                    reject(error);
                }
            } else {
                reject("Invalid URL");
            }
        });
    }

    download(url) {
        return new Promise(async (resolve, reject) => {
            if (url.includes("open.spotify.com")) {
                let id = this.urlToID(url);

                try {
                    const { data } = await axios({
                        url: `${this.baseURL.api}/download/${id}`,
                        method: "GET",
                        headers: {
                            Origin: this.baseURL.base,
                            Referer: this.baseURL.base + '/'
                        }
                    });
                    resolve(data.link);
                } catch (error) {
                    reject(error);
                }
            } else {
                reject("Invalid URL");
            }
        });
    }
}

module.exports = Spotify;
