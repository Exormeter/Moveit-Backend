import { Schema } from "mongoose";
import {  userSchema} from "./user"

export var eventSchema: Schema = new Schema({
    createdAt: Date,
    title: String,
    keywords: [String],
    longitude: Float64Array,
    latitude: Float64Array,
    starttimepoint: Date,
    subscriber: [userSchema],
});

eventSchema.pre("save", function(next) {
  if (!this.createdAt) {
    this.createdAt = new Date();
  }
  next();
});
