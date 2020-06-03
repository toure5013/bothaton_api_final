const Disease = require('../mongodb').DiseaseModel;




// Create a new user
const insertDisease = async(date, time, type, disease, docteur_id, user_id) => {


    try {
        var message = {
            error: false,
            success: true,
            message: "Disease inserted success",
            status: 200
        }
        var newDisease = new Disease({
            date: date,
            time: time,
            type: type,
            disease: disease,
            docteur_id: docteur_id,
            user_id: user_id
        });

        await newDisease.save();
        console.log('Disease inserted ----- ' + newDisease.toString())
        return message;

    } catch (err) {
        console.log(err);
        return {
            error: true,
            success: false,
            message: "An error occur during insertion. Disease not inserted retry!",
            status: 200
        }
    }
}


//Find user all disease 
const findUserAllDisease = (user_id) => {
    return Disease.find({ user_id: user_id });
}

// Find one user with id
const findUserOneDiseaseById = async(user_id, disease_id) => {

    try {

        Disease.find({ user_id: user_id, id: disease_id }, (err, result) => {
            console.log(result);
            if (err) {
                return {
                    error: true,
                    success: false,
                    message: "An error occur during insertion. Disease not inserted retry!",
                    status: 200
                }
            } else {
                return {
                    error: false,
                    success: true,
                    message: "Disease getted with success",
                    disease: result,
                    status: 200
                }
            }
        });


    } catch (error) {
        return {
            error: true,
            success: false,
            message: "An error occur during insertion. Disease not inserted retry!",
            status: 200
        }
    }
}

// Find one user with name
const findUserOneDiseaseByName = async(user_id, disease) => {

    try {
        var diseaseRturn = await Disease.find({ user_id: user_id, disease: disease })
        return {
            error: false,
            success: true,
            message: "Disease getted with success",
            disease: diseaseRturn,
            status: 200
        }
    } catch (error) {
        return {
            error: true,
            success: false,
            message: "An error occur during insertion. Disease not inserted retry!",
            status: 200
        }
    }
}

// Find one user with type
const findUserDiseaseByType = (type, user_id) => {
    var message = {
        error: true,
        success: false,
        message: "An error occur during insertion. Disease not inserted retry!",
        disease: [],
        status: 200
    }
    const DiseaseFound = Disease.find({ type: type, user_id: user_id });
    if (DiseaseFound.length !== 0) {
        message = {
            error: false,
            success: true,
            message: "Disease found with success!",
            disease: DiseaseFound,
            status: 200
        }
    } else {
        return message = {
            error: true,
            success: false,
            message: "Disease found with success!",
            disease: DiseaseFound,
            status: 200
        };
    }

}

// Change everyone without a last name to "Doe"
const updateDisease = (id, date, time, type, disease, docteur_id, user_id) => {
    var message = {
        error: false,
        success: true,
        message: "Disease updated with success",
        status: 200
    }
    var updateDisease = Disease.findByIdAndUpdate(id, {
        date: date,
        time: time,
        type: type,
        disease: disease,
        docteur_id: docteur_id,
        user_id: user_id
    }, function(err, result) {

        if (err) {
            console.log(err);
            message = {
                error: true,
                success: false,
                message: "Disease not insertedn retry!",
                status: 200
            }
            return message;
        } else {
            return message;
        }

    });
}

// Delete everyone with his id
const destroyDisease = (id) => {
    return Disease.findByIdAndDelete(id);
}




//---------------OPTINOAL --------------
// Find one disease with id
const findOneDiseaseById = (disease_id) => {
    return Disease.find({ id: disease_id })
}


// Find all 
const findAllDisease = () => {
    return Disease.find({});
}




module.exports = {
    insertDisease,
    findUserDiseaseByType,
    findUserOneDiseaseById,
    findUserOneDiseaseByName,
    findUserAllDisease,
    updateDisease,
    destroyDisease,

    //optional
    findOneDiseaseById,
    findAllDisease,

}