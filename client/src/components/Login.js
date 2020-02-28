import React, {useState} from "react";
import axios from 'axios';

//ultils
import {axiosWithAuth} from '../utils/axiosWithAuth';

const Login = () => {
  const [logInFormValue, setLogInFormValue]= useState({
    username: '',
    password: ''
  });

  // make a post request to retrieve a token from the api
  const handleLogInSubmit= (e) => {
    e.preventDefault();
    axios
      .post('http://localhost:5000/api/login', logInFormValue)
      .then(res => {
        console.log(res.data.payload);
        window.localStorage.setItem('token', res.data.payload)
      })
      .catch(err => {console.log(err.response.data.error);})
    console.log('submitted!', logInFormValue);
  }//end handleLogInSubmit

  const handleChange= e => {
    setLogInFormValue({
      ...logInFormValue,
      [e.target.name]: e.target.value
    });
    console.log('change: ', e.target.value);
  }//end handleChange

  return (
    <>
      <h1>Welcome to the Bubble App!</h1>
      <p>Build a login page here</p>
      {console.log('form value from state: ', logInFormValue)}
      <form onSubmit= {handleLogInSubmit}>
        <h2>Log In</h2>
        <label htmlFor= 'username'></label>
        <input 
          onChange= {handleChange}
          value= {logInFormValue.username}
          type= 'text'
          id= 'username'
          name= 'username'
          placeholder= 'User Name'
        />

        <label htmlFor= 'password'></label>
        <input 
          onChange= {handleChange}
          value= {logInFormValue.password}
          type= 'text'
          id= 'password'
          name= 'password'
          placeholder= 'Password'
        />
        <button type= 'submit'>Submit</button>
      </form>
    </>
  );
};

export default Login;
