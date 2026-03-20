class CheckoutManager {
    constructor(client) {
        this.client = client;
    }

    /**
     * Create a new hosted checkout session
     * @param {Object} data Checkout session details
     * @returns {Promise<Object>}
     */
    async createSession(data) {
        return this.client.request('POST', '/checkout/sessions', data);
    }
}

module.exports = CheckoutManager;
