import { Schema } from "mongoose";

export var userSchema: Schema = new Schema({
    createdAt: Date,
    firstName: String,
    lastName: String,
    email: String,
    birthdate: String,
    sex: String,
    picture: String
});
userSchema.pre("save", function(next) {
  if (!this.createdAt) {
    this.createdAt = new Date();
  }
  next();
});