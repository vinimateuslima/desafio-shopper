const express = require("express");

const router = express.Router();

// Driver
const { getDrivers, createDriver } = require("./controllers/DriverController");

// Ride

const {
  estimate,
  confirm,
  getCustomerRides,
  getCustomerRidesByDriver,
} = require("./controllers/RideController");

// Customer

const { createCustomer } = require("./controllers/CustomerController");

// Driver
router.get("/getDriver", (req, res) => getDrivers(req, res));

router.post("/createDriver", (req, res) => createDriver(req, res));

// Rides
router.post("/estimate", (req, res) => estimate(req, res));
router.patch("/confirm", (req, res) => confirm(req, res));
router.get("/getCustomerRides/:customer_id", (req, res) =>
  getCustomerRides(req, res)
);
router.get("/getCustomerRidesByDriver/:customer_id", (req, res) =>
  getCustomerRidesByDriver(req, res)
);

// Customer
router.post("/createCustomer", (req, res) => createCustomer(req, res));

module.exports = router;
