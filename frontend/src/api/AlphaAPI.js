import axios from 'axios';
const baseURL = 'https://www.alphavantage.co/query';

const AlphaAPI = {

    searchEndpoint: async (keywords, apiKey) => {
        try {
            const response = await axios.get(baseURL, {
                params: {
                    function: 'SYMBOL_SEARCH',
                    keywords: keywords,
                    apikey: apiKey,
                    datatype: 'json'
                }
            });
            return response.data;
        } catch (error) {
            console.error('Error fetching symbol search:', error);
            throw error;
        }
    },


    GetIntraDayInfo: async () => {
        try {
            const response = await axios.get("https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=IBM&interval=5min&apikey=demo");
            console.log(response.data);
            return response.data;
        } catch (error) {
            console.error('Cannot retrieve current stock data', error);
        }
    },
};

export default AlphaAPI;
