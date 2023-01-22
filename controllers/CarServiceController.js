const ReservedDates = require("../models/ReservedDates");
const FreeDates = require("../models/FreeDates");
const UserService = require("../services/UserService");
const Logger = require('../middleware/Logger');
const GetCurrentDate = require('../helpers/DateHelper');
const GetURL = require('../helpers/URLHelper');
const GetUUID = require('../helpers/UUIDHelper');
const GetLogMessage = require('../helpers/LogerHelper');
const Producer = require('../services/RabbitService');
const StatsticsService = require('../services/StatisticsService');

const getReservedDatesFromDB = (req, res, next) => {
  StatsticsService.StatisticsAPICall({ calledMethod: req.route.path, method: req.method, service: 'Car-Service-API' });
  ReservedDates.find()
    .then((response) => {
      const url = GetURL(req.protocol, req.get('host'), req.originalUrl);
      res.json({
        response,
      });
      const message = GetLogMessage(GetCurrentDate(), 'info', url, GetUUID(), '[CarServiceService]', "<* Successfully got reserved service dates news *>");
        Logger.successfullLogger.log('info', message);
        Producer(message).then(() => {
            console.log('RabitMQ works');
        }).catch(error => {
            console.log('Error:', error.message);
        })
    })
    .catch((error) => {
      res.json({
        message: error.message,
      });
      Logger.failedLogger.log('error', 'This call was <* Unsuccessfull got reserved service dates *>');
    });
};

const getFreeDatesFromDB = (req, res, next) => {
  StatsticsService.StatisticsAPICall({ calledMethod: req.route.path, method: req.method, service: 'Car-Service-API' });
  FreeDates.find()
    .then((response) => {
      const url = GetURL(req.protocol, req.get('host'), req.originalUrl);
      res.json({
        response,
      });
      const message = GetLogMessage(GetCurrentDate(), 'info', url, GetUUID(), '[CarServiceService]', "<* Successfully got free serevice dates *>");
        Logger.successfullLogger.log('info', message);
        Producer(message).then(() => {
            console.log('RabitMQ works');
        }).catch(error => {
            console.log('Error:', error.message);
        })
    })
    .catch((error) => {
      res.json({
        message: error.message,
      });
      Logger.failedLogger.log('error', 'This call was <* Unsuccessfull got free serevice dates *>');
    });
};

const getReservedSpecDatesFromDB = (req, res, next) => {
  StatsticsService.StatisticsAPICall({ calledMethod: req.route.path, method: req.method, service: 'Car-Service-API' });
  const dateId = req.params.id;
  ReservedDates.findById(dateId)
    .then((response) => {
      const url = GetURL(req.protocol, req.get('host'), req.originalUrl);
      res.json({
        response,
      });
      const message = GetLogMessage(GetCurrentDate(), 'info', url, GetUUID(), '[CarServiceService]', "<* Successfully got specific reserved date *>");
        Logger.successfullLogger.log('info', message);
        Producer(message).then(() => {
            console.log('RabitMQ works');
        }).catch(error => {
            console.log('Error:', error.message);
        })
    })
    .catch((error) => {
      res.json({
        message: error.message,
      });
      Logger.failedLogger.log('error', 'This call was <* Unsuccessfull got specific reserved date *>');
    });
};

const getFreeSpecDateFromDB = (req, res, next) => {
  StatsticsService.StatisticsAPICall({ calledMethod: req.route.path, method: req.method, service: 'Car-Service-API' });
  const dateId = req.params.id;
  FreeDates.findById(dateId)
    .then((response) => {
      const url = GetURL(req.protocol, req.get('host'), req.originalUrl);
      res.json({
        response,
      });
      const message = GetLogMessage(GetCurrentDate(), 'info', url, GetUUID(), '[CarServiceService]', "<* Successfully got specific free date *>");
        Logger.successfullLogger.log('info', message);
        Producer(message).then(() => {
            console.log('RabitMQ works');
        }).catch(error => {
            console.log('Error:', error.message);
        })
    })
    .catch((error) => {
      res.json({
        message: error.message,
      });
      Logger.failedLogger.log('error', 'This call was <* Unsuccessfull got specific free date *>');
    });
};

const postReservedDateToDB = (req, res, next) => {
  StatsticsService.StatisticsAPICall({ calledMethod: req.route.path, method: req.method, service: 'Car-Service-API' });
  UserService.getUserData(req.body.customer.username).then((result) => {
    const url = GetURL(req.protocol, req.get('host'), req.originalUrl);
    const newReservedDates = new ReservedDates({
      dateOfService: req.body.dateOfService,
      typeOfService: req.body.typeOfService,
      car: {
        make: req.body.car.make,
        model: req.body.car.model,
        modelYear: req.body.car.modelYear,
      },
      customer: {
        id: result.userId,
        firstname: result.name,
        lastname: result.surname,
      },
    });

    newReservedDates
      .save()
      .then(() => {
        res.status(200).json({
          message: "Service date was reserved",
        });
        const message = GetLogMessage(GetCurrentDate(), 'info', url, GetUUID(), '[CarServiceService]', "<* Successfully reserved a free date *>");
        Logger.successfullLogger.log('info', message);
        Producer(message).then(() => {
            console.log('RabitMQ works');
        }).catch(error => {
            console.log('Error:', error.message);
        })
      })
      .catch((error) => {
        res.status(400).json({
          message: error.message,
        });
        Logger.failedLogger.log('error', 'This call was <* Unsuccessfull reserved a free date *>');
      });
  });
};

const putReservedDatesToDB = (req, res, next) => {
  StatsticsService.StatisticsAPICall({ calledMethod: req.route.path, method: req.method, service: 'Car-Service-API' });
  const serviceId = req.params.id;

  const newReservedDates = {
    dateOfService: req.body.dateOfService,
    typeOfService: req.body.typeOfService,
    car: {
      make: req.body.car.make,
      model: req.body.car.model,
      modelYear: req.body.car.modelYear,
    },
    customer: {
      id: req.body.customer.id,
      firstname: req.body.customer.firstname,
      lastname: req.body.customer.lastname,
    },
  };

  ReservedDates.findByIdAndUpdate(serviceId, { $set: newReservedDates })
    .then(() => {
      const url = GetURL(req.protocol, req.get('host'), req.originalUrl);
      res.json({
        message: "Data has been updated",
      });
      const message = GetLogMessage(GetCurrentDate(), 'info', url, GetUUID(), '[CarServiceService]', "<* Successfully updated reserved date *>");
        Logger.successfullLogger.log('info', message);
        Producer(message).then(() => {
            console.log('RabitMQ works');
        }).catch(error => {
            console.log('Error:', error.message);
        })
    })
    .catch((error) => {
      res.status(404).json({
        message: error.message,
      });
      Logger.failedLogger.log('error', 'This call was <* Unsuccessfull updated the reserved date *>');
    });
};

const deleteReservedDateInDB = (req, res, next) => {
  StatsticsService.StatisticsAPICall({ calledMethod: req.route.path, method: req.method, service: 'Car-Service-API' });
  const serviceId = req.params.id;
  ReservedDates.findByIdAndDelete(serviceId)
    .then(() => {
      const url = GetURL(req.protocol, req.get('host'), req.originalUrl);
      res.json({
        message: "The item has been deleted",
      });
      const message = GetLogMessage(GetCurrentDate(), 'info', url, GetUUID(), '[CarServiceService]', "<* Successfully deleted reserved date *>");
        Logger.successfullLogger.log('info', message);
        Producer(message).then(() => {
            console.log('RabitMQ works');
        }).catch(error => {
            console.log('Error:', error.message);
        })
    })
    .catch((error) => {
      res.status(404).json({
        message: error.message,
      });
      Logger.failedLogger.log('error', 'This call was <* Unsuccessfull deleted reserved date *>');
    });
};

const deleteFreeDates = (req, res, next) => {
  StatsticsService.StatisticsAPICall({ calledMethod: req.route.path, method: req.method, service: 'Car-Service-API' });
  const serviceId = req.params.id;
  FreeDates.findByIdAndDelete(serviceId)
    .then(() => {
      const url = GetURL(req.protocol, req.get('host'), req.originalUrl);
      res.json({
        message: "The item has been deleted",
      });
      const message = GetLogMessage(GetCurrentDate(), 'info', url, GetUUID(), '[CarServiceService]', "<* Successfully deleted free date *>");
        Logger.successfullLogger.log('info', message);
        Producer(message).then(() => {
            console.log('RabitMQ works');
        }).catch(error => {
            console.log('Error:', error.message);
        })
    })
    .catch((error) => {
      res.status(404).json({
        message: error.message,
      });
      Logger.failedLogger.log('error', 'This call was <* Unsuccessfull deleted free date *>');
    });
};

module.exports = {
  getReservedDatesFromDB,
  getFreeDatesFromDB,
  getReservedSpecDatesFromDB,
  getFreeSpecDateFromDB,
  postReservedDateToDB,
  putReservedDatesToDB,
  deleteReservedDateInDB,
  deleteFreeDates,
};