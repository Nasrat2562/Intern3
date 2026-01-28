const express = require('express');
const app = express();

// Handle BOTH routes:
// 1. /app/nasratj_355_gmail_com (for submission)
// 2. /nasratj_355_gmail_com (for testing)

function calculateLCM(x, y) {
    function isNatural(num) {
        if (!num) return false;
        const n = parseInt(num);
        return !isNaN(n) && n > 0;
    }
    
    if (!isNatural(x) || !isNatural(y)) {
        return 'NaN';
    }
    
    const a = parseInt(x);
    const b = parseInt(y);
    
    function gcd(a, b) {
        return b === 0 ? a : gcd(b, a % b);
    }
    
    const lcm = Math.abs(a * b) / gcd(a, b);
    return lcm.toString();
}

// Route 1: /app/nasratj_355_gmail_com (REQUIRED FOR SUBMISSION)
app.get('/app/nasratj355_gmail_com', (req, res) => {
    const { x, y } = req.query;
    const result = calculateLCM(x, y);
    res.setHeader('Content-Type', 'text/plain');
    res.send(result);
});

// Route 2: /nasratj_355_gmail_com (for backward compatibility)
app.get('/nasratj_355_gmail_com', (req, res) => {
    const { x, y } = req.query;
    const result = calculateLCM(x, y);
    res.setHeader('Content-Type', 'text/plain');
    res.send(result);
});

// Health check
app.get('/health', (req, res) => {
    res.send('OK');
});

// Root
app.get('/', (req, res) => {
    res.send(`
        <h2>LCM Calculator</h2>
        <p>Test URLs:</p>
        <ul>
            <li><a href="/app/nasratj_355_gmail_com?x=12&y=18">/app/nasratj_355_gmail_com?x=12&y=18</a></li>
            <li><a href="/nasratj_355_gmail_com?x=12&y=18">/nasratj_355_gmail_com?x=12&y=18</a></li>
            <li><a href="/app/nasratj_355_gmail_com?x=abc&y=5">/app/nasratj_355_gmail_com?x=abc&y=5</a></li>
        </ul>
    `);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Test: http://localhost:${PORT}/app/nasratj_355_gmail_com?x=12&y=18`);
});

