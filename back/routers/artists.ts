import express from "express";
import Artist from "../models/Artist";
import {photosUpload} from "../multer";
import {ArtistWithoutId} from "../types";

const artistsRouter = express.Router();

artistsRouter.post('/', photosUpload.single('photo'), async (req, res) => {
  try {
    const artistData: ArtistWithoutId = {
      name: req.body.name,
      photo: req.file ? req.file.filename : null,
      info: req.body.info ? req.body.info : null,
    };

    const artist = new Artist(artistData);

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