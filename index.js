const express = require('express');
const app = express();

// Helper function to check if a string represents a natural number
const isNaturalNumber = (str) => {
    if (str === null || str === undefined) {
        return false;
    }
    
    // Convert to string
    const s = String(str).trim();
    
    // Empty string check
    if (s.length === 0) {
        return false;
    }
    
    // Check for leading zeros (except single digit, but zero is not natural)
    if (s.length > 1 && s[0] === '0') {
        return false;
    }
    
    // Check if it's a valid integer using regex
    if (!/^\d+$/.test(s)) {
        return false;
    }
    
    // Convert to number and check if positive
    const num = Number(s);
    return Number.isInteger(num) && num > 0;
};

// Function to calculate GCD using Euclidean algorithm
const gcd = (a, b) => {
    a = Math.abs(a);
    b = Math.abs(b);
    
    while (b !== 0) {
        const temp = b;
        b = a % b;
        a = temp;
    }
    return a;
};

// Function to calculate LCM
const calculateLCM = (a, b) => {
    if (a === 0 || b === 0) {
        return 0;
    }
    return Math.abs(a * b) / gcd(a, b);
};

// Main endpoint with /app/ in the path
app.get('/app/nasratj355_gmail_com', (req, res) => {
    // Set content type to plain text explicitly
    res.setHeader('Content-Type', 'text/plain');
    
    // Get query parameters
    const x = req.query.x;
    const y = req.query.y;
    
    // Check if parameters exist
    if (x === undefined || y === undefined) {
        return res.send('NaN');
    }
    
    // Check if both are natural numbers
    if (!isNaturalNumber(x) || !isNaturalNumber(y)) {
        return res.send('NaN');
    }
    
    // Convert to integers
    const numX = parseInt(x, 10);
    const numY = parseInt(y, 10);
    
    // Calculate LCM
    const result = calculateLCM(numX, numY);
    
    // Send result as string
    res.send(result.toString());
});

// Root endpoint for testing
app.get('/', (req, res) => {
    res.setHeader('Content-Type', 'text/plain');
    res.send('Server is running. Use /app/nasratj355_gmail_com?x=number&y=number');
});

// Health check endpoint (important for keeping server awake)
app.get('/health', (req, res) => {
    res.setHeader('Content-Type', 'text/plain');
    res.send('OK');
});

// Simple test endpoint
app.get('/test', (req, res) => {
    res.setHeader('Content-Type', 'text/plain');
    res.send('Test cases:\n' +
        '1. /app/nasratj355_gmail_com?x=12&y=18 -> 36\n' +
        '2. /app/nasratj355_gmail_com?x=0&y=5 -> NaN\n' +
        '3. /app/nasratj355_gmail_com?x=abc&y=5 -> NaN\n' +
        '4. /app/nasratj355_gmail_com?x=7&y=13 -> 91');
});

// Handle 404
app.use((req, res) => {
    res.setHeader('Content-Type', 'text/plain');
    res.status(404).send('Not Found');
});

// Error handling
app.use((err, req, res, next) => {
    console.error(err);
    res.setHeader('Content-Type', 'text/plain');
    res.status(500).send('Internal Server Error');
});

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || '0.0.0.0';

app.listen(PORT, HOST, () => {
    console.log(`Server running at http://${HOST}:${PORT}`);
    console.log(`Main endpoint: http://${HOST}:${PORT}/app/nasratj355_gmail_com?x=12&y=18`);
    console.log(`Test endpoint: http://${HOST}:${PORT}/test`);
    console.log(`Health check: http://${HOST}:${PORT}/health`);
});
