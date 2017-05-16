import * as mongoose from 'mongoose';

interface IUser {
  firstName?: string;
  lastName?: string;
  email?: string;
  birthdate?: string;
  sex?: string;
  picture?: string;
}

interface IUserModel extends IUser, mongoose.Document { };

var userSchema = new mongoose.Schema({
  createdAt: Date,
  firstName: String,
  lastName: String,
  email: String,
  birthdate: String,
  sex: String,
  picture: String
});

userSchema.pre("save", function (next) {
  if (!this.createdAt) {
    this.createdAt = new Date();
  }
  next();
});

var User = mongoose.model<IUserModel>("User", userSchema);

export = User;