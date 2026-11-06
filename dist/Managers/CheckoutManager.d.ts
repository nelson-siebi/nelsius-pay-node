import { AxiosInstance } from 'axios';
export interface CheckoutSessionPayload {
    amount: number;
    currency?: string;
    reference?: string;
    customer_email?: string;
    customer_phone?: string;
    customer_name?: string;
    default_country?: string;
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
export declare class CheckoutManager {
    private http;
    constructor(http: AxiosInstance);
    /**
     * Crée une session de paiement hébergée.
     * @param payload Données de la commande
     */
    createSession(payload: CheckoutSessionPayload): Promise<CheckoutSessionResponse>;
    private handleError;
}
