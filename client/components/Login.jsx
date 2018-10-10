import React from 'react'; 
import Button from '@material-ui/core/Button';



const Login = () => {
  const handleGoogleClick = () => {
    fetch('auth/google/', {
      mode: "no-cors",
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      }
    })
    .then(resposne => {
      console.log(response)
    });
  }
  return (
   <div id="user-login">
     <p>minn.io</p>
     <Button id="google-login-btn" onClick={handleGoogleClick}>
       Login With Google
     </Button>
   </div>
  );
};
  
  export default Login; 