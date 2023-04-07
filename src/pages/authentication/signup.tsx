import { Container } from "@mui/material";
import { useReducer } from "react";
import { Link, Navigate } from "react-router-dom";
import { useAuth } from "../../configuration/authentication/authentication";
import "./auth.css";
import { AuthAction, AuthData } from "./interfaces";

export default function SignUp() {

  const auth = useAuth();

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

  async function onSubmit(data: AuthData)  {
   console.log(await auth?.signUp(data.email, data.password));
  }

  if (auth?.user) {
    return <Navigate to={"/instances"} />
  }



  return (
    <>
      <Container
        sx={{
          width: "100%",
          minHeight: "100vh",
          maxWidth: {
            lg: "100%",
          },
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#23242a",
        }}
      >
        <div className="box" style={{
          minHeight: "550px"
        }}>
          <span className="borderline"></span>
          <form>
            <h2>Sign up</h2>
            {/* <div className="inputBox">
              <input
                type="text"
                autoComplete="full-name"
                required={true}
                onChange={(e) =>
                  dispatch({ type: "email", payload: e.target.value })
                }
              />
              <span>Full Name</span>
              <i></i>
            </div> */}
            <div className="inputBox">
              <input
                type="text"
                autoComplete="username"
                required={true}
                onChange={(e) =>
                  dispatch({ type: "email", payload: e.target.value })
                }
              />
              <span>Enter your Email: </span>
              <i></i>
            </div>
            <div className="inputBox">
              <input
                type="password"
                autoComplete="current-password"
                required={true}
                onChange={(e) =>
                  dispatch({ type: "password", payload: e.target.value })
                }
              />
              <span>Password</span>
              <i></i>
            </div>
            {/* <div className="inputBox">
              <input
                type="password"
                autoComplete="confirm-password"
                required={true}
                onChange={(e) =>
                  dispatch({ type: "password", payload: e.target.value })
                }
              />
              <span>Confirm-Password</span>
              <i></i>
            </div> */}
            <div className="links">
              <a href="#">Forgot Password</a>
              <Link to="/login">Login</Link>
            </div>
            <input
              type="button"
              value="Signup"
              onClick={(e) => {
                console.log(data);
                onSubmit(data);
              }}
            />
          </form>
        </div>
      </Container>
    </>
  );
}
