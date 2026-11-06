import { CheckoutManager } from './Managers/CheckoutManager';
import { ChargeManager } from './Managers/ChargeManager';
import { WebhookValidator } from './Utils/WebhookValidator';
export interface NelsiusOptions {
    apiKey: string;
    baseUrl?: string;
    timeout?: number;
}
export declare class NelsiusClient {
    private httpClient;
    checkout: CheckoutManager;
    charges: ChargeManager;
    webhooks: typeof WebhookValidator;
    constructor(options: NelsiusOptions);
}
