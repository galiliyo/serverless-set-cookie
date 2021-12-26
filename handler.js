'use strict';

const mockUser = {
    "%job": "100%",
    bonusSteps: ["70", "80", "100"],
    collect: "1",
    department: "Imp",
    email: "YonathanG@ui.co.il",
    employee_num: "180",
    free_lancer: "0",
    id: "028695468",
    level: "33 Programmer",
    level_code: "33",
    local_level: "3",
    lunch_hours: "5",
    name: "YonathanG",
    name2: "יונתן גלילי",
    result: true,
    sendmail: "0",
    _id: "61b5cebcf604f0304db1e309"
}


module.exports.setCookie = async (event, context) => {

    const origin = event?.headers?.origin;
    console.log(`origin:`, origin)

    context.callbackWaitsForEmptyEventLoop = false;
    const headers = {
        'Access-Control-Allow-Origin': origin,
        'Access-Control-Allow-Credentials': true,
        "Access-Control-Expose-Headers": "Set-Cookie",
        "Access-Control-Allow-Headers": "Set-Cookie",
        "Set-Cookie": "user=YonathanG; expires=Thu, 19 Apr 2022 20:41:27 GMT;  SameSite=None; Path=/; Secure",
    }

    console.log(`setCookie - headers:`, headers)
    return {
        statusCode: 200, headers, body: JSON.stringify({event, 'response-headers': headers})
    }
}
module.exports.ping = async (event, context) => {

    const origin = event?.headers?.origin;

    context.callbackWaitsForEmptyEventLoop = false;
    const headers = {
        'Access-Control-Allow-Origin': origin,
        'Access-Control-Allow-Credentials': true,
    }

    console.log(`setCookie - headers:`, headers)
    return {statusCode: 200, headers, body: `app was pinged from ${origin} `};
}

module.exports.login = async (event, context) => {
    console.log(`event :`, event)
    const origin = event?.headers?.origin;
    // const headers = utilities.getHeaders(event, additionalHeaders)
    const headers = {
        'Access-Control-Allow-Origin': origin,
        'Access-Control-Allow-Credentials': true,
    }

    return {statusCode: 200, headers, body: JSON.stringify(mockUser)};

}

module.exports.isLoggedIn = async (event, context) => {
    context.callbackWaitsForEmptyEventLoop = false;
    const origin = event?.headers?.origin;
    try {
        console.log(`isloggedin event:`, event)
        // const users = await dbjs.getCollection('users')
        // const userFromCookie = event.headers?.cookie?.user // is the way??
        // const headers = utilities.getHeaders(event)
        // if (!userFromCookie) {
        //     return {
        //         statusCode: 401, body: JSON.stringify({
        //             result: false
        //         })
        //     };
        // }
        const headers = {
            'Access-Control-Allow-Origin': origin,
            'Access-Control-Allow-Credentials': true,
        }
        // const res = await users.findOne({'name': userFromCookie || 'HGil'})
        // console.log(`isLoggedIn response:`, headers, JSON.stringify({...res, result: true}))
        return {statusCode: 200, headers, body: JSON.stringify({result: false})}

        // return {statusCode: 200, headers, body: JSON.stringify({...mockUser, result: true})}
    } catch (err) {
        console.log(`isLoggedIn error :`, err)
        return {statusCode: 500, body: err.message}
    }
}

