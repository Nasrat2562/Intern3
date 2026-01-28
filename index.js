const express = require('express');
const app = express();

// Remove ALL other middleware, just plain response
app.get('/app/nasratj355_gmail_com', (req, res) => {
    const x = req.query.x;
    const y = req.query.y;
    
    // Convert to numbers
    const a = Number(x);
    const b = Number(y);
    
    // Check: natural numbers only (positive integers)
    const isNatural = (n) => Number.isInteger(n) && n > 0;
    
    if (!isNatural(a) || !isNatural(b)) {
        // Send EXACTLY 'NaN' with NO spaces, NO line breaks
        res.setHeader('Content-Type', 'text/plain');
        return res.send('NaN');
    }
    
    // GCD function
    const gcd = (m, n) => n === 0 ? m : gcd(n, m % n);
    
    // Calculate LCM
    const result = (a * b) / gcd(a, b);
    
    // Send EXACTLY the number with NO spaces, NO line breaks
    res.setHeader('Content-Type', 'text/plain');
    res.send(result.toString());
});

// Root - minimal
app.get('/', (req, res) => {
    res.send('OK');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log('Server ready');
});
