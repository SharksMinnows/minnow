import React from 'react'; 
import Button from '@material-ui/core/Button';
// import { Link } from 'react-router-dom';


const Login = () => {
  return (
    <div id="user-login">
      <Button label="login-with-google" containerelement={<a href="localhost:3333/auth/google"> </a>}>Login With Google</Button>
    </div>
  )
}
      // <Button><a href="/auth/google"></a>
      //   Login With Google, Bro.

export default Login; 


//OAuth Flow 

<a href="/auth/google">Sign In with Google</a>