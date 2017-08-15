module.exports = function (app) {

    let coreTitle = "virtu.mobi";

    app.get('/', function (req, res) {
        res.render('index', {
            metaTitle: coreTitle
        });
    });

    app.get('/vr', function (req, res) {
        res.render('vr', {
            metaTitle: coreTitle
        });
    });

    app.get('/test', function (req, res) {
        res.render('test', {
            metaTitle: coreTitle,
            anotherVariable: 'Hello, World!'
        });
    });
}