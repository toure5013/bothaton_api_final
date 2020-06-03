// Bcrypt to hash disease password
const path = require("path");
const bcrypt = require("bcrypt");

// Personal mod ules
const message = require("../../utils/config/messages").message;
const verifyData = require("../../utils/functions/verifyDiseaseData");

const logger = require("../middlewares/logMiddleware").logMiddleware;
const diseaseDbRequest = require("../database/query/Disease.query");

//Variables
const date = new Date();

//function generate id
var length = 10;
const saltRounds = 10;


/*---------------------------------------------------------------------------
                      // Add(Create) One Disease
---------------------------------------------------------------------------*/
exports.addOneDisease = async(req, res, next) => {
    const data = req.body;
    console.log(data);
    if (req.body) {
        if (data.date != "" && data.time != "" && data.type != "" && data.disease != "" && data.docteur_id != "" && data.disease_id != "") {
            // Disease info
            const date = data.date;
            const time = data.time
            const type = data.type;
            const disease = data.disease;
            const docteur_id = data.docteur_id;
            const user_id = data.user_id;

            // insert id disease table
            var returnDiseaseSave = diseaseDbRequest.insertDisease(date, time, type, disease, docteur_id, user_id);

            if (returnDiseaseSave) {
                if (returnDiseaseSave.success == true) {
                    res.status(200).json({
                        status: 200,
                        message: returnDiseaseSave.message,
                        date: date,
                    });
                } else {
                    //if err
                    res.status(500).json({
                        status: 500,
                        message: returnDiseaseSave.message,
                    });
                }
            } else {
                res.status(500).json({
                    status: 500,
                    message: returnDiseaseSave.message,
                });
            }

        } else {
            res.status(400).json({
                status: 400,
                message: "Send conform data",
            });
        }
    }


}; //end addOneDisease

/*---------------------------------------------------------------------------
                             // Get USER All disease
---------------------------------------------------------------------------*/

exports.getAllUserDisease = (req, res) => {
    //logger
    //Select All disease
    try {
        const user_id = req.params.user_id;
        console.log('user_id   ==== ' + user_id);
        diseaseDbRequest.findUserAllDisease(user_id)
            .then(
                //if all is ok
                diseases => {
                    logger.info("get All disease with success");
                    res.status(200).json({
                        success: true,
                        status: 200,
                        disease: diseases,
                    });
                }
            )
            .catch(e => {
                //if err
                res.status(500).json({
                    success: false,
                    status: 500,
                    message: "Error :" + e,
                });
            });
    } catch (error) {
        res.status(500).json({
            success: false,
            status: 500,
            message: "Error : send correct params",
        });
    }

};

/*---------------------------------------------------------------------------
                             // Get All disease BY TYPE
---------------------------------------------------------------------------*/

exports.getUserDiseaseByType = (req, res) => {
    // ---- url/ (post user_id, post type);
    //Select All disease
    try {
        const user_id = req.body.user_id;
        const type = req.body.type;
        console.log('user_id   ==== ' + user_id);
        diseaseDbRequest.findUserDiseaseByType(type, user_id)
            .then(
                //if all is ok
                diseases => {
                    logger.info("get All disease with success");
                    res.status(200).json({
                        success: true,
                        status: 200,
                        disease: diseases,
                    });
                }
            )
            .catch(e => {
                //if err
                res.status(500).json({
                    success: false,
                    status: 500,
                    message: "Error :" + e,
                });
            });
    } catch (error) {
        res.status(500).json({
            success: false,
            status: 500,
            message: "Error : send correct params",
        });
    }

};


/*---------------------------------------------------------------------------
                              // Update One Disease
---------------------------------------------------------------------------*/
exports.updateOneDisease = async(req, res, next) => {
    //The disease id
    const disease_id = req.params.disease_id;
    const data = req.body;
    console.log(data);
    if (req.body) {
        if (disease_id && data.date != "" && data.time != "" && data.type != "" && data.disease != "" && data.docteur_id != "" && data.disease_id != "") {
            // Disease info
            const date = data.date;
            const time = data.time
            const type = data.type;
            const disease = data.disease;
            const docteur_id = data.docteur_id;
            const disease_id = data.disease_id;

            // insert id disease table
            var returnDiseaseUpdate = diseaseDbRequest.updateDisease(disease_id, date, time, type, disease, docteur_id, disease_id);

            if (returnDiseaseUpdate) {
                if (returnDiseaseUpdate.success == true) {
                    res.status(200).json({
                        status: 200,
                        message: returnDiseaseUpdate.message,
                        date: date,
                    });
                } else {
                    //if err
                    res.status(500).json({
                        status: 500,
                        message: returnDiseaseUpdate.message,
                    });
                }
            } else {
                res.status(500).json({
                    status: 500,
                    message: returnDiseaseUpdate.message,
                });
            }

        } else {
            res.status(400).json({
                status: 400,
                message: "Send conform data",
            });
        }
    }

};

/*---------------------------------------------------------------------------
                            // Delete One Disease
---------------------------------------------------------------------------*/
exports.deleteOneDisease = (req, res) => {
    //We check if the disease exist if yes we delete else we return unexisting message
    try {

        var disease_id = req.params.disease_id;
        var user_id = req.params.user_id;

        diseaseDbRequest.findUserOneDiseaseById(user_id, disease_id)
            .then(
                //we are checking here if disease exist
                disease => {
                    diseaseDbRequest.destroyDisease(disease_id)
                        .then(disease => {
                            if (disease) {
                                res.status(404).json({
                                    success: false,
                                    status: 404,
                                    message: "id  = " + disease_id + " ... " + message.success,
                                });
                            } else {
                                //if he isn't exist
                                res.status(404).json({
                                    success: false,
                                    status: 404,
                                    message: "id  = " + disease_id + " ... " + message.error.disease_not_found,
                                });
                            }
                        })
                        .catch(e => {
                            //if err
                            res.status(500).json({
                                success: false,
                                status: 500,
                                message: "Error :" + e,
                            });
                        });
                }
            )
            .catch(e => {
                //if err
                res.status(500).json({
                    success: false,
                    status: 500,
                    message: "Error went wrong, retyr!",
                });
            });
    } catch (error) {
        res.status(500).json({
            success: false,
            status: 500,
            message: "Error, somethink break retry please!",
        });
    }

};



/*---------------------------------------------------------------------------
                            // Get One Disease By ID
---------------------------------------------------------------------------*/

exports.getUserOneDiseaseById = (req, res) => {
    const disease_id = req.params.disease_id;
    const user_id = req.params.user_id;
    console.log(disease_id + user_id);
    try {

        //logger
        logger.info("get disease " + disease_id);
        //Select the disease by id from database
        var getDiseaseByIdReturn = diseaseDbRequest.findUserOneDiseaseById(user_id, disease_id);

        if (getDiseaseByIdReturn.success == true) {
            res.status(200).json({
                success: true,
                status: 200,
                disease: getDiseaseByIdReturn.disease
            });
        } else {
            //if err
            logger.error("---------------WHEN  GET ONE USER ONE DISEASE BY ID  (1) ---------------");
            logger.error('error (1)' + getDiseaseByIdReturn.toString());
            getDiseaseByIdReturn.then((resul) => {
                console.log(resul);
            })
            console.info(getDiseaseByIdReturn)
            res.status(500).json({
                success: false,
                status: 500,
                message: getDiseaseByIdReturn.toString(),
            });
        }
    } catch (error) {
        logger.error("---------------WHEN  GET ONE USER ONE DISEASE BY ID (2)---------------");
        logger.error('error (2)' + error.toString());
        console.info(error);
        res.status(500).json({
            success: false,
            status: 500,
            message: "Error : something break retyr please",
        });
    }


};

/*---------------------------------------------------------------------------
                            // Get One Disease By NAME
---------------------------------------------------------------------------*/

exports.getUserOneDiseaseByName = (req, res) => {
    try {
        const user_id = req.params.user_id;
        const disease = req.params.disease;
        //logger
        logger.info("get disease " + disease);
        //Select the disease by id from database
        diseaseDbRequest
            .findUserOneDiseaseByName(user_id, disease)
            .then(
                //if all is ok
                disease => {
                    res.status(200).json({
                        success: true,
                        status: 200,
                        disease: {
                            id: disease.id,
                            email: disease.email,
                            UD: disease.ID,
                            firstname: disease.firstname,
                            lastname: disease.lastname,
                            role: disease.role
                        }
                    });
                }
            )
            .catch(e => {
                //if err
                logger.error("---------------WHEN  GET ONE USER ONE DISEASE BY ID ---------------");
                logger.error(e.stringify());
                res.status(500).json({
                    success: false,
                    status: 500,
                    message: "Error :" + e,
                });
            });
    } catch (error) {
        logger.error("---------------WHEN  GET ONE USER ONE DISEASE BY ID ---------------");
        logger.error(error.toString());
        res.status(500).json({
            success: false,
            status: 500,
            message: "Error : something break retyr please",
        });
    }


};