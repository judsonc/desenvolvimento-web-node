const mongoose = require('mongoose')
const uuid = require('uuid/v4')

const modelAuthor = new mongoose.Schema(
  {
    codAuthor: {
      type: String,
      default: uuid().replace(/-/g, ''),
    },
    nome: {
      type: String,
      trim: true,
      required: true,
    },
    sobrenome: {
      type: String,
      trim: true,
      required: true,
    },
    foto: {
      type: String,
      trim: true,
      required: true,
    }
  },
)

module.exports = mongoose.model('author', modelAuthor)