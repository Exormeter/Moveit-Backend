import { Document } from "mongoose";
import { IEvent } from "../interfaces/event";

export interface IEventModel extends IEvent, Document {
  //custom methods for your model would be defined here
}