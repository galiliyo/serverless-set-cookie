'use strict';
const dbjs = require('./db.js');

module.exports.getAllUsers = async (event) => {
    const db = await dbjs.get()
    const users = await db.collection('users')

    // if (!event.headers?.cookie?.user  ) {
    //     return {statusCode: 401, body: JSON.stringify('error : no user')};
    // }

    const allUsersArr = await users.find().toArray()
    return {statusCode: 200, body: JSON.stringify({users: allUsersArr})};
};


module.exports.login = async (event, context) => {
    console.log(`event:`, event)
    console.log(` context:`, context)

    const db = await dbjs.get()
    const users = await db.collection('users')


    users.findOne(Object.assign({}, {'id': event.query?.id}), (err, result) => {
        let user = {
            result: false
        };
        if (result !== null) {
            user.result = true;
            user = Object.assign({}, user, result);

            // res.cookie('user', result.name, {ttl: 1000 * 60 * 60 * 24 * 30, sameSite : 'none'});

            const headers = `access-control-expose-headers;Set-Cookie;cookies: "user" =${user.name}`
            return {statusCode: 200, headers, body: JSON.stringify(user)};


        } else {
            return {statusCode: 403, body: 'User not found. Please try again with correct ID.'};
        }
    });
}
