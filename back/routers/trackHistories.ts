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
      track: req.body.track,
      datetime: new Date(),
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

trackHistoriesRouter.get("/", async (req, res) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(400).send({error: "No token present"});
    }

    const user = await User.findOne({token: token});

    if (!user) {
      return res.status(400).send({error: "Wrong token"});
    }

    const trackHistory = await TrackHistory.aggregate([
      {$match: {user: user._id}},
      {$lookup: {from: "tracks", localField: "track", foreignField: "_id", as: "track"}},
      {$unwind: "$track"},
      {$lookup: {from: "albums", localField: "track.album", foreignField: "_id", as: "album"}},
      {$unwind: "$album"},
      {$lookup: {from: "artists", localField: "album.artist", foreignField: "_id", as: "artist"}},
      {$unwind: "$artist"},
      {$project: {_id: 1, track: "$track.title", album: "$album.title", artist: "$artist.name", datetime: 1}},
      {$sort: {datetime: -1}}
    ]);

    return res.send(trackHistory);
  } catch {
    return res.status(500);
  }
});

export default trackHistoriesRouter;