import React from 'react'
import { Grid, Box, Typography, CircularProgress } from "@mui/material";
import Link from "next/link";
import { MyType } from "@/type/type"

export const PokeGrid = (
  {
    isLoading,
    filterPokemon,
    pageNotFound,
  }: {
    isLoading: boolean,
    filterPokemon: MyType.PokemonType[],
    pageNotFound: boolean,
  }
) => {
  return (
    <>
      {isLoading ? (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100vh",
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <>
          {pageNotFound && (
            <Box>
              <Typography variant="h3" sx={{ color: "red" }}>
                Pokemon not found
              </Typography>
            </Box>
          )}
          <Grid container spacing={1}>
            {filterPokemon.map((pokemon, index) => (
              <Grid item xs={3} key={`pokemon ${index}`}>
                <Link legacyBehavior href={`/pokemon/${pokemon.id}`}>
                  <Box
                    sx={{
                      border: "1px solid black",
                      padding: "24px",
                      maxWidth: "345px",
                      maxHeight: "345px",
                      height: "100%",
                    }}
                  >
                    <Typography>#{pokemon.id}</Typography>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <Box>
                        <Typography
                          variant="h5"
                          sx={{
                            fontWeight: "bold",
                            fontSize: "20px",
                          }}
                        >
                          {pokemon.name}
                        </Typography>
                        <Typography
                          sx={{ fontWeight: "600", marginTop: "10px" }}
                        >
                          Types:{" "}
                        </Typography>
                        {pokemon.types.map((element, elementIndex) => (
                          <Box key={`element ${elementIndex}`}>
                            {element.name}
                          </Box>
                        ))}
                      </Box>
                      <img width="100%" src={pokemon.img} alt="Pokemon" />
                    </Box>
                  </Box>
                </Link>
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </>
  )
}

export default PokeGrid