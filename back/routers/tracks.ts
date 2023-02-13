import express from "express";
import Track from "../models/Track";
import Album from "../models/Album";
import {TrackWithoutId} from "../types";

const tracksRouter = express.Router();

tracksRouter.post('/', async (req, res) => {
  try {
    const trackData: TrackWithoutId = {
      title: req.body.title,
      album: req.body.album,
      duration: req.body.duration ? req.body.duration : null
    };

    const track = new Track(trackData);

    try {
      await track.save();
      return res.send(track);
    } catch (error) {
      return res.status(400).send(error);
    }
  } catch {
    return res.sendStatus(500);
  }
});

tracksRouter.get('/', async (req, res) => {
  try {
    if (req.query.album) {
      const tracksByAlbum = await Track.find({album: req.query.album});
      return res.send(tracksByAlbum);
    } else if (req.query.artist) {
      const albums = await Album.find({"artist": req.query.artist}).populate("artist");
      const tracks = albums.map(album => album._id);
      const tracksByArtist = await Track.find({"album": {$in: tracks}});
      return res.send(tracksByArtist);
    } else {
      const tracks = await Track.find();
      return res.send(tracks);
    }
  } catch {
    return res.sendStatus(500);
  }
});

export default tracksRouter;