'use client'
import React, { useEffect, useState } from 'react'
import { MyType } from '@/type/type'
import { Navbar } from '../../components/navbar'
import { PokeGrid } from '../../components/pokeGrid'
import { Box } from '@mui/material'
import { fetchPokemon } from '@/api/api'

export const MainPage = () => {
  const [pokemons, setPokemon] = useState<MyType.PokemonType[]>([]);
  const [filterPokemon, setFilterPokemon] = useState<MyType.PokemonType[]>(pokemons);
  const [isLoading, setLoading] = useState<boolean>(true);
  const [searchInput, setSearchInput] = useState<string>("");
  const [pageNotFound, setPageNotFound] = useState<boolean>(false)

  useEffect(() => {
    setLoading(true)
    try {
      fetchPokemon(setPokemon)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }, []);

  useEffect(() => {
    setFilterPokemon(pokemons);
  }, [pokemons]);

  return (
    <Box sx={{ padding: '24px' }}>
      <Navbar searchInput={searchInput} setSearchInput={setSearchInput} pokemons={pokemons} setPokemon={setPokemon} setFilterPokemon={setFilterPokemon} setPageNotFound={setPageNotFound} setLoading={setLoading} />
      <PokeGrid isLoading={isLoading} filterPokemon={filterPokemon} pageNotFound={pageNotFound}  />
    </Box>
  )
}
