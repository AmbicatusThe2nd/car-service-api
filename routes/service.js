const express = require('express');
const router = express.Router();
const CarServiceController = require('../controllers/CarServiceController');
const ValidateToken = require('../middleware/ValidateToken');

/**
 *  @api {get} /carService/reservedDates Request Car service dates
 *  @apiName ReservedDates
 *  @apiGroup ReservedDates
 *
 * @apiSuccessExample Success-Response:
 *      HTTP/1.1 200 OK
 *      {
 *     "status": 200,
 *     "error": null,
 *     "response": [
 *         {
 *             "id": 1,
 *             "dateOfService": "2022-12-01, 18:00",
 *             "typeOfService": "Redni",
 *             "car": {
 *                 "make": "Toyota",
 *                 "model": "Aygo",
 *                 "modelYear": "2015"
 *             },
 *             "customer": {
 *                 "id": 1,
 *                 "firstname": "Amadej",
 *                 "lastname": "Krepek"
 *             }
 *         }
 *     ]
 * }
 */
router.get('/reservedDates', ValidateToken.validateToken, CarServiceController.getReservedDatesFromDB);

// router.get('/reservedDates', async function (req, res) {
//     const results = reservedDates;
//     res.send(apiResponse(results));
// });

/**
 *  @api {get} /carService/reservedDates/:id Request specific Car service date
 *  @apiName ReservedDateId
 *  @apiGroup ReservedDates
 *
 *  @apiParam {Number} id Customers unique ID.
 *
 * @apiSuccessExample Success-Response:
 *      HTTP/1.1 200 OK
 *      {
 *     "status": 200,
 *     "error": null,
 *     "response":{
 *             "id": 1,
 *             "dateOfService": "2022-12-01, 18:00",
 *             "typeOfService": "Redni",
 *             "car": {
 *                 "make": "Toyota",
 *                 "model": "Aygo",
 *                 "modelYear": "2015"
 *             },
 *             "customer": {
 *                 "id": 1,
 *                 "firstname": "Amadej",
 *                 "lastname": "Krepek"
 *             }
 *         }
 * }
 */
router.get('/reservedDates/:id', ValidateToken.validateToken, CarServiceController.getReservedSpecDatesFromDB);

// router.get('/reservedDates/:id', (req, res) => {
//     // req.params.id;
//     const result = reservedDates.find(x => x.id === parseInt(req.params.id));
//     if(!result) {
//         res.sendStatus(404);
//         return;
//     }
//     console.log(result);
//     res.send(apiResponse(result));
// });

/**
 *  @api {get} /freedates/:id Request specific Car service date by id
 *  @apiName ReservedDateIdCustomer
 *  @apiGroup ReservedDates
 *
 *  @apiParam {Number} id Customers unique ID.
 *
 * @apiSuccessExample Success-Response:
 *      HTTP/1.1 200 OK
 *      {
 *          id: 1,
 *         dateOfService: "2022-12-15 10:00"
 *      }
 */
router.get('/freedates/:id', ValidateToken.validateToken, CarServiceController.getFreeSpecDateFromDB);

// router.get('/reservedDates/customer/:id', (req, res) => {
//     // req.params.id;
//     const result = reservedDates.find(x => x.customer.id === parseInt(req.params.id));
//     if(!result) {
//         res.sendStatus(404);
//     }
//     res.send(apiResponse(result));
// });

/**
 *  @api {get} /carService/reservedDates/car/:id Request specific Car service date by car name
 *  @apiName ReservedDateIdCar
 *  @apiGroup ReservedDates
 *
 *  @apiParam {Number} id Customers unique Car.
 *
 * @apiSuccessExample Success-Response:
 *      HTTP/1.1 200 OK
 *      {
 *     "status": 200,
 *     "error": null,
 *     "response":{
 *             "id": 1,
 *             "dateOfService": "2022-12-01, 18:00",
 *             "typeOfService": "Redni",
 *             "car": {
 *                 "make": "Toyota",
 *                 "model": "Aygo",
 *                 "modelYear": "2015"
 *             },
 *             "customer": {
 *                 "id": 1,
 *                 "firstname": "Amadej",
 *                 "lastname": "Krepek"
 *             }
 *         }
 * }
 */
router.get('/reservedDates/car/:id', (req, res) => {
    // req.params.id;
    const result = reservedDates.find(x => x.car.model === parseInt(req.params.id));
    if(!result) {
        res.sendStatus(404);
    }
    res.send(apiResponse(result));
});

/**
 * @api {post} /carService/reservedDates    Reserve a date
 * @apiName PostReservedDate
 * @apiGroup ReservedDates
 *
 * @apiBody {Number} id       Codification of the service.
 * @apiBody {String} dateOfService          Mandatory Date of service.
 * @apiBody {String} typeOfService     Type of service.
 *
 * @apiBody {Object} [car]         Object for car.
 * @apiBody {String} [car[make]]    Make of the car.
 * @apiBody {String} [car[model]]    Model of the car.
 *
 * @apiBody {Object} [customer]         Object for customer.
 * @apiBody {Number} [customer[id]]     Id of the customer.
 * @apiBody {String} [customer[firstname]]    First name of the customer.
 * @apiBody {String} [customer[lastname]]   Last name year of the customer.
 *
 */
router.post('/reservedDates', ValidateToken.validateToken, CarServiceController.postReservedDateToDB);

// router.post('/reservedDates', (req, res) => {
//     const data = bodyParser(req);
//     reservedDates.push(data);
//     res.send(apiResponse(data));
// });

/**
 * @api {put} /carService/reservedDates/:id     Update a date
 * @apiName PutReservedDate
 * @apiGroup ReservedDates
 *
 * @apiParam {Number} id          Reserved date unique ID.
 *
 * @apiBody {Number} id       Codification of the service.
 * @apiBody {String} dateOfService          Mandatory Date of service.
 * @apiBody {String} typeOfService     Type of service.
 *
 *
 * @apiBody {Object} [car]         Object for car.
 * @apiBody {String} [car[make]] Make of the car.
 * @apiBody {String} [car[model]]    Model of the car.
 *
 * @apiBody {Object} [customer]         Object for customer.
 * @apiBody {Number} [customer[id]] Id of the customer.
 * @apiBody {String} [customer[firstname]]    First name of the customer.
 * @apiBody {String} [customer[lastname]]   Last name year of the customer.
 *
 */
router.put('/reservedDates/:id', ValidateToken.validateToken, CarServiceController.putReservedDatesToDB);

// router.put('/reservedDates/:id', (req, res) => {
//     const itemIndex = reservedDates.indexOf(reservedDates.find(x => x.id === parseInt(req.params.id)));
//     if(itemIndex === -1) {
//         res.sendStatus(404);
//     }
//     const data = bodyParser(req);
//     reservedDates[itemIndex] = data;
//     res.sendStatus(200);
// });

/**
 * @api {delete} /carService/reservedDates/:id     Delete a date
 * @apiName DeleteReservedDate
 * @apiGroup ReservedDates
 * @apiParam {Number} id          Reserved date unique ID.
 */
router.delete('/reservedDates/:id', ValidateToken.validateToken, CarServiceController.deleteReservedDateInDB);

// router.delete('/reservedDates/:id', (req, res) => {
//     const itemIndex = reservedDates.indexOf(reservedDates.find(x => x.id === parseInt(req.params.id)));
//     if(itemIndex === -1) {
//         res.sendStatus(404);
//     }
//     reservedDates.splice(itemIndex, 1);
//     res.sendStatus(200);
// });

/**
 * @api {get} /carService/freeDates Request Car service dates
 * @apiName FreeDates
 * @apiGroup FreeDates
 * @apiSuccess {Number} id Identification of the free date
 * @apiSuccess {String} dateOfService Date of service of the free date
 *
 * @apiSuccessExample Success-Response:
 *      HTTP/1.1 200 OK
 *      {
 *          id: 1,
 *         dateOfService: "2022-12-15 10:00"
 *      }
 */
router.get('/freeDates', ValidateToken.validateToken, CarServiceController.getFreeDatesFromDB);

// router.get('/freeDates', (req, res) => {
//     const results = freeDates;
//     res.send(apiResponse(results));
// });

/**
 * @api {delete} /carService/reservedDates/:id
 * @apiName DeleteFreeDates
 * @apiGroup FreeDates
 * @apiParam {Number} id          Reserved date unique ID.
 */
router.delete('/freeDates/:id', ValidateToken.validateToken, CarServiceController.deleteFreeDates);

// router.delete('/freeDate/:id', (req, res) => {
//     const itemIndex = freeDates.indexOf(freeDates.find(x => x.id === parseInt(req.params.id)));
//     if(itemIndex === -1) {
//         res.sendStatus(404);
//     }
//     freeDates.splice(itemIndex, 1);
//     res.sendStatus(200);
// });

function apiResponse(results){
    return JSON.stringify({"status": 200, "error": null, "response": results});
}

module.exports = router;
