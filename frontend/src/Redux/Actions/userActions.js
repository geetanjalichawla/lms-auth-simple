import axios from 'axios';
import {server} from '../store.js';
 export const login = (email , password) =>async (dispatch)=>{
    try{
        dispatch({type:"loginRequest"});
        const data = await axios.post(`${server}/login`, {email,password}, {
            headers:{
                'Content-Type' :"application/json",
            },
            withCredentials: true

        });
        if(data.status === 200 || data.status === 201)
        {
            const isAuth = localStorage.setItem('isAuth', true)
        }
        dispatch({type:'loadUserSuccess', payload:data.data.message});

    }
    catch (error){
        console.log(error.response.data);
        dispatch({type:'loginFail', payload:error.response.data});

    }
 }

  
 export const logout = (navigate) =>async (dispatch)=>{
    dispatch({type:"logoutRequest"});
try{

    await axios.get(`${server}/logout`, {
        headers:{
            'Content-Type' :"application/json",
        },
        withCredentials: true

    });

    dispatch({type:'logoutSuccess'});
    navigate('/login')

}
catch(e)
   { dispatch({type:'logoutFail'});}
  }


 export const register = (formData) =>async (dispatch)=>{
    dispatch({type:"registerRequest"});
try{
    const {data} = await  axios.post(`${server}/register`,
            formData,
            {
                headers:{

                },
                withCredentials: true

            }
    );
    console.log(data);
    dispatch({type:'registerSuccess'});
}
catch(e)
   {    
    dispatch({type:'registerFail', payload:e.response.data.message});
   console.log(e);}
  }

 export const getUser = () =>async (dispatch)=>{
     axios
    .get(`${server}/me`,{
    withCredentials: true
    })
    .then((res) => {
        dispatch({type:'updateUser', payload: res.data||{} });

        console.log({user : res.data.data.data[0]})
    })
    .catch((e) => {
      if (e.response && e.response.status === 401) {
        dispatch(logout());

   }
   else
      dispatch({type:'changeUserStatusFail'});
        });
    }

    export const updateUser = (data) =>async (dispatch)=>{
      let token = JSON.parse(localStorage.getItem('token'));
       axios
      .post(`${server}/update-profile`, data,{
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data" 
                },
      })
      .then((res) => {
        dispatch({type:"setMessage", payload:"successfuly Updated"})
  dispatch(getUser());
          console.log({res})
      })
      .catch((e) => {
        if (e.response && e.response.status === 401) {
          dispatch(logout());
  
     }
    else {
      dispatch({type:"setError", payload:"something went wrong"})

    }
          });
      }

      