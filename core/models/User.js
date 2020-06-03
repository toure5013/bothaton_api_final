/*----------------------------------------------------------
                //Modeling user table
------------------------------------------------------------*/
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    // attributes
    firstname: String,
    lastname: String,
    ID: String,
    email: String,
    password: String,
    // role: {
    //     type: Sequelize.BOOLEAN,
    //     defaultValue: 0
    // },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});


const UserValidator = {
    validator: {
        jsonSchema: {
            bsonType: 'object',
            required: ['firstname', 'lastname', 'ID', 'email', 'password'],
            properties: {
                firstname: {
                    bsonType: 'string'
                },
                lastname: {
                    bsonType: 'string'
                },
                ID: {
                    bsonType: 'string'
                },
                email: {
                    bsonType: 'string'
                },
                updatedAt: {
                    bsonType: 'string'
                },
                createdAt: {
                    bsonType: 'string'
                },
                createdAt: {
                    bsonType: 'string'
                }
            }
        }
    }
}

module.exports = {
    UserSchema,
    UserValidator
}