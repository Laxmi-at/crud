import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: [true, "Name required"] },
  age: { type: Number, required: [true, "Age required"] },
  email: { type: String, required: [true, "Email required"], lowercase: true },
  password: {
    type: String,
    select: false,
    required: [true, "Password required"],
    validate: {
      validator: function (val) {
        return val.length >= 8;
      },
      message: "Password must be at least 8 characters long",
    },
  },
});

const User = mongoose.model("User", userSchema);

export default User;
