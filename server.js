var _ = require("lodash");
var express = require('express');

var app = new express();
var port = 3000;

var compression = require('compression');
var express = require('express');
var app = express();
app.use(compression());

app.use('/static', express.static(__dirname+'/static'));

app.use(function(req, res){
    res.sendFile(__dirname + '/index.html');
});

app.listen(port, function(error) {
    if (error) {
        console.error(error);
    } else {
        console.info("Listening on port %s. Open up http://localhost:%s/ in your browser.", port, port);
    }
});
