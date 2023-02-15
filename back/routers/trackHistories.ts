import express from "express";
import TrackHistory from "../models/TrackHistory";
import mongoose from "mongoose";
import User from "../models/User";

const trackHistoriesRouter = express.Router();

trackHistoriesRouter.post('/', async (req, res, next) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(400).send({error: "No token present"});
    }

    const user = await User.findOne({token: token});

    if (!user) {
      return res.status(400).send({error: "Wrong token"});
    }

    const trackHistory = new TrackHistory({
      user: user._id,
      track: req.body.track
    });

    await trackHistory.save();
    return res.send(trackHistory);
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(error);
    }

    return next();
  }
});

export default trackHistoriesRouter;