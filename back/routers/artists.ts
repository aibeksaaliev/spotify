import express from "express";
import Artist from "../models/Artist";
import {imagesUpload} from "../multer";
import {ArtistWithoutId} from "../types";

const artistsRouter = express.Router();

artistsRouter.post('/', imagesUpload.single('photo'), async (req, res) => {
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



export default artistsRouter;