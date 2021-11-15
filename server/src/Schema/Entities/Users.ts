import mongoose, { Schema } from "mongoose";

const Users = new Schema({
  name: {
    type: String,
  },
  username: {
    type: String,
  },
  password: { type: String },
});

const User = mongoose.model("User", Users);
export default User;
