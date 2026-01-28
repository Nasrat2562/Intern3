const express = require('express');
const app = express();

// Helper function to check if a string represents a natural number
const isNaturalNumber = (str) => {
    if (typeof str !== 'string' && typeof str !== 'number') {
        return false;
    }
    
    // Convert to string for validation
    const s = String(str).trim();
    
    // Check if string is empty
    if (s.length === 0) {
        return false;
    }
    
    // Check for leading zeros (except single digit zero, but zero is not natural)
    if (s.length > 1 && s[0] === '0') {
        return false;
    }
    
    // Check if it's a valid integer
    if (!/^\d+$/.test(s)) {
        return false;
    }
    
    // Convert to number and check if positive
    const num = parseInt(s, 10);
    return Number.isInteger(num) && num > 0;
};

// Function to calculate GCD
const gcd = (a, b) => {
    while (b !== 0) {
        const temp = b;
        b = a % b;
        a = temp;
    }
    return a;
};

// Function to calculate LCM
const calculateLCM = (a, b) => {
    return Math.abs(a * b) / gcd(a, b);
};

// Main endpoint - exact path as required
app.get('/nasratj355_gmail_com', (req, res) => {
    // Set content type to plain text
    res.setHeader('Content-Type', 'text/plain');
    
    // Get query parameters
    const x = req.query.x;
    const y = req.query.y;
    
    // Check if parameters are provided
    if (x === undefined || y === undefined) {
        return res.send('NaN');
    }
    
    // Check if both are natural numbers
    if (!isNaturalNumber(x) || !isNaturalNumber(y)) {
        return res.send('NaN');
    }
    
    // Convert to numbers
    const numX = parseInt(x, 10);
    const numY = parseInt(y, 10);
    
    // Calculate LCM
    const result = calculateLCM(numX, numY);
    
    // Return result as string
    res.send(result.toString());
});

// Root endpoint for basic testing
app.get('/', (req, res) => {
    res.setHeader('Content-Type', 'text/plain');
    res.send('Server is running. Use /nasratj355_gmail_com?x=number&y=number');
});

// Health check endpoint (optional but recommended)
app.get('/health', (req, res) => {
    res.setHeader('Content-Type', 'text/plain');
    res.send('OK');
});

// Handle 404 errors
app.use((req, res) => {
    res.setHeader('Content-Type', 'text/plain');
    res.status(404).send('Not Found');
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.setHeader('Content-Type', 'text/plain');
    res.status(500).send('Internal Server Error');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Test URL: http://localhost:${PORT}/nasratj355_gmail_com?x=12&y=18`);
});
