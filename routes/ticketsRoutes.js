const express = require("express");
const router = express.Router();
const ticketsController = require("../controllers/ticketsController");

// Route with route parameter
// Route for rendering the page to create new tickets
// router.get("/flights/:id/tickets/new", ticketsController.newTicketForm);
// Route for creating new tickets
router.get("/flights/:id/tickets/new", ticketsController.new);
router.post("/flights/:id/tickets", ticketsController.createTicket);
module.exports = router;
