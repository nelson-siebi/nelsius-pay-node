import axios, { AxiosInstance } from 'axios';
import { CheckoutManager } from './Managers/CheckoutManager';
import { ChargeManager } from './Managers/ChargeManager';
import { WebhookValidator } from './Utils/WebhookValidator';

export interface NelsiusOptions {
    apiKey: string;
    baseUrl?: string;
    timeout?: number;
}

export class NelsiusClient {
    private httpClient: AxiosInstance;
    
    public checkout: CheckoutManager;
    public charges: ChargeManager;
    public webhooks: typeof WebhookValidator;

    constructor(options: NelsiusOptions) {
        if (!options.apiKey) {
            throw new Error('NelsiusClient requires an apiKey.');
        }

        const baseUrl = options.baseUrl || 'https://api.nelsiuspay.com/api/v1';

        this.httpClient = axios.create({
            baseURL: baseUrl,
            timeout: options.timeout || 30000,
            headers: {
                // If the key starts with pk_, use X-Api-Key, otherwise Authorization: Bearer
                ...(options.apiKey.startsWith('pk_') 
                    ? { 'X-Api-Key': options.apiKey } 
                    : { 'Authorization': `Bearer ${options.apiKey}` }
                ),
                'Content-Type': 'application/json',
                'X-SDK-Name': 'Nelsius-NodeJS-V2',
                'X-SDK-Version': '2.0.0'
            }
        });

        this.checkout = new CheckoutManager(this.httpClient);
        this.charges = new ChargeManager(this.httpClient);
        this.webhooks = WebhookValidator;
    }
}
