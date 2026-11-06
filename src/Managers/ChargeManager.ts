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
        status: string; // 'pending' | 'completed' | 'failed'
        created_at: string;
    };
}

export class ChargeManager {
    private http: AxiosInstance;

    constructor(http: AxiosInstance) {
        this.http = http;
    }

    /**
     * Déclenche un paiement direct USSD (Mobile Money).
     * @param payload Données du paiement
     */
    async create(payload: ChargePayload): Promise<ChargeResponse> {
        try {
            const response = await this.http.post<ChargeResponse>('/payments/charge', payload);
            return response.data;
        } catch (error: any) {
            throw this.handleError(error);
        }
    }

    /**
     * Vérifie le statut d'un paiement.
     * @param reference Identifiant unique ou code de transaction
     */
    async getStatus(reference: string): Promise<StatusResponse> {
        try {
            const response = await this.http.get<StatusResponse>(`/payments/${reference}`);
            return response.data;
        } catch (error: any) {
            throw this.handleError(error);
        }
    }

    private handleError(error: any): Error {
        if (error.response && error.response.data) {
            return new Error(`Nelsius API Error: ${JSON.stringify(error.response.data)}`);
        }
        return new Error(error.message);
    }
}
