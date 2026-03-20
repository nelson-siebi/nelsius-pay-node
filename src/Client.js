const axios = require('axios');
const ChargeManager = require('./Managers/ChargeManager');
const CheckoutManager = require('./Managers/CheckoutManager');
const BalanceManager = require('./Managers/BalanceManager');

class Client {
    /**
     * Create a new Nelsius API Client
     * @param {string} apiKey Your API Secret Key
     * @param {Object} options Configuration options
     */
    constructor(apiKey, options = {}) {
        this.apiKey = apiKey;
        this.baseUrl = options.baseUrl || 'https://api.nelsius.com/api/v1';
        this.timeout = options.timeout || 30000;

        this.httpClient = axios.create({
            baseURL: this.baseUrl,
            timeout: this.timeout,
            headers: {
                'Authorization': `Bearer ${this.apiKey}`,
                'Content-Type': 'application/json',
                'X-SDK-Name': 'Nelsius-NodeJS',
                'X-SDK-Version': '1.0.0'
            }
        });

        // Initialize Managers
        this.charges = new ChargeManager(this);
        this.checkout = new CheckoutManager(this);
        this.balance = new BalanceManager(this);
    }

    /**
     * Make a request to the API
     * @param {string} method HTTP method
     * @param {string} endpoint API endpoint
     * @param {Object} data Request payload
     * @returns {Promise<Object>}
     */
    async request(method, endpoint, data = null) {
        try {
            const response = await this.httpClient({
                method: method,
                url: endpoint,
                data: data
            });
            return response.data;
        } catch (error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                throw {
                    status: error.response.status,
                    data: error.response.data
                };
            } else if (error.request) {
                // The request was made but no response was received
                throw new Error('No response received from Nelsius API');
            } else {
                // Something happened in setting up the request that triggered an Error
                throw new Error(error.message);
            }
        }
    }
}

module.exports = Client;
