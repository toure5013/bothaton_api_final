//Imports
const DiseaseController = require('../app/controllers/disease.controller')
const uploadPictureMiddleware = require('../app/middlewares/uploadPictureMiddleware');
const tokenVerification = require('../app/middlewares/tokenVerificationMiddleware');



//---------------------Routes
exports.diseases = function(baseUrl, app) {

    //Register
    app.post(baseUrl + "/disease", uploadPictureMiddleware.single('image'), [
        tokenVerification.checkToken, //add permission
        DiseaseController.addOneDisease
        //
    ]);

    //Get Disease all Diseases
    app.get(baseUrl + "/diseases/user/:user_id", [
        tokenVerification.checkToken, //add permission
        DiseaseController.getAllUserDisease
    ]);

    //Get one disease by id
    app.get(baseUrl + "/disease/id/:user_id/:disease_id", [
        tokenVerification.checkToken, //add permission
        DiseaseController.getUserOneDiseaseById
    ]);

    //Get one disease by id
    app.get(baseUrl + "/disease/name/:user_id/:disease", [
        tokenVerification.checkToken, //add permission
        DiseaseController.getUserOneDiseaseByName
    ]);

    //Get Disease all Diseases By Type
    app.post(baseUrl + "/diseases/user", [
        tokenVerification.checkToken, //add permission
        DiseaseController.getUserDiseaseByType
    ]);

    //Update user one Disease
    app.put(baseUrl + "/disease/user/:disease_id", uploadPictureMiddleware.single('image'), [
        tokenVerification.checkToken, //add permission
        DiseaseController.updateOneDisease
    ]);

    //Delete Disease one Disease
    app.delete(baseUrl + "/disease/user/:user_id/:disease_id", [
        tokenVerification.checkToken, //add permission
        DiseaseController.deleteOneDisease
    ]);


    ///////////////////--------------------OPTIONAL---------------/////////////////////
    //Get all Diseases
    // app.get(baseUrl + "/diseases", [
    //     tokenVerification.checkToken, //add permission
    //     DiseaseController.getAllUserDisease
    // ]);


}