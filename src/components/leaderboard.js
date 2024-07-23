import { useState } from '@wordpress/element';
// import axios from 'axios';
import UploadLeaderboard from './upLoadLeaderboard';
import RevenueLeaderboard from './revenueLeaderboard';

const months = [
    "January", "February", "March", "April", "May", "June", 
    "July", "August", "September", "October", "November", "December"
];

const currentYear = new Date().getFullYear();
const years = Array.from(new Array(10), (val, index) => currentYear - index);

const Leaderboard = () => {
    const [leaderboard, setLeaderboard] = useState(null);
    const [selectedMonth, setSelectedMonth] = useState(months[0]);
    const [selectedYear, setSelectedYear] = useState(currentYear);

    const fetchLeaderboard = async () => {
        // Add WordPress API here
        // try {
        //     const response = await axios.get(`${leaderboardApi.apiUrl}/myplugin/v1/leaderboard`, {
        //         params: {
        //             month: selectedMonth,
        //             year: selectedYear,
        //         },
        //     });
        //     setLeaderboard(response.data);
        // } catch (error) {
        //     console.error('Error fetching leaderboard:', error);
        // }
    };

    return (
        <div>
            <h1>Leaderboard</h1>
            <div className="formRow">
                <label>
                    Month:
                    <select value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)}>
                        {months.map((month, index) => (
                            <option key={index} value={month}>
                                {month}
                            </option>
                        ))}
                    </select>
                </label>
                <label>
                    Year:
                    <select value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)}>
                        {years.map((year, index) => (
                            <option key={index} value={year}>
                                {year}
                            </option>
                        ))}
                    </select>
                </label>
                <button onClick={fetchLeaderboard} className="searchButton">Search</button>
                <button className="deleteButton">Delete Data</button>
            </div>
            <UploadLeaderboard months={months} years={years} setLeaderboardData={setLeaderboard} />
            {leaderboard && <RevenueLeaderboard data={leaderboard} />}
        </div>
    );
};

export default Leaderboard;