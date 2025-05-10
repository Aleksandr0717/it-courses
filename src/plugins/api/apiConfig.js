export const API_BASE_URL = "http://localhost:3000/api";

export async function fetchData(url, options = {}) {
  try {
    const response = await fetch(url, {
      ...options,
    })
    .catch(error => console.error('Произошла ошибка:', error));    
    
    if (!response.ok) {
      throw new Error({
        ...response,
        message: `Ошибка: ${response.status} ${response.statusText}`,
      });
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Ошибка при выполнении запроса:", error);
    throw error;
  }
}
