const express = require("express");

const router = express.Router();

// Driver
const {
    getDrivers,
    createDriver,
} = require("./controllers/DriverController")

// Ride

const {estimate} = require("./controllers/RideController")

router.get("/getDriver", (req, res) => getDrivers(req, res));

router.post("/createDriver", (req, res) => createDriver(req, res));

router.post("/estimate", (req, res) => estimate(req, res));

module.exports = router;