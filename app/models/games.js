const mongoose = require('mongoose')

const noteSchema = require('./note')

const gameSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  released: {
    type: String,
    required: true
  },
  id: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  // Add a `notes` subdocument array of type noteSchema
  notes: [noteSchema],
  // Add a `games` subdocument array of game references,
  owner: {
    // References use the type ObjectId
    type: mongoose.Schema.Types.ObjectId,
    // the name of the model to which they refer
    ref: 'User'
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('Game', gameSchema)
