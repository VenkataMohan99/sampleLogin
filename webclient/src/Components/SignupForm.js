import React, { useRef } from 'react'
import { Link } from 'react-router-dom';

function SignupForm() {
    let userNameInputRef=useRef();
    let emailIdInputRef=useRef();
    let passwordInputRef=useRef();
    let signupDetails=async()=>{
        let sendData=new FormData();
        sendData.append('userName',userNameInputRef.current.value);
        sendData.append('emailId',emailIdInputRef.current.value);
        sendData.append('password',passwordInputRef.current.value);
        let reqOptions={
            method:'POST',
            body:sendData
        }
        let rawData=await fetch('http://localhost:9985/signUp',reqOptions); 
        let convertedData=await rawData.json();
        console.log(convertedData); 
        alert(convertedData.status); 
    }
  return (
    <div>
        <form>
            <fieldset>
                <h1>Sign Up </h1>
                <div>
                    <input ref={userNameInputRef} placeholder='Enter User Name'></input>
                </div>

                <div>
                    <input ref={emailIdInputRef} placeholder='Enter Email Id'></input>
                </div>

                <div>
                    <input ref={passwordInputRef} placeholder='Enter Password'></input>
                </div>
                <button type='button' onClick={()=>{
                    signupDetails();
                }}>Sign up</button>
            </fieldset>
        </form>
        <Link to='/'>Login</Link>
    </div>
  )
}

export default SignupForm