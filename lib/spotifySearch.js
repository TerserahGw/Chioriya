const axios = require('axios');
const base64 = require('base-64');

// Spotify API credentials
const clientId = '2f553d83ef6a4f81919e63aef44cb76c';
const clientSecret = '4772d99a736c45ec9676a0af5931b704';
const refreshToken = 'AQChm6ZoPcH76qeC_e90CLLjVcY8LVm4wbOEFaQoq11gzIVdRzdxUKQGgqI_iqd9MfExrKpOiv4b51rd-bMSC3Jq--cZd3gdJzIjeNZr_QzeX8miWoFv4v6O6zCxJJlYEXA';

const TOKEN_ENDPOINT = 'https://accounts.spotify.com/api/token';
const SEARCH_ENDPOINT = 'https://api.spotify.com/v1/search';

const getAccessToken = async () => {
    const basic = base64.encode(`${clientId}:${clientSecret}`);

    try {
        const response = await axios.post(TOKEN_ENDPOINT, new URLSearchParams({
            grant_type: 'refresh_token',
            refresh_token: refreshToken,
        }), {
            headers: {
                Authorization: `Basic ${basic}`,
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });

        return response.data.access_token;
    } catch (error) {
        console.error('Error fetching access token:', error.response ? error.response.data : error.message);
    }
};

const searchSpotify = async (accessToken, query) => {
    try {
        const response = await axios.get(SEARCH_ENDPOINT, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
            params: {
                q: query,
                type: 'track',
                limit: 10,
            },
        });

        return response.data.tracks.items;
    } catch (error) {
        console.error('Error searching Spotify:', error.response ? error.response.data : error.message);
    }
};

const formatSearchResults = (tracks) => {
    return tracks.map(track => ({
        name: track.name,
        artist: track.artists.map(artist => artist.name).join(', '),
        album: track.album.name,
        thumb: track.album.images.length > 0 ? track.album.images[0].url : '',
        url: track.external_urls.spotify,
    }));
};

module.exports = { getAccessToken, searchSpotify, formatSearchResults };
