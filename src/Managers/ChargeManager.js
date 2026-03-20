class ChargeManager {
    constructor(client) {
        this.client = client;
    }

    /**
     * Create a new direct charge
     * @param {Object} data Charge details
     * @returns {Promise<Object>}
     */
    async create(data) {
        return this.client.request('POST', '/charges', data);
    }

    /**
     * Get charge details
     * @param {string} chargeId
     * @returns {Promise<Object>}
     */
    async retrieve(chargeId) {
        return this.client.request('GET', `/charges/${chargeId}`);
    }

    /**
     * List available payment methods
     * @returns {Promise<Object>}
     */
    async methods() {
        return this.client.request('GET', '/payment-methods');
    }
}

module.exports = ChargeManager;
