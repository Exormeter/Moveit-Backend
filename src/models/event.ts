import mongoose = require("mongoose");
const Schema = mongoose.Schema;
import {IEvent} from "../interfaces/event";
import {UserSchema} from "./user"

export const eventSchema  = new Schema({
    createdAt: Date,
    title: String,
    keywords: [String],
    longitude: Float64Array,
    latitude: Float64Array,
    starttimepoint: Date,
    subscriber: [UserSchema],
});

eventSchema.pre("save", function(next) {
  if (!this.createdAt) {
    this.createdAt = new Date();
  }
  next();
});

export const Event = mongoose.model<IEvent>("User", UserSchema);