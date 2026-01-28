// NO Express, NO dependencies, just pure Node.js
require('http').createServer((req, res) => {
    const { parse } = require('url');
    const { pathname, query } = parse(req.url, true);
    
    // Set plain text header FIRST
    res.setHeader('Content-Type', 'text/plain');
    
    // Only handle exact path
    if (pathname === '/app/nasratj355_gmail_com') {
        const x = query.x;
        const y = query.y;
        
        // Function to check natural number
        const isNatural = (str) => {
            if (str === undefined || str === null) return false;
            const num = Number(str);
            // Must be: a number, integer, positive
            return !isNaN(num) && Number.isInteger(num) && num > 0;
        };
        
        // Validate
        if (!isNatural(x) || !isNatural(y)) {
            return res.end('NaN');  // Exactly "NaN"
        }
        
        // Parse integers
        const a = parseInt(x, 10);
        const b = parseInt(y, 10);
        
        // Calculate GCD
        const gcd = (m, n) => n === 0 ? m : gcd(n, m % n);
        
        // Calculate LCM
        const lcm = Math.floor((a * b) / gcd(a, b));
        
        // Return digits only
        return res.end(lcm.toString());
    }
    
    // For any other path
    res.end('OK');
}).listen(process.env.PORT || 3000);
