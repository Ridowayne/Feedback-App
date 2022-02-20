const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Kindly provide your name'],
  },
  bfreeMail: {
    type: String,
    required: [true, 'kindly provide a valid bfree mail'],
    unique: true,
  },
  bfreeOrStaffId: {
    type: String,
    required: [true, 'kindly provide your bfree or Staff id'],
  },
  jobTitle: {
    type: String,
    required: [true, 'kindly provide your job title'],
  },
  password: {
    type: String,
    required: [true, 'kindly provide your password'],
    select: false,
  },
  confirmpassword: {
    type: String,
    required: [true, 'kindly provide  confirm your password'],
  },
  team: {
    type: String,
    enum: [
      'Fairmoney',
      'kuda',
      'quickcheck',
      'growth',
      'carbon',
      'branch',
      'IT',
      'admin',
    ],
    required: [true, 'kindly provide your team'],
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
