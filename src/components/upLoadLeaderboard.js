import { useState } from '@wordpress/element';
import axios from 'axios';
import * as XLSX from 'xlsx';

const UploadLeaderboard = ({ months, years, setLeaderboardData }) => {
    const [file, setFile] = useState(null);
    const [month, setMonth] = useState(months[0]);
    const [year, setYear] = useState(years[0]);

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        setFile(file);
        const reader = new FileReader();
        reader.onload = (event) => {
            const data = new Uint8Array(event.target.result);
            const workbook = XLSX.read(data, { type: 'array' });
            const sheetName = workbook.SheetNames[0];
            const worksheet = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
            const parsedData = worksheet.map((row, index) => ({
                rank: index + 1,
                name: row['Name'],
                revenue: parseFloat(row['Total Revenue']), // Parse revenue as a number
                image: row['Image'], // Assuming 'Image' column contains the image URL or path
                territory: row['Territory'], // Assuming 'Territory' column contains the territory
                teamNumber: row['Team Number'] // Assuming 'Team Number' column contains the team number
            }));
            setLeaderboardData(parsedData);
        };
        reader.readAsArrayBuffer(file);
    };

    const handleFileUploadToServer = async () => {
        if (!file) {
            alert('Please select a file first.');
            return;
        }

        const formData = new FormData();
        formData.append('file', file);
        formData.append('month', month);
        formData.append('year', year);

        try {
            const response = await axios.post('http://localhost:5000/api/upload-leaderboard', formData);
            console.log(response.data);
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    };

    return (
        <div>
            <h2>Upload new Leaderboard</h2>
            <div>
                <label>
                    Month:
                    <select value={month} onChange={(e) => setMonth(e.target.value)}>
                        {months.map((month, index) => (
                            <option key={index} value={month}>
                                {month}
                            </option>
                        ))}
                    </select>
                </label>
                <label>
                    Year:
                    <select value={year} onChange={(e) => setYear(e.target.value)}>
                        {years.map((year, index) => (
                            <option key={index} value={year}>
                                {year}
                            </option>
                        ))}
                    </select>
                </label>
                <div>
                    <input type="file" accept=".xlsx, .xls" onChange={handleFileUpload} />
                </div>
                <div>
                    <button onClick={handleFileUploadToServer} className="searchButton">Upload</button>
                </div>
            </div>
        </div>
    );
};

export default UploadLeaderboard;