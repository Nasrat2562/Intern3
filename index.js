const express = require('express');
const app = express();

function isNaturalNumber(num) {
    // Handle null/undefined/empty
    if (num === null || num === undefined || num === '') {
        return false;
    }
    
    // Convert to number
    const n = Number(num);
    
    // Check if it's an integer, positive, and finite
    return Number.isInteger(n) && n > 0 && Number.isFinite(n);
}

function calculateLCM(x, y) {
    // Edge case: missing parameters
    if (x === undefined || y === undefined) {
        return 'NaN';
    }
    
    // Edge case: check both are natural numbers
    if (!isNaturalNumber(x) || !isNaturalNumber(y)) {
        return 'NaN';
    }
    
    const a = parseInt(x, 10);
    const b = parseInt(y, 10);
    
    // Edge case: same numbers
    if (a === b) return a.toString();
    
    // Edge case: one is 1
    if (a === 1) return b.toString();
    if (b === 1) return a.toString();
    
    // Calculate GCD using Euclidean algorithm
    function gcd(a, b) {
        while (b !== 0) {
            const temp = b;
            b = a % b;
            a = temp;
        }
        return a;
    }
    
    // Calculate LCM with overflow prevention
    const gcdValue = gcd(a, b);
    const lcm = Math.floor(a / gcdValue) * b;
    
    return lcm.toString();
}

// Main endpoint
app.get('/app/nasratj355_gmail_com', (req, res) => {
    const { x, y } = req.query;
    
    const result = calculateLCM(x, y);
    
    // Set headers for plain text response
    res.setHeader('Content-Type', 'text/plain');
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    
    res.send(result);
});

// Wake-up endpoint
app.get('/wakeup', (req, res) => {
    res.setHeader('Content-Type', 'text/plain');
    res.send('Server is awake');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
