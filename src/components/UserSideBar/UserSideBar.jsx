
import React,{useState} from 'react';
import { CryptoState } from '../CryptoContext';
import { Avatar, Button,Drawer } from '@material-ui/core';
import { makeStyles} from "@material-ui/styles";
import { auth ,database} from '../../firebase';
import { signOut } from '@firebase/auth';
import { doc, setDoc } from "firebase/firestore";
import { DeleteOutline } from '@mui/icons-material';
import { useNavigate } from "react-router-dom";
import WatchList from '../Watchlist/WatchList';




const useStyles=makeStyles({
    container:{
    width: 350,
    padding: 25,
    height: "100%",
    display: "flex",
    flexDirection: "column",
    fontFamily: "monospace",
    },
    picture: {
        width: 200,
        height: 200,
        cursor: "pointer",
        backgroundColor: "#EEBC1D",
        objectFit: "contain",
      },
      profile: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "20px",
        height: "92%",
      },
      logout: {
        height: "8%",
        width: "100%",
        backgroundColor:"#EEBC1D",
        marginTop: 20,
      },
      watchlist: {
        flex: 1,
        width: "100%",
        backgroundColor: "grey",
        borderRadius: 10,
        padding: 15,
        paddingTop: 10,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 12,
        overflowY: "scroll",
      },
      coin: {
        padding: 10,
        borderRadius: 5,
        color: "black",
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#EEBC1D",
        boxShadow: "0 0 3px black",
      },

})


const UserSideBar=()=> {

const [bar, setBar] = useState({
    right: false,
  });

  const{user,setAlert,watchlist} = CryptoState();
  const history = useNavigate();


  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setBar({ ...bar, [anchor]: open });
  };

  const classes = useStyles();
  const logOut = () => {
    signOut(auth);
    setAlert({
      open: true,
      type: "success",
      message: "Logout Successfully !",
    });

    toggleDrawer();
    history("/");

  };
  const removeFromWatchlist = async (coin) => {
    const coinRef = doc(database, "watchlist", user.uid);
    try {
      await setDoc(
        coinRef,
        { coins: watchlist.filter((wish) => wish !== coin?.id) },
        { merge: true }
      );

      setAlert({
        open: true,
        message: `${coin.name} Removed from the Watchlist !`,
        type: "success",
      });
    } catch (error) {
      setAlert({
        open: true,
        message: error.message,
        type: "error",
      });
    }
  };



  return (
    <div>
      {['right'].map((anchor,id) => (
        <div key={id}>
            <Avatar 
            onClick={toggleDrawer(anchor,true)}
            style={{
                height:38,
                width:38,
                marginLeft:15,
                cursor:'pointer',
                // backgroundColor:'#eebc1d',
            }}
            src={user.photoURL}
            alt={user.displayName||user.email}
            />
          <Drawer
            anchor={anchor}
            open={bar[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
              <div className={classes.container}>
              <div className={classes.profile}>
                <Avatar
                  className={classes.picture}
                  src={user.photoURL}
                  alt={user.displayName || user.email}
                />
                <span
                  style={{
                    width: "100%",
                    fontSize: 25,
                    textAlign: "center",
                    fontWeight: "bolder",
                    wordWrap: "break-word",
                  }}
                >
                  {user.displayName || user.email}
                </span>
            
                <WatchList/>
                </div>
                <Button
                variant="contained"
                className={classes.logout}
                onClick={logOut}
              >
                Log Out
              </Button>
              </div>
          </Drawer>
        </div>
      ))}
    </div>
  );
}

export default UserSideBar;