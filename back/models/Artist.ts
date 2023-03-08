import mongoose from "mongoose";
const Schema = mongoose.Schema;

const ArtistSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  photo: String,
  info: String,
  isPublished: {
    type: Boolean,
    required: true,
    default: false
  }
});

const Artist = mongoose.model('Artist', ArtistSchema);
export default Artist;
