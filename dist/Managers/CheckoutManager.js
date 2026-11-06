"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheckoutManager = void 0;
class CheckoutManager {
    constructor(http) {
        this.http = http;
    }
    /**
     * Crée une session de paiement hébergée.
     * @param payload Données de la commande
     */
    async createSession(payload) {
        try {
            const response = await this.http.post('/checkout/initiate', payload);
            return response.data;
        }
        catch (error) {
            throw this.handleError(error);
        }
    }
    handleError(error) {
        if (error.response && error.response.data) {
            return new Error(`Nelsius API Error: ${JSON.stringify(error.response.data)}`);
        }
        return new Error(error.message);
    }
}
exports.CheckoutManager = CheckoutManager;
