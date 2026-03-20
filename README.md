# Nelsius Node.js SDK

Official Node.js SDK for the [Nelsius Developer API](https://nelsius.com/docs).

## Installation

```bash
npm install @nelsius/nelsius-node
```

## Quick Start

```javascript
const Nelsius = require('@nelsius/nelsius-node');

const nelsius = new Nelsius('your_secret_key');

async function initiatePayment() {
    try {
        // 1. Create Hosted Checkout Session
        const checkout = await nelsius.checkout.createSession({
            amount: 5000,
            currency: 'XAF',
            reference: 'ORDER_12345',
            return_url: 'https://your-site.com/success',
            customer: {
                email: 'customer@example.com'
            }
        });

        console.log('Redirect user to:', checkout.data.checkout_url);

        // 2. Check Balance
        const balance = await nelsius.balance.get();
        console.log('Balance:', balance.data.balance, balance.data.currency);

    } catch (error) {
        console.error('Nelsius API Error:', error.data || error.message);
    }
}
```

## Features

- **Promise-based**: Built on top of `axios` for modern async/await usage.
- **Charges**: Direct payment processing.
- **Checkout**: Hosted payment pages.
- **Balance**: Merchant balance retrieval.

## License

MIT
