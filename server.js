// SIMPLE, NO EXPRESS, PURE NODE.JS
const http = require('http');
const url = require('url');

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const pathname = parsedUrl.pathname;
    const query = parsedUrl.query;
    
    // ONLY handle the exact required path
    if (pathname === '/app/nasratj355_gmail_com') {
        const x = query.x;
        const y = query.y;
        
        // Convert to numbers
        const a = Number(x);
        const b = Number(y);
        
        // Check if natural numbers (positive integers)
        const isNatural = (n) => {
            return Number.isInteger(n) && n > 0;
        };
        
        if (!isNatural(a) || !isNatural(b)) {
            res.writeHead(200, {
                'Content-Type': 'text/plain',
                'Cache-Control': 'no-cache'
            });
            res.end('NaN');
            return;
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
        const lcm = Math.floor((a * b) / gcd(a, b));
        
        res.writeHead(200, {
            'Content-Type': 'text/plain',
            'Cache-Control': 'no-cache'
        });
        res.end(lcm.toString());
    } else {
        // For any other path, just say OK
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('OK');
    }
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
