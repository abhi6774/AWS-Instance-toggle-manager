import { Container } from "@mui/material";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useEffect, useReducer } from "react";
import { Link, Navigate, redirect } from "react-router-dom";
import { useAuth } from "../../configuration/authentication/authentication";
import { app } from "../../configuration/firebaseConfig";
import "./auth.css";
import { AuthAction, AuthData } from "./interfaces";



// interface Props { onSubmit: (data: LoginData) => void }



export default function Login() {

  const auth = useAuth();


  useEffect(() => {
    console.log(auth);
  }, [auth?.user])

  const [data, dispatch] = useReducer((state: AuthData, action: AuthAction) => {
    console.log(state);
    switch (action.type) {
      case "email":
        return { ...state, email: action.payload }
      case "password": 
        return { ...state, password: action.payload }
    }
  }, {
    email: "",
    password:  ""
  });
  
  if (auth?.user) {
    return <Navigate to={"/instances"} />
  }



  async function onSubmit(data: AuthData)  {
   console.log( await auth?.login(data.email, data.password));
  }


  return (
    <Container sx={{
      width: "100%",
      minHeight: "100vh",
      maxWidth: {
        lg: "100%"
      },
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#23242a"
    }}>
      <div className="box">
        <span className="borderline"></span>
        <form>
          <h2>Sign in</h2>
          <div className="inputBox">
            <input type="text" autoComplete="username" required={true} onChange={(e) => dispatch({ type: "email", payload: e.target.value })} />
            <span>Username</span>
            <i></i>
          </div>
          <div className="inputBox">
            <input type="password" autoComplete="current-password" required={true} onChange={(e) => dispatch({ type: "password", payload: e.target.value })} />
              <span>Password</span>
              <i></i>
          </div>
          <div className="links">
            <a href="#">Forgot Password</a>
            <a href="#"></a>
            <Link to={"/signup"}>Signup</Link>
          </div>
          <input type="button" value="Login" onClick={(e) => { console.log(data); onSubmit(data); }} />
        </form>
      </div>
    </Container>
  );
}