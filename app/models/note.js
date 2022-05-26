const mongoose = require('mongoose')

const noteSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true
    },
    Owner: {
      // References use the type ObjectId
      type: mongoose.Schema.Types.ObjectId,
      // the name of the model to which they refer
      ref: 'User'
    }
  },
  {
    timestamps: true
  }
)

module.exports = noteSchema
