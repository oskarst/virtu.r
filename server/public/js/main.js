document.addEventListener("DOMContentLoaded", function () {

    var guid = chance.guid();

    var copyTextField = document.querySelector('#copyText');
    var imageContainer = document.querySelector('#imageContainer');
    var copyTextareaBtn = document.querySelector('#copyToClipboard');



    function getQueryVariable(variable)
    {
        var query = window.location.search.substring(1);
        var vars = query.split("&");
        for (var i=0;i<vars.length;i++) {
            var pair = vars[i].split("=");
            if(pair[0] == variable){return pair[1];}
        }
        return(false);
    }

    var insertImageFn = function (imagePath) {
        var imageUrlPath = 'http://get.evr.vision:9000/vrimage/' + imagePath;
        document.documentElement.style.backgroundImage = 'url(' + imageUrlPath + ')';
    };

    function readQuery(queryEmail, queryImage) {
        if (queryEmail && queryImage) {
            insertImageFn(queryImage);
            copyTextField.value = queryEmail;
        }
    }

    // init params from URL when opening site on device for the first time
    readQuery(
        getQueryVariable("qid"),
        getQueryVariable("image")
    );


    copyTextareaBtn.addEventListener('click', function(e) {
        e.preventDefault();

        copyTextField.select();

        try {
            var successful = document.execCommand('copy');
            var msg = successful ? 'successful' : 'unsuccessful';
            console.log('Copying text command was ' + msg);
        } catch (err) {
            console.log('Oops, unable to copy');
        }
    });


    var socket = io.connect( window.location.href );

    socket.emit('MESSAGE_FROM_CLIENT', copyTextField.value);

    socket.on('MESSAGE_TO_CLIENT', function (imagePath) {
        insertImageFn(imagePath);
    });


    var statusFn = function (eventName) {
        return function (e) {
            console.log(eventName);
        }
    };

    socket.on('connect_error', statusFn('connect_error'));
    socket.on('connect_timeout', statusFn('connect_timeout'));
    socket.on('reconnect', statusFn('reconnect'));
    socket.on('reconnect_attempt', statusFn('reconnect_attempt'));
    socket.on('reconnecting', statusFn('reconnecting'));
    socket.on('reconnect_error', statusFn('reconnect_error'));
    socket.on('reconnect_failed', statusFn('reconnect_failed'));
    socket.on('ping', statusFn('ping'));
    socket.on('pong', statusFn('pong'));

});