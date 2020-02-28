import React, {useState, useEffect} from "react";

//ultils
import {axiosWithAuth} from '../utils/axiosWithAuth';

const Login = () => {
  const [logInFormValue, setLogInFormValue]= useState({});

  // make a post request to retrieve a token from the api
  const handleLogInSubmit= (e) => {
    e.preventDefault();

    axiosWithAuth()
      .post('/api/login', {logInFormValue})
      .then(res => {
        console.log(res);
      })
      .catch(err => {console.log(err.response.data.error);})

    console.log('submitted!');
  }//end handleLogInSubmit
  // when you have handled the token, navigate to the BubblePage route

  const handleChange= e => {
    console.log('change: ', e.target.value);
    setLogInFormValue({
      ...logInFormValue,
      [e.target.name]: e.target.value
    });
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
