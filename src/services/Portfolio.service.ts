// services/Portfolio.service.ts
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getUserPortfolio = async (token: string) => {
  const response = await fetch(`${API_URL}/api/stocks/portfolio`, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  // Si no es OK, vamos a ver qué pasó antes de lanzar el error
  if (!response.ok) {
    console.error("Status del error:", response.status); // Verás si es 401, 404, 500, etc.
    const errorBody = await response.json().catch(() => ({}));
    console.error("Cuerpo del error del servidor:", errorBody);
    throw new Error(`Error ${response.status}: ${errorBody.message || "Fallo en la API"}`);
  }

  return response.json();
};