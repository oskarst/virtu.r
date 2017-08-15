var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var server = require('http').Server(app);
var cors = require('cors');

const port = process.env.PORT || 9000;

// params config
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.options('*', cors());

// config pug
app.set('view engine','pug');
app.set('views', `${__dirname}/public/templates`);

// routes
require('./routes')(app);

// sockets & requests
require('./sockets')(app, server);


app.use(express.static(__dirname + '/public'));

app.listen(port, function() {
    console.log(`Listening on  ${port} | In folder  ${__dirname} /public`);
});
