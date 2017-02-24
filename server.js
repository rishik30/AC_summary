var express = require('express');
var bodyParser = require('body-parser');
const webpack = require('webpack')
var path = require('path');
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')

const config = require('./webpack.config.js')
require('./db/db-connect.js')
var savingsAc = require('./db/models/savingsAc.js').saveSavAc

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

app.get('/', (req, res) => {
    const indexFile = path.join(__dirname, 'dest/index.html');
    res.sendFile(indexFile);
});

app.get('/*', (req, res) => {
    const indexFile = path.join(__dirname, 'dest/index.html');
    res.sendFile(indexFile);
});

app.use('/', router)


app.listen(port, () => {
    console.log(`Listening on port ${port}...!`);
});
