const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
  version: String,
  UserName: String,
  ComputerName: String,
  TimeStamp: {
    type: Date,
    default: Date.now()
  },
  DistanceValue: Number,
  UserEvent: Number,
  Base64Data: String,
  fileName: String,
})

module.exports = mongoose.model('TrackData', dataSchema)