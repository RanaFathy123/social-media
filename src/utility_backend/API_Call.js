
export const fetchDataFromAPI = async ({ endpoint, method = 'GET', headers = {}, body = null }) => {
    // const baseURL = 'http://localhost:5000'
    const baseURL = import.meta.env.VITE_REACT_API_URL

    console.log(baseURL)
    // const baseURL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';

    console.log('Fetching data from API:', `${baseURL}${endpoint}`);
    
    try {
      const response = await fetch(`${baseURL}${endpoint}`, {
        method,
        headers: {
          "Content-Type": "application/json",
          ...headers,
        },
        body: body ? JSON.stringify(body) : null,
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error; // Re-throw the error for further handling in the component
    }
  };
  