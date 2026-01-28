const http = require('http');
const url = require('url');

http.createServer((req, res) => {
    const parsed = url.parse(req.url, true);
    
    if (parsed.pathname === '/app/nasratj355_gmail_com') {
        const x = parsed.query.x;
        const y = parsed.query.y;
        
        // Check if parameters exist
        if (x === undefined || y === undefined) {
            res.writeHead(200, {'Content-Type': 'text/plain'});
            return res.end('NaN');
        }
        
        // Convert to numbers
        const a = Number(x);
        const b = Number(y);
        
        // Natural number check
        const isNatural = (n) => Number.isInteger(n) && n > 0;
        
        if (!isNatural(a) || !isNatural(b)) {
            res.writeHead(200, {'Content-Type': 'text/plain'});
            return res.end('NaN');
        }
        
        // Calculate LCM
        const gcd = (m, n) => n === 0 ? m : gcd(n, m % n);
        const lcm = (a * b) / gcd(a, b);
        
        res.writeHead(200, {'Content-Type': 'text/plain'});
        return res.end(lcm.toString());
    }
    
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('OK');
}).listen(process.env.PORT || 3000);
