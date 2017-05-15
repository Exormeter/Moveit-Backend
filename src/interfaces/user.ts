import {IPersistedModel} from "./persitedModel";

export interface IUser extends IPersistedModel{
    firstName?: string;
    lastName?: string;
    email?: string;
    birthdate?: string;
    sex?: string;
    picture?: string;
}