const NelsiusClient = require('./src/Client');

async function main() {
    const client = new NelsiusClient({
        apiKey: 'YOUR_API_KEY_HERE',
        baseUrl: 'https://api.nelsius.com/api/v1', // Real API URL
        timeout: 30000
    });

    try {
        // 1. Get Payment Methods
        console.log('Fetching payment methods...');
        const methods = await client.charges.getPaymentMethods();
        console.log(methods);

        // 2. Get Balance
        console.log('\nFetching balance...');
        const balance = await client.balance.get();
        console.log(balance);

        // 3. Create Checkout Session
        console.log('\nCreating checkout session...');
        const session = await client.checkout.createSession({
            amount: 1000,
            currency: 'XOF',
            description: 'Test Payment',
            success_url: 'https://example.com/success',
            cancel_url: 'https://example.com/cancel',
            customer_email: 'customer@example.com'
        });
        console.log(session);

    } catch (error) {
        console.error('Error:', error.message);
        if (error.response) {
            console.error('Data:', error.response.data);
        }
    }
}

main();
