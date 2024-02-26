const express = require("express");
const router = express.Router();
const flightsController = require("../controllers/flightController");

router.get("/new", flightsController.showNewFlightForm);
router.post("/", flightsController.createFlight);
router.get("/", flightsController.getAllFlights);
router.get("/:id", flightsController.getFlightDetails);
router.post("/:id/destinations", flightsController.addDestination);
router.get("/:id/destinations", flightsController.getDestinations);
router.get("/:id", flightsController.showFlightDetail);


module.exports = router;
