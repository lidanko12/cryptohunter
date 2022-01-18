import { TextField, Button } from "@material-ui/core";
import { Box } from "@mui/system";
import { auth } from "../../firebase";
import { createUserWithEmailAndPassword } from "@firebase/auth";
import React, { useState } from "react";
import { CryptoState } from "../../components/CryptoContext";

const SignUp = ({ handleClose }) => {
  const [name, setName] = useState("");
  const { setAlert, email, password, setEmail, setPassword } = CryptoState();

  const handleChangeName = (e) => {
    setName(e.target.value);
  };

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmitForm = async () => {
    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
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
      <form>
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
            id="name"
            name="name"
            value={name}
            type="text"
            label="Name"
            placeholder="Enter Name"
            fullWidth
            required
            onChange={handleChangeName}
          />
          <TextField
            variant="outlined"
            type="text"
            label="Email"
            // value={email}
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
            // value={password}
            id="password"
            name="password"
            placeholder="Enter Password"
            fullWidth
            onChange={handleChangePassword}
          />
          <Button
            variant="contained"
            size="large"
            style={{
              backgroundColor: "#eebc1d",
            }}
            onClick={handleSubmitForm}
          >
            Sing UP
          </Button>
        </Box>
      </form>
    </>
  );
};

export default SignUp;
