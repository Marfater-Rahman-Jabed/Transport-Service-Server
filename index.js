const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;


app.use(cors());
app.use(express.json());
//TravelUser
// sfE3R3MUw2pUzbJR



const uri = `mongodb+srv://${process.env.DB_User}:${process.env.DB_Password}@cluster0.4jznvny.mongodb.net/?retryWrites=true&w=majority`;
console.log(uri);
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect(err => {
    const collection = client.db("test").collection("devices");
    // perform actions on the collection object
    client.close();
});


app.get('/', (req, res) => {
    res.send('Travel server is running');
})

app.listen(port, () => {
    console.log(`Travel server is running on ${port}`)
})