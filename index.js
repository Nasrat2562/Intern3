const express = require('express');
const app = express();

// NO middleware, NO body parsing, just raw responses
app.get('/app/nasratj355_gmail_com', (req, res) => {
    const x = req.query.x;
    const y = req.query.y;
    
    // Convert to numbers
    const numX = Number(x);
    const numY = Number(y);
    
    // Check if they are natural numbers (positive integers)
    const isNatural = (n) => {
        // Check if it's actually a number
        if (typeof n !== 'number' || isNaN(n)) return false;
        // Check if integer and positive
        return Number.isInteger(n) && n > 0;
    };
    
    if (!isNatural(numX) || !isNatural(numY)) {
        // Return EXACTLY 'NaN' as plain text
        res.setHeader('Content-Type', 'text/plain');
        return res.send('NaN');
    }
    
    // Calculate GCD
    const gcd = (a, b) => {
        while (b !== 0) {
            const temp = b;
            b = a % b;
            a = temp;
        }
        return a;
    };
    
    // Calculate LCM
    const lcm = Math.abs(numX * numY) / gcd(numX, numY);
    
    // Return EXACTLY the number as plain text
    res.setHeader('Content-Type', 'text/plain');
    res.send(lcm.toString());
});

// Root endpoint - minimal
app.get('/', (req, res) => {
    res.send('Server is running. Use /app/nasratj355_gmail_com?x=number&y=number');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
