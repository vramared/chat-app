var express = require('express');
var app = express();

var cors = require('cors');

// Connect to MongoDB
require('./db/mongoose');

const auth = require('./routes/login');
const chat = require('./routes/chat')

var port = process.env.PORT || 3000;

app.use(cors());

app.use(express.json());
app.use(auth);
app.use(chat);

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, () => console.log(`Server listening on port: ${port}`));