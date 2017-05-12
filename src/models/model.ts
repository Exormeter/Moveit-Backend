import { Model } from "mongoose";
import { IUserModel } from "./user";
import { IEventModel } from "./event";

export interface IModel {
  user: Model<IUserModel>;
  event: Model<IEventModel>;
}