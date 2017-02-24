var mongoose = require('mongoose')

mongoose.promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/Accounts", (err) => {
    if(err) return console.log('Connection not established')
    console.log('Connection with mongo db established')
})

module.exports = mongoose;
