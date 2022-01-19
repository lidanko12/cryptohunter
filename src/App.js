import React,{Suspense} from "react";
import { makeStyles } from "@material-ui/styles";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header/Header";
import AlertCom from "./components/AlertCom";
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import Loader from "./components/Loader/Loader";

 const HomePage=React.lazy(()=>import('./Pages/HomePage'));
 const CoinPage=React.lazy(()=>import('./Pages/CoinPage'));


    <Box sx={{ width: '100%' }}>
      <LinearProgress />
    </Box>



function App() {
  
  const useStyles = makeStyles(() => ({
    App: {
      backgroundColor: "#14161a",
      color: "white",
      minHeight: "100vh",
    },
  }));
  

  const classes = useStyles();
  return (
    
       (
        <div className={classes.App}>
      <Header />
      <Suspense fallback = {<Loader/>}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/coins/:id" element={<CoinPage />} />
      </Routes>
      </Suspense>
      <AlertCom/>
    </div>
      )
  )
    
}

export default App;
