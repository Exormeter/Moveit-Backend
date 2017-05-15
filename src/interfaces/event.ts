import {IPersistedModel} from "./persitedModel";
import { IUser } from "./user";

export interface IEvent extends IPersistedModel{
  title?: string;
  keywords?: string[];
  longitude?: Float64Array;
  latitude?: Float64Array;
  starttimepoint?: Date;
  subscriber?: IUser[];
}