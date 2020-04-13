var express = require('express');
var app = express();

var port = process.env['PORT'] || 3000;

app.get('/', function (req, res) {
  res.send('Hello World!');
});

console.log(process.env['PORT'] + "Is the port name");
app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));
