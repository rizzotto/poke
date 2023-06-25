import React from "react";
import { makeStyles, useMediaQuery, useTheme } from "@material-ui/core";
import capitalizeFirstLetter from "../utils/capitalizeFirstLetter";

// Styles
const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "center",
    flexDirection: "column",
    padding: (props) =>
      props.isMobile ? "20px 20px 75px 20px" : "20px 20px 140px 20px",
  },
  weightContainer: {
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
    padding: 20,
    boxShadow: "2px 2px 6px 2px rgba(31,70,88,.1)",
    borderRadius: 16,
    marginTop: 16,
    width: "100%",
  },
  weight: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "center",
    flexDirection: "column",
    width: "100%",
    maxWidth: 70,
  },
  title: {
    color: "#9f9f9f",
    fontSize: 16,
  },
}));

export default function About({ data, specieDetails }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));
  let classes = useStyles({ isMobile });

  return (
    <div className={classes.container}>
      <div>{specieDetails.flavor_text_entries[14].flavor_text}</div>
      <div className={classes.weightContainer}>
        <div className={classes.weight}>
          <div className={classes.title}>Height</div>
          <div>{data.height * 10}</div>
        </div>
        <div className={classes.weight}>
          <div className={classes.title}>Weight</div>
          <div>{data.weight / 10} kg</div>
        </div>
      </div>

      {specieDetails.habitat && (
        <>
          <h3>Habitat</h3>
          <div>{capitalizeFirstLetter(specieDetails.habitat.name)}</div>
        </>
      )}
      <h3>Egg Groups</h3>
      {specieDetails.egg_groups.map((group, i) => (
        <div key={i}>{capitalizeFirstLetter(group.name).replace("-", " ")}</div>
      ))}
    </div>
  );
}
