/* eslint-disable react-hooks/rules-of-hooks */
"use client"
import React, { useState, useEffect } from "react"
import { Box, Paper, Typography, CircularProgress } from "@mui/material"
import ArrowBackIosTwoToneIcon from '@mui/icons-material/ArrowBackIosTwoTone';
import axios from "axios"
import Link from 'next/link'

interface PokeDetail {
  abilities: {
    ability: {
      name: string;
    };
  }[];
  height: number;
  name: string;
  sprites: {
    front_default: string;
  };
  stats: {
    base_stat: number;
    stat: {
      name: string;
    };
  }[];
  types: {
    type: {
      name: string;
    };
  }[];
  weight: number;
}

const page = ({ params }: { params: { pokeid: string } }) => {
  const [eachPoke, setEachPoke] = useState<PokeDetail>({
    abilities: [],
    height: 0,
    name: "",
    sprites: { front_default: "" },
    stats: [],
    types: [],
    weight: 0,
  })

  const [isLoading, setLoading] = useState<boolean>(true)

  const url = `https://pokeapi.co/api/v2/pokemon/${params.pokeid}`

  useEffect(() => {
    fetchById()
  }, [])

  const fetchById = async () => {
    try {
      setLoading(true)
      const response = await axios.get<PokeDetail>(url)
      const datas = response.data

      const pokeAbility = datas.abilities.map((data) => {
        return {
          ability: {
            name: data.ability.name,
          },
        }
      })

      const pokeState = datas.stats.map((data) => {
        return {
          base_stat: data.base_stat,
          stat: {
            name: data.stat.name,
          },
        }
      })

      const pokeType = datas.types.map((data) => {
        return {
          type: {
            name: data.type.name,
          },
        }
      })

      setEachPoke({
        abilities: pokeAbility,
        height: datas.height,
        name: datas.name,
        sprites: { front_default: datas.sprites.front_default },
        stats: pokeState,
        types: pokeType,
        weight: datas.weight,
      });
    } catch (error) {
      console.log(error)
    } finally{ 
      setLoading(false)
    }
  }

  return (
    <>
      {isLoading ? (
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
          <CircularProgress />
        </Box>
      ) : (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            backgroundColor: "#FFFEF2",
          }}
        >
          <Paper
            sx={{
              display: "flex",
              minWidth: "600px",
              maxHeight: "600px",
              padding: "24px",
            }}
          >
            <Link href="/">
              <ArrowBackIosTwoToneIcon fontSize="large"/>
            </Link>
           
            {/* START LEFT BOX */}
            <Box sx={{ justifyContent: "space-evenly" }}>
              <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                {eachPoke.name}
              </Typography>
              <Box>
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  Types:
                </Typography>
                {eachPoke.types.map((element, elementIndex) => (
                  <Box key={`elementIndex ${elementIndex}`}>
                    {element.type.name}
                  </Box>
                ))}
              </Box>

              <Box>
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  Abilities:
                </Typography>
                {eachPoke.abilities.map((ability, abilityIndex) => (
                  <Box key={`ability ${abilityIndex}`}>
                    {ability.ability.name}
                  </Box>
                ))}
              </Box>

              <Box>
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  Stats:
                </Typography>
                {eachPoke.stats.map((stats, statsIndex) => (
                  <Box key={`stats ${statsIndex}`}>
                    {stats.stat.name} : {stats.base_stat}
                  </Box>
                ))}
              </Box>
            </Box>
            <Box
              sx={{
                borderRight: "1px solid black",
                maxHeight: "500px",
                marginLeft: "20px",
              }}
            />
            {/* END OF LEFT BOX */}

            {/* START RIGHT BOX */}
            <Box
              sx={{
                minWidth: "350px",
                minHeight: "350px",
                justifyContent: "center",
                marginLeft: "20px",
              }}
            >
              <img
                src={eachPoke.sprites.front_default}
                width="100%"
                alt="Pokemon image"
              />
            </Box>
            {/* END OF LEFT BOX */}
          </Paper>
        </Box>
      )}
    </>
  );
};

export default page;
