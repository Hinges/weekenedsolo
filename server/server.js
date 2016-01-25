var express = require('express');
var bodyParser = require('body-parser');
var data = require('./routes/data.js');
var index = require('./routes/index.js');

var app = express();

app.use(bodyParser.json());

app.use(express.static('server/public'));
app.use('/api', data);
app.use('/', index);

var server = app.listen(3000, function(){
    var port = server.address().port;
    console.log('listening on port', port);
});