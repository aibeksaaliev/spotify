import express from "express";
import Artist from "../models/Artist";
import {photosUpload} from "../multer";
import auth from "../middleware/auth";

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

artistsRouter.get('/', async (req, res) => {
  try {
    const artists = await Artist.find();
    return res.send(artists);
  } catch {
    return res.sendStatus(500);
  }
});



export default artistsRouter;