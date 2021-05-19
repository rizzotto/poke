import { makeStyles } from '@material-ui/core'
import * as React from 'react'

// import './ProgressBar.css'

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: 'rgb(233, 233, 233)',
    borderRadius: '.5rem',
  },
  progress: {
    backgroundColor: (props) => (props.percent > 50 ? '#65cb8f' : '#ea5a6d'),
    height: '8px',
    borderRadius: '1rem',
    transition: '1s ease',
    transitionDelay: '0.5s',
  },
}))

export var ProgressBar = ({ percent }) => {
  let classes = useStyles({ percent })
  const [value, setValue] = React.useState(0)

  React.useEffect(() => {
    setValue(percent)
  })

  return (
    <div className={classes.container} style={{ width: '100%' }}>
      <div style={{ width: `${value}%` }} className={classes.progress} />
    </div>
  )
}
