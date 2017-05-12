import { IUser } from "./user";

export interface IEvent {
  title?: string;
  keywords?: string[];
  longitude?: Float64Array;
  latitude?: Float64Array;
  starttimepoint?: Date;
  subscriber?: IUser[];


}