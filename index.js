const express = require('express');
const app = express();

// CORRECT natural number validation
function isNaturalNumber(num) {
    // 1. Check if input exists
    if (num === null || num === undefined || num === '') {
        return false;
    }
    
    // 2. Convert to number
    const n = Number(num);
    
    // 3. Check if it's actually a number
    if (isNaN(n)) {
        return false;
    }
    
    // 4. Check if it's an integer AND positive
    // Natural numbers: 1, 2, 3, ... (NOT 0, NOT negative, NOT fractions)
    return Number.isInteger(n) && n > 0;
}

// LCM calculation
function calculateLCM(x, y) {
    // Check both parameters exist
    if (x === undefined || y === undefined) {
        return 'NaN';
    }
    
    // Validate both are natural numbers
    if (!isNaturalNumber(x) || !isNaturalNumber(y)) {
        return 'NaN';
    }
    
    const a = parseInt(x, 10);
    const b = parseInt(y, 10);
    
    // GCD function (Euclidean algorithm)
    function gcd(a, b) {
        if (b === 0) return a;
        return gcd(b, a % b);
    }
    
    // Calculate LCM safely
    const lcm = Math.abs(a * b) / gcd(a, b);
    
    // Return as string
    return lcm.toString();
}

// Main endpoint for submission
app.get('/app/nasratj355_gmail_com', (req, res) => {
    const { x, y } = req.query;
    const result = calculateLCM(x, y);
    
    // MUST return plain text
    res.setHeader('Content-Type', 'text/plain');
    res.send(result);
});

// Root route
app.get('/', (req, res) => {
    res.send(`
        <h1>LCM Calculator - CORRECT VERSION</h1>
        <p>Handles negatives, zeros, decimals, invalid inputs correctly</p>
        <p>Test:</p>
        <ul>
            <li><a href="/app/nasratj355_gmail_com?x=12&y=18">Valid: 12, 18 → 36</a></li>
            <li><a href="/app/nasratj355_gmail_com?x=-5&y=10">Negative: -5, 10 → NaN</a></li>
            <li><a href="/app/nasratj355_gmail_com?x=0&y=7">Zero: 0, 7 → NaN</a></li>
            <li><a href="/app/nasratj355_gmail_com?x=5.5&y=10">Decimal: 5.5, 10 → NaN</a></li>
            <li><a href="/app/nasratj355_gmail_com?x=abc&y=5">Non-number: abc, 5 → NaN</a></li>
        </ul>
    `);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log('Server running on port', PORT);
    console.log('Test URL: /app/nasratj355_gmail_com?x=12&y=18');
});
