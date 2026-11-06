"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NelsiusClient = void 0;
const axios_1 = __importDefault(require("axios"));
const CheckoutManager_1 = require("./Managers/CheckoutManager");
const ChargeManager_1 = require("./Managers/ChargeManager");
const WebhookValidator_1 = require("./Utils/WebhookValidator");
class NelsiusClient {
    constructor(options) {
        if (!options.apiKey) {
            throw new Error('NelsiusClient requires an apiKey.');
        }
        const baseUrl = options.baseUrl || 'https://api.nelsiuspay.com/api/v1';
        this.httpClient = axios_1.default.create({
            baseURL: baseUrl,
            timeout: options.timeout || 30000,
            headers: {
                // If the key starts with pk_, use X-Api-Key, otherwise Authorization: Bearer
                ...(options.apiKey.startsWith('pk_')
                    ? { 'X-Api-Key': options.apiKey }
                    : { 'Authorization': `Bearer ${options.apiKey}` }),
                'Content-Type': 'application/json',
                'X-SDK-Name': 'Nelsius-NodeJS-V2',
                'X-SDK-Version': '2.0.0'
            }
        });
        this.checkout = new CheckoutManager_1.CheckoutManager(this.httpClient);
        this.charges = new ChargeManager_1.ChargeManager(this.httpClient);
        this.webhooks = WebhookValidator_1.WebhookValidator;
    }
}
exports.NelsiusClient = NelsiusClient;
