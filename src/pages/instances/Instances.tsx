import {
  AppBar,
  Avatar,
  Box,
  Button,
  Container,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import { User } from "firebase/auth";
import { Link, Navigate, Outlet, useNavigate, } from "react-router-dom";
import { useAuth } from "../../configuration/authentication/authentication";
import "./instances.css";

function Instances() {
  const auth = useAuth();

  const navigate = useNavigate();

  let user: User | undefined;
  if (auth?.user) {
    user = auth.user;
  } else {
    return <Navigate to={"/"} />;
  }

  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
      }}
    >
      <AppBar elevation={0} position="static">
        <Toolbar sx={{ display: "flex", justifyContent: "space-between"}}>
          <Link to={"/instances"}>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} color="white">
            Manage Instances
            </Typography>
          </Link>

          <Stack flexDirection="row" >
            <Button color="inherit" variant="outlined" sx={{ margin: "0 20px"}} onClick={() => navigate("/instances/add")}>Add Instance</Button>
            {user ? (
              <Link to={"/user"}>
                <Avatar>
                  {user.email ? user!.email[0].toLocaleUpperCase() : ""}
                </Avatar>
              </Link>
            ) : (
              <Link
                to={"/login"}
                style={{
                  color: "inherit",
                }}
              >
                <Button variant="outlined" color="inherit">
                  Login
                </Button>
              </Link>
            )}
          </Stack>
        </Toolbar>
      </AppBar>
      <Container
        sx={{ width: "100%", display: "flex", gap: "20px" }}
      >
        <Outlet />
      </Container>
    </Box>
  );
}
export default Instances;
