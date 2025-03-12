import mongoose from 'mongoose';
const moodSchema = new mongoose.Schema({
  mood: {
    type: String,
    required: true
  },
  emoji: {
    type: String,
    required: true
  },
  color: {
    type: String,
    default: 'blue'
  },
  types: [{
    type: {
      type: String,
      required: true
    },
    solution: {
      type: String,
      required: true
    }
  }],
  musicLinks: [{
    title: String,
    url: String
  }],
  videoLinks: [{
    title: String,
    url: String
  }],
  contentLinks: [{
    title: String,
    url: String
  }]
});

const mood = mongoose.model('Mood', moodSchema);
export default mood
