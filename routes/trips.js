const express = require("express");
const Trip = require("../models/Trip");
const User = require("../models/User");

const router = express.Router();

router.get("/", async (req, res, next) => {
  const user = req.query.user;
  const query = user ? { user } : undefined;
  try {
    const trips = await Trip.find(query);
    res.json(trips);
  } catch (err) {
    res.json(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.id);
    if (!trip) {
      res.status(404).json(trip);
    } else {
      res.status(200).json(trip);
    }
  } catch (err) {
    res.json(err);
  };
});

router.delete("/:id", async (req, res) => {
  try {
    const trip = await Trip.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Trip deleted" });
  } catch (err) {
    res.json(err);
  };
});

router.post("/", async (req, res, next) => {
  try {
    const trip = req.body;
    trip.user = req.user._id;
    // ----new user
    const user = req.query.user;

    trip.slots_booked = 0
    // user.createdTrips.push(user._id);
    let newTrip = await Trip.create(trip);
    await User.findByIdAndUpdate(req.user._id, {$push: {createdTrips: newTrip._id}})
    res.status(201).json(trip);
  } catch (err) {
    res.status(400).json(err);
    console.log("error======>", err);
  };
});

module.exports = router;
