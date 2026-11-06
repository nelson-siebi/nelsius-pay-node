"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChargeManager = void 0;
class ChargeManager {
    constructor(http) {
        this.http = http;
    }
    /**
     * Déclenche un paiement direct USSD (Mobile Money).
     * @param payload Données du paiement
     */
    async create(payload) {
        try {
            const response = await this.http.post('/payments/charge', payload);
            return response.data;
        }
        catch (error) {
            throw this.handleError(error);
        }
    }
    /**
     * Vérifie le statut d'un paiement.
     * @param reference Identifiant unique ou code de transaction
     */
    async getStatus(reference) {
        try {
            const response = await this.http.get(`/payments/${reference}`);
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
exports.ChargeManager = ChargeManager;
