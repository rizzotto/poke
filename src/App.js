import { CssBaseline } from "@material-ui/core";
import Pokedex from "./pages";
// https://dribbble.com/shots/6545819-Pokedex-App
// https://dribbble.com/shots/6563578-Pokedex-App-Animation/attachments/6563578-Pokedex-App-Animation?mode=media

function App() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{ padding: 16, height: "100vh", maxWidth: 700, width: "100%" }}
      >
        <CssBaseline />
        <Pokedex />
      </div>
    </div>
  );
}

export default App;
