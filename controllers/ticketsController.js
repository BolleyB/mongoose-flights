const Ticket = require("../models/ticket");
const Flight = require("../models/flight");

// async function showTicketForm(req, res) {
//   try {
//     const flightId = req.params.id;
//     const flight = await Flight.findById(flightId);

//     if (!flight) {
//       return res.status(404).send("Flight not found");
//     }

//     res.render("flights/tickets/new", { flight });
//   } catch (error) {
//     console.error(error);
//     res.status(500).send("Internal Server Error");
//   }
// }

async function newTicket(req, res) {
  const flightId = req.params.flightId;
  res.render("flights/tickets/new", {
    flightId,
  });
}

async function createTicket(req, res) {
  const flightId = req.params.flightId;

  try {
    const ticket = await Ticket.create({
      ...req.body,
      flight: flightId,
    });
    console.log(ticket);

    res.redirect(`flights/${flightId}`);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
}

async function getTicket(req, res) {
  const flightId = req.params.flightId;
  res.render(`flights/${flightId}/tickets`);
}

module.exports = {
  //   showTicketForm,
  createTicket,
  new: newTicket,
};
