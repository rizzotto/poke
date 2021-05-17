import React, { useState } from 'react'
import Sheet from 'react-modal-sheet'
import { AppBar, makeStyles, Tab, Tabs } from '@material-ui/core'
import capitalizeFirstLetter from '../../utils/capitalizeFirstLetter'

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
}))

function PokemonInfo({ isOpen, onClose, data }) {
  let classes = useStyles({ data })
  const [value, setValue] = useState(0)

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
              <Tab label="Item One" />
              <Tab label="Item Two" />
              <Tab label="Item Three" />
            </Tabs>
            {value === 0 && (
              <div>
                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/5.png" />
                <div>a</div>
                <div>a</div>
                <div>a</div>
                <div>a</div>
                <div>a</div>
                <div>a</div>
                <div>a</div>
                <div>a</div>
                <div>a</div>
                <div>a</div>
                <div>a</div>
                <div>a</div>
                <div>a</div>
                <div>a</div>
                <div>a</div>
                <div>a</div>
                <div>a</div>
                <div>a</div>
                <div>a</div>
                <div>a</div>
              </div>
            )}
            {value === 1 && 'bb'}
            {value === 2 && 'cc'}
          </div>
        </Sheet.Content>
        {console.log(data)}
      </Sheet.Container>

      <Sheet.Backdrop />
    </Sheet>
  )
}

export default PokemonInfo
