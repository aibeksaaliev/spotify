import express from "express";
import Album from "../models/Album";
import {coversUpload} from "../multer";
import Artist from "../models/Artist";
import mongoose from "mongoose";
import auth, {RequestWithUser} from "../middleware/auth";
import permit from "../middleware/permit";
import path from "path";
import config from "../config";
import {promises as fs} from "fs";
import Track from "../models/Track";
import User from "../models/User";

const albumsRouter = express.Router();

albumsRouter.post('/', auth, coversUpload.single('cover'), async (req, res) => {
  try {
    const user = (req as RequestWithUser).user;

    const album = await Album.create({
      title: req.body.title,
      artist: req.body.artist,
      releaseYear: req.body.releaseYear,
      cover: req.file ? req.file.filename : null,
      addedBy: user._id
    });

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
    const token = req.get("Authorization");

    const user = await User.findOne({token});

    if (!user) {
      if (req.query.artist) {
        const albumsByArtist = await Album.aggregate([
          {$match: {artist: new mongoose.Types.ObjectId(req.query.artist as string), isPublished: true}},
          {$lookup: {from: "tracks", localField: "_id", foreignField: "album", as: "tracks"}},
          {$addFields: {tracksAmount: {$size: "$tracks"}}},
          {$project: {_id: 1, title: 1, artist: 1, releaseYear: 1, cover: 1, tracksAmount: 1}},
          {$sort: {releaseYear: -1}}
        ]);
        const artist = await Artist.findById(req.query.artist).select('name');
        return res.send({albums: albumsByArtist, artist: artist});
      } else {
        const albums = await Album.find({isPublished: true});
        return res.send(albums);
      }
    } else {
      if (user.role === "admin") {
        if (req.query.artist) {
          const albumsByArtist = await Album.aggregate([
            {$match: {artist: new mongoose.Types.ObjectId(req.query.artist as string)}},
            {$lookup: {from: "tracks", localField: "_id", foreignField: "album", as: "tracks"}},
            {$addFields: {tracksAmount: {$size: "$tracks"}}},
            {$project: {_id: 1, title: 1, artist: 1, releaseYear: 1, cover: 1, tracksAmount: 1, addedBy: 1, isPublished: 1}},
            {$sort: {releaseYear: -1}}
          ]);
          const artist = await Artist.findById(req.query.artist).select('name');
          return res.send({albums: albumsByArtist, artist: artist});
        } else {
          const albums = await Album.find();
          return res.send(albums);
        }
      } else {
        if (req.query.artist) {
          const albumsByArtist = await Album.aggregate([
            {
              $match: {
                artist: new mongoose.Types.ObjectId(req.query.artist as string), $or: [
                  {addedBy: user._id},
                  {isPublished: true}
                ]
              }
            },
            {$lookup: {from: "tracks", localField: "_id", foreignField: "album", as: "tracks"}},
            {$addFields: {tracksAmount: {$size: "$tracks"}}},
            {$project: {_id: 1, title: 1, artist: 1, releaseYear: 1, cover: 1, tracksAmount: 1, addedBy: 1, isPublished: 1}},
            {$sort: {releaseYear: -1}}
          ]);
          const artist = await Artist.findById(req.query.artist).select('name');
          return res.send({albums: albumsByArtist, artist: artist});
        } else {
          const albums = await Album.find({
            $or: [
              {addedBy: user._id},
              {isPublished: true}
            ]
          });
          return res.send(albums);
        }
      }
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

albumsRouter.patch('/:id/togglePublished', auth, permit('admin'), async (req, res) => {
  try {
    const album = await Album.findById(req.params.id);

    if (!album) {
      return res.status(404).send({message: "Album not found"});
    }

    await album.updateOne({isPublished: !album.isPublished});
    return res.send({message: "Toggled successfully", album});
  } catch (e) {
    return res.status(500);
  }
});

albumsRouter.delete('/:id', auth, async (req, res) => {
  try {
    const user = (req as RequestWithUser).user;

    const album = await Album.findById(req.params.id);

    if (!album) {
      return res.status(404).send({message: "Album not found"});
    }

    if (user.role === "admin") {
      if (album.cover) {
        const coverPath = path.join(config.publicPath, album.cover as string);
        await fs.unlink(coverPath);
      }
      await Track.deleteMany({album: {$in: album}});
      await album.deleteOne();
    }

    if (user.role === "user" && user._id.equals(album.addedBy as unknown as string)) {
      if (album.cover) {
        const coverPath = path.join(config.publicPath, album.cover as string);
        await fs.unlink(coverPath);
      }
      await Track.deleteMany({album: {$in: album}});
      await album.deleteOne({addedBy: user._id, isPublished: false});
    }

    return res.send({message: "Deleted successfully"});
  } catch (e) {
    return res.status(500);
  }
});

export default albumsRouter;
