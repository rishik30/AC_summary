const mongoose = require('mongoose')
const Schema = mongoose.Schema
const validator = require('validator')
const jwt = require('jsonwebtoken')

var UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        minlength: 1,
        validate: {
            validator: validator.isEmail,
            message: `{VALUE} is not a valid email`
        }
    },
    password: {type: String, required: true, minlength: 6},
    tokens: [{
        access: {type: String, required: true},
        token: {type: String, required: true}
    }]
})

// To exclude a field from the json object to be saved to DataBase
UserSchema.methods.toJSON = function() {
    var obj = this.toObject()
    delete obj.tokens
    delete obj.password
    return obj
}

UserSchema.methods.generateAuthToken = function() {
    var user = this
    var access = 'auth'
    var token = jwt.sign({_id: user._id, access}, 'rishi!3003').toString()

    user.tokens.push({access, token})

    return user.save().then(()=>{return token})
}

UserSchema.statics.findByToken = function(token) {
    var User = this
    var decoded = jwt.verify(token, 'rishi!3003')

    if(decoded) {
        return User.findOne({_id: decoded._id, 'tokens.token': token, 'tokens.access': 'auth'})
    }
    else {
        return new Promise((resolve, reject) => {
            reject()
        })
        // OR we can use Promise.reject('Any Value')
    }

}

var User = mongoose.model('User', UserSchema)

module.exports = {User}
