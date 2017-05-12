import { Schema } from "mongoose";
import {  userSchema} from "./user"

export var eventSchema: Schema = new Schema({
    title: String,
    keywords: [String],
    longitude: Float64Array,
    latitude: Float64Array,
    startZeit: Date,
    teilnehmer: [userSchema],
});
