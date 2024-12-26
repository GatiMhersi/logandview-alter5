// services/authService.ts

export const fetchUserData = async () => {
    try {
      // Obtener el token guardado en el localStorage
      const token = localStorage.getItem('authToken');
      if (!token) {
        throw new Error('No token found, please login again');
      }
  
      // Realizar la solicitud GET a la API
      const response = await fetch('https://dummyjson.com/user/me', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`, // Pasamos el token como Bearer
        },
        credentials: 'same-origin', // Incluir cookies si es necesario
      });
  
      // Verificar si la respuesta es exitosa
      if (!response.ok) {
        throw new Error('Failed to fetch user data');
      }
  
      // Parsear la respuesta a JSON
      const userData = await response.json();
  
      // Retornar los datos del usuario
      return userData;
    } catch (error) {
      console.error('Error fetching user data:', error);
      throw error;
    }
  };
  