import { makeStyles } from "@material-ui/core";
import React from "react";
import ProgressBar from "./ProgressBar";

// styles
const useStyles = makeStyles((theme) => ({
  container: {
    width: "100%",
    padding: "20px 20px 140px 20px",
  },
  stats: {
    paddingBottom: 10,
  },
  title: {
    paddingBottom: 8,
    color: "#4f4f4f",
  },
}));

export default function Stats({ data }) {
  let classes = useStyles();

  const [hp] = React.useState(
    data.stats[0].base_stat > 100 ? 100 : data.stats[0].base_stat
  );
  const [attack] = React.useState(
    data.stats[1].base_stat > 100 ? 100 : data.stats[1].base_stat
  );
  const [defense] = React.useState(
    data.stats[2].base_stat > 100 ? 100 : data.stats[2].base_stat
  );
  const [spAtk] = React.useState(
    data.stats[3].base_stat > 100 ? 100 : data.stats[3].base_stat
  );
  const [spDef] = React.useState(
    data.stats[4].base_stat > 100 ? 100 : data.stats[4].base_stat
  );
  const [speed] = React.useState(
    data.stats[5].base_stat > 100 ? 100 : data.stats[5].base_stat
  );

  // Just rendering divs, same as I did before

  return (
    <div className={classes.container}>
      <div className={classes.stats}>
        <div className={classes.title}>HP - {hp}</div>
        <ProgressBar percent={hp} />
      </div>
      <div className={classes.stats}>
        <div className={classes.title}>Attack - {attack}</div>
        <ProgressBar percent={attack} />
      </div>
      <div className={classes.stats}>
        <div className={classes.title}>Defense - {defense}</div>
        <ProgressBar percent={defense} />
      </div>
      <div className={classes.stats}>
        <div className={classes.title}>Special Attack - {spAtk}</div>
        <ProgressBar percent={spAtk} />
      </div>
      <div className={classes.stats}>
        <div className={classes.title}>Special Defense - {spDef}</div>
        <ProgressBar percent={spDef} />
      </div>
      <div className={classes.stats}>
        <div className={classes.title}>Speed - {speed}</div>
        <ProgressBar percent={speed} />
      </div>
    </div>
  );
}
