import React, { useState } from 'react';
import NavBar from "./components/NavBar"
import SideBar from "./components/SideBar"
import PlayerTable from "./components/PlayerTable"
import Toggle from './components/Toggle';

function App() {

  const [players, setPlayers] = useState([]);
  return (
    <>
      <div className="flex min-h-screen">
        <NavBar setPlayers={setPlayers}/>
        <SideBar setPlayers={setPlayers} />
        <div className="bg-white flex-1 ml-2 dark:bg-gray-800 dark:text-white ">
          <PlayerTable players={players} />
        </div>
      </div>
    </>
  )
}

export default App
