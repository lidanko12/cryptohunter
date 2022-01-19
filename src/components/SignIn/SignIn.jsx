import React, { useState } from 'react'
import { TextField,Button,Box } from "@material-ui/core";
import { CryptoState } from '../CryptoContext';
import { signInWithEmailAndPassword } from '@firebase/auth';
import { auth } from '../../firebase';

const SignIn = ({handleClose}) => {
    // const [email, setEmail] = useState('')
    // const [password, setPassword] = useState('');
    const {setAlert,email,setEmail,password,setPassword}=CryptoState();
    const handleChangePassword=(e)=>{
        setPassword(e.target.value)
    }
    const handleChangeEmail=(e)=>{
        setEmail(e.target.value)
    }
    const handleSubmitForm = async () => {
      if (!email || !password) {
        setAlert({
          open: true,
          message: "Please fill all the Fields",
          type: "error",
        });
        return;
      }
  
      try {
        const result = await signInWithEmailAndPassword(auth, email, password);
        setAlert({
          open: true,
          message: `Sign Up Successful. Welcome ${result.user.email}`,
          type: "success",
        });
  
        handleClose();
      } catch (error) {
        setAlert({
          open: true,
          message: error.message,
          type: "error",
        });
        return;
      }
    };
  
    return (
        <>
      <form onSubmit={handleSubmitForm}>
        <Box
          p={3}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          <TextField
            variant="outlined"
            type="text"
            label="Email"
            value={email}
            name="email"
            id="email"
            placeholder="Enter Email"
            fullWidth
            onChange={handleChangeEmail}
          />
          <TextField
            variant="outlined"
            type="password"
            label="Password"
            id="password"
            value={password}
            name="password"
            placeholder="Enter Password"
            fullWidth
            onChange={handleChangePassword}
          />
          <Button variant='contained'
          size="large"
          style={{
              backgroundColor:'#eebc1d'
          }}
          onClick={handleSubmitForm}>Sing In</Button>
        </Box>
      </form>
    </>
  );
};  

export default SignIn
