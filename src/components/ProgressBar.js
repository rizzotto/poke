import React from "react";
import { makeStyles } from "@material-ui/core";

// styles
const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: "rgb(233, 233, 233)",
    borderRadius: ".5rem",
  },
  progress: {
    backgroundColor: (props) => (props.percent > 50 ? "#65cb8f" : "#ea5a6d"),
    height: "8px",
    borderRadius: "1rem",
    transition: "1s ease",
    transitionDelay: "0.5s",
  },
}));

export default function ProgressBar({ percent }) {
  const classes = useStyles({ percent });
  const [value, setValue] = React.useState(0);

  React.useEffect(() => {
    setValue(percent);
  });

  return (
    <div className={classes.container} style={{ width: "100%" }}>
      <div style={{ width: `${value}%` }} className={classes.progress} />
    </div>
  );
}
