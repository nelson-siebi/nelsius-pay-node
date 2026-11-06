# Nelsius Pay SDK for Node.js & TypeScript (V2)

[![npm version](https://img.shields.io/npm/v/nelsius-pay.svg?style=flat-square)](https://www.npmjs.com/package/nelsius-pay)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](https://opensource.org/licenses/MIT)

Official Node.js and TypeScript client for the **Nelsius Pay Developer API V2**. Seamlessly accept Mobile Money (Orange Money, MTN MoMo), Cards, and International Payments across Africa.

---

## 📦 Installation

```bash
npm install nelsius-pay
# or
yarn add nelsius-pay
# or
pnpm add nelsius-pay
```

---

## 🚀 Quick Start

### 1. Initialize Client

```typescript
import { NelsiusClient } from 'nelsius-pay';

const nelsius = new NelsiusClient({
  publicKey: process.env.NELSIUS_PUBLIC_KEY!,
  secretKey: process.env.NELSIUS_SECRET_KEY!,
  // optional: sandbox: false (default false)
});
```

---

## 💳 Checkout Hosted Sessions

Create a secure checkout session and redirect your customer to the payment page:

```typescript
const session = await nelsius.checkout.createSession({
  amount: 5000,
  currency: 'XAF',
  description: 'Abonnement Mensuel Pro',
  customer_name: 'Jean Dupont',
  customer_email: 'jean.dupont@example.com',
  customer_phone: '+237699001122',
  default_country: 'CM', // Pre-select Cameroon (or CI, SN, etc.)
  allowed_countries: ['CM', 'CI', 'SN'],
  return_url: 'https://mon-site.com/paiement/success',
  cancel_url: 'https://mon-site.com/paiement/annule',
  metadata: {
    order_id: 'CMD-849302',
    user_id: 42
  }
});

console.log('Redirect your customer to:', session.payment_url);
console.log('Session ID:', session.session_id);
```

---

## ⚡ Direct Mobile Money Charge (DirectPay)

Trigger an instant USSD push on the customer's phone:

```typescript
const charge = await nelsius.charges.create({
  amount: 2500,
  currency: 'XAF',
  payment_method: 'orange_money', // 'orange_money' | 'mtn_momo' | 'card'
  phone_number: '699112233',
  country: 'CM',
  customer_name: 'Alain Fotso',
  customer_email: 'alain@example.com',
  reference: 'TX-948201',
  description: 'Achat de crédit 2500 XAF'
});

console.log('Charge Status:', charge.status); // 'pending' | 'completed'
console.log('Transaction Code:', charge.transaction_code);
```

### Check Charge Status

```typescript
const status = await nelsius.charges.getStatus('TX-948201');
console.log('Payment status:', status.status);
```

---

## 🔒 Webhook Verification

Verify and parse webhooks safely with HMAC-SHA256 signature checking:

```typescript
import express from 'express';
import { WebhookValidator } from 'nelsius-pay';

const app = express();

app.post('/webhook/nelsius', express.raw({ type: 'application/json' }), (req, res) => {
  const signature = req.headers['x-nelsius-signature'] as string;
  const secret = process.env.NELSIUS_WEBHOOK_SECRET!;

  const isValid = WebhookValidator.verify(req.body, signature, secret);

  if (!isValid) {
    return res.status(401).send('Invalid signature');
  }

  const event = JSON.parse(req.body.toString());

  switch (event.event) {
    case 'payment.success':
      console.log('Payment succeeded:', event.data.transaction_code);
      break;
    case 'payment.failed':
      console.log('Payment failed:', event.data.reason);
      break;
  }

  res.status(200).json({ received: true });
});
```

---

## 📄 License

MIT © [Nelsius](https://nelsiuspay.com)
