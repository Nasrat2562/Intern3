const express = require('express');
const app = express();

// Root endpoint - simple health check
app.get('/', (req, res) => {
    res.send('LCM Calculator API is live. Use /app/nasratj355_gmail_com?x=num&y=num');
});

// The core task endpoint
app.get('/app/nasratj355_gmail_com', (req, res) => {
    const { x, y } = req.query;

    // Function to definitively check for a natural number
    const isNaturalNumber = (str) => {
        if (str === null || str === undefined || str === '') {
            return false;
        }
        const num = Number(str);
        // Must be a number, an integer, and greater than 0
        return !isNaN(num) && Number.isInteger(num) && num > 0;
    };

    // Validate inputs
    if (!isNaturalNumber(x) || !isNaturalNumber(y)) {
        // Return "NaN" as plain text
        res.setHeader('Content-Type', 'text/plain');
        return res.send('NaN');
    }

    // Convert to integers
    const a = parseInt(x, 10);
    const b = parseInt(y, 10);

    // Calculate GCD using Euclidean algorithm
    const gcd = (a, b) => (b === 0 ? a : gcd(b, a % b));

    // Calculate LCM
    const lcm = Math.abs(a * b) / gcd(a, b);

    // Return result as plain text string
    res.setHeader('Content-Type', 'text/plain');
    res.send(lcm.toString());
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running. Test endpoint: /app/nasratj355_gmail_com?x=12&y=18`);
});
