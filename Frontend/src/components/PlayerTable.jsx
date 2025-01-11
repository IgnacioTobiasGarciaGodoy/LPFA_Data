import React, { useState, useMemo } from 'react';
import { ChevronDown } from 'lucide-react';
import { ChevronUp } from 'lucide-react';

const PlayerTable = ({ players }) => {

  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

  const handleSort = (column) => {
    let direction = 'asc';

    if (sortConfig.key === column && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key: column, direction });
  };

  const sortedPlayers = useMemo(() => {
    if (!sortConfig.key) return players;

    const sorted = [...players].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'asc' ? -1 : 1;
      if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });

    return sorted;
  }, [players, sortConfig]);

  const columns = [
    { name: 'Nombre', sort: 'name' },
    { name: 'Equipo', sort: 'team' },
    { name: 'Edad', sort: 'age' },
    { name: 'País', sort: 'nation' },
    { name: 'Posición', sort: 'pos' },
    { name: 'Titular', sort: 'starts' },
    { name: 'Minutos Jugados', sort: 'min' },
    { name: 'Goles', sort: 'gls' },
    { name: 'Asistencia', sort: 'ast' },
    { name: 'Goles s/Penales', sort: 'g_pk' },
    { name: 'Goles Esperados', sort: 'xg' },
    { name: 'Amarillas', sort: 'crdy' },
    { name: 'Rojas', sort: 'crdr' },
  ]

  return (
    <div className="ml-64 mt-20 px-4">
      <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-white text-sm dark:bg-gray-800">
        <thead className="ltr:text-left rtl:text-right">
          <tr>
            {columns.map((column, i) => (
              <th
                className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 cursor-pointer dark:text-white"
                onClick={() => handleSort(column.sort)}
                key={i}
              >
                <span className="flex items-center">
                  {sortConfig.key === column.sort && sortConfig.direction === 'asc' ? (
                    <ChevronUp  className="m-2" />
                  ) : (
                    <ChevronDown className="m-2" />
                  )}
                  {column.name}
                </span>
              </th>
            ))}
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-200">
          {sortedPlayers.map((player, index) => (
            <tr key={index}>
              <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white text-center">{player.name}</td>
              <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white text-center">{player.team}</td>
              <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white text-center">{player.age}</td>
              <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white text-center">{player.nation}</td>
              <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white text-center">{player.pos}</td>
              <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white text-center">{player.starts}</td>
              <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white text-center">{player.min > 0 ? player.min : '-'}</td>
              <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white text-center">{player.gls > 0 ? player.gls : '-'}</td>
              <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white text-center">{player.ast > 0 ? player.ast : '-'}</td>
              <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white text-center">{player.g_pk > 0 ? player.g_pk : '-'}</td>
              <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white text-center">{player.xg > 0 ? player.xg : '-'}</td>
              <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white text-center">{player.crdy > 0 ? player.crdy : '-'}</td>
              <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white text-center">{player.crdr > 0 ? player.crdr : '-'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PlayerTable;
