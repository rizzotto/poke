import {
  Grid,
  makeStyles,
  Paper,
  CircularProgress,
  useMediaQuery,
  Zoom,
  Select,
  MenuItem,
} from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import api from '../../services/api'
import Skeleton from '@material-ui/lab/Skeleton'
import Sheet from 'react-modal-sheet'
import PokemonInfo from '../PokemonInfo'
import capitalizeFirstLetter from '../../utils/capitalizeFirstLetter'
import { useTheme } from '@material-ui/core/styles'
import Grow from '@material-ui/core/Grow'
import SearchBar from 'material-ui-search-bar'

const useStyles = makeStyles((theme) => ({
  root: {
    // height: '100vh',
    // display: 'flex',
    // alignItems: 'center',
    // justifyContent: 'center',
    // width: '100%',
  },
  paper: {
    padding: (props) => (props.isMobile ? '16px 4px' : '10px 16px'),
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    borderRadius: 12,
    height: '100%',
    maxHeight: 100,
    cursor: 'pointer',
    transition: '0.3s',

    '&:hover': {
      opacity: '0.8',
    },
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
  select: {
    width: '100%',
    padding: '8px 16px',
    '& .MuiSelect-icon': {
      marginRight: 12,
    },
    '& .MuiSelect-select:focus': {
      backgroundColor: 'white',
    },
    '& .MuiMenu-paper': {
      borderRadius: 12,
    },
  },
  selectPaper: {
    height: theme.spacing(6),
    display: 'flex',
    justifyContent: 'space-between',
    margin: '16px 0 16px 0',
    borderRadius: 12,
    boxShadow: '0 4px 6px 0 rgba(31,70,88,.04)',
  },
  dropdownStyle: {
    borderRadius: 12,
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
  const [loading, setLoading] = useState(false)
  // Colocar em um Provider no futuro, para persistir entre telas
  const [pokemons, setPokemons] = useState({
    // 1 gen
    152: [],
    // 2 gen
    252: [],
    // 3 gen
    387: [],
    // 4 gen
    494: [],
    // 5 gen
    650: [],
    // 6 gen
    722: [],
    // 7 gen
    810: [],
    // 8 gen
    899: [],
  })
  const [isOpen, setOpen] = useState(false)
  const [searchValue, setSearchValue] = useState('')
  const [generation, setGeneration] = useState({ value: 152 })
  const [pokemonInfo, setPokemonInfo] = useState(null)
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  let classes = useStyles({ isMobile })

  useEffect(() => {
    fetchPokedex()
  }, [generation])

  async function fetchPokedex() {
    if (pokemons[generation.value].length === 0) {
      setLoading(true)
      const newPokemonData = []
      for (let i = genStart[generation.value]; i < generation.value; i++) {
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
      setPokemons({ ...pokemons, [generation.value]: newPokemonData })
      setLoading(false)
    }
  }

  const genStart = {
    // 1 gen
    152: 1,
    // 2 gen
    252: 153,
    // 3 gen
    387: 253,
    // 4 gen
    494: 388,
    // 5 gen
    650: 495,
    // 6 gen
    722: 651,
    // 7 gen
    810: 723,
    // 8 gen
    899: 811,
  }

  return (
    <div className={classes.root}>
      <h1>Pokedex</h1>
      <SearchBar
        value={searchValue}
        onChange={(newValue) => setSearchValue(newValue)}
        cancelOnEscape
        onCancelSearch={() => setSearchValue('')}
        style={{
          margin: '16px 0 16px 0',
          borderRadius: 12,
          boxShadow: '0 4px 6px 0 rgba(31,70,88,.04)',
        }}
      />
      <Paper className={classes.selectPaper}>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          fullWidth
          disableUnderline
          className={classes.select}
          MenuProps={{ classes: { paper: classes.dropdownStyle } }}
          value={generation.value}
          onChange={(value) => setGeneration({ value: value.target.value })}
        >
          <MenuItem value={152}>Generation 1</MenuItem>
          <MenuItem value={252}>Generation 2</MenuItem>
          <MenuItem value={387}>Generation 3</MenuItem>
          <MenuItem value={494}>Generation 4</MenuItem>
          <MenuItem value={650}>Generation 5</MenuItem>
          <MenuItem value={722}>Generation 6</MenuItem>
          <MenuItem value={810}>Generation 7</MenuItem>
          <MenuItem value={899}>Generation 8</MenuItem>
        </Select>
      </Paper>
      {!loading ? (
        <>
          <Grow in>
            <Grid container spacing={isMobile ? 1 : 2}>
              {pokemons[generation.value]
                .filter((poke) => poke.name.includes(searchValue.toLowerCase()))
                .map((poke, i) => (
                  <Grid key={i} item xs={pokemons.lenght === 1 ? 12 : 6}>
                    <Paper
                      onClick={() => {
                        setPokemonInfo(poke)
                        setOpen(true)
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
                            fontSize: isMobile ? 16 : 24,
                            marginBottom: 3,
                          }}
                        >
                          {capitalizeFirstLetter(poke.name)}
                        </div>
                        {poke.types.map((type, i) => (
                          <div key={i} className={classes.type}>
                            {capitalizeFirstLetter(type.type.name)}
                          </div>
                        ))}
                      </div>
                      <img
                        src={
                          poke.sprites.other.dream_world.front_default !== null
                            ? poke.sprites.other.dream_world.front_default
                            : poke.sprites.front_default
                        }
                        alt={poke.name}
                        height={70}
                        width={70}
                      />
                    </Paper>
                  </Grid>
                ))}
            </Grid>
          </Grow>
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
          <CircularProgress style={{ color: '#f95587' }} />
        </div>
      )}
    </div>
  )
}

export default Pokedex
