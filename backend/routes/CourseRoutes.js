// routes/courseRoutes.js
const express = require('express');
const router = express.Router();
const courseController = require('../controllers/CourseController');
const { isAuthenticated } = require('../middleware/IsAuthenticated');

// Create a new course
router.post('/courses', courseController.createCourse);

// Get a list of courses
router.get('/courses', courseController.getAllCourses);

// Get a specific course by ID
router.get('/courses/:id', courseController.getCourseById);

// Update a specific course by ID
router.put('/courses/:id', courseController.updateCourse);

// Delete a specific course by ID
router.delete('/courses/:id', courseController.deleteCourse);

router.post('/like-course', isAuthenticated ,courseController.likeCourse);
router.post('/enroll-the-course/:id', isAuthenticated ,courseController.enrollForCourse);
router.put('/mark-as-completed/:id', isAuthenticated ,courseController.markAsCompleted);
router.get('/enrolled-courses', isAuthenticated ,courseController.enrolledCourses);

module.exports = router;
