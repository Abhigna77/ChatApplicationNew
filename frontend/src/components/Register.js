import React from 'react'
import {useState,useEffect} from 'react'
import {Link,useNavigate} from 'react-router-dom';
import {useDispatch,useSelector} from "react-redux";
import {userRegister} from '../store/actions/authAction';
import { useAlert } from 'react-alert';
import { ERROR_CLEAR, SUCCESS_MESSAGE_CLEAR } from '../store/types/authType';
//useSelector is used to get the properties IN CHILD COMPONENTS
const Register = () => {
  const navigate=useNavigate();// allows  you to navigate to different routes
const alert=useAlert();
const {loading,authenticate,error,successMessage,myInfo}=useSelector(state=>state.auth);
//auth is in index.js,the name for authreducer
console.log(myInfo);

  
  const dispatch = useDispatch();

  const [state,setState]=useState(
    {
      userName:'',
      email:'',
      password:'',
      confirmPassword:'',
      image:''
    }
  )
  const [loadImage,setLoadImage]=useState('');
  const inputHandle=(e)=>{
    setState({
      ...state,
      [e.target.name]:e.target.value,
    })
  }
  const fileHandle=e=>{
       if(e.target.files.length !==0){
        setState({
          ...state,
          [e.target.name]:e.target.files[0]
        })
       }
      const reader=new FileReader(); // to read the content of the file
      reader.onload=()=>{// sets up an event handler for when reading is done
        setLoadImage(reader.result);// reader.result is files data encoded as a data url
      }
      reader.readAsDataURL(e.target.files[0]);
       
  }
  const register=e=>{
    const {userName,email,password,confirmPassword,image}=state;

    e.preventDefault();// to prevent the default behaviour of an event occuring
    const formData= new  FormData();
    formData.append('userName',userName);
    formData.append('email',email);
    formData.append('password',password);
    formData.append('confirmPassword',confirmPassword);
    formData.append('image',image);
    dispatch(userRegister(formData));
     
  } 
   
useEffect(()=>{
if(authenticate){
  navigate('/');
}


if(successMessage){
  alert.success(successMessage);
  dispatch({type:SUCCESS_MESSAGE_CLEAR})
}
if(error){
  error.map(err=>alert.error(err));
  dispatch({type:ERROR_CLEAR})
}

},[successMessage,error])



  return (
    <div className="register">
       <div className='card'>
        <div className='card-header'>
          <h3>Register</h3>
        </div>
        <div className='card-body'>
            <form onSubmit={register}>
              <div className='form-group'>
                  <label htmlFor='username'>User Name</label>
                  <input type="text" className='form-control' onChange={inputHandle} name="userName" value={state.userName}  placeholder='User Name' id='username'/>
              </div>
              <div className='form-group'>
                  <label htmlFor='email'>Email</label>
                  <input type="email" className='form-control' onChange={inputHandle} name="email" value={state.email} placeholder='Email' id='email'/>
              </div>
              <div className='form-group'>
                  <label htmlFor='password'>Password</label>
                  <input type="password" className='form-control' onChange={inputHandle} name="password" value={state.password} placeholder='Password' id='password'/>
              </div>
              <div className='form-group'>
                  <label htmlFor='confirmPassword'>Confirm Password</label>
                  <input type="password" className='form-control' onChange={inputHandle} name="confirmPassword" value={state.confirmPassword} placeholder='Confirm Password' id='confirmPassword'/>
              </div>
              <div className='form-group'>
                 <div className='file-image'>
                     <div className='image'>
                         {loadImage?<img src={loadImage}/>:''}
                     </div>
                     <div className='file'>
                      <label htmlFor='image'>Select Image</label>
                     <input type="file" onChange={fileHandle}  className='form-control'  name="image"   id='image'/>
                     
                     </div>
                 </div>
              </div>
              <div className="form-group">
                <input type="submit" value="register" className='btn' />
              </div>
              <div className='form-group'>
                <span><Link to="/login">Login Your Account</Link></span>
             </div> 
            </form>
        </div>
       </div>
    </div>
  )
}

export default Register