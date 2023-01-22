const axios = require('axios');
require('dotenv').config()

const url = process.env.USER_SERVICE_URL;

const getUserData = (username) => {
    const result = axios.get(`${url}/${username}`).then((response) => {
        return response.data;
    }).catch((error) => {
        return error.message;
    });
    return result;
}

module.exports = {
    getUserData
};