const express = require('express')
const app = express()
require('dotenv').config()
const cors = require('cors')
const port = process.env.PORT || 5000;

// middleware
app.use(express.json())
app.use(cors())

// jMWSwqtLmIeFcoKd
// twitterUser

// mongodb collection

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.VITE_user}:${process.env.VITE_pass}@cluster0.atafojn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();

    // db
    const twitterCollection= client.db('twitter').collection('twitterpost');

    // get data
    app.get('/user', async(req, res)=>{
        const result= await twitterCollection.find().toArray();
        res.send(result);
    })
    // post data
    app.post('/user', async(req, res)=>{
        const datas= req.body;
        const result= await twitterCollection.insertOne(datas);
        res.send(result);
    })

    // // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    // console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);




app.get('/', (req, res) =>
     res.send('Twitter server running.....')
)
app.listen(port, () => 
    console.log(`Example app listening on port ${port}!`)
)