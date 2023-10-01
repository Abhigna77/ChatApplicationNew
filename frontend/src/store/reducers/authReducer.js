
import {REGISTER_FAIL,SUCCESS_MESSAGE_CLEAR,ERROR_CLEAR,REGISTER_SUCCESS,USER_LOGIN_FAIL,USER_LOGIN_SUCCESS,LOGOUT_SUCCESS} from "../types/authType"
import deCodeToken from 'jwt-decode';
const authState={
    loading:true,
    authenticate:false,
    error: '',
    sucessMessage:'',
    myInfo:'',
} 
//jwtdecode
const tokenDecode=(token)=>{
const tokenDecoded=deCodeToken(token);
const expTime=new Date(tokenDecoded.exp*1000);
if(new Date()>expTime){ 
    return null;
}
    return tokenDecoded;

}
const getToken=localStorage.getItem('authToken');
if(getToken){
    const getInfo=deCodeToken(getToken);
    if(getInfo){
        authState.myInfo=getInfo;
        authState.authenticate=true;
        authState.loading=false;
        authState.error='';
        //added
        
    }
}

export const authReducer=(state=authState,action)=>{
    const {payload,type}=action;
    if(type===REGISTER_FAIL || type===USER_LOGIN_FAIL ){
        return {
            ...state,
            error:payload.error,
            authenticate:false,
            myInfo:'',
            loading:true,
        }
    }
    if(type===REGISTER_SUCCESS || type===USER_LOGIN_SUCCESS){
        const myInfo=tokenDecode(payload.token);
         return{
            ...state,
            myInfo:myInfo, 
            // in authAction success message is in payload, and that response.data.successMessage is in authController
            successMessage:payload.successMessage,
            error:'',
            authenticate:true,
            loading:false,
            
         }
    }
    if(type===SUCCESS_MESSAGE_CLEAR){
        return{
            ...state,
            successMessage:''
        }
    }
    if(type===ERROR_CLEAR){
        return{
            ...state,
            error:''
        }
    }

if(type===LOGOUT_SUCCESS){
    return{
        ...state,
        authenticate:false,
        
        successMessage:'Logout is Successful',
        myInfo:''
    }
}


    return state;
}