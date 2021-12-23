'use strict';

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


