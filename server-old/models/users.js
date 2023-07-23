import mongoose, { Schema } from "mongoose";

//Create a schema for the users table
const UserSchema = new Schema({
  username: {
    type: String,
    unique: false,
    required: true,
  },
  emailAddress: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

//Create a model based on the schema, and specify writing to users table
const User = mongoose.model("User", UserSchema, "users");

export default User;
