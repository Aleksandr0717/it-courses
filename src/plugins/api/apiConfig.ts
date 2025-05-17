export const API_BASE_URL = "http://localhost:3000/api";

export async function fetchData(url: string, options: RequestInit = {}) {
  try {
    const response = await fetch(url, {
      ...options,
    })
    .catch((error: Error) => {
      console.error('Произошла ошибка:', error);
      throw error;
    });    
    
    if (!response?.ok) {
      throw new Error(`Ошибка: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Ошибка при выполнении запроса:", error);
    throw error;
  }
} 
