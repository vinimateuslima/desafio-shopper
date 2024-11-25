const express = require("express");

const router = express.Router();

const {
    getDrivers,
    createDriver,
    estimate
} = require("./controllers/DriverControllers")

router.get("/getDriver", (req, res) => getDrivers(req, res));

router.post("/createDriver", (req, res) => createDriver(req, res));

router.post("/estimate", (req, res) => estimate(req, res));

module.exports = router;