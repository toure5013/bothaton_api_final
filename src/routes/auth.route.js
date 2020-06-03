'use strict'
//Modules import
const tokenGeneratorController = require('../../core/controllers/token.generator.controller');
const tokenVerification = require('../../core/middlewares/tokenVerificationMiddleware');
const signinController = require('../../core/controllers/auth.controller');
//Instance of token generator 
const tokenGeneratorInstance = new tokenGeneratorController();


//---------------------Routes
exports.auth = function(baseUrl, app) {
    //For login
    app.post(baseUrl + "/login", [
        //add permission
        tokenGeneratorInstance.loginVerification, //generate  a token if user auth successful
    ]);

    //For logout
    app.post(baseUrl + "/logout", [
        tokenVerification.checkToken, //add permission
        signinController.logout //logout
    ]);


}