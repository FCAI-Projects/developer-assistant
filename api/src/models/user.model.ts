import mongoose, { Schema } from "mongoose";

export interface UserInterface extends mongoose.Document {
  name: string;
  email: string;
  password: string;
}

const UserSchema = new Schema<UserInterface>({
  name: {
    type: String,
    require: true,
    unique: true,
  },
  password: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
});

const User = mongoose.model<UserInterface>("User", UserSchema);
export default User;
