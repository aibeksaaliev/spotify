import mongoose, {Types} from "mongoose";
import Artist from "./Artist";
import {AlbumWithoutId} from "../types";
import User from "./User";
const Schema = mongoose.Schema;

const AlbumSchema = new Schema<AlbumWithoutId>({
  title: {
    type: String,
    required: true
  },
  artist: {
    type: Schema.Types.ObjectId,
    ref: 'Artist',
    required: true,
    validate: {
      validator: async (value: Types.ObjectId) => Artist.findById(value),
      message: "Artist does not exist",
    }
  },
  releaseYear: {
    type: Number,
    required: true,
  },
  cover: String,
  isPublished: {
    type: Boolean,
    required: true,
    default: false
  },
  addedBy: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
    validate: {
      validator: async (value: Types.ObjectId) => User.findById(value),
      message: "User does not exist"
    }
  }
});

const Album = mongoose.model('Album', AlbumSchema);
export default Album;