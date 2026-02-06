// services/Portfolio.service.ts
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getUserPortfolio = async (token: string) => {
    console.log("Obteniendo portafolio con token:", token);
  const response = await fetch(`${API_URL}/api/stocks/portfolio`, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) throw new Error("Error al obtener el portafolio");
  console.log("Respuesta del portafolio:", response);
  return response.json();
  
};