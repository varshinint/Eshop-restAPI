/*const expressJwt = require('express-jwt') // library that used normally to secure the apis in the server


// For creating tokens, we used a secret key which is a string.
// so when some client pass token from front end to back end, 
// we need to compare it with the secret
// so if the token is generated based on that secret, the client will have access to API
//if not , backend server will not allow access to APIs
function authJwt() {

    const secret = process.env.secret

    return expressJwt({
        secret,
        algorithms: ['HS256']
    })
}

module.exports = authJwt*/