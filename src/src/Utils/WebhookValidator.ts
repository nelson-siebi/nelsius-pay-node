import * as crypto from 'crypto';

export class WebhookValidator {
    /**
     * Vérifie la validité d'une signature de Webhook Nelsius
     * 
     * @param payload Le corps brut (raw body) de la requête JSON sous forme de chaîne
     * @param signature La signature reçue dans le header X-Nelsius-Signature
     * @param secretKey Votre clé secrète de Webhook
     * @returns boolean
     */
    static verifySignature(payload: string, signature: string, secretKey: string): boolean {
        if (!payload || !signature || !secretKey) {
            return false;
        }

        try {
            const expectedSignature = crypto
                .createHmac('sha256', secretKey)
                .update(payload)
                .digest('hex');

            // Protection contre les attaques temporelles (timing attacks)
            return crypto.timingSafeEqual(
                Buffer.from(expectedSignature),
                Buffer.from(signature)
            );
        } catch (error) {
            return false;
        }
    }
}
