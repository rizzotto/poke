import React, { useEffect, useState } from 'react'
import Sheet from 'react-modal-sheet'
import {
  AppBar,
  CircularProgress,
  makeStyles,
  Tab,
  Tabs,
} from '@material-ui/core'
import capitalizeFirstLetter from '../../utils/capitalizeFirstLetter'
import About from './About'
import api from '../../services/api'
import Stats from './Stats'

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'column',
    padding: '0 24px 24px 24px',
    position: 'sticky',
    top: 0,
    zIndex: -1,
  },
  titleContainer: {
    display: 'flex',
    alignItems: 'baseline',
    justifyContent: 'space-between',
    color: 'white',
    width: '100%',
  },
  type: {
    borderRadius: 16,
    width: '100%',
    maxWidth: 65,
    marginRight: '6px',
    padding: '6px 14px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
    backgroundColor: 'rgb(255, 255, 255, 0.3)',
    color: '#FFF',
  },
  pokeInfo: {
    backgroundColor: '#FFF',
    width: '100%',
    borderRadius: '24px 24px 0 0',
    // height: 400,
    // padding: 12,
    zIndex: 100,
  },
  indicator: {
    backgroundColor: (props) => props.data.color[0].color,
  },
  loading: {
    height: '40vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}))

function PokemonInfo({ isOpen, onClose, data }) {
  let classes = useStyles({ data })
  const url = data.species.url
  const [value, setValue] = useState(0)
  const [specieDetails, setSpecieDetails] = useState()
  const [loading, setLoading] = useState(false)

  console.log(data)
  useEffect(() => {
    fetchData()
  }, [data])

  async function fetchData() {
    setLoading(true)
    const data = await api.get(url)
    setSpecieDetails(data.data)
    setLoading(false)
  }

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  return (
    <Sheet isOpen={isOpen} onClose={onClose}>
      <Sheet.Container
        style={{
          backgroundColor: data.color[0].color,
        }}
      >
        <Sheet.Header
        // style={{
        //   backgroundColor: data.color[0].color,
        // }}
        />
        <Sheet.Content>
          <div className={classes.container}>
            <div className={classes.titleContainer}>
              <div>
                <h1>{capitalizeFirstLetter(data.name)}</h1>
                <div style={{ display: 'flex' }}>
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
              src={data.sprites.other.dream_world.front_default}
              alt={data.name}
              height={250}
              width={250}
            />
          </div>
          <div className={classes.pokeInfo}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="simple tabs example"
              variant="fullWidth"
              style={{ borderRadius: '24px 24px 0 0' }}
              classes={{
                indicator: classes.indicator,
              }}
            >
              <Tab label="About" />
              <Tab label="Stats" />
              <Tab label="Evolution" />
              <Tab label="Abilities" />
            </Tabs>
            {!loading ? (
              <>
                {/* {data.name === specieDetails.name && ( */}
                <>
                  {console.log(specieDetails)}
                  {value === 0 && (
                    <About data={data} specieDetails={specieDetails} />
                  )}
                  {value === 1 && (
                    <Stats data={data} specieDetails={specieDetails} />
                  )}
                  {value === 2 && 'cc'}
                  {value === 3 && 'dd'}
                </>
                {/* )} */}
              </>
            ) : (
              <div className={classes.loading}>
                <CircularProgress style={{ color: data.color[0].color }} />
              </div>
            )}
          </div>
        </Sheet.Content>
        {/* {console.log(specieDetails)} */}
      </Sheet.Container>

      <Sheet.Backdrop />
    </Sheet>
  )
}

export default PokemonInfo
