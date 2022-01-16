import { makeStyles } from "@material-ui/styles";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header/Header";
import CoinPage from "./Pages/CoinPage";
import HomePage from "./Pages/HomePage";
import AlertCom from "./components/AlertCom";

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
    <div className={classes.App}>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/coins/:id" element={<CoinPage />} />
      </Routes>
      <AlertCom/>
    </div>
  );
}

export default App;
