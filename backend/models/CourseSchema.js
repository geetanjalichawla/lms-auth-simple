const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Course name is required.'],
  },
  instructor: {
    type: String,
    required: [true, 'Instructor name is required.'],
  },
  description: {
    type: String,
    required: [true, 'Description is required.'],
  },
  enrollmentStatus: {
    type: String,
    enum: ['Open', 'Closed'],
    required: [true, 'Enrollment status is required.'],
  },
  duration: Number,
  prerequisites: [String],
  syllabus: String,
  skills: {
    type: [String],
    required: [true, 'Skills are required.'],
  },
  thumbnail: String,
  dueDate: Date,
  category: String,
  rating: {
    type: Number,
    min: 0,
    max: 5,
  },
  reviews: [
    {
      author: String,
      rating: Number,
      comment: String,
    },
  ],
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref:'User'
  }]
});

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;
