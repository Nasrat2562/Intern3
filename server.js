const http = require('http');
const url = require('url');

// Helper function: Check if natural number
const isNaturalNumber = (str) => {
    if (str === null || str === undefined || str === '') {
        return false;
    }
    
    // Remove whitespace
    const trimmed = String(str).trim();
    if (trimmed === '') return false;
    
    // Check if it's a valid number
    const num = Number(trimmed);
    if (isNaN(num)) return false;
    
    // Check if integer
    if (!Number.isInteger(num)) return false;
    
    // Check if positive
    if (num <= 0) return false;
    
    // Check if not too large (optional safety)
    if (!Number.isSafeInteger(num)) return false;
    
    return true;
};

// Helper function: Calculate GCD
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

// Helper function: Calculate LCM
const lcm = (a, b) => {
    return Math.abs(a * b) / gcd(a, b);
};

// Create server
const server = http.createServer((req, res) => {
    const parsed = url.parse(req.url, true);
    const pathname = parsed.pathname;
    const query = parsed.query;
    
    // Set CORS headers (just in case)
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    
    // Handle only the exact required endpoint
    if (pathname === '/app/nasratj355_gmail_com') {
        const x = query.x;
        const y = query.y;
        
        // Validate both parameters exist
        if (x === undefined || y === undefined) {
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end('NaN');
            return;
        }
        
        // Validate both are natural numbers
        if (!isNaturalNumber(x) || !isNaturalNumber(y)) {
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end('NaN');
            return;
        }
        
        // Parse to integers
        const a = parseInt(x, 10);
        const b = parseInt(y, 10);
        
        // Calculate LCM
        const result = lcm(a, b);
        
        // Send response
        res.writeHead(200, { 
            'Content-Type': 'text/plain',
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Pragma': 'no-cache',
            'Expires': '0'
        });
        res.end(result.toString());
    }
    // Health check endpoint
    else if (pathname === '/health') {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('OK');
    }
    // Root endpoint
    else {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('LCM Calculator API is running. Use /app/nasratj355_gmail_com?x=num&y=num');
    }
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Test URL: http://localhost:${PORT}/app/nasratj355_gmail_com?x=12&y=18`);
});
