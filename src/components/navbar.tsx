/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useEffect } from "react";
import { AppBar, TextField, Box } from "@mui/material";
import { MyType } from "@/type/type";

export const Navbar = ({
  searchInput,
  setSearchInput,
  pokemons,
  setPokemon,
  setFilterPokemon,
  setPageNotFound,
  setLoading,
}: {
  searchInput: string;
  setSearchInput: React.Dispatch<React.SetStateAction<string>>;
  pokemons: MyType.PokemonType[],
  setPokemon: React.Dispatch<React.SetStateAction<MyType.PokemonType[]>>,
  setFilterPokemon: React.Dispatch<React.SetStateAction<MyType.PokemonType[]>>;
  setPageNotFound: React.Dispatch<React.SetStateAction<boolean>>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
}) => {

  const handleSearchChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const query = e.target.value;
    setSearchInput(query);

    if (query) {
      const searchPokemon = pokemons.filter((pokemons) =>
        pokemons.name.toLowerCase().includes(query)
      );
      setFilterPokemon(searchPokemon);
      if (searchPokemon.length < 1) {
        setPageNotFound(true);
      }
    } else {
      setFilterPokemon(pokemons);
      setPageNotFound(false);
    }
  }

  return (
    <Box sx={{ textAlign: "center" }}>
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/International_Pok%C3%A9mon_logo.svg/2560px-International_Pok%C3%A9mon_logo.svg.png"
        width="auto"
        height="50px"
      />
      <AppBar
        position="static"
        elevation={0}
        sx={{ backgroundColor: "white", padding: "12px" }}
      >
        <TextField
          value={searchInput}
          onChange={handleSearchChange}
          label="Search Your Pokemon :)"
          variant="standard"
        />
      </AppBar>
    </Box>
  );
};
