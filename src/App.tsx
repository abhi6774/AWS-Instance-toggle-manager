import { AppBar, Box, Button, Card, Container, Stack, TextField, Typography, colors } from "@mui/material";
import { createContext, useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router";
import { Link } from "react-router-dom";
import "./App.css";
import { AuthProvider, useAuth } from "./configuration/authentication/authentication";
import { PokemonProvider, usePokemon } from './store';

function getUrl(id: number) {
  let idStr = id.toString();
  if (idStr.length < 3) {
    for (let i = 0; i < 3 - id.toString().length; i++) {
      idStr = '0' + idStr;
    }
  }
  return `https://raw.githubusercontent.com/fanzeyi/pokemon.json/master/thumbnails/${idStr}.png`;
}

function PokemonList() {
  const { pokemon } = usePokemon();
  return (
    <ul
      className="pokelist"
      style={{
        display: 'grid',
        width: '80%',
        margin: 'auto',
        gridTemplateColumns: 'repeat(3, auto)',
        // gridAutoRows: '200px',
        padding: 0,
        listStyle: 'none',
        gap: '20px',
      }}
    >
      {pokemon.map((pkm) => {
        return (
          <li key={pkm.id}>
            <Card variant="outlined" sx={{
              padding: "20px 40px",
              display: "flex",
              alignItems: "center", 
              justifyContent: "space-evenly",
              // flexDirection: "column"
            }}>
                <img
                  style={{ maxWidth: '100%', maxHeight: '80%' }}
                  alt={pkm.name.english}
                  src={getUrl(pkm.id)}
                />
                <Typography>{pkm.name.english}</Typography>
            </Card>
            
          </li>
        );
      })}
    </ul>
  );
}

function SearchBox() {
  const { search, setSearch } = usePokemon();
  return (
    <Container sx={{
      maxWidth: "400px",
      minWidth: "200px",
      margin: "20px"
  }}>
    <TextField value={search} onChange={(e) => setSearch(e.target.value)} sx={{ width:  "100%"}} id="outlined-basic" label="Search Pokemon" variant="outlined" />
  </Container>
  );
}

function App() {
  const auth = useAuth();
  let user = auth ? auth.user : undefined;

  if (!user) {
      return <Navigate to={"/signup"} />
  }



  return (
    <Stack sx={{
      width: "100%",
      minHeight: "100vh",
      alignItems: "center",
      justifyContent: "center"
    }}>
      <Stack sx={{
        gap: "24px",
        margin: "auto",
        flexDirection: "row"
      }}>
        <Link to={"/login"}><Button variant="outlined">Login</Button></Link>
        <Link to={"/signup"}><Button variant="outlined">Signup</Button></Link>
      </Stack>
    </Stack>
  );
}
 
export default App;
