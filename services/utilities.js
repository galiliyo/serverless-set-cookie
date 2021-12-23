// module.exports.getHeaders = (event, additionalHeadersObj) => {
//     let headers;
//     const ALLOWED_ORIGINS = [
//         'http://localhost:3000',
//         'http://localhost:4201'
//     ];
//
//     const origin = event?.headers?.origin;
//     console.log(`origin:`, origin)
//
//     if (ALLOWED_ORIGINS.includes(origin)) {
//         headers = {
//             'Access-Control-Allow-Origin': origin,
//             'Access-Control-Allow-Credentials': true,
//         }
//     } else {
//         headers = {
//             'Access-Control-Allow-Origin': 'http://localhost:3000',
//             'Access-Control-Allow-Credentials': true,
//         }
//     }
//
//     if (additionalHeadersObj) {
//         headers = {...headers, ...additionalHeadersObj}
//     }
//     return headers
//
//
// }


module.exports.getHeaders = (event, additionalHeadersObj) => {
    let headers;

    const origin = event?.headers?.origin;
    console.log(`origin:`, origin)

    if (origin) {
        headers = {
            'Access-Control-Allow-Origin': origin,
            'Access-Control-Allow-Credentials': true,
        }
    } else {
        headers = {
            'Access-Control-Allow-Origin': 'http://localhost:3000',
            'Access-Control-Allow-Credentials': true,
        }
    }
    if (additionalHeadersObj) {
        headers = {...headers, ...additionalHeadersObj}
    }
    return headers
}
