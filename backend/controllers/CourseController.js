const { catchError } = require('../middleware/CatchError');
const Course = require('../models/CourseSchema');
const jwt = require("jsonwebtoken");
const ErrorHandler = require('../utils/ErrorHandler');
const EnrolledCourse = require('../models/EnrolledCourse');

// Create a new course
const createCourse = catchError(async (req, res) => {
    const newCourse = new Course(req.body);
    await newCourse.save();
    res.status(201).json({ message: 'Course created successfully', course: newCourse });
});

// Get a list of courses
const getAllCourses = catchError(async (req, res) => {
    // Extracting the user's token from cookies
    const token = req.cookies.token;
    let authenticatedUserId;
    if (token) {
        // Verify and decode the token to get the user's ID
        const decodedToken = jwt.verify(token, process.env.JWT_SECRETE);
        authenticatedUserId = decodedToken._id;
    }
    const courses = await Course.find();

    // Iterate through the courses and check if the authenticated user has liked each course
    const coursesWithLikes = courses.map((course) => {
        const isLikedByUser = authenticatedUserId ? course.likes?.includes(authenticatedUserId) : false;
        return { ...course.toObject(), isLikedByUser };
    });

    res.status(200).json(coursesWithLikes);
});

// Get a specific course by ID
const getCourseById = catchError(async (req, res) => {
    const course = await Course.findById(req.params.id);

    const token = req.cookies.token;
    let authenticatedUserId;
    if (token) {
        // Verify and decode the token to get the user's ID
        const decodedToken = jwt.verify(token, process.env.JWT_SECRETE);
        authenticatedUserId = decodedToken._id;
    }

    if (course) {
        const isLikedByUser = authenticatedUserId ? course.likes?.includes(authenticatedUserId) : false;
        const enrolledCourse = authenticatedUserId ? await EnrolledCourse.findOne({userId:authenticatedUserId, courseId:req.params.id  }) : null;
        const isEnrolled  = authenticatedUserId ? enrolledCourse && 1: false;
        const isCompleted  = authenticatedUserId ? enrolledCourse && enrolledCourse.isCompleted: false;
        res.status(200).json( { ...course.toObject(), isLikedByUser,isEnrolled ,isCompleted})
    } else {
        res.status(404).json({ message: 'Course not found' });
    }
});

// Update a specific course by ID
const updateCourse = catchError(async (req, res) => {
    const updatedCourse = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (updatedCourse) {
        res.status(200).json({ message: 'Course updated successfully', course: updatedCourse });
    } else {
        res.status(404).json({ message: 'Course not found' });
    }
});

// Delete a specific course by ID
const deleteCourse = catchError(async (req, res) => {
    const deletedCourse = await Course.findByIdAndDelete(req.params.id);
    if (deletedCourse) {
        res.status(200).json({ message: 'Course deleted successfully', course: deletedCourse });
    } else {
        res.status(404).json({ message: 'Course not found' });
    }
});


const likeCourse = catchError(async (req, res) => {
    const authenticatedUserId = req.user._id;
    const courseId = req.body.courseId;
  
    try {
      const course = await Course.findById(courseId);
  
      if (!course) {
        return res.status(404).json({ message: 'Course not found' });
      }
  
      // Check if the user has already liked the course
      if (course.likes.find(like => like.toString()==authenticatedUserId.toString())) {
        course.likes = course.likes.filter((userId) => userId.toString() !== authenticatedUserId.toString());
        await course.save();
        return res.status(200).json({ message: 'Course disliked successfully' });
      }
  
      if (!course.likes) course.likes = [];
      // Add the user's ID to the list of likes
      course.likes.push(authenticatedUserId);
      await course.save();
  
      res.status(200).json({ message: 'Course liked successfully' });
    } catch (error) {
      // Handle any errors that occur during the process
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  

const enrollForCourse = catchError(async (req, res, next) => {
    const courseId = req.params.id;
    const userId = req.user._id;

    const course = await Course.findById(courseId);
    if (!course) return next(new ErrorHandler('course not found', 404));

    const isEnrolled = await EnrolledCourse.findOne({
        courseId,
        userId: userId,
    });

    if (isEnrolled) return next(new ErrorHandler('course has already enrolled', 400));

    const enroll = await EnrolledCourse.create({
        courseId,
        userId: userId,
        isCompleted: false,
    })
    res.json({
        message: 'successfully enrolled for the course',
        success: true
    })
}

)
const markAsCompleted = catchError(async (req, res, next) => {
    const courseId = req.params.id;
    const userId = req.user._id;

    const isEnrolled = await EnrolledCourse.findOne({
        courseId,
        userId: userId,
    });


    if (!isEnrolled) return next(new ErrorHandler('Course not Found', 404));

    isEnrolled.isCompleted = ! isEnrolled.isCompleted;
    await  isEnrolled.save();
    res.json({
        message: `course is marked ${isEnrolled.isCompleted ? 'completed': 'not completed'}`,
        success: true
    })
}

)
const enrolledCourses = catchError (async (req, res, next)=>{
    const userId  = req.user._id;
    const enrolled = await EnrolledCourse.find({
        userId
    }).populate('courseId');
    res.json(enrolled)
})


module.exports = {
    createCourse,
    getAllCourses,
    getCourseById,
    updateCourse,
    deleteCourse,
    likeCourse,
    enrollForCourse,
    markAsCompleted,
    enrolledCourses
};
