import axios from "axios";

const handleWithdraw = async (token: string, value: number) => {
  try {
    const response = await axios.post(
      "http://localhost:4040/api/user/withdraw",
      {
        a: token, // Passando o token diretamente, sem usar localStorage aqui
        v: value,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error: any) {
    console.error(
      "Erro ao processar o saque:",
      error.response?.data?.message || error.message
    );

    throw new Error(
      error.response?.data?.message ||
        error.message ||
        "Erro desconhecido ao processar o saque"
    );
  }
};

export default handleWithdraw;
