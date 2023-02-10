import React, { useRef } from 'react'
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

function LoginForm() {
    let emailIdInputRef=useRef();
    let passwordInputRef=useRef();
    let navigate=useNavigate();
    let dispatch=useDispatch();
    let loginDetails=async()=>{
        let sendData=new FormData();
        sendData.append("emailId",emailIdInputRef.current.value);
        sendData.append('password',passwordInputRef.current.value);
        let reqOptions={
            method:"POST",
            body:sendData
        }
        let rawData=await fetch("/login",reqOptions);
        let convertedData=await rawData.json();
        console.log(convertedData);
        if(convertedData.login === true){  
             navigate('/dashBoard');
             dispatch({type:convertedData.login,
            data:convertedData.userDetails});
        }else{
            alert(convertedData.status);
            return navigate('/');
        }

    }
  return (
    <div>
        <form>
            <fieldset>
                <h1>Login</h1>
                <div>
                    <input ref={emailIdInputRef} placeholder='Enter Email Id'></input>
                </div>
                <div>
                    <input ref={passwordInputRef} placeholder='Enter Password'></input>
                </div>
                <button type='button' onClick={()=>{
                   loginDetails();
                }}>Login</button>
            </fieldset>
        </form>
        <Link to='/signup'>Sign Up</Link>
    </div>
  )
}

export default LoginForm