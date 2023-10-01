import axios from "axios";// to send to a server or fetch data  from a server,javascript library
// import {useDispatch,useSelector} from "react-redux";
import {
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
} from "../types/authType";


export const userRegister = (data) => {
  
  return async (dispatch) => {
    //config is an asynchronous api used to load specific config data and  configuration files
    const config = {
      headers: {
        "accept": "application/json",// the client expects json ,its a data format
        
      },
    };

    try {
      const response = await axios.post(
        "/api/chat_application/user-register",
        data,
        config
      );

      localStorage.setItem("authToken", response.data.token);
      dispatch({
        type: REGISTER_SUCCESS,
        payload: {
          successMessage: response.data.successMessage,
          token: response.data.token,
        }
      })
    } catch (error) {
      dispatch({
        type: REGISTER_FAIL,
        payload: {
          error: error.response.data.error.errorMessage
        }
      })
    }
  }
}

export const userLogin = (data) => {
  return async (dispatch) => {
    //config is an asynchronous api used to load specific config data and  configuration files
    const config = {
      headers: {
        "accept": "application/json",
        // "Accept-Language": "en-US,en;q=0.8",
        // "Content-Type": "multipart/form-data"
      }
    }

    try {
      const response = await axios.post(
        "/api/chat_application/user-login",
        data,
        config
      );

      localStorage.setItem("authToken", response.data.token);
      dispatch({
        type: USER_LOGIN_SUCCESS,
        payload: {
          successMessage: response.data.successMessage,
          token: response.data.token
        }
      })
    } catch (error) {
        dispatch({
            type: USER_LOGIN_FAIL,
            payload: {
                error: error.response.data.error.errorMessage
            }
        })
      }
    }
}
export const userLogout=()=>async(dispatch)=>{
 // we need to remove authtoken in application,in cookies ,we set it empty,when we click logout
 try{
  const response=await axios.post('/api/chat_application/user-logout');
  if(response.data.success){
    // we have removed authtoken from cookies,it is also in local storage so we remove that
    localStorage.removeItem('authToken')
  dispatch({
    type:'LOGOUT_SUCCESS'
  })
  }
 }catch(error){

 }
}

