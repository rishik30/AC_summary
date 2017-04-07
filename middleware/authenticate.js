var User = require('../db/models/user.js').User

var authenticate = (req, res, next) => {
    var token = req.header('x-auth')

    User.findByToken(token)
    .then((user) => {
        if(!user) {
            console.log('USER NOT FOUND')
            res.status(401).send({success: false, msg: 'User not found!!'})
        }
        console.log('USER FOUND')
        // res.status(200).send({success: true, msg: 'User found!!', user: user})
        req.user = user
        req.token = token
        next()
    })
    .catch(e=>{
        res.status(401).send()
        next()
    })
}

module.exports = authenticate
