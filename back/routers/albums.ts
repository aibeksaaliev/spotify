import express from "express";
import Album from "../models/Album";
import {imagesUpload} from "../multer";
import {AlbumWithoutId} from "../types";

const albumsRouter = express.Router();

albumsRouter.post('/', imagesUpload.single('cover'), async (req, res) => {
  try {
    const albumData: AlbumWithoutId = {
      title: req.body.title,
      artist: req.body.artist,
      releaseYear: req.body.releaseYear,
      cover: req.file ? req.file.filename : null
    };

    const album = new Album(albumData);

    try {
      await album.save();
      return res.send(album);
    } catch (error) {
      return res.status(400).send(error);
    }
  } catch {
    return res.sendStatus(500);
  }
});

export default albumsRouter;