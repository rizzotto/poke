import { CssBaseline } from '@material-ui/core'
import Routes from './routes/routes'

// https://dribbble.com/shots/6545819-Pokedex-App
// https://dribbble.com/shots/6563578-Pokedex-App-Animation/attachments/6563578-Pokedex-App-Animation?mode=media

function App() {
  return (
    <div style={{ padding: 16, height: '100vh' }}>
      <CssBaseline />
      <Routes />
    </div>
  )
}

export default App
