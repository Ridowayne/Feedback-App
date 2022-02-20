const mongoose = require('mongoose');

const reviewsSchema = new mongoose.Schema({
  ratings: {
    type: Number,
    max: 5,
    min: 1,
  },
  reviews: {
    type: String,
  },
});
const Review = mongoose.model('Reviews', reviewsSchema);

module.exports = Review;
