import React,{useState} from 'react';
// import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import SignIn from '../SignIn';
import SignUp from '../SignUp';
import { AppBar,makeStyles } from '@material-ui/core';
import Fade from '@mui/material/Fade';
import { Tab, Tabs } from '@mui/material';
import GoogleButton from 'react-google-button';
import { auth } from '../../firebase';
import { CryptoState } from '../CryptoContext';
import { GoogleAuthProvider, signInWithPopup } from '@firebase/auth';
import Box from '@mui/material/Box';
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';

const useStyles = makeStyles((theme) => ({
    modal: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    paper: {
      width: 400,
      backgroundColor: theme.palette.background.paper,
      color: "white",
      borderRadius: 10,
    },
    google: {
      padding: 24,
      paddingTop: 0,
      display: "flex",
      flexDirection: "column",
      textAlign: "center",
      gap: 20,
      fontSize: 20,
    },
  }));

export const Auth=()=> {
  // const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [value, setValue] =  useState(0);
  const {setAlert,open,setOpen}=CryptoState()

  const handleChange = (_, newValue) => {
    setValue(newValue);
  };

  const classes = useStyles();
  const googleProvider = new GoogleAuthProvider();

  const signInWithGoogle=()=>{
    signInWithPopup(auth,googleProvider).then(res=>{
      setAlert({
        open:true,
        message:`Sign Up Successful Welcome ${res.user.email}`,
        type:'success',
      })
      handleClose();
    })
    .catch((error) => {
      setAlert({
        open: true,
        message: error.message,
        type: "error",
      });
      return;
    });
  }


  return (
    <div>
      <Button variant='contained' 
      style={{
          marginLeft:20,
          backgroundColor:'#eebc1d',
      }}
      onClick={handleOpen} endIcon={<LoginOutlinedIcon/>}>Sing In</Button>
     <Modal 
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        // BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
          <Fade in={open}>
          <div className={classes.paper}>
              <AppBar position='static' 
              style={{
                  backgroundColor:'transparent',
                  color:"white", 
              }}>
                <Tabs 
                value={value}
                onChange={handleChange}
                textColor="inherit"
                TabIndicatorProps={{
                  sx: {
                    backgroundColor: 'red',
                    height: 3,
                  },
                }}
                variant='fullWidth'
                style={{
                    borderRadius:10
                }}>
                <Tab label ="Sing in"/>
                <Tab label ="Sing up"/>
                </Tabs>

              </AppBar>
              {value===0&& <SignIn handleClose={handleClose}/>}
              {value===1&& <SignUp handleClose={handleClose}/>}
              <Box className={classes.google}>
                <span>OR</span>
                <GoogleButton style={{
                  width:'100%',
                  outline:'none',
                }}
                onClick={signInWithGoogle}/>
              </Box>
          </div>
          </Fade>
      </Modal>
    </div>
  );
}
   export default Auth;