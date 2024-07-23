import { useState } from '@wordpress/element';

const RevenueLeaderboard = ({ data }) => {
    const [viewAll, setViewAll] = useState(false);
    const [filter, setFilter] = useState("");
    const [stateFilter, setStateFilter] = useState("");
    const [nameFilter, setNameFilter] = useState("");
    const [filteredData, setFilteredData] = useState(data);

    const toggleViewAll = () => {
        setViewAll(!viewAll);
    };

    const handleFilterChange = (e) => {
        const value = e.target.value;
        setFilter(value);
        applyFilters(value, stateFilter, nameFilter);
    };

    const handleStateFilterChange = (e) => {
        const value = e.target.value;
        setStateFilter(value);
        applyFilters(filter, value, nameFilter);
    };

    const handleNameFilterChange = (e) => {
        const value = e.target.value;
        setNameFilter(value);
        applyFilters(filter, stateFilter, value);
    };

    const applyFilters = (filter, state, name) => {
        let filtered = data;
        
        if (state) {
            filtered = filtered.filter(item => extractState(item.territory) === state);
        }

        if (name) {
            filtered = filtered.filter(item => item.name === name);
        }

        if (filter === "name") {
            filtered = filtered.sort((a, b) => a.name.localeCompare(b.name));
        } else if (filter === "territory") {
            filtered = filtered.sort((a, b) => extractState(a.territory).localeCompare(extractState(b.territory)));
        }

        setFilteredData(filtered);
    };

    const extractState = (territory) => {
        const parts = territory.split(" ");
        return parts[parts.length - 2];
    };

    const uniqueStates = [...new Set(data.map(item => extractState(item.territory)))].sort();
    const uniqueNames = [...new Set(data.map(item => item.name))].sort();

    return (
        <div className="leaderboardWrapper">
            <h2>Revenue Leaderboard</h2>
            <div className="leaderboardContainer">
                {data.slice(0, 3).map((item, index) => (
                    <div 
                        key={index} 
                        className={`leaderboardItem ${index === 0 ? 'topOne' : ''}`}
                    >
                        <div className="rank">{item.rank}</div>
                        <div className="imageContainer">
                            <img src={item.image} alt={`${item.name}`} />
                        </div>
                        <div className="territory">{item.territory}</div>
                        <div className="name">{item.name}</div>
                        <div className="teamNumber">Team {item.teamNumber}</div>
                        <div className="revenue">${item.revenue.toLocaleString()}</div>
                    </div>
                ))}
            </div>
            {viewAll && (
                <div className="fullLeaderboardContainer">
                    <div className="fullLeaderboard">
                        <table>
                            <thead>
                                <tr>
                                    <th>Rank</th>
                                    <th>Name</th>
                                    <th>Total Revenue</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredData.slice(0, 10).map((item, index) => (
                                    <tr key={index}>
                                        <td>{item.rank}</td>
                                        <td>
                                            <img src={item.image} alt={`${item.name}`} />
                                            {item.name} - Team {item.teamNumber}
                                        </td>
                                        <td>${item.revenue.toLocaleString()}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
            <button onClick={toggleViewAll} className="viewAllButton">
                {viewAll ? 'Hide All' : 'View All'}
            </button>
            {viewAll && (
                <div className="filterContainer">
                    <label htmlFor="filter">Filter by: </label>
                    {/* <select id="filter" value={filter} onChange={handleFilterChange}>
                        <option value="">None</option>
                        <option value="name">Name</option>
                        <option value="territory">State</option>
                    </select> */}
                    <label htmlFor="stateFilter">State: </label>
                    <select id="stateFilter" value={stateFilter} onChange={handleStateFilterChange}>
                        <option value="">All States</option>
                        {uniqueStates.map((state, index) => (
                            <option key={index} value={state}>{state}</option>
                        ))}
                    </select>
                    <label htmlFor="nameFilter">Name: </label>
                    <select id="nameFilter" value={nameFilter} onChange={handleNameFilterChange}>
                        <option value="">All Names</option>
                        {uniqueNames.map((name, index) => (
                            <option key={index} value={name}>{name}</option>
                        ))}
                    </select>
                </div>
            )}
        </div>
    );
};

export default RevenueLeaderboard;