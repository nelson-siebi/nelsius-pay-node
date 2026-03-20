class BalanceManager {
    constructor(client) {
        this.client = client;
    }

    /**
     * Get the merchant balance
     * @returns {Promise<Object>}
     */
    async get() {
        return this.client.request('GET', '/balance');
    }
}

module.exports = BalanceManager;
