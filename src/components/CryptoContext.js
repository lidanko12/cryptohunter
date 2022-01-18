import React, { createContext, useContext, useState,useEffect } from 'react'
import axios from 'axios';
import { CoinList } from '../api/api';
import { onAuthStateChanged } from '@firebase/auth';
import { auth } from '../firebase';
import { onSnapshot, doc } from "firebase/firestore";
import { database } from "../firebase";

const Crypto= createContext();

const CryptoContext = ({children}) => {
    const [currency,setCurrency]=useState('USD');
    const [symbol,setSymbol]=useState('');
    const [coins, setCoins] = useState([]);
    const [loading, setLoading] = useState(false);
    const[email,setEmail]=useState('');
    const [password,setPassword]=useState('')
    const [open,setOpen]=useState(false)
    const[user,setUser]=useState(null);
    const [alert, setAlert] = useState({
    open: false,
    message: "",
    type: "success",
  });
  const [watchlist, setWatchlist] = useState([]);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) setUser(user);
      else setUser(null);
    });
  }, []);

  const getCoins = async () => {
    setLoading(true);
    const { data } = await axios.get(CoinList(currency));
    setCoins(data);
    setLoading(false);
  };

  useEffect(() => {
    if (user) {
      const coinRef = doc(database, "watchlist", user?.uid);
      const unsubscribe = onSnapshot(coinRef, (coin) => {
        if (coin.exists()) {
          setWatchlist(coin.data().coins);
        } 
      });

      return () => {
        unsubscribe();

      };
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);


    useEffect(() => {
        if(currency==="USD") setSymbol('$');
        else if (currency==="UAH") setSymbol('₴');
        else if (currency==='EUR') setSymbol('€');
            
    }, [currency]);
    return (
        <Crypto.Provider value={{watchlist,open,setOpen,coins,user,loading,currency,symbol,setCurrency,getCoins,alert,email,password,setEmail,setPassword,
          setAlert}}>
            {children}
        </Crypto.Provider>
    )
}

export default CryptoContext

export const CryptoState=()=>{
    return useContext(Crypto)
}
