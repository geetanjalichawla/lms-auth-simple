import logo from './logo.svg';
import './App.css';
import Register from './Pages/Signup';
import Login from './Pages/SignIn';
import UserLayout from './Layout/userLayout';
import Home from './Pages/Home';
import CourseListing from './Component/CourseListingPage';
import CourseDetails from './Component/CoursePage';
import Dashboard from './Pages/Dashboard';
import { Route, Routes } from 'react-router-dom';
import ProtectedRoute from './isAuthenticated';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast'

function App() {


  const { message , error} = useSelector(state => state.user);
  const dispatch = useDispatch();


  useEffect(() => {
    if(error)
    {
      toast.error(error)
      dispatch({type:'clearError'});
    }
    else if(message)
    {
      toast.success(message)
      dispatch({type:'clearMessage'});
    }
  }, [dispatch,error,message]);


const isAuth = localStorage.getItem('isAuth') ;
  return (
    <UserLayout>
      <Routes>
        <Route path='/' element= {<CourseListing/>}/>
        <Route path='/course/:id' element= {<CourseDetails/>}/>
        <Route path='/categories/:category' element= {<CourseListing/>}/>
        <Route path='/dashboard' element= {<Dashboard/>}/>
        <Route path='/register' element= {
        <ProtectedRoute isAuthenticated={!isAuth} redirect={'/'}>
          <Register/>
          </ProtectedRoute>}/>
        <Route path='/login' element= {<ProtectedRoute isAuthenticated={!isAuth} redirect={'/'}>
          <Login/>
          </ProtectedRoute>}/>
      </Routes>
      <Toaster/>
    </UserLayout>
  );
}

export default App;
