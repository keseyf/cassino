import axios from "axios";
import { FormEvent } from "react";

export default async function handleLogin(
  e: FormEvent,
  email: string,
  password: string
) {
  e.preventDefault();

  try {
    const response = await axios.post(
      "https://api-cassino-nine.vercel.app/api/user/login ",
      { email, password },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const authToken = localStorage.setItem(
      "authToken",
      response.data.authToken
    );
    return response;
  } catch (error: any) {
    console.error("Erro durante o login:", error);
    return error.response || { message: "Erro desconhecido" };
  }
}
