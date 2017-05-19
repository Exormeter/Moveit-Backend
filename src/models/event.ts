import * as mongoose from 'mongoose';
import * as User from './user';

interface IEvent {
  firstName?: string;
  lastName?: string;
  email?: string;
  birthdate?: string;
  sex?: string;
  picture?: string;
}

interface IEventModel extends IEvent, mongoose.Document { };

var eventSchema = new mongoose.Schema({
  createdAt: Date,
  title: String,
  keywords: [String],
  longitude: Float64Array,
  latitude: Float64Array,
  starttimepoint: Date,
  subscriber: [User],
});

eventSchema.pre("save", function (next) {
  if (!this.createdAt) {
    this.createdAt = new Date();
  }
  next();
});

var Event = mongoose.model<IEventModel>("Event", eventSchema);

export = Event;