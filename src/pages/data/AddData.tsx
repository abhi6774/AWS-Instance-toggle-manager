import { Button, Card, Stack, TextField } from "@mui/material";
import { addDoc, collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { database } from "../../configuration/firebaseConfig";
import PresentData from "./PresentData";

export default function AddData() {

  const dbInstance = collection(database, "brands");
  
  
  const [brand, setBrand] = useState({
    chocolate: "",
    chips: ""
  });

  function handleOnChange(e: React.ChangeEvent<HTMLInputElement>) {
    setBrand({ ...brand, [e.target.name]: e.target.value });
  }

  async function handleAdd() {
    await addDoc(dbInstance, brand);
  }


  async function getData() {
    setReceivedData((await getDocs(dbInstance)).docs.map((item) => ({ ...item.data(), id: item.id })));
  }

  const [receivedData, setReceivedData] = useState<any[]>();

  useEffect(() => {
    getData();
  }, []);


  function handleDelete(id: string) {
    console.log(id);
    
    const dtd =  doc(dbInstance, id)
    deleteDoc(dtd)
      .then(() => {
        alert("Data deleted");
        getData();
      }).catch((err) => { alert(err); })
  }

  return (
    <>
      <Stack sx={{ alignItems: "center", justifyContent: "space-evenly", flexDirection: "row", minHeight: "100vh" }}>
        {receivedData ? <PresentData onDelete={handleDelete} rows={receivedData} /> : ""}
        <Card sx={{ padding: "20px" }}>
          <Stack sx={{ gap: "20px" }} >
            <TextField label="Chocolate Brand" name="chocolate" onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleOnChange(event)} variant="outlined" />
            <TextField label="Chips Brand" name="chips" onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleOnChange(event)} variant="outlined" />
            <Button onClick={() => handleAdd()} variant="contained" color="primary">Add Data</Button>
            <Button onClick={() => getData()} variant="contained" color="primary">Get Data</Button>
          </Stack>
        </Card>
      </Stack>
    </>
  );
}

