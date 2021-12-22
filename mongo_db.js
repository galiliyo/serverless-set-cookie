const { MongoClient } = require("mongodb");
// Replace the following with values for your environment.
const username = encodeURIComponent("galiliyo");
const password = encodeURIComponent("y46aq7HW53NAr3");
const clusterUrl = "cluster0.gbzfo.mongodb.net/ui_atlas_db";

const uri =
    `mongodb+srv://${username}:${password}@${clusterUrl}?retryWrites=true&w=majority`;
// Create a new MongoClient
const client = new MongoClient(uri);
// Function to connect to the server
async function run() {
    try {
        // Connect the client to the server
        await client.connect();
        // Establish and verify connection
        await client.db("ui_db").command({ ping: 1 });
        console.log("Connected successfully to server");
    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
}
run().catch(console.dir);
