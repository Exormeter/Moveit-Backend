import * as mongoose from 'mongoose';
import * as User from './user';

interface IEvent {
  creator: { type: string, ref: 'User' };
  title: string;
  keywords: [string];
  longitude: number;
  latitude: number;
  starttimepoint: Date;
  subscriber: [{ type: string, ref: 'User' }];
}

interface IEventModel extends IEvent, mongoose.Document { };

var eventSchema = new mongoose.Schema({
  createdAt: Date,
  creator: { type: String, ref: 'User' },
  title: String,
  keywords: [String],
  longitude: Number,
  latitude: Number,
  starttimepoint: Date,
  subscriber: [{ type: String, ref: 'User' }]
});

eventSchema.pre("save", function (next) {
  if (!this.createdAt) {
    this.createdAt = new Date();
  }
  next();
});

var Event = mongoose.model<IEventModel>("Event", eventSchema);

export = Event;