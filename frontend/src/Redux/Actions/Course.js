import axios from "axios";
import { server } from "../store";

export const getAllCourses = () =>async (dispatch)=>{
    dispatch({type:'getCourse'});
    axios
   .get(`${server}/courses`,{
   withCredentials: true
   })
   .then((res) => {
       dispatch({type:'getCourseSuccess', payload: res.data||{} });
   })
   .catch((e) => {
     dispatch({type:'getCourseFail'});
       });
   }
export const getAllEnrolledCourses = () =>async (dispatch)=>{
    dispatch({type:'getEnrolledCourse'});
    axios
   .get(`${server}/enrolled-courses`,{
   withCredentials: true
   })
   .then((res) => {
       dispatch({type:'getEnrolledCourseSuccess', payload: res.data||{} });
   })
   .catch((e) => {
     dispatch({type:'getEnrolledCourseFail'});
       });
   }