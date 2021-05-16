import { Grid, makeStyles, Paper, CircularProgress } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import api from '../../services/api'
import Skeleton from '@material-ui/lab/Skeleton'
import Sheet from 'react-modal-sheet'
import PokemonInfo from '../PokemonInfo'

const useStyles = makeStyles((theme) => ({
  root: {
    // height: '100vh',
    // display: 'flex',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  paper: {
    padding: '16px 4px',
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    borderRadius: 12,
    height: '100%',
    maxHeight: 100,
    cursor: 'pointer',
  },
  loading: {
    height: '80vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: 'white',
    paddingRight: 6,
    paddingLeft: 2,
  },
  type: {
    borderRadius: 12,
    width: '100%',
    maxWidth: 65,
    padding: '0px 10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
    backgroundColor: 'rgb(255, 255, 255, 0.3)',
  },
}))

const types = [
  { color: '#A8A77A', type: 'normal' },
  { color: '#C22E28', type: 'fighting' },
  { color: '#A98FF3', type: 'flying' },
  { color: '#A33EA1', type: 'poison' },
  { color: '#E2BF65', type: 'ground' },
  { color: '#B6A136', type: 'rock' },
  { color: '#A6B91A', type: 'bug' },
  { color: '#735797', type: 'ghost' },
  { color: '#B7B7CE', type: 'steel' },
  { color: '#EE8130', type: 'fire' },
  { color: '#6390F0', type: 'water' },
  { color: '#7AC74C', type: 'grass' },
  { color: '#F7D02C', type: 'electric' },
  { color: '#F95587', type: 'psychic' },
  { color: '#96D9D6', type: 'ice' },
  { color: '#6F35FC', type: 'dragon' },
  { color: '#705746', type: 'dark' },
  { color: '#D685AD', type: 'fairy' },
]

function Pokedex() {
  let classes = useStyles()
  const [pokemons, setPokemons] = useState([])
  const [loading, setLoading] = useState(false)
  const [isOpen, setOpen] = useState(false)
  const [pokemonInfo, setPokemonInfo] = useState(null)

  useEffect(() => {
    fetchPokedex()
  }, [])

  async function fetchPokedex() {
    setLoading(true)

    const newPokemonData = []
    for (let i = 1; i < 152; i++) {
      const data = await api.get(`https://pokeapi.co/api/v2/pokemon/${i}/`)

      var result = types.filter((obj) => {
        return obj.type === data.data.types[0].type.name
      })

      const item = {
        ...data.data,
        color: result,
      }

      newPokemonData.push(item)
    }

    setPokemons(newPokemonData)
    setLoading(false)
  }

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1)
  }

  return (
    <div className={classes.root}>
      <h1>Pokedex</h1>
      {!loading ? (
        <>
          <Grid container spacing={1}>
            {pokemons.map((poke, i) => (
              <Grid key={i} item xs={6}>
                <Paper
                  onClick={() => {
                    setOpen(true)
                    setPokemonInfo(poke)
                  }}
                  style={{
                    backgroundColor: poke.color[0].color,
                  }}
                  className={classes.paper}
                >
                  <div className={classes.title}>
                    <div
                      style={{
                        fontWeight: 'bold',
                        fontSize: 16,
                        marginBottom: 3,
                      }}
                    >
                      {capitalizeFirstLetter(poke.name)}
                    </div>
                    {poke.types.map((type) => (
                      <div className={classes.type}>
                        {capitalizeFirstLetter(type.type.name)}
                      </div>
                    ))}
                  </div>
                  <img
                    src={poke.sprites.other.dream_world.front_default}
                    alt={poke.name}
                    height={70}
                    width={70}
                  />
                </Paper>
              </Grid>
            ))}
          </Grid>
          {console.log(pokemonInfo)}
          {pokemonInfo !== null && (
            <PokemonInfo
              data={pokemonInfo}
              isOpen={isOpen}
              onClose={() => setOpen(false)}
            />
          )}
        </>
      ) : (
        <div className={classes.loading}>
          <CircularProgress style={{ color: '#48d0b0' }} />
        </div>
      )}
    </div>
  )
}

export default Pokedex
