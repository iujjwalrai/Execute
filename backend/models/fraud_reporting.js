const mongoose = require('mongoose');

const fraudReportingSchema = new mongoose.Schema({
    is_fraud: {
        type: Boolean,
        default: false
    },
    is_fraud_reported: {
        type: Boolean,
        default: false
    },
    transaction_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Transaction',
        required: true
    },
    fraud_details: {
        type: String,
        required: function() {
            return this.is_fraud === true;
        }
    },
    fraud_score : {
        type : Number,
    },
}, {
    timestamps: true
});

module.exports = mongoose.model('FraudReporting', fraudReportingSchema);
