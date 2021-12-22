// module.exports.getHeaders = (event, additionalHeadersObj) => {
//     let headers;
//     const ALLOWED_ORIGINS = [
//         'http://localhost:3000',
//         'http://localhost:4201'
//     ];
//
//     const origin = event?.headers?.origin;
//
//     if (ALLOWED_ORIGINS.includes(origin)) {
//         headers = {
//             'Access-Control-Allow-Origin': origin,
//             'Access-Control-Allow-Credentials': true,
//         }
//     } else {
//         headers = {
//             'Access-Control-Allow-Origin': 'localhost://3000',
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
