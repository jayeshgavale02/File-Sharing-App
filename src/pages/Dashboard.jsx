import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import FileCardRow from '../components/FileCard';
import { jwtDecode } from 'jwt-decode';

function Dashboard() {
    const token = localStorage.getItem('token');
    const decoded = jwtDecode(token);

    const [files, setFiles] = useState([]); // State to hold the fetched files

    // Function to fetch file data
    const fetchFileData = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/files/id/${decoded.id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${token}` // Use 'Bearer' if your backend requires it
                }
            });
    
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
    
            const data = await response.json();
            // console.log('Fetched file data:', data); // Log the fetched data
            setFiles(data.files); // Adjust this based on your API response structure
        } catch (error) {
            console.error('Error fetching file data:', error);
            setFiles([]); // Clear the files in case of error
        }
    };
    

    // Use useEffect to fetch the file data when the component mounts
    useEffect(() => {
        fetchFileData();
    }, []);

    return (
        <> 
            <Navbar />
            <FileCardRow files={files} />
        </>
    );
}

export default Dashboard;
