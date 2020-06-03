/*----------------------------------------------------------
                //Modeling Disease table
------------------------------------------------------------*/
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const db = require('../database/mongodb').db;
const DiseaseSchema = new Schema({
    // attributes
    date: Date,
    time: Date,
    type: String,
    disease: String,
    docteur_id: String,
    user_id: String,
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

const DiseaseValidator = {
    validator: {
        $jsonSchema: {
            bsonType: 'object',
            required: ['date', 'time', 'type', 'disease'],
            properties: {
                date: {
                    bsonType: 'date'
                },
                time: {
                    bsonType: 'date'
                },
                type: {
                    bsonType: 'string'
                },
                disease: {
                    bsonType: 'string'
                },
                docteur_id: {
                    bsonType: 'string'
                },
                user_id: {
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
    DiseaseSchema,
    DiseaseValidator
}