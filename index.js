const express = require('express');
const app = express();

// Root route - shows server is running
app.get('/', (req, res) => {
    res.send(`
        <h1>LCM Calculator API</h1>
        <p>Server is running</p>
        <p>Use: /app/nasratj355_gmail_com?x=number&y=number</p>
        <p>Test:</p>
        <ul>
            <li><a href="/app/nasratj355_gmail_com?x=12&y=18">Valid Example</a></li>
            <li><a href="/app/nasratj355_gmail_com?x=abc&y=5">Invalid Example</a></li>
        </ul>
    `);
});

// Main LCM endpoint
app.get('/app/nasratj355_gmail_com', (req, res) => {
    const { x, y } = req.query;
    
    // Check if natural number
    function isNatural(num) {
        if (num === null || num === undefined || num === '') {
            return false;
        }
        const n = Number(num);
        return Number.isInteger(n) && n > 0;
    }
    
    // Validate inputs
    if (!isNatural(x) || !isNatural(y)) {
        res.setHeader('Content-Type', 'text/plain');
        return res.send('NaN');
    }
    
    // Calculate LCM
    const a = parseInt(x, 10);
    const b = parseInt(y, 10);
    
    function gcd(a, b) {
        return b === 0 ? a : gcd(b, a % b);
    }
    
    const lcm = Math.abs(a * b) / gcd(a, b);
    
    // Return plain text
    res.setHeader('Content-Type', 'text/plain');
    res.send(lcm.toString());
});

// Health check endpoint
app.get('/health', (req, res) => {
    res.setHeader('Content-Type', 'text/plain');
    res.send('OK');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Root URL: http://localhost:${PORT}`);
    console.log(`API URL: http://localhost:${PORT}/app/nasratj355_gmail_com?x=12&y=18`);
});
