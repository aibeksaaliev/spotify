import {Schema, Types, model} from "mongoose";
import User from "./User";
import Track from "./Track";
import {ITrackHistory} from "../types";

const TrackHistorySchema = new Schema<ITrackHistory>({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
    validate: {
      validator: async (value: Types.ObjectId) => User.findById(value),
      message: "User does not exist"
    }
  },
  track: {
    type: Schema.Types.ObjectId,
    ref: "Track",
    required: true,
    validate: {
      validator: async (value: Types.ObjectId) => Track.findById(value),
      message: "Track does not exist"
    }
  },
  datetime: {
    type: Date,
    required: true,
  }
});



const TrackHistory = model('TrackHistory', TrackHistorySchema);
export default TrackHistory;

