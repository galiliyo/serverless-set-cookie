'use strict';
const utilities = require('./services/utilities')
// const dbjs = require('./services/db.js');
////////////////////////////////////////////////////////////
const MongoClient = require('mongodb').MongoClient;
// const MONGODB_URI = process.env.MONGO_CONNECTION_STR;
const MONGODB_URI = "mongodb+srv://galiliyo:y46aq7HW53NAr3@cluster0.gbzfo.mongodb.net/ui_atlas_db?retryWrites=true&w=majority";
let dbInstance = null;
let db = null;

const getCollection = async function (collectionName) {
    if (db) {
        db = Promise.resolve(dbInstance);
    } else {
        db = await MongoClient.connect(MONGODB_URI);
        db = db.db("ui_db");
    }
    return db.collection(collectionName);
}
/////////////////////////////////////////////////////////////////


module.exports.ping = async event => {

    console.log(`ping origin:`, event)
    const res = {'status': 'online'}

    const headers = utilities.getHeaders(event)
    return {statusCode: 200, headers, body: JSON.stringify(res)};
}

module.exports.setCookie = async (event, context) => {

    context.callbackWaitsForEmptyEventLoop = false;
    const additionalHeaders = {
        "Access-Control-Expose-Headers": "Set-Cookie",
        "Access-Control-Allow-Headers": "Set-Cookie",
        "Content-Type": "text/html; charset=UTF-8",
        "Set-Cookie": "user=YonathanG; expires=Thu, 19 Apr 2022 20:41:27 GMT;  SameSite=None; Path=/; Secure",
    }

    const headers = utilities.getHeaders(event, additionalHeaders)
    console.log(`setCookie - headers:`, headers)

    return {statusCode: 200, headers, body: JSON.stringify(event)};


}

// module.exports.login = async (event, context) => {
//     context.callbackWaitsForEmptyEventLoop = false;
//     const users = await dbjs.getCollection('users')
//     console.log(`finding :`, event.pathParameters?.id)
//
//     users.findOne({'id': event.pathParameters?.id}, (err, result) => {
//         let user = {
//             result: false
//         };
//         if (result !== null) {
//             user.result = true;
//             user = {user: result};
//
//             // res.cookie('user', result.name, {ttl: 1000 * 60 * 60 * 24 * 30, sameSite : 'none'});
//
//             const headers = {
//
//                 "access-control-expose-headers": "Set-Cookie",
//                 "Access-Control-Allow-Origin": "http://localhost:3000", // Required for CORS support to work
//                 "Access-Control-Allow-Credentials": true, // Required for cookies, authorization headers with HTTPS
//                 "Access-Control-Allow-Headers": "Content-Type",
//                 "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
//                 "Set-Cookie": "user=YonathanG; expires=Thu, 19 Apr 2022 20:41:27 GMT;  SameSite=None; Secure",
//             }
//             return {statusCode: 200, headers, body: JSON.stringify(user)};
//
//
//         } else {
//             return {
//                 statusCode: 403,
//                 body: `User ${event.pathParameters?.id} not found. Please try again with correct ID.`
//             };
//         }
//     });
// }


module.exports.login = async (event, context) => {
    console.log(`event :`, event)
    const additionalHeaders = {
        "access-control-expose-headers": "Set-Cookie",
        "Set-Cookie": "user=YonathanG; expires=Thu, 19 Apr 2022 20:41:27 GMT;  SameSite=None; Secure",
    }

    const headers = utilities.getHeaders(event, additionalHeaders)
    console.log(`setCookie - headers:`, headers)

    return {statusCode: 200, headers, body: JSON.stringify(event)};


}


module.exports.isLoggedIn = async (event, context) => {
    ////////////////////////////////////////////////////////////
    const MongoClient = require('mongodb').MongoClient;
// const MONGODB_URI = process.env.MONGO_CONNECTION_STR;
    const MONGODB_URI = "mongodb+srv://galiliyo:y46aq7HW53NAr3@cluster0.gbzfo.mongodb.net/ui_atlas_db?retryWrites=true&w=majority";
    let dbInstance = null;
    let db = null;

    const getCollection = async function (collectionName) {
        if (db) {
            db = Promise.resolve(dbInstance);
        } else {
            db = await MongoClient.connect(MONGODB_URI);
            db = db.db("ui_db");
        }
        return db.collection(collectionName);
    }
/////////////////////////////////////////////////////////////////


    context.callbackWaitsForEmptyEventLoop = false;

    try {
        console.log(`isloggedin event:`, event)
        const users = await getCollection('users')
        const userFromCookie = event.headers?.cookie?.user // is the way??
        const headers = utilities.getHeaders(event)
        // if (!userFromCookie) {
        //     return {
        //         statusCode: 401, body: JSON.stringify({
        //             result: false
        //         })
        //     };
        // }

        const res = await users.findOne({'name': userFromCookie || 'HGil'}, (err, result) => {
            console.log(`result:`, result)
            return {statusCode: 200, body: JSON.stringify({...result, result: true})}
        })

        //
        // const res = await users.findOne({'name': userFromCookie || 'HGil'})
        // console.log(`isLoggedIn response:`, headers, JSON.stringify({...res, result: true}))
        // return {statusCode: 200, headers, body: JSON.stringify({result: true})}
    } catch
        (err) {
        console.log(`isLoggedIn error :`, err)
        return {statusCode: 500, body: err.message}
    }
}
