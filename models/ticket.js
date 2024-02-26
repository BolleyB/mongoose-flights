const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
  seat: {
    type: String,
    required: true,
    validate: {
      validator: function(value) {
        // Check if seat value matches the pattern 'A1' through 'F99'
        return /^[A-F][1-9]\d?$/.test(value);
      },
      message: props => `${props.value} is not a valid seat number. Seat number must be in the format A1 through F99.`
    }
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  flight: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Flight',
    required: true
  }
});

const Ticket = mongoose.model('Ticket', ticketSchema);

module.exports = Ticket;
