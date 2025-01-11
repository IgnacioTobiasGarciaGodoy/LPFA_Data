import React from 'react'
import SearchBar from '../components/searchBar'
import Toggle from './Toggle'

const NavBar = ({ setPlayers }) => {
	return (
		<>
			<nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
				<div className="px-3 py-3 lg:px-5 lg:pl-3">
					<div className="flex items-center justify-between">
						<div className="flex items-center justify-start rtl:justify-end w-full relative">

							{/* Logo */}
							<a href="/" className="flex ms-2 md:me-24 hover:cursor-pointer z-10">
								<img src="./LogoLiga.png" className="h-15 me-3" alt="LPFA Data Logo" />
							</a>

							{/* SearchBar */}
							<div className="flex justify-center absolute left-0 right-0 z-0">
								<SearchBar setPlayers={setPlayers} />
							</div>

							<Toggle />

						</div>
					</div>
				</div>
			</nav>

		</>
	)
}

export default NavBar
