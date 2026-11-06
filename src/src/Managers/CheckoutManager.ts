import { AxiosInstance } from 'axios';

export interface CheckoutSessionPayload {
    amount: number;
    currency?: string;
    reference?: string;
    customer_email?: string;
    customer_phone?: string;
    customer_name?: string;
    default_country?: string; // e.g. 'CM', 'CI', 'SN' (default is 'CM')
    allowed_countries?: string[];
    description?: string;
    return_url?: string;
    cancel_url?: string;
    fee_bearer?: 'merchant' | 'customer' | 'split';
    payment_methods?: string[] | string;
    metadata?: Record<string, any>;
}

export interface CheckoutSessionResponse {
    status: string;
    message: string;
    data: {
        checkout_url: string;
        transaction_code: string;
        reference: string;
        amount: number;
        currency: string;
    };
}

export class CheckoutManager {
    private http: AxiosInstance;

    constructor(http: AxiosInstance) {
        this.http = http;
    }

    /**
     * Crée une session de paiement hébergée.
     * @param payload Données de la commande
     */
    async createSession(payload: CheckoutSessionPayload): Promise<CheckoutSessionResponse> {
        try {
            const response = await this.http.post<CheckoutSessionResponse>('/checkout/initiate', payload);
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
