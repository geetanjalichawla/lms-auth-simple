import {configureStore} from '@reduxjs/toolkit'
import { userReducer } from './Reducers/userReducer';
import { courseReducer } from './Reducers/courseReducer';


export const server = "http://localhost:4000/api/v1";

const store = configureStore({
    reducer :{
user : userReducer,
course: courseReducer,
    },
})
export default store;