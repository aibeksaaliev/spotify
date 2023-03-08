import express from "express";
import Track from "../models/Track";
import Album from "../models/Album";
import auth from "../middleware/auth";

const tracksRouter = express.Router();

tracksRouter.post('/', auth, async (req, res) => {
  try {
    const track = await Track.create({
      title: req.body.title,
      album: req.body.album,
      duration: req.body.duration,
      number: req.body.number,
      videoId: req.body.videoId ? req.body.videoId : null,
    });

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
      const tracksByAlbum = await Track.find({album: req.query.album}).sort({number: +1});
      const albumInfo = await Album.findById(req.query.album).populate('artist');
      return res.send({tracks: tracksByAlbum, albumInfo: albumInfo});
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