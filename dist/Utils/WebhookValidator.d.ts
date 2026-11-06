export declare class WebhookValidator {
    /**
     * Vérifie la validité d'une signature de Webhook Nelsius
     *
     * @param payload Le corps brut (raw body) de la requête JSON sous forme de chaîne
     * @param signature La signature reçue dans le header X-Nelsius-Signature
     * @param secretKey Votre clé secrète de Webhook
     * @returns boolean
     */
    static verifySignature(payload: string, signature: string, secretKey: string): boolean;
}
