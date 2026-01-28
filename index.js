const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

/**
 * Check if a value is a natural number (1, 2, 3, ...)
 */
function isNaturalNumber(value) {
  return (
    typeof value === "string" &&
    value.length > 0 &&
    /^[0-9]+$/.test(value) &&
    BigInt(value) > 0n
  );
}

/**
 * Compute GCD using Euclidean algorithm (BigInt-safe)
 */
function gcd(a, b) {
  while (b !== 0n) {
    [a, b] = [b, a % b];
  }
  return a;
}

/**
 * Replace with your underscored email
 * Example: md.smith2@m-srv.com → md_smith2_m_srv_com
 */
app.get("/nasratj355_gmail_com", (req, res) => {
  const { x, y } = req.query;

  if (!isNaturalNumber(x) || !isNaturalNumber(y)) {
    res.type("text/plain").send("NaN");
    return;
  }

  const a = BigInt(x);
  const b = BigInt(y);

  const lcm = (a * b) / gcd(a, b);

  res.type("text/plain").send(lcm.toString());
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

