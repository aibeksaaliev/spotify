import express from "express";
import Artist from "../models/Artist";
import {photosUpload} from "../multer";
import auth, {RequestWithUser} from "../middleware/auth";
import permit from "../middleware/permit";
import config from "../config";
import path from "path";
import {promises as fs} from "fs";
import access, {AnyRequest} from "../middleware/access";
import Album from "../models/Album";
import Track from "../models/Track";
import mongoose from "mongoose";

const artistsRouter = express.Router();

artistsRouter.post('/', auth, photosUpload.single('photo'), async (req, res) => {
  try {
    const user = (req as RequestWithUser).user;

    const artist = await Artist.create({
      name: req.body.name,
      photo: req.file ? req.file.filename : null,
      info: req.body.info ? req.body.info : null,
      addedBy: user._id
    });

    try {
      await artist.save();
      return res.send(artist);
    } catch (error) {
      return res.status(400).send(error);
    }
  } catch {
    return res.sendStatus(500);
  }
});

artistsRouter.get('/', access, async (req, res) => {
  try {
    const user = (req as AnyRequest).user;

    if (!user) {
      const artists = await Artist.find({isPublished: true});
      return res.send(artists);
    } else {
      if (user.role === "admin") {
        const artists = await Artist.find();
        return res.send(artists);
      } else {
        const artists = await Artist.find({
          $or: [
            {addedBy: user._id},
            {isPublished: true}
          ]
        });
        return res.send(artists);
      }
    }
  } catch {
    return res.sendStatus(500);
  }
});

artistsRouter.patch('/:id/togglePublished', auth, permit('admin'), async (req, res) => {
  try {
    const artist = await Artist.findById(req.params.id);

    if (!artist) {
      return res.status(404).send({message: "Artist not found"});
    }

    await artist.updateOne({isPublished: !artist.isPublished});
    return res.send({message: "Toggled successfully", artist});
  } catch (e) {
    return res.status(500);
  }
});

artistsRouter.delete('/:id', auth, async (req, res) => {
  try {
    const user = (req as RequestWithUser).user;

    const artist = await Artist.findById(req.params.id);
    const albums = await Album.find({artist: new mongoose.Types.ObjectId(req.params.id)});

    if (!artist) {
      return res.status(404).send({message: "Artist not found"});
    }

    if (user.role === "admin") {
      if (artist.photo) {
        const photoPath = path.join(config.publicPath, artist.photo as string);
        await fs.unlink(photoPath);
      }
      await Track.deleteMany({album: {$in: albums}});
      await Album.deleteMany({artist: artist._id});
      await artist.deleteOne();
    }

    if (user.role === "user") {
      if (artist.photo) {
        const photoPath = path.join(config.publicPath, artist.photo as string);
        await fs.unlink(photoPath);
      }
      await Track.deleteMany({album: {$in: albums}});
      await Album.deleteMany({artist: artist._id});
      await artist.deleteOne({addedBy: user._id, isPublished: false});
    }

    return res.send({message: "Deleted successfully"});
  } catch (e) {
    return res.status(500);
  }
});

export default artistsRouter;