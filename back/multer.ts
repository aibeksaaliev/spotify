import multer from "multer";
import {promises as fs} from "fs";
import path from "path";
import {randomUUID} from "crypto";
import config from "./config";

const artistPhotosStorage = multer.diskStorage({
  destination: async (_req, _file, cb) => {
    const destDir = path.join(config.publicPath, 'photos');
    await fs.mkdir(destDir, {recursive: true});
    cb(null, config.publicPath);
  },
  filename: (_req, file, cb) => {
    const extension = path.extname(file.originalname);
    cb(null, 'photos/' + randomUUID() + extension);
  }
});

const albumCoversStorage = multer.diskStorage({
  destination: async (_req, _file, cb) => {
    const destDir = path.join(config.publicPath, 'covers');
    await fs.mkdir(destDir, {recursive: true});
    cb(null, config.publicPath);
  },
  filename: (_req, file, cb) => {
    const extension = path.extname(file.originalname);
    cb(null, 'covers/' + randomUUID() + extension);
  }
})

export const photosUpload = multer({storage: artistPhotosStorage});
export const coversUpload = multer({storage: albumCoversStorage});