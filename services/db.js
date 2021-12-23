"use strict";
const MongoClient = require('mongodb').MongoClient;
// const MONGODB_URI = process.env.MONGO_CONNECTION_STR;
const MONGODB_URI = "mongodb+srv://galiliyo:y46aq7HW53NAr3@cluster0.gbzfo.mongodb.net/ui_atlas_db?retryWrites=true&w=majority";
let dbInstance = null;

// module.exports.get = async function () {
//     if (dbInstance) {
//         return Promise.resolve(dbInstance);
//     }
//     const db = await MongoClient.connect(MONGODB_URI);
//     dbInstance = db.db("ui_db");
//     return dbInstance;
// }


module.exports.getCollection = async function (collectionName) {
    if (dbInstance) {
        dbInstance = Promise.resolve(dbInstance);
    } else {
        dbInstance = await MongoClient.connect(MONGODB_URI);
        dbInstance = dbInstance.db("ui_db");
    }


    return dbInstance.collection(collectionName);
}
