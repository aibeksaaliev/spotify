import express from "express";
import Track from "../models/Track";
import Album from "../models/Album";
import auth, {RequestWithUser} from "../middleware/auth";
import permit from "../middleware/permit";
import User from "../models/User";

const tracksRouter = express.Router();

tracksRouter.post('/', auth, async (req, res) => {
  try {
    const user = (req as RequestWithUser).user;

    const track = await Track.create({
      title: req.body.title,
      album: req.body.album,
      duration: req.body.duration,
      number: req.body.number,
      videoId: req.body.videoId ? req.body.videoId : null,
      addedBy: user._id
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
    const token = req.get("Authorization");

    const user = await User.findOne({token});

    if (!user) {
      if (req.query.album) {
        const tracksByAlbum = await Track.find({album: req.query.album, isPublished: true}).sort({number: +1});
        const albumInfo = await Album.findById(req.query.album).populate('artist');
        return res.send({tracks: tracksByAlbum, albumInfo: albumInfo});
      } else if (req.query.artist) {
        const albums = await Album.find({"artist": req.query.artist, isPublished: true}).populate("artist");
        const tracks = albums.map(album => album._id);
        const tracksByArtist = await Track.find({"album": {$in: tracks}});
        return res.send(tracksByArtist);
      } else {
        const tracks = await Track.find({isPublished: true});
        return res.send(tracks);
      }
    } else {
      if (user.role === "admin") {
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
      } else {
        if (req.query.album) {
          const tracksByAlbum = await Track.find({
            album: req.query.album,
            $or: [{addedBy: user._id}, {isPublished: true}]
          }).sort({number: +1});
          const albumInfo = await Album.findById(req.query.album).populate('artist');
          return res.send({tracks: tracksByAlbum, albumInfo: albumInfo});
        } else if (req.query.artist) {
          const albums = await Album.find({
            "artist": req.query.artist,
            $or: [{addedBy: user._id}, {isPublished: true}]
          }).populate("artist");
          const tracks = albums.map(album => album._id);
          const tracksByArtist = await Track.find({"album": {$in: tracks}});
          return res.send(tracksByArtist);
        } else {
          const tracks = await Track.find({isPublished: true, addedBy: user._id});
          return res.send(tracks);
        }
      }
    }
  } catch {
    return res.sendStatus(500);
  }
});

tracksRouter.patch('/:id/togglePublished', auth, permit('admin'), async (req, res) => {
  try {
    const track = await Track.findById(req.params.id);

    if (!track) {
      return res.status(404).send({message: "Track not found"});
    }

    await track.updateOne({isPublished: !track.isPublished});
    return res.send({message: "Toggled successfully", track});
  } catch (e) {
    return res.status(500);
  }
})

tracksRouter.delete('/:id', auth, async (req, res) => {
  try {
    const user = (req as RequestWithUser).user;

    const track = await Track.findById(req.params.id);

    if (!track) {
      return res.status(404).send({message: "Track not found"});
    }

    if (user.role === "admin") {
      await track.deleteOne();

    }

    if (user.role === "user") {
      await track.deleteOne({addedBy: user._id, isPublished: false});
    }

    return res.send({message: "Deleted successfully"});
  } catch (e) {
    return res.status(500);
  }
})

export default tracksRouter;