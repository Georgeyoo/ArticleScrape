// Require mongoose
const mongoose = require("mongoose");
// Create Schema class
const Schema = mongoose.Schema;

// Create article schema
let ArticleSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  link: {
    type: String
  },
  note: {
    type: Schema.Types.ObjectId,
    ref: "Note"
  }
});

let Article = mongoose.model("Article", ArticleSchema);

module.exports = Article;