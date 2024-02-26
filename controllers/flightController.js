const Flight = require("../models/flight");
const Ticket = require("../models/ticket");
// Controller functions
async function getAllFlights(req, res, next) {
  try {
    const flights = await Flight.find({});
    res.render("flights/index", { flights });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
}

function showNewFlightForm(req, res) {
  res.render("flights/new");
}

async function createFlight(req, res) {
  try {
    await Flight.create(req.body);
    res.redirect("/flights");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
}

async function getFlightDetails(req, res) {
  try {
    const flight = await Flight.findById(req.params.id);
    const ticket = await Ticket.find({ flight: flight._id }).exec()
    res.render("flights/details", { flight, ticket });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
}

async function addDestination(req, res) {
  try {
    const flight = await Flight.findById(req.params.id);

    // Exclude airports already used by other destinations and the flight's airport
    const usedAirports = flight.destinations.map((dest) => dest.airport);
    const availableAirports = ["AUS", "DFW", "DEN", "LAX", "SAN"].filter(
      (airport) => !usedAirports.includes(airport) && airport !== flight.airport
    );

    flight.destinations.push(req.body);
    await flight.save();
    res.redirect(`/flights/${req.params.id}`);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
}

async function getDestinations(req, res) {
  try {
    const flight = await Flight.findById(req.params.id);
    const sortedDestinations = flight.destinations.sort(
      (a, b) => a.arrival - b.arrival
    ); // Sort by arrival date/time
    res.render("flights/destinations", { destinations: sortedDestinations });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
}

async function showFlightDetail(req, res) {
  try {
    const flight = await Flight.findById(req.params.id);

    if (!flight) {
      return res.status(404).send("Flight not found");
    }

    const tickets = await Ticket.find({ flight: flight._id });
    res.render("flights/show", { flight, tickets });
  } catch (error) {
    //Handle any errors
    console.error(error);
    res.render(500).send("Internal Server Error");
  }
}

module.exports = {
  getAllFlights,
  showNewFlightForm,
  createFlight,
  getFlightDetails,
  addDestination,
  getDestinations,
  showFlightDetail,
};
