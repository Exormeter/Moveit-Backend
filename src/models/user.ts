import mongoose = require("mongoose");
const Schema = mongoose.Schema;
import {IUser} from "../interfaces/user";

export const UserSchema = new Schema({
    createdAt: Date,
    firstName: String,
    lastName: String,
    email: String,
    birthdate: String,
    sex: String,
    picture: String
});
UserSchema.pre("save", function(next) {
  if (!this.createdAt) {
    this.createdAt = new Date();
  }
  next();
});

export const User = mongoose.model<IUser>("user", UserSchema);