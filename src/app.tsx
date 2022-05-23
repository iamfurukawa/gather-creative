import { Logo } from './logo'
import Events from './services/events'

export function App() {

  return (
    <>
      <Logo />
      <p>Hello Vite + Preact!</p>
      {localStorage.getItem("players") || "UEPA"}
      <p>
        <button onClick={() => Events.sendRetrievePlayersEvent()}>click meeee</button>
      </p>
    </>
  )
}
