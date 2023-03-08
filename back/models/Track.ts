import mongoose, {Types} from "mongoose";
import Album from "./Album";
const Schema = mongoose.Schema;

const TrackSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  album: {
    type: Schema.Types.ObjectId,
    ref: "Album",
    required: true,
    validate: {
      validator: async (value: Types.ObjectId) => Album.findById(value),
      message: "Album does not exist"
    }
  },
  duration: {
    type: String,
    required: true
  },
  number : {
    type: Number,
    required: true
  },
  videoId: String,
  isPublished: {
    type: Boolean,
    required: true,
    default: false
  }
});

const Track = mongoose.model('Track', TrackSchema);
export default Track;