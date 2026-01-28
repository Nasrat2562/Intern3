const express = require('express');
const app = express();

// প্রাকৃতিক সংখ্যা চেক করার ফাংশন
function isNaturalNumber(num) {
    if (num === null || num === undefined) return false;
    const n = Number(num);
    return Number.isInteger(n) && n > 0;
}

// GCD (গরিষ্ঠ সাধারণ গুণনীয়ক) গণনা
function gcd(a, b) {
    return b === 0 ? a : gcd(b, a % b);
}

// LCM (লঘিষ্ঠ সাধারণ গুণিতক) গণনা
function lcm(a, b) {
    return Math.abs(a * b) / gcd(a, b);
}

// মেইন এন্ডপয়েন্ট
app.get('/:email_path', (req, res) => {
    const { x, y } = req.query;
    
    // ভ্যালিডেশন
    if (!isNaturalNumber(x) || !isNaturalNumber(y)) {
        return res.type('text/plain').send('NaN');
    }
    
    // LCM ক্যালকুলেশন
    const xNum = parseInt(x, 10);
    const yNum = parseInt(y, 10);
    const result = lcm(xNum, yNum);
    
    // রেসপন্স
    res.type('text/plain').send(result.toString());
});

// সার্ভার ওয়েক আপ এর জন্য হেলথ চেক
app.get('/health', (req, res) => {
    res.send('Server is awake!');
});

// রুট এন্ডপয়েন্ট
app.get('/', (req, res) => {
    res.send(`
        <h1>LCM Calculator API</h1>
        <p>Use: /your_email_path?x=number&y=number</p>
        <p>Example: /john_doe_gmail_com?x=12&y=18</p>
    `);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});