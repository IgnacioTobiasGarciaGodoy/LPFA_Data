'use client';

import React, { useState, useEffect } from "react";
import { Search } from 'lucide-react';
import axios from 'axios';

const SearchBar = ({ setPlayers }) => {
	const [players, setLocalPlayers] = useState([]);
	const [activeSearch, setActiveSearch] = useState([]);
	const [query, setQuery] = useState("");
	const [activeIndex, setActiveIndex] = useState(-1);

	useEffect(() => {
		const fetchPlayers = async () => {
			try {
				const response = await axios.get(`${import.meta.env.VITE_API_URL}/lpfadata/api/getPlayersByFilters`);
				setLocalPlayers(response.data);
			} catch (error) {
				console.error("Error al obtener los jugadores:", error);
			}
		};

		fetchPlayers();
	}, []);

	const removeAccents = (str) => {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
};

	const handleSearch = (e) => {
		const value = e.target.value.toLowerCase();
		setQuery(value);
		if (value === '') {
			setActiveSearch([]);
			return;
		}

		setActiveSearch(
			players
				.filter((player) => removeAccents(player.name.toLowerCase()).includes(value))
				.slice(0, 8)
		);
		setActiveIndex(-1);
	};

	const handleSelectPlayer = async (name, team) => {
		try {
			const response = await axios.get(`${import.meta.env.VITE_API_URL}/lpfadata/api/getPlayerByNameAndTeam`, {
				params: { name, team },
			});

			if (response.data) {
				setPlayers([response.data]);
				setActiveSearch([]);
				setQuery("");
				setActiveIndex(-1);
			}
		} catch (error) {
			console.error("Error al obtener el jugador:", error);
		}
	};

	const handleKeyDown = (e) => {
		if (e.key === "Enter" && activeIndex >= 0 && activeSearch.length > 0) {
			e.preventDefault();
			const selectedPlayer = activeSearch[activeIndex];
			handleSelectPlayer(selectedPlayer.name, selectedPlayer.team);
		} else if (e.key === "ArrowDown" && activeIndex < activeSearch.length - 1) {
			setActiveIndex(activeIndex + 1);
		} else if (e.key === "ArrowUp" && activeIndex > 0) {
			setActiveIndex(activeIndex - 1);
		}
	};

	return (
		<form className="w-[400px] relative" onSubmit={(e) => e.preventDefault()}>
			<div className="relative">
				<input
					type="search"
					placeholder="Buscar Jugador"
					className="w-full p-2 rounded-full bg-white text-black border-2 border-pink-500 focus:ring-0 focus:ring-transparent transition duration-300 dark:bg-gray-800 dark:text-white"
					onChange={handleSearch}
					onKeyDown={handleKeyDown}
					value={query}
				/>
				<button
					type="button"
					className="absolute right-1 top-1/2 -translate-y-1/2 p-2 rounded-full bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 focus:outline-none focus:ring-2 focus:ring-pink-500"
				>
					<Search className="text-white" size={12} />
				</button>
			</div>

			{activeSearch.length > 0 && (
				<div className="absolute top-12 p-1 bg-white text-black w-full rounded-xl left-1/2 -translate-x-1/2 flex flex-col gap-2 shadow-lg dark:bg-gray-800 dark:text-white">
					{activeSearch.map((player, index) => (
						<span
							key={player.id}
							className={`p-2 rounded cursor-pointer ${index === activeIndex ? 'bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-white' : 'hover:bg-slate-200'}`} // Resaltar la opción activa
							onClick={() => handleSelectPlayer(player.name, player.team)}
							onMouseEnter={() => setActiveIndex(index)}
						>
							{player.name} - {player.team}
						</span>
					))}
				</div>
			)}
		</form>
	);
};

export default SearchBar;
