import axios from "axios";

export default async function handleRecharge(rv: number, authToken: string) {
  try {
    const response = await axios.post(
      "http://localhost:4040/api/user/recharge",
      { rv, authToken },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log(response.data);
    return response;
  } catch (error: any) {
    console.error("Erro durante criacao de recarga:", error.response);
    return error.response || { message: "Erro desconhecido" };
  }
}
