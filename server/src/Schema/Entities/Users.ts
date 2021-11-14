import mongoose, { Schema } from "mongoose";
import { composeWithMongoose } from "graphql-compose-mongoose";

export const Users = new Schema({
  name: {
    type: String,
  },
  username: {
    type: String,
  },
  password: { type: String },
});

export const User = mongoose.model("User", Users);
export const UserTC = composeWithMongoose(User);
