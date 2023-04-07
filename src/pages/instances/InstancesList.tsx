import { Box, Button, Card, Stack, Typography } from "@mui/material";
import { Unsubscribe, collection, doc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../../configuration/authentication/authentication";
import { useDatabase } from "../../configuration/data/database";
import { InstanceInterface } from "../../configuration/data/interface";
import { database } from "../../configuration/firebaseConfig";

export default function ListInstances() {
  // const dbInstance = collection(database, "instances");
  const navigate = useNavigate();
  const datastore = useDatabase();
  
  const auth = useAuth();
  if (!auth || !auth?.user ) {
    return <Navigate to={"/login"} />
  }
  
  let unsub: Unsubscribe;
  async function getData() {
    if (!auth?.user) return;
    console.log(auth.user.uid)
    const ref = doc(database, "instances", auth.user.uid);
    unsub = onSnapshot(ref, (doc) => {
      const source = doc.metadata.hasPendingWrites ? "Local" : "Server";
      const data = doc.data();
      console.log(source, " data: ", data);
      datastore.setInstancesList ? datastore.setInstancesList(data!["instances"] as InstanceInterface[]) : "";
    });
  }

  useEffect(() => {

    getData();
    () => {
      unsub();
    }
  }, []);



  return (
    <Stack sx={{ width: "100%", flexDirection: "row", alignItems: "center", gap: "20px", margin: "32px 44px" }}>
      {
        datastore.instancesList ? (datastore.instancesList)
          .map((instance) => (
            <Card key={instance.id} sx={{ padding: "20px", }}>
              <Box sx={{ minWidth: "250px", minHeight: "200px",position: "relative" }}>
                <Typography variant="h6">{instance.name}</Typography>
                <Button sx={{ position: "absolute", bottom: 0, right: 0}} variant="outlined" onClick={() => navigate(`/instances/manage/${instance.id}`, { state: { instanceId: instance.id, instanceName: instance.name } })}>Manage</Button>
              </Box>
            </Card>
          )
          ) : ""
      }
    </Stack>
  );
}