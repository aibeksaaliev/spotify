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

albumsRouter.get('/', async (req, res) => {
  try {
    if (req.query.artist) {
      const albumsByArtist = await Album.find({artist: req.query.artist});
      return res.send(albumsByArtist);
    } else {
      const albums = await Album.find();
      return res.send(albums);
    }
  } catch {
    return res.sendStatus(500);
  }
});

albumsRouter.get('/:id', async (req, res) => {
  const id = req.params.id;

  try {
    const albumById = await Album.findById(id).populate('artist');
    return res.send(albumById);
  } catch {
    return res.sendStatus(500);
  }
});

export default albumsRouter;
