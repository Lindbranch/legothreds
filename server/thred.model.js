const mongoose = require("mongoose");
const Schema = mongoose.Schema;
let Thred = new Schema({
  thred_title: {
    type: String,
  },
  thred_body: {
    type: String,
  },
  todo_priority: {
    type: String,
  },
});
module.exports = mongoose.model("Thred", Thred);
