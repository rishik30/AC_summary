var mongoose = require('mongoose')

var SavingsAC = mongoose.model('SavingsAC', {
    debit: {
        type: Number,
        default: null,
    },
    credit: {
        type: Number,
        default: null,
    },
    balance: {
        type: Number,
        default: null,
    }
})

var Data = mongoose.model('Data', {
    items: {
        // type: Object,
        isDebit: {
            type: Boolean,
            default: false
        },
        isCredit: {
            type: Boolean,
            default: false
        },
        NT: {
            type: Boolean,
            default: false
        },
        transactionAmount: {
            type: Number,
            default: 0,
        },
        transactionDesc: {
            type: String,
            default: null,
        },
        moneyAdded: {
            type: Number,
            default: 0,
            required: true
        },
        walletBalance: {
            type: Number,
            default: 0,
            required: true
        },
        accountBalance: {
            type: Number,
            default: 0,
            required: true
        },
        dailyExpense: {
            type: Array
        }
    },
    dateCreated: {
        type: Date,
        default: Date.now,
        required: true
    }
})

var saveSavAc = (req, res) => {
    var savingsAc = new SavingsAC(req.body)
    savingsAc.save()
    .then((doc) => {
        console.log('doc', doc)
        res.status(200).send(doc)
    })
    .catch((err) => {
        console.log('err', err)
    })
}

module.exports = {
    saveSavAc,
    Data
}
