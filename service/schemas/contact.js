const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const contact = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
      match: [
        /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/,
        "Email can includes letters, digits, @ and .",
      ],
    },
    phone: {
      type: String,
      match: [
        /^\+?[0-9\-() ]+$/,
        "Phone number can includes digits, spaces or next symbols: +, -, (, )",
      ],
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false, timestamps: true }
);

const Contact = mongoose.model("contact", contact);

module.exports = Contact;
