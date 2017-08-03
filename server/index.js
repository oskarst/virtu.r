var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var server = require('http').Server(app);


app.use( bodyParser.json() );
app.use( bodyParser.urlencoded( {
    extended: true
} ));

var qrcode = require('qrcode-js');
var url = 'http://www.virtu.mobi:9000';
var base64 = qrcode.toDataURL(url, 4);


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
        res.send({
            code: 1,
            data: base64
        })
    };
});

app.use(express.static( __dirname + '/public'));

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/public/index.html');
});

io.on('connection', function (socket) {
    socket.on('MESSAGE_FROM_CLIENT', function (data) {
        //data = JSON.parse(data);
        clients[data] = {
            socket: socket,
            email: data,
            /*guid: data.guid,
            image: data.image*/
        };
    });
});

server.listen(9000);
