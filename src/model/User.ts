import mongoose, { Document, Schema } from "mongoose";

export interface Message extends Document {
  message: string;
  createdAt: Date;
}

const messageSchema: Schema<Message> = new Schema({
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export interface User extends Document {
  username: string;
  email: string;
  password: string;
  verifyCode: string;
  verifyCodeExpiry: Date;
  isVerified: boolean;
  messages: Message[];
  isAcceptingMessage: boolean;
}
const userSchema: Schema<User> = new Schema({
  username: {
    type: String,
    required: [true, "username is required"],
    trim: true,
    unique: true,
  },
  email: {
    type: String,
    required: [true, "email is required"],
    trim: true,
    unique: true,
  },
  password: { type: String, required: [true, "password is required"] },
  verifyCode: { type: String, required: [true, "verify code is required"] },
  verifyCodeExpiry: {
    type: Date,
    required: [true, "verify code expiry is required"],
  },
  isVerified: {
    type: Boolean,
    required: [true, "isVerified is required"],
  },
  messages: [messageSchema],
  isAcceptingMessage: {
    type: Boolean,
    required: [true, "isAccepting message is required"],
  },
});

/* How to export model in next.js */

const UserModel =
  (mongoose.models.User as mongoose.Model<User>) ||
  mongoose.model<User>("user", userSchema);

export default UserModel;
