import axios from "axios";
import dotenv from "dotenv";

export default async function handleRegister(
  username: string,
  email: string,
  password: string,
  confirmedPassword: string
) {
  try {
    const response = await axios.post(
      "https://api-cassino-nine.vercel.app/api/user/register ",
      { username, email, password, confirmedPassword },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response;
  } catch (error: any) {
    console.error("Erro durante o registro:", error);
    return error.response || { message: "Erro desconhecido" };
  }
}
