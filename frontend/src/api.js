// src/api.js
const API_BASE_URL = 'http://127.0.0.1:8000/api'; // Replace with your backend URL

export const saveSessionData = async (data) => {
    // You'll need to send the authentication token here once implemented
    const response = await fetch(`${API_BASE_URL}/sessions/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            // 'Authorization': `Bearer YOUR_TOKEN_HERE` 
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return await response.json();
};