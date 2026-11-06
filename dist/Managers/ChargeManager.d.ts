import { AxiosInstance } from 'axios';
export interface ChargePayload {
    amount: number;
    currency: string;
    phone: string;
    operator: string;
    reference?: string;
}
export interface ChargeResponse {
    status: string;
    message: string;
    data: {
        transaction_code: string;
        status: string;
        instructions?: string;
    };
}
export interface StatusResponse {
    status: string;
    data: {
        transaction_code: string;
        reference: string;
        amount: number;
        currency: string;
        status: string;
        created_at: string;
    };
}
export declare class ChargeManager {
    private http;
    constructor(http: AxiosInstance);
    /**
     * Déclenche un paiement direct USSD (Mobile Money).
     * @param payload Données du paiement
     */
    create(payload: ChargePayload): Promise<ChargeResponse>;
    /**
     * Vérifie le statut d'un paiement.
     * @param reference Identifiant unique ou code de transaction
     */
    getStatus(reference: string): Promise<StatusResponse>;
    private handleError;
}
