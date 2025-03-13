import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address.']
  },
  name: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Non Binary'],
    required: true
  },
  age: {
    type: Number,
    required: true,
    min: 18 // Assuming you want to enforce a minimum age of 18
  },
  journals: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Journal'
  }]
}, {
  timestamps: true
});

const User = mongoose.model('User ', userSchema);
export default User;