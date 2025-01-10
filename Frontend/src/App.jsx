import React, { useState } from 'react';
import NavBar from "./components/NavBar"
import SideBar from "./components/SideBar"
import PlayerTable from "./components/PlayerTable"

function App() {

  const [players, setPlayers] = useState([]);
  return (
    <>
      <div className="flex min-h-screen">
        <NavBar setPlayers={setPlayers}/>
        <SideBar setPlayers={setPlayers} />
        <div className="bg-white flex-1 ml-2">
          <PlayerTable players={players} />
        </div>
      </div>
    </>
  )
}

export default App
