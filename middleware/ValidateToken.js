require("dotenv").config(); // 
const { default: axios } = require("axios");


const validateToken = (req, res, next) => {
    const authorizationHeader = req.headers['authorization'];
    if(!authorizationHeader) {
        res.status(401).json({
            message: 'You need a token to authorize the API call'
        })
    }
    const jwtToken = authorizationHeader.split(' ')[1];
    // console.log('Auth');

    axios.post(process.env.SERVER_AUTH_API_URL, {
        "token": jwtToken
    }).then((response) => {
        if (response.data.message == 'Token is valid') {
            next();
        }
        else {
            res.status(401).json({
                message: 'The token you have send is invalid'
            })
        }
    }).catch((err) => {
        res.status(401).json({
            message: 'The token you have send is invalid',
            error: err.message
        })
    })

};

module.exports = {
    validateToken
};