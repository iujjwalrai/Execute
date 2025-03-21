exports.checkFraud = async (req, res)=> {

    const {transaction_id,ip, country, amount, failed_attempts} = req.body;
    let isFraud = false;
    let fraudReason = "No fraud detected";
    let fraudScore = 0.0;
  
    // Example Rules
    if (amount > 100000) {
      isFraud = true;
      fraudReason = "High transaction amount";
      fraudScore += 0.8;
    }
  
    if (ip === "192.168.1.1") {
      isFraud = true;
      fraudReason = "Suspicious IP address";
      fraudScore += 0.6;
    }
    if (country && country.toLowerCase() === "pakistan") {
      isFraud = true;
      fraudReason = "Transaction from blacklisted country: Pakistan";
      fraudScore += 0.9;
    }
  
    if (failed_attempts >= 3) {
      isFraud = true;
      fraudReason = "Multiple failed attempts";
      fraudScore += 0.7;
    }
  
    // Normalize fraud score between 0 and 1
    fraudScore = Math.min(fraudScore, 1.0);
  
    // Return result with transaction ID
    return res.status(200).json({
      transaction_id: transaction_id,
      is_fraud: isFraud,
      fraud_reason: fraudReason,
      fraud_score: fraudScore,
    });
}