const MongoClient = require('mongodb').MongoClient;

var user = process.env.MONGO_USER;
var pw = process.env.MONGO_PW;
const uri = `mongodb+srv://${user}:${pw}@cluster0-kiltc.mongodb.net/test?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { 
    useNewUrlParser: true,
    useUnifiedTopology: true
});
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});

