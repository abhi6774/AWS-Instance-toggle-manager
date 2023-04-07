import { Start, Stop } from "@mui/icons-material";
import { Box, Button, Card, CircularProgress, Container, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router";
import App from "../../App";
import { useAuth } from "../../configuration/authentication/authentication";
import { useDatabase } from "../../configuration/data/database";
import { InstanceInterface } from "../../configuration/data/interface";
interface InstanceResolverInterface { id: string, public_ip: string, public_dns: string, state: string, stateCode: number }

function Loading() {
  
  return <Stack sx={{ width: "100%", minHeight: "80vh", justifyContent: "center", alignItems: "center"}}><CircularProgress /></Stack>
}

export default function ManageInstance() {
  const auth = useAuth();
  const { state } = useLocation();
  const datastore = useDatabase();
  const { instanceId, instanceName } = state;

  if (!auth?.user) {
    return <Container>
      <Typography>Please Login or Signup First</Typography>
      <App />
    </Container>
  }


  const params = useParams();
  const [instanceDetails, setInstanceDetails] = useState<InstanceResolverInterface>();
  const [loading, setLoading] = useState(false);

  const [instance, setInstance] = useState<InstanceInterface>();

  function getInstanceDetials(id: string) {
    const url = `http://localhost:3000/aws/${id}`;
    setLoading(true);
    fetch(url)
      .then((data) => data.json())
      .then((value) => setInstanceDetails(value))
      .catch((err) => console.log("err"))
      .finally(() => {
        setLoading(false);
      })
  }
  function startInstanceDetials(id: string) {
    console.log("Starting the Instance", id);
    
    const url = `http://localhost:3000/aws/start/${id}`;
    setLoading(true);
    fetch(url)
    .then((data) => data.json())
    .then((value) => setInstanceDetails(value))
    .catch((err) => console.log("err"))
    .finally(() => {
      setLoading(false);
    })
  }
  function stopInstanceDetials(id: string) {
    console.log("Stopping the Instance", id);
    const url = `http://localhost:3000/aws/stop/${id}`;
    setLoading(true);
    fetch(url)
      .then((data) => data.json())
      .then((value) => setInstanceDetails(value))
      .catch((err) => console.log("err"))
      .finally(() => {
        setLoading(false);
      })
  }

  useEffect(() => {
    if (params.instanceId){
      (window as any).instance = datastore.instancesList;
      setInstance(datastore.instancesList.find((v) => v.id === params.instanceId));
      getInstanceDetials(params.instanceId);
    }
    
  }, []);
  return (
    <Box sx={{ width: "100%", margin: "20px"}}>
      {
        loading ?  <Loading />: 
        <Card sx={{ padding: 4 }}>
          <Stack sx={{ alignItems: "start" }}>
              <Typography><span style={{ fontWeight: "bold"}}>Instance Name:</span> { instance?.name }</Typography>
              <Typography><span style={{ fontWeight: "bold"}}>Instance Id:</span> { instance?.id }</Typography>
              <Typography><span style={{ fontWeight: "bold"}}>Instance Public DNS:</span> { instanceDetails?.public_dns }</Typography>
              <Typography><span style={{ fontWeight: "bold"}}>Instance State:</span> { instanceDetails?.state }</Typography>
              <Typography><span style={{ fontWeight: "bold"}}>Instance StateCode:</span> { instanceDetails?.stateCode }</Typography>
              <Container sx={{ marginTop: 4}}>
                {instance?.id && instanceDetails?.state && instanceDetails.state.includes("stop")  ? <Button variant="outlined">Start <Start sx={{ marginLeft: 2 }} onClick={() => startInstanceDetials(instance.id)} /></Button> : ""}
                { instance?.id && instanceDetails?.state && /(start|running)/.test(instanceDetails.state) ?<Button variant="outlined" onClick={() => stopInstanceDetials(instance.id)}>Stop <Stop sx={{ marginLeft: 2 }} /></Button> : ""}
              </Container>
          </Stack>
        </Card>
      }
    </Box>
  );
}