module.exports = function (app, server) {

    let clients = {};
    let io = require('socket.io')(server);

    app.post('/v1/vr', function(req, res) {
        let params = req.body;
        let client = clients[params.email];

        if(client) {
            client.socket.emit('MESSAGE_TO_CLIENT', params.image);

            res.send({
                code: 0,
                data: null
            });
        } else {
            let qrcode = require('qrcode-js');
            let url = 'http://get.evr.vision:9000/?qid=' + params.email + '&image=' + params.image;
            console.log('encoding URL' + url);
            let base64 = qrcode.toDataURL(url, 4);

            res.send({
                code: 1,
                data: base64
            })
        };
    });

    app.get('/v1/vr/:email/:image', function(req, res) {
        let client = clients[req.param('email')];


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



    io.on('connection', function (socket) {
        let emailKey;
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
}