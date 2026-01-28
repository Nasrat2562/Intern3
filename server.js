const http = require('http');
const url = require('url');

const server = http.createServer((req, res) => {
    const parsed = url.parse(req.url, true);
    const path = parsed.pathname;
    const { x, y } = parsed.query;
    
    // Set content type to plain text ALWAYS
    res.setHeader('Content-Type', 'text/plain');
    
    // Handle the exact email endpoint
    if (path === '/app/nasratj355_gmail_com') {
        // Check if both parameters exist
        if (x === undefined || y === undefined) {
            return res.end('NaN');
        }
        
        // Convert to numbers
        const a = Number(x);
        const b = Number(y);
        
        // Natural number check: positive integer
        const isNatural = (num) => {
            return Number.isInteger(num) && num > 0;
        };
        
        if (!isNatural(a) || !isNatural(b)) {
            return res.end('NaN');
        }
        
        // Calculate GCD
        const gcd = (m, n) => {
            while (n !== 0) {
                const temp = n;
                n = m % n;
                m = temp;
            }
            return m;
        };
        
        // Calculate LCM
        const lcm = (a * b) / gcd(a, b);
        
        // Return as string
        return res.end(lcm.toString());
    }
    
    // For all other paths
    res.end('Server running. Use /app/nasratj355_gmail_com?x=number&y=number');
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
