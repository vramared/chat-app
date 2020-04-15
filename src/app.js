var express = require('express');
var app = express();

// Connect to MongoDB
require('./db/mongoose');

const auth = require('./auth/login');

var port = process.env.PORT || 3000;

app.use(express.json());
app.use(auth);

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, () => console.log(`Server listening at http://localhost:${port}`));