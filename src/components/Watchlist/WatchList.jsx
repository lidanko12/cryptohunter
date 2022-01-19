import React from 'react';
import { makeStyles} from "@material-ui/styles";
import { database} from '../../firebase';
import { doc, setDoc } from "firebase/firestore";
import { numberWithCommas } from '../../Pages/CoinPage';
import { CryptoState } from '../CryptoContext';
import { DeleteOutline } from '@mui/icons-material';

const useStyles=makeStyles({
    container:{
        width: 350,
        padding: 25,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        fontFamily: "monospace",
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





const WatchList = () => {
    const{user,setAlert,watchlist,coins,symbol} = CryptoState();
    const classes = useStyles();


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
  return <div>
                    <div className={classes.container}>

          <div  className={classes.watchlist}>
                <span style={{ fontSize: 15, textShadow: "0 0 5px black" }}>
                    Watchlist
                  </span>
                  {coins.map((coin,index) => {
                    if (watchlist.includes(coin.id))
                      return (
                        <div  key= {index}className={classes.coin}>
                          <span>{coin.name}</span>
                          <span style={{ display: "flex", gap: 8 }}>
                            {symbol}{" "}
                            {numberWithCommas(coin.current_price.toFixed(2))}
                            <DeleteOutline
                              style={{ cursor: "pointer" }}
                              fontSize="16"
                              onClick={() => removeFromWatchlist(coin)}
                            />
                          </span>
                        </div>
                      );
                    else return <div key={index}></div>;
                  })}
                </div>
            </div>
  </div>;
};

export default WatchList;
