const UUIDGenerator = require('uuid');

const GenerateUUID = () => {
    return UUIDGenerator.v4();
}

module.exports = GenerateUUID;