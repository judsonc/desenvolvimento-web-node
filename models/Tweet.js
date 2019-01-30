const mongoose = require('mongoose')
const uuid = require('uuid/v4')

const modelTweet = new mongoose.Schema(
  {
    codTweet: {
      type: String,
      default: uuid().replace(/-/g, ''),
    },
    codAuthor: {
      type: String,
      required: true,
    },
    data_publicacao: {
      type: Date,
      default: Date.now,
    },
    texto: {
      type: String,
      required: true,
    },
    likes: {
      type: Number,
      min: 0,
      default: 0,
    },
  },
)
  
module.exports = mongoose.model('tweet', modelTweet)