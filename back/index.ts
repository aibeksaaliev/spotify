import express from "express";
import cors from "cors";
import * as mongoose from "mongoose";
import artistsRouter from "./routers/artists";
import albumsRouter from "./routers/albums";

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());
app.use('/artists', artistsRouter);
app.use('/albums', albumsRouter);

const run = async () => {
  mongoose.set('strictQuery', false);
  await mongoose.connect('mongodb://localhost/spotify');

  app.listen(port, () => {
    console.log("We are live on " + port);
  });

  process.on('exit', () => {
    mongoose.disconnect();
  });
};

run().catch(console.error);