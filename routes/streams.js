const streamingAvailability = require('streaming-availability');
const dotenv = require('dotenv');

dotenv.config();

const client = new streamingAvailability.Client(new streamingAvailability.Configuration({
    apiKey: process.env.STREAM_AVA
}));

const getStreamingDetails = async (imdbId) => {
    try {
        const data = await client.showsApi.getShow({ id: imdbId });
        return data;
    } catch (error) {
        console.error('Error fetching streaming details:', error);
        return null;
    }
};

module.exports = { getStreamingDetails };
