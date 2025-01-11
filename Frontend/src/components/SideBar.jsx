import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Filter } from 'lucide-react';

const SideBar = ({ setPlayers }) => {
	const [team, setTeam] = useState('');
	const [position, setPosition] = useState('');
	const [minAge, setMinAge] = useState('');
	const [maxAge, setMaxAge] = useState('');
	const [minGoals, setMinGoals] = useState('');
	const [maxGoals, setMaxGoals] = useState('');
	const [minAssists, setMinAssists] = useState('');
	const [maxAssists, setMaxAssists] = useState('');
	const [selectedTeams, setSelectedTeams] = useState([]);
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);

	//*  Cada filtro (como team, position, minAge, etc.) se maneja con useState para almacenar su valor.
	//*  Los campos del formulario (select, input) están vinculados a sus respectivos estados usando value y onChange.
	//* Al hacer clic en el botón "Apply Filters", se ejecuta handleSearch, que arma un objeto params con los valores de los filtros. 
	//* Los parámetros vacíos no se envían al backend (se asigna undefined).
	const handleSearch = async () => {
		const params = {
			teams: selectedTeams.join(','),
			position,
			minAge: minAge || undefined,
			maxAge: maxAge || undefined,
			minGoals: minGoals || undefined,
			maxGoals: maxGoals || undefined,
			minAssists: minAssists || undefined,
			maxAssists: maxAssists || undefined
		};

		try {
			const response = await axios.get(`${import.meta.env.VITE_API_URL}/lpfadata/api/getPlayersByFilters`, { params });
			setPlayers(response.data);
			setSelectedTeams([]);
		} catch (error) {
			console.error('Error fetching players:', error);
		}
	};

	const [teams, setTeams] = useState([]);
	useEffect(() => {
		const getAllTeams = async () => {
			try {
				const response = await axios.get(`${import.meta.env.VITE_API_URL}/lpfadata/api/getAllTeams`);
				setTeams(response.data);
			} catch (e) {
				console.error('Error fetching teams:', e);
			}
		};

		getAllTeams();
	}, []);

	const handleCheckboxChange = (team) => {
		setSelectedTeams((prevSelected) => {
			if (prevSelected.includes(team)) {
				return prevSelected.filter((t) => t !== team);
			} else {
				return [...prevSelected, team];
			}
		});
	};

	const toggleDropdown = () => {
		setIsDropdownOpen((prev) => !prev);
	};

	return (
		<aside id="logo-sidebar" className="vertical-scrollbar fixed z-index top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800" aria-label="Sidebar">
			<div className="drawer-body px-2 pt-4">
				<ul className="bg-white menu space-y-1 dark:bg-gray-800">

					{/* Team */}
					<li>
						<button
							id="dropdownCheckboxButton"
							data-dropdown-toggle="dropdownDefaultCheckbox"
							className="flex items-center py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 dark:text-gray-300"
							type="button"
							onClick={toggleDropdown}
						>
							Seleccionar Equipos
							<svg
								className="w-2.5 h-2.5"
								style={{ marginLeft: 'auto', marginRight: '10px' }}
								aria-hidden="true"
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 10 6"
							>
								<path
									stroke="currentColor"
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="m1 1 4 4 4-4"
								/>
							</svg>
						</button>

						{/* Dropdown menu */}
						<div
							id="dropdownDefaultCheckbox"
							className={`z-10 ${isDropdownOpen ? 'block' : 'hidden'} w-auto max-w-md bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-800`}
						>
							<ul className="p-2 space-y-2 text-sm text-gray-700">
								{teams.map((team, index) => (
									<li key={index}>
										<div className="flex items-center">
											<input
												id={`checkbox-item-${index}`}
												type="checkbox"
												value={team}
												checked={selectedTeams.includes(team)}
												onChange={() => handleCheckboxChange(team)}
												className="w-4 h-4 text-pink-600 bg-gray-100 border-gray-300 rounded focus:ring-yellow-500"
											/>
											<label
												htmlFor={`checkbox-item-${index}`}
												style={{ marginLeft: '0', flex: 1, textAlign: 'left' }}
												className="text-sm font-medium text-gray-900 dark:text-gray-300"
											>
												{team}
											</label>
										</div>
									</li>
								))}
							</ul>
						</div>
					</li>


					{/* Position */}
					<li>
						<select
							id="position_select"
							value={position}
							onChange={(e) => setPosition(e.target.value)}
							className="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 dark:text-gray-300"
						>
							<option className='dark:bg-gray-800' value="">Posicion</option>
							<option className='dark:bg-gray-800' value="GK">GK</option>
							<option className='dark:bg-gray-800' value="DF">DF</option>
							<option className='dark:bg-gray-800' value="MF">MF</option>
							<option className='dark:bg-gray-800' value="FW">FW</option>
						</select>
					</li>

					{/* Age */}
					<div className="divider py-6">Edad</div>
					<li>
						<input
							type="number"
							id="minAge_input"
							value={minAge}
							onChange={(e) => setMinAge(e.target.value)}
							className="w-full py-2 px-3 text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 dark:text-gray-300"
							placeholder="Edad Mínima"
							min="0"
						/>
					</li>
					<li>
						<input
							type="number"
							id="maxAge_input"
							value={maxAge}
							onChange={(e) => setMaxAge(e.target.value)}
							className="w-full py-2 px-3 text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 dark:text-gray-300"
							placeholder="Edad Máxima"
							min="0"
						/>
					</li>
					
					{/* Goals */}
					<div className="divider py-6">Goles</div>
					<li>
						<input
							type="number"
							id="minGoals_input"
							value={minGoals}
							onChange={(e) => setMinGoals(e.target.value)}
							className="w-full py-2 px-3 text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 dark:text-gray-300"
							placeholder="Goles Mínimos"
							min="0"
						/>
					</li>
					<li>
						<input
							type="number"
							id="maxGoals_input"
							value={maxGoals}
							onChange={(e) => setMaxGoals(e.target.value)}
							className="w-full py-2 px-3 text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 dark:text-gray-300"
							placeholder="Goles Máximos"
							min="0"
						/>
					</li>

					{/* Assists */}
					<div className="divider py-6">Asistencias</div>
					<li>
						<input
							type="number"
							id="minAssists_input"
							value={minAssists}
							onChange={(e) => setMinAssists(e.target.value)}
							className="w-full py-2 px-3 text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 dark:text-gray-300"
							placeholder="Asistencias Mínimas"
							min="0"
						/>
					</li>
					<li>
						<input
							type="number"
							id="maxAssists_input"
							value={maxAssists}
							onChange={(e) => setMaxAssists(e.target.value)}
							className="w-full py-2 px-3 text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 dark:text-gray-300"
							placeholder="Asistencias Máximas"
							min="0"
						/>
					</li>

					<br />

					{/* Apply Filters Button */}
					<button
						onClick={handleSearch}
						className="group inline-block rounded-full bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 p-[2px] hover:text-white focus:outline-none focus:ring active:text-opacity-75"
					>
						<span className="rounded-full bg-white px-8 py-3 text-sm font-medium group-hover:bg-transparent flex items-center justify-center dark:bg-gray-800">
							<Filter className="mr-2" />
							Buscar
						</span>
					</button>

				</ul>
			</div>

		</aside>
	);
};

export default SideBar;
