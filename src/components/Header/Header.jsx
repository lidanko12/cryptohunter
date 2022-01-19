import {
  AppBar,
  Container,
  createTheme,
  MenuItem,
  Select,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { makeStyles, ThemeProvider } from "@material-ui/styles";
import React from "react";
import { useNavigate } from "react-router-dom";
import Auth from "../Auth";
import { CryptoState } from "../CryptoContext";
import UserSideBar from "../UserSideBar";

const useStyles = makeStyles(() => ({
  title: {
    flex: 1,
    color: "gold",
    fontFamily: "Montserrat",
    fontWeight: "bold",
    cursor: "pointer",
  },
}));

const Header = () => {
  const styled = useStyles();
  const history = useNavigate();

  const { currency, setCurrency ,user} = CryptoState();

  function changeValue(e) {
    setCurrency(e.target.value);
  }
  function handleSubmit(e) {
    e.preventDefault();

    history("/");
  }

  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      type: "dark",
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <AppBar color="transparent" position="static">
        <Container>
          <Toolbar>
          <Typography
              variant="h5"
              onClick={handleSubmit}
              className={styled.title}
            >
              {" "}
              Crypto Info
            </Typography>
            <Select
              value={currency}
              onChange={changeValue}
              variant="outlined"
              style={{
                width: 100,
                height: 40,
                marginLeft: 15,
              }}
            >
              <MenuItem value={"USD"}>USD</MenuItem>
              <MenuItem value={"UAH"}>UAH</MenuItem>
              <MenuItem value={"EUR"}>EUR</MenuItem>

            </Select>
           { user? <UserSideBar/>: <Auth/>}
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
};

export default Header;
