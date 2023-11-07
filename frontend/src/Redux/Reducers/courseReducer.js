import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  courses: [],
  categoryOptions:[],
  loading: false,
  enrolledCourses :[]
};

export const courseReducer = createReducer(initialState, {
  getCourse: (state, action) => {
    state.loading = true;
  },
  getCourseSuccess: (state, action) => {
    state.loading = false;
    state.courses = action.payload; 
    const uniqueCategories = action.payload.reduce((categories, course) => {
        categories.add(course.category);
        return categories;
      }, new Set());

      const categoryOptions = Array.from(uniqueCategories);
      categoryOptions.sort();

      state.categoryOptions  = categoryOptions;
    
  },
  getCourseFail: (state, action) => {
    state.loading = false;
  },
  getEnrolledCourse: (state, action) => {
    state.loading = true;
  },
  getEnrolledCourseSuccess: (state, action) => {
    state.loading = false;
    state.enrolledCourses = action.payload;
  },
  getEnrolledCourseFail: (state, action) => {
    state.loading = false;
  },
});
