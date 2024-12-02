
const fetchWithToken = async (url, options = {}) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error("Token non trouvé");
        return;
      }
  
      const headers = {
        ...options.headers,
        'Authorization': `Bearer ${token}`
      };
  
      const response = await fetch(url, { ...options, headers });
      if (!response.ok) {
        console.error("Erreur réseau");
        return; 
      }
  
      return await response.json();
    } catch (error) {
      console.error("Error fetching with token:", error);
      return; 
    }
  };
  
  export default fetchWithToken;
  

  