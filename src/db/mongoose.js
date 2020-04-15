const MongoClient = require('mongodb').MongoClient;
const dotenv = require('dotenv');

dotenv.config();

const uri = process.env.DB_CONFIG;

const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

client.connect(err => {
    const collection = client.db("test").collection("devices");
    // perform actions on the collection object
    client.close();
});
