const axios = require('axios');

async function searchTikTokKei(query, limit = 5) {
    const apiUrl = `https://www.tiktok.com/api/search/general/full/?keyword=${encodeURIComponent(query)}`;
    console.log(apiUrl);

    try {
        const response = await axios.get(apiUrl, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
                'Referer': 'https://www.tiktok.com/',
                'Cookie': 'sessionid=925200358b16d737210884ea8e674391; sid_tt=925200358b16d737210884ea8e674391; ' +
                          'passport_csrf_token=24954595b32ba54c5de5fb699ddf407b; tt_csrf_token=KYudUfA0-Lwvn_DxYFj9alhG7PqU4Edvxqyw; ' +
                          'ttwid=1%7CqMUEuFOqk8N5uIZRVMYQ84S3h08I9yT-REf1pLlTlEY%7C1723208176%7C8eeca0b1daf55e17458c0a773765b20ef3933f0904d08c7f6f0b6742c1f5f3b0'
            }
        });
        console.log(response);

        if (response.data && response.data.data && Array.isArray(response.data.data)) {
            const results = response.data.data
                .filter(item => item && item.item) // Filter out empty objects
                .map(item => {
                    const videoItem = item.item;
                    const videoId = videoItem.id;
                    const authorId = videoItem.author.uniqueId;
                    const videoLink = `https://www.tiktok.com/@${authorId}/video/${videoId}`;
                    
                    return {
                        desc: videoItem.desc || '',
                        cover: videoItem.video.cover || '',
                        author: authorId || '',
                        thumb: videoItem.author.avatarThumb || '',
                        url: videoLink
                    };
                });

            return results.slice(0, limit);
        } else {
            console.log('No results found or data format is unexpected.');
            return [];
        }
    } catch (error) {
        console.error('Error fetching TikTok search results:', error.message);
        return [];
    }
}

async function tiktokDlKei(url) {
    return new Promise(async (resolve, reject) => {
        try {
            let data = [];
            
            function formatNumber(integer) {
                let numb = parseInt(integer);
                return Number(numb).toLocaleString().replace(/,/g, '.');
            }
            
            function formatDate(n, locale = 'en') {
                let d = new Date(n);
                return d.toLocaleDateString(locale, {
                    weekday: 'long',
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                    hour: 'numeric',
                    minute: 'numeric',
                    second: 'numeric'
                });
            }
            
            let domain = 'https://www.tikwm.com/api/';
            let response = await axios.post(domain, {}, {
                headers: {
                    'Accept': 'application/json, text/javascript, */*; q=0.01',
                    'Accept-Language': 'id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7',
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                    'Origin': 'https://www.tikwm.com',
                    'Referer': 'https://www.tikwm.com/',
                    'Sec-Ch-Ua': '"Not)A;Brand" ;v="24" , "Chromium" ;v="116"',
                    'Sec-Ch-Ua-Mobile': '?1',
                    'Sec-Ch-Ua-Platform': 'Android',
                    'Sec-Fetch-Dest': 'empty',
                    'Sec-Fetch-Mode': 'cors',
                    'Sec-Fetch-Site': 'same-origin',
                    'User-Agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Mobile Safari/537.36',
                    'X-Requested-With': 'XMLHttpRequest'
                },
                params: {
                    url: url,
                    count: 12,
                    cursor: 0,
                    web: 1,
                    hd: 1
                }
            });

            let res = response.data.data;
            
            if (!res) {
                throw new Error('No data returned from the TikTok API.');
            }
            
            if (res.size === undefined) {
                if (res.images) {
                    res.images.map(v => {
                        data.push({ type: 'photo', url: v });
                    });
                }
            } else {
                data.push({
                    type: 'wm',
                    url: 'https://www.tikwm.com' + res.wmplay,
                }, {
                    type: 'nowm',
                    url: 'https://www.tikwm.com' + res.play,
                }, {
                    type: 'nowm_hd',
                    url: 'https://www.tikwm.com' + res.hdplay
                }, {
                    type: 'music',
                    url: 'https://www.tikwm.com' + (res.music || res.music_info.play),
                });
            }

            let json = {
                status: true,
                title: res.title,
                taken_at: formatDate(res.create_time).replace('1970', ''),
                region: res.region,
                id: res.id,
                duration: res.duration + ' Seconds',
                cover: 'https://www.tikwm.com' + res.cover,
                data: data,
                author: {
                    id: res.author.id,
                    fullname: res.author.unique_id,
                    nickname: res.author.nickname,
                    avatar: 'https://www.tikwm.com' + res.author.avatar
                }
            };

            resolve(json);
        } catch (e) {
            reject(e);
        }
    });
}

async function tiktokSearchKei(query) {
    try {
        let domain = 'https://www.tikwm.com/api/feed/search';
        let response = await axios.post(domain, new URLSearchParams({
            keywords: query,
            count: 12,
            cursor: 0,
            web: 1,
            hd: 1
        }), {
            headers: {
                'Accept': 'application/json, text/javascript, */*; q=0.01',
                'Accept-Language': 'id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7',
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                'Origin': 'https://www.tikwm.com',
                'Referer': 'https://www.tikwm.com/',
                'Sec-Ch-Ua': '"Not)A;Brand" ;v="24" , "Chromium" ;v="116"',
                'Sec-Ch-Ua-Mobile': '?1',
                'Sec-Ch-Ua-Platform': 'Android',
                'Sec-Fetch-Dest': 'empty',
                'Sec-Fetch-Mode': 'cors',
                'Sec-Fetch-Site': 'same-origin',
                'User-Agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Mobile Safari/537.36',
                'X-Requested-With': 'XMLHttpRequest'
            }
        });

        let results = [];
        let videos = response.data.data.videos || [];

        videos.forEach(video => {
            if (Object.keys(video).length > 0) {
                results.push({
                    url: `https://www.tiktok.com/@${video.author.unique_id}/video/${video.video_id}`,
                    title: video.title,
                    author: video.author.nickname,
                    thumb: `https://www.tikwm.com${video.cover}`
                });
            }
        });

        return results;
    } catch (e) {
        throw new Error(e.message);
    }
}


module.exports = { tiktokDlKei, searchTikTokKei, tiktokSearchKei }