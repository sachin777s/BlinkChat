import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  mob: {
    type: Number,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  bio: {
    type: String,
    default:"Bio is not available!"
  },
  contacts:{
    type:[]
  },
  password: {
    type: String,
    required: true,
  },
  profileImg: {
    type: String,
  },
});

const userModel = mongoose.model("Users", userSchema);
export default userModel;
