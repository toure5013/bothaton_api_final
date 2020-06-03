/*-------------------------------------------------------
                        Modules
-------------------------------------------------------*/
const userRoute = require('./user.route');
const authRoute = require('./auth.route');
const diseaseRoute = require('./disease.route');




/*-------------------------------------------------------
                        Routes
-------------------------------------------------------*/
exports.configRoutes = (baseUrl, app) => {
    userRoute.users(baseUrl, app);
    authRoute.auth(baseUrl, app);
    diseaseRoute.diseases(baseUrl, app);
}