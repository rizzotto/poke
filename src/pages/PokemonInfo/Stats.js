import { makeStyles } from '@material-ui/core'
import React, { useState } from 'react'
import { ProgressBar } from '../../components/ProgressBar'

const useStyles = makeStyles((theme) => ({
  container: {
    padding: 20,
    width: '100%',
  },
  stats: {
    paddingBottom: 10,
  },
  title: {
    paddingBottom: 8,
    color: '#4f4f4f',
  },
}))

function Stats({ data }) {
  let classes = useStyles()

  const [hp] = useState(
    data.stats[0].base_stat > 100 ? 100 : data.stats[0].base_stat
  )
  const [attack] = useState(
    data.stats[1].base_stat > 100 ? 100 : data.stats[1].base_stat
  )
  const [defense] = useState(
    data.stats[2].base_stat > 100 ? 100 : data.stats[2].base_stat
  )
  const [spAtk] = useState(
    data.stats[3].base_stat > 100 ? 100 : data.stats[3].base_stat
  )
  const [spDef] = useState(
    data.stats[4].base_stat > 100 ? 100 : data.stats[4].base_stat
  )
  const [speed] = useState(
    data.stats[5].base_stat > 100 ? 100 : data.stats[5].base_stat
  )

  return (
    <div className={classes.container}>
      <div className={classes.stats}>
        <div className={classes.title}>HP</div>
        <ProgressBar percent={hp} />
      </div>
      <div className={classes.stats}>
        <div className={classes.title}>Attack</div>
        <ProgressBar percent={attack} />
      </div>
      <div className={classes.stats}>
        <div className={classes.title}>Defense</div>
        <ProgressBar percent={defense} />
      </div>
      <div className={classes.stats}>
        <div className={classes.title}>Special Attack</div>
        <ProgressBar percent={spAtk} />
      </div>
      <div className={classes.stats}>
        <div className={classes.title}>Special Defense</div>
        <ProgressBar percent={spDef} />
      </div>
      <div className={classes.stats}>
        <div className={classes.title}>Speed</div>
        <ProgressBar percent={speed} />
      </div>
    </div>
  )
}

export default Stats
