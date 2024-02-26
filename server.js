const express = require("express");
const path = require("path");
const logger = require("morgan");
const mongoose = require("mongoose");
require("dotenv").config();

require("./config/database");
// Import routers
const indexRouter = require("./routes/indexRouter");
const flightsRouter = require("./routes/flightsRouter");
const ticketsRouter = require("./routes/ticketsRoutes");

const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

// Use routers
app.use("/", indexRouter);
app.use("/flights", flightsRouter);
app.use("/", ticketsRouter);

app.use(function (req, res, next) {
  next(createError(404));
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.render("error", {
    message: err.message,
    error: app.get("env") === "development" ? err : {},
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

module.exports = app;
