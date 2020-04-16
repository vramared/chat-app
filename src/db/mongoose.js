const mongoose = require('mongoose');
if(process.env.NODE_ENV == "dev") {
    require('dotenv').config();
}

// Connect to DB
mongoose.connect(process.env.DB_CONFIG, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}, () => {
    console.log("Connected to DB");
});