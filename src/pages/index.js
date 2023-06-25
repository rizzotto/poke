import {
  CircularProgress,
  Grid,
  Grow,
  Paper,
  makeStyles,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import axios from "axios";
import React from "react";
import capitalizeFirstLetter from "../utils/capitalizeFirstLetter";
import SearchBar from "material-ui-search-bar";
import PokemonInfo from "../components/PokemonInfo";

const useStyles = makeStyles((theme) => ({
  loading: {
    height: "80vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    padding: (props) => (props.isMobile ? "16px 4px" : "10px 16px"),
    display: "flex",
    alingItems: "flex-start",
    justifyContent: "space-between",
    borderRadius: 12,
    height: "100%",
    maxHeight: 100,
    cursor: "pointer",
    transition: "0.3s",

    "&:hover": {
      opacity: "0.8",
    },
  },
  title: {
    color: "white",
    paddingRight: 6,
    paddingLeft: 2,
  },
  type: {
    borderRadius: 12,
    width: "100%",
    maxWidth: 65,
    padding: "0 10px",
    display: "flex",
    alingItems: "center",
    justifyContent: "center",
    marginBottom: 6,
    backgroundColor: "rgb(255,255,255,0.3)",
  },
}));

const types = [
  { color: "#A8A77A", type: "normal" },
  { color: "#C22E28", type: "fighting" },
  { color: "#A98FF3", type: "flying" },
  { color: "#A33EA1", type: "poison" },
  { color: "#E2BF65", type: "ground" },
  { color: "#B6A136", type: "rock" },
  { color: "#A6B91A", type: "bug" },
  { color: "#735797", type: "ghost" },
  { color: "#B7B7CE", type: "steel" },
  { color: "#EE8130", type: "fire" },
  { color: "#6390F0", type: "water" },
  { color: "#7AC74C", type: "grass" },
  { color: "#F7D02C", type: "electric" },
  { color: "#F95587", type: "psychic" },
  { color: "#96D9D6", type: "ice" },
  { color: "#6F35FC", type: "dragon" },
  { color: "#705746", type: "dark" },
  { color: "#D685AD", type: "fairy" },
];

export default function Pokedex() {
  const [pokemons, setPokemons] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [pokemonInfo, setPokemonInfo] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const [searchValue, setSearchValue] = React.useState("");

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  let classes = useStyles({ isMobile });

  React.useEffect(() => {
    const fetchPokemons = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "https://pokeapi.co/api/v2/pokemon?limit=151"
        );

        // fetch specific data with color related to type
        const pokemonData = await Promise.all(
          response.data.results.map(async (pokemon) => {
            const pokemonResponse = await axios.get(pokemon.url);
            const pokemonDetails = pokemonResponse.data;
            const pokemonType = pokemonDetails.types[0].type.name;

            const pokemonWithColor = {
              ...pokemonDetails,
              color: types.find((type) => type.type === pokemonType).color,
            };

            return pokemonWithColor;
          })
        );
        setPokemons(pokemonData);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchPokemons();
  }, []);

  return (
    <div>
      <h1>Pokedex</h1>
      <SearchBar
        value={searchValue}
        onChange={(newValue) => setSearchValue(newValue)}
        cancelOnEscape
        onCancelSearch={() => setSearchValue("")}
        style={{
          margin: "16px 0 16px 0",
          borderRadius: 12,
          boxShadow: "0 4px 6px 0 rgba(31,70,88,.04)",
        }}
      />
      {!loading ? (
        <>
          <Grow in>
            <Grid container spacing={isMobile ? 1 : 2}>
              {pokemons
                .filter((poke) => poke.name.includes(searchValue.toLowerCase()))
                .map((poke, i) => (
                  <Grid key={i} item xs={pokemons.length === 1 ? 12 : 6}>
                    <Paper
                      onClick={() => {
                        setPokemonInfo(poke);
                        setOpen(true);
                      }}
                      style={{ backgroundColor: poke.color }}
                      className={classes.paper}
                    >
                      <div className={classes.title}>
                        <div
                          style={{
                            fontWeight: "bold",
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
              isOpen={open}
              onClose={() => setOpen(false)}
            />
          )}
        </>
      ) : (
        <div className={classes.loading}>
          <CircularProgress style={{ color: "#f95587" }} />
        </div>
      )}
    </div>
  );
}
