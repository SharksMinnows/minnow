import React from 'react'; 
import Button from '@material-ui/core/Button';



const Login = () => {
  return (
    <div id="user-login">
      <Button label="login-with-google" containerelement={<a href="localhost:3333/auth/google"> </a>}>Login With Google</Button>
    </div>
  )
}

export default Login; 