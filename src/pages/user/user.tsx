import { Delete, Logout } from "@mui/icons-material";
import { Box, Button, Card, Container, Stack, Typography } from "@mui/material";
import { Navigate } from "react-router";
import { useAuth } from "../../configuration/authentication/authentication";

export default function User() {
  const auth = useAuth();

  if (!auth?.user) {
    return <Navigate to={"/"} />
  }

  const user = auth.user;

  return (
    <Stack sx={{
      width: "100%",
      height: "100vh",
      alignItems: "center",
      marginTop: "40px"
    }}>
        <Card sx={{
          maxWidth: "400px",
          minHeight: "200px",
          padding: "20px"
        }}>
        <Stack>
          <Typography variant="body1">Email: <Typography component="span" variant="body1">{user.email}</Typography></Typography>
          <Stack sx={{ flexDirection: "row", gap: "20px", marginTop: "16px" }}>
            <Button variant="outlined" onClick={() => {auth?.logout()}}><Logout /> Logout</Button>
            <Button variant="contained" color="warning" onClick={()=> auth.deleteAccount()}>
              <Delete /> Delete Account</Button>
          </Stack>
        </Stack>
        </Card>
    </Stack>
  )
}