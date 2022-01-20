const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({

  Q1: {
    type: Boolean,
    required: false,
    trim: true
  },
  Q2: {
    type: Boolean,
    required: false,
    trim: true
  },
  Q1P1: {
    type: Boolean,
    required: false,
    trim: true
  },
  Q1P2: {
    type: Boolean,
    required: false,
    trim: true
  },
  Q1EXAM: {
    type: Boolean,
    required: false,
    trim: true
  }
  ,
  Q2P1: {
    type: Boolean,
    required: false,
    trim: true
  },
  Q2P2: {
    type: Boolean,
    required: false,
    trim: true
  },
  Q2EXAM: {
    type: Boolean,
    required: false,
    trim: true
  }
}, {
  timestamps: true
});

module.exports = userSchema;