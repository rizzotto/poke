import {
  CircularProgress,
  Tab,
  Tabs,
  makeStyles,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import axios from "axios";
import React from "react";
import Sheet from "react-modal-sheet";
import capitalizeFirstLetter from "../utils/capitalizeFirstLetter";
import About from "./About";
import Stats from "./Stats";

// many styles :o
const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "column",
    padding: "0 24px 40px 24px",
    position: "sticky",
    top: 0,
    zIndex: -1,
  },
  titleContainer: {
    display: "flex",
    alignItems: "baseline",
    justifyContent: "space-between",
    color: "white",
    width: "100%",
  },
  type: {
    borderRadius: 16,
    width: "100%",
    maxWidth: 65,
    marginRight: "6px",
    padding: "6px 14px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 6,
    backgroundColor: "rgb(255, 255, 255, 0.3)",
    color: "#FFF",
  },
  pokeInfo: {
    backgroundColor: "#FFF",
    width: "100%",
    borderRadius: "24px 24px 0 0",
    zIndex: 100,
  },
  indicator: {
    backgroundColor: (props) => props.data.color[0].color,
  },
  loading: {
    height: "40vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));

export default function PokemonInfo({ isOpen, onClose, data }) {
  const [loading, setLoading] = React.useState(false);
  let classes = useStyles({ data });
  const url = data.species.url;
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));
  const [value, setValue] = React.useState(0);
  const [specieDetails, setSpecieDetails] = React.useState();

  React.useEffect(() => {
    fetchData();
  }, [data]);

  async function fetchData() {
    setLoading(true);
    const data = await axios.get(url);
    setSpecieDetails(data.data);
    setLoading(false);
  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Sheet isOpen={isOpen} onClose={onClose}>
      <Sheet.Container style={{ backgroundColor: data.color }}>
        <Sheet.Header />
        <Sheet.Content disableDrag={isMobile}>
          <div className={classes.container}>
            <div className={classes.titleContainer}>
              <div>
                <h1>{capitalizeFirstLetter(data.name)}</h1>
                <div style={{ display: "flex" }}>
                  {data.types.map((type, i) => (
                    <div key={i} className={classes.type}>
                      {capitalizeFirstLetter(type.type.name)}
                    </div>
                  ))}
                </div>
              </div>
              <h2>#{data.id}</h2>
            </div>
            <img
              src={
                data.sprites.other.dream_world.front_default !== null
                  ? data.sprites.other.dream_world.front_default
                  : data.sprites.front_default
              }
              alt={data.name}
              height={250}
              width={250}
            />
          </div>
          <div className={classes.pokeInfo}>
            <Tabs
              value={value}
              onChange={handleChange}
              variant="fullWidth"
              style={{ borderRadius: "24px 24px 0 0" }}
              classes={{
                indicator: classes.indicator,
              }}
            >
              <Tab label="About" />
              <Tab label="Stats" />
            </Tabs>
            {!loading ? (
              <>
                {value === 0 && (
                  <About data={data} specieDetails={specieDetails} />
                )}
                {value === 1 && (
                  <Stats data={data} specieDetails={specieDetails} />
                )}
              </>
            ) : (
              <div className={classes.loading}>
                <CircularProgress style={{ color: data.color[0].color }} />
              </div>
            )}
          </div>
        </Sheet.Content>
      </Sheet.Container>
    </Sheet>
  );
}
