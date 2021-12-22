'use strict';


module.exports.pingGet = async event => {

    // const origin = event.headers.origin;
    let headers;

    console.log(`ping origin:`, event)
    const res = {'status': 'online'}
     headers = {
        'Access-Control-Allow-Origin': "http://localhost:3000",
        'Access-Control-Allow-Credentials': true,
    }


    return {statusCode: 200, headers, body: JSON.stringify(res)};
}


