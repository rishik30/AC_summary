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
var saveSavAc = (req, res) => {
    var savingsAc = new SavingsAC({debit: 100, credit: 200})
    savingsAc.save()
    .then((doc) => {
        console.log('doc', doc)
    })
    .catch((err) => {
        console.log('err', err)
    })
}

module.exports = {
    saveSavAc
}
