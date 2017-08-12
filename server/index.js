var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var server = require('http').Server(app);
var cors = require('cors');

app.use(cors());
app.use( bodyParser.json() );
app.use( bodyParser.urlencoded( {
    extended: true
} ));

app.options('*', cors());

var clients = {};

var io = require('socket.io')(server);

app.post('/v1/vr', function(req, res) {
    var params = req.body;
    var client = clients[params.email];

    if(client) {
       client.socket.emit('MESSAGE_TO_CLIENT', params.image);

         res.send({
            code: 0,
            data: null
        });
    } else {

        var qrcode = require('qrcode-js');
        var url = 'http://local.virtu.test:9000/?qid=' + params.email + '&image=' + params.image;
        var base64 = qrcode.toDataURL(url, 4);

        res.send({
            code: 1,
            data: base64
        })
    };
});

app.get('/v1/vr/:email/:image', function(req, res) {
    var client = clients[req.param('email')];


    if(client) {
       client.socket.emit('MESSAGE_TO_CLIENT', req.param('image'));

         res.send({
            code: 0,
            data: null
        });
    } else {
        res.send({
            code: 1,
            data: base64
        })
    }
});

app.use(express.static( __dirname + '/public'));

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/public/index.html');
});

io.on('connection', function (socket) {
    var emailKey;
    socket.on('MESSAGE_FROM_CLIENT', function (data) {
        emailKey = data;
        clients[emailKey] = {
            socket: socket,
            email: emailKey
        };
    });

    socket.on('disconnect', (reason) => {
        if(emailKey) {
            delete clients[emailKey]; 
        }
    });
});

server.listen(9000);
