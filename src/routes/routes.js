import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Pokedex from '../pages/Pokedex'

export default function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Pokedex />
        </Route>
      </Switch>
    </Router>
  )
}
