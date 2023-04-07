import { Box, Button, Card, CircularProgress, Stack, TextField } from "@mui/material";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { useState } from "react";
import { Navigate } from "react-router";
import { useAuth } from "../../configuration/authentication/authentication";
import { database } from "../../configuration/firebaseConfig";



export default function AddInstance() {
  
  const auth = useAuth();
  if (!auth || !auth?.user ) {
    return <Navigate to={"/login"} />
  }

  const [instanceName, setInstanceName] = useState<string>("");
  const [instances, setInstances] = useState<string>("");
  const [loading, setLoading] = useState(false)

  function handleIdChange(e: React.ChangeEvent<HTMLInputElement>) {
    setInstances(e.target.value);
  }
  function handleNameChange(e: React.ChangeEvent<HTMLInputElement>) {
    setInstanceName(e.target.value);
  }

  

  async function handleAdd() {
    if (!auth?.user ) return;
    const dbRef = doc(database, "instances", auth.user.uid);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);  
    }, 3000);
    try {
      await updateDoc(dbRef, {
        instances: arrayUnion({ id: instances, name: instanceName})
      })
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  }

  return (
    <Box sx={{
      width: "100%",
    }}>
      <Stack sx={{ marginTop: "80px", alignItems:  "start", justifyContent:"center", flexDirection: "row",  }}>
        <Card sx={{ padding: "20px" }}>
          <Stack sx={{ gap: "20px", alignItems: "center", minWidth: "200px", minHeight: "110px" }} >
            {loading ? <CircularProgress /> : <>
              <TextField label="Instance Name" name="Instance Name" onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleNameChange(event)} variant="outlined" />
              <TextField label="Instance Id" name="instance-id" onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleIdChange(event)} variant="outlined" />
            <Button onClick={() => handleAdd()} variant="contained" color="primary">Add Instance</Button></>}
          </Stack>
        </Card>
      </Stack>
    </Box>
  )
}