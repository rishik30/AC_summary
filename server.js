var express                 = require('express');
var bodyParser              = require('body-parser');
const webpack               = require('webpack')
var path                    = require('path');
const webpackDevMiddleware  = require('webpack-dev-middleware')
const webpackHotMiddleware  = require('webpack-hot-middleware')
const mongoose              = require('mongoose')
mongoose.Promise            = global.Promise
var moment                  = require('moment')
const bcrypt                = require('bcryptjs')

require('./db/db-connect.js')
const config                = require('./webpack.config.js')
var savingsAc               = require('./db/models/savingsAc.js').saveSavAc
var Data                    = require('./db/models/savingsAc.js').Data
var User                    = require('./db/models/user.js').User
var authenticate            = require('./middleware/authenticate.js')

const port = process.env.PORT || 3000;
var app = express();
const compiler = webpack(config)

var router = express.Router()

app.use(bodyParser.json());
app.use(express.static(path.resolve(__dirname, './dest')));
app.use(webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath,
    stats: {colors: true},
    noInfo: true
}));
app.use(webpackHotMiddleware(compiler, {
    log: console.log
}))

//Routes
app.post('/sac', savingsAc)

app.post('/saveData', (req, res) => {
    // var today = moment().startOf('day')
    console.log(req.body)
    var today = moment(req.body.today).startOf('day')
    var tomorrow = moment(today).add(1, 'days')

    var data = new Data({items: req.body.data, dateCreated: today})

    Data.findOneAndRemove({'dateCreated': {"$gte": today.toDate(), "$lt": tomorrow.toDate()}})
        .then(() => {
            data.save()
                .then((docu) => {
                    res.send(docu)
                })
        })
        .catch(e=>res.send(e))
})

app.get('/getData/:day', (req, res) => {
    // Data.find({items: {dateCreated: new Date(2017,02,27)}})
    console.log(req.params.day)
    var today = moment(req.params.day).startOf('day')
    var tomorrow = moment(today).add(1, 'days')
    Data.find({'dateCreated': {"$gte": today.toDate(), "$lt": tomorrow.toDate()}})
        .then((doc) => {
            if(!doc) res.send('NO DOC FOUND')
            else res.send(doc)
        })
        .catch(e=>res.send(e))
})

// GET /users/me
app.get('/users/me', authenticate, (req, res) => {
    res.send(req.user)
})

// GET /
app.get('/', (req, res) => {
    const indexFile = path.join(__dirname, 'dest/index.html');
    res.sendFile(indexFile);
});

// GET /*
app.get('/*', (req, res) => {
    const indexFile = path.join(__dirname, 'dest/index.html');
    res.sendFile(indexFile);
});

// POST /users
app.post('/users', (req, res) => {
    var user = new User(req.body)
    user.save()
        .then((obj) => {
            console.log('USER', obj)
            return user.generateAuthToken()
        })
        .then((token) => {
            res.status(200).header('x-auth', token).send(user)
        })
        .catch(e=>{
            console.log('ERROR', e)
            res.send(e)
        })
})

// POST /users/login
app.post('/users/login', (req, res) => {
    var user = new User(req.body)

    User.findOne({email: user.email})
        .then((doc) => {
            // if(!doc) return new Promise.reject('User not found!!')
            // if(!doc) return res.send('User not found!!')
            return bcrypt.compare(user.password, doc.password)
        })
        .then((response) => {
            if(response ===  true) {
                return user.generateAuthToken().then((token) => {
                    res.status(200).header('x-auth', token).send(user)
                })
            }
            else res.send('User not found!!')
        })
        .catch(e=>res.send(e))
})

app.use('/', router)


app.listen(port, () => {
    var fullDate = new Date();
    fullDate.setDate(2);
    console.log(moment(fullDate).toISOString())
    console.log(`Listening on port ${port}...!`);
    // console.log(moment(fullDate).format())
});
