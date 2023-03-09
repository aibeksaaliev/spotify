import express from "express";
import Artist from "../models/Artist";
import {photosUpload} from "../multer";
import auth from "../middleware/auth";
import permit from "../middleware/permit";
import config from "../config";
import path from "path";
import {promises as fs} from "fs";
import access, {AnyRequest} from "../middleware/access";

const artistsRouter = express.Router();

artistsRouter.post('/', auth, photosUpload.single('photo'), async (req, res) => {
  try {
    const artist = await Artist.create({
      name: req.body.name,
      photo: req.file ? req.file.filename : null,
      info: req.body.info ? req.body.info : null
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
      if (user && user.role === "admin") {
        const artists = await Artist.find();
        return res.send(artists);
      } else {
        const artists = await Artist.find({isPublished: true});
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

artistsRouter.delete('/:id', auth, permit('admin'), async (req, res) => {
  try {
    const artist = await Artist.findById(req.params.id);

    if (!artist) {
      return res.status(404).send({message: "Artist not found"});
    }

    const photoPath = path.join(config.publicPath, artist.photo as string);
    await fs.unlink(photoPath);

    await artist.deleteOne();
    return res.send({message: "Deleted successfully"});
  } catch (e) {
    return res.status(500);
  }
});

export default artistsRouter;