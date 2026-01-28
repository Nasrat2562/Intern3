const express = require('express');
const app = express();

// Root
app.get('/', (req, res) => {
    res.send('LCM Calculator API is running');
});

// LCM endpoint
app.get('/app/nasratj355_gmail_com', (req, res) => {
    const x = parseInt(req.query.x);
    const y = parseInt(req.query.y);
    
    // Check if positive integers
    if (!x || !y || x < 1 || y < 1 || !Number.isInteger(x) || !Number.isInteger(y)) {
        res.type('text').send('NaN');
        return;
    }
    
    // GCD function
    const gcd = (a, b) => b === 0 ? a : gcd(b, a % b);
    
    // Calculate LCM
    const result = (x * y) / gcd(x, y);
    
    res.type('text').send(result.toString());
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
