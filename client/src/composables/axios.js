// axiosInstance.js
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL, // Set the base URL to include the '/api' prefix
  
  headers: {
    "Access-Control-Allow-Origin": import.meta.env.VITE_SERVER_URL,
    'Content-Type': 'application/json',
  },
  withCredentials: true // Ensure that credentials are sent with the request

});


// Log the base URL to verify
console.log('Axios Base URL:', axiosInstance.defaults.baseURL);

// Log the environment variable
console.log('Environment Variable VITE_SERVER_URL:', import.meta.env.VITE_SERVER_URL);

axiosInstance.defaults.headers.post["Accept"] = "application/json";
axiosInstance.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
//axiosInstance.defaults.headers.common['X-CSRF-TOKEN'] = "sYJNZmz5RrRG5IJ0n12S7S1nl14a-TAn4O1XLVVkfjU";
//Fetch the CSRF token and set it in Axios headers
export async function fetchCsrfToken() {
  try {
    const response = await axiosInstance.get('/csrf-token');
    const csrfToken = response.data.csrfToken;

    // Set the CSRF token in Axios headers
    axiosInstance.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken;
  } catch (error) {
    console.error('Error fetching CSRF token:', error);
  }
}

 await fetchCsrfToken();
export default axiosInstance;

