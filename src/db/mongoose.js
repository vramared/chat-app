const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

// Connect to DB
mongoose.connect(process.env.DB_CONFIG, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}, () => {
    console.log("Connected to DB");
});