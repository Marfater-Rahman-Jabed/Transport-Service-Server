const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;


app.use(cors());
app.use(express.json());
//TravelUser
// sfE3R3MUw2pUzbJR



const uri = `mongodb+srv://${process.env.DB_User}:${process.env.DB_Password}@cluster0.4jznvny.mongodb.net/?retryWrites=true&w=majority`;
console.log(uri);
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        const UserCollection = client.db('TravelService').collection('Service');
        const ReviewCollection = client.db('TravelService').collection('Reviews');

        app.get('/services', async (req, res) => {
            const query = {};
            const cursor = UserCollection.find(query);
            const result = await cursor.toArray();
            res.send(result);

        });
        app.post('/service', async (req, res) => {
            const serviceItem = req.body;
            console.log(serviceItem);
            const result = await UserCollection.insertOne(serviceItem);
            res.send(result)
        })
        app.get('/service', async (req, res) => {
            const query = {};
            const cursor = UserCollection.find(query);
            const result = await cursor.limit(3).toArray();
            res.send(result);

        });
        app.get('/service/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await UserCollection.findOne(query);
            res.send(result);
        });
        app.get('/review', async (req, res) => {
            let query = {};

            console.log(req.query.email)
            if (req.query.email) {
                query = {
                    email: req.query.email
                }
            }
            const cursor = ReviewCollection.find(query);
            const result = await cursor.toArray();
            res.send(result);
        });
        app.post('/review', async (req, res) => {
            const review = req.body;
            const doc = review
            console.log(doc)
            const result = await ReviewCollection.insertOne(doc);
            res.send(result);
        });
        app.get('/review/:id', async (req, res) => {
            const id = req.params.id;
            const query = { serviceId: id };
            const cursor = ReviewCollection.find(query);
            const result = await cursor.toArray();
            res.send(result);
        });
        app.delete('/review/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await ReviewCollection.deleteOne(query);
            res.send(result);
        })

    }
    finally {

    }
}
run().catch(error => console.error(error));


app.get('/', (req, res) => {
    res.send('Travel server is running');
})

app.listen(port, () => {
    console.log(`Travel server is running on ${port}`)
})