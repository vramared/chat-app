var express = require('express');
var app = express();

require('./db/mongoose.js');

var port = process.env.PORT || 3000;

app.get('/', function(req, res) {
    res.send('Hello World!');
});

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));
