import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import DownMenu from "../components/DownMenu";
import handleWithdraw from "../handlers/handleWithdraw"; // Agora estamos importando a função de saque

export default function Withdraw() {
    const navigate = useNavigate();
    const token = localStorage.getItem("authTokenbb");
    const [loading, setLoading] = useState(false);
    const [withdrawValue, setWithdrawValue] = useState<string>(""); // Armazenando o valor de saque
    const [canInteract, setCanInteract] = useState(true); // Para desabilitar interação durante a requisição
    const [log, setLog] = useState(""); // Log para mensagens de sucesso
    const [error, setError] = useState(""); // Para exibir erros
    const [pixKey, setPixKey] = useState<string | null>(null); // Chave Pix recebida após o saque

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const numericValue = Number(withdrawValue);
        if (isNaN(numericValue) || numericValue <= 0 || numericValue > 1000) return;

        setCanInteract(false);

        try {
            if (!token) {
                alert("Nenhum token definido");
                return;
            }

            const response = await handleWithdraw(token, Number(withdrawValue)); // Chama a função de saque
            setLoading(false);

            if (response.message === "Saque realizado com sucesso.") {
                setLog(response.message);
                setError("");
                setPixKey(response.pixKey);  // Chave Pix recebida do back-end
                navigate("/profile");  // Redireciona para o perfil após o saque
            } else {
                setError(response.message);
                setLog("");
            }
        } catch (error) {
            setLoading(false);
            alert("Erro ao processar o saque");
        } finally {
            setCanInteract(true); // Habilita a interação novamente após a requisição
        }
    };

    const handleWithdrawValueClick = (value: number) => {
        setWithdrawValue(value.toString());
        setLog("Valor de saque válido!");
        setError("");
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;

        // Permitir apenas números
        if (!/^\d*$/.test(value)) {
            return;
        }

        setWithdrawValue(value);

        if (value === "") {
            setError("");
            setLog("");
            return;
        }

        const numericValue = Number(value);
        if (numericValue > 1000) {
            setError("Valor de saque maior que 1000!");
            setLog("");
        } else if (numericValue < 1) {
            setError("Valor de saque deve ser maior que 0!");
            setLog("");
        } else {
            setLog("Valor de saque válido!");
            setError("");
        }
    };

    const copyToClipboard = () => {
        if (pixKey) {
            navigator.clipboard.writeText(pixKey);
            alert("Chave Pix copiada!");
        }
    };

    return (
        <main className="text-zinc-7000 min-h-screen flex flex-col">
            <section className="sticky top-0 z-10 bg-neutral-900 shadow-md">
                <Header />
            </section>

            <section className={`flex flex-col items-center justify-center py-8 px-4 w-full ${canInteract ? "pointer-events-auto" : "pointer-events-none"}`} style={{ flex: 1 }}>
                {pixKey ? (
                    <div className="bg-neutral-900 shadow-xl rounded-xl p-6 w-full max-w-md space-y-6">
                        <h1 className="text-3xl font-extrabold text-center">Chave Pix Gerada</h1>
                        <div className="text-center text-neutral-300 space-y-1">
                            <p className="text-sm">Use a chave abaixo para realizar o saque.</p>
                        </div>

                        <div className="mt-4">
                            <span className="block bg-neutral-800 inset-shadow shadow-xl text-neutral-200 p-4 rounded-lg break-words">{pixKey}</span>
                            <button
                                type="button"
                                onClick={copyToClipboard}
                                className="mt-4 bg-blue-600 w-full hover:bg-blue-700 text-white py-2 px-6 rounded-lg transition-all duration-200"
                            >
                                Copiar Chave Pix
                            </button>
                            <p className="text-sm text-neutral-300 my-5 text-center">Ao realizar o saque, verifique o seu perfil para o saldo atualizado!</p>
                        </div>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="bg-neutral-900 shadow-xl rounded-xl p-6 w-full max-w-md space-y-6">
                        <h1 className="text-3xl font-extrabold text-center ">Saque</h1>
                        <div className="text-center text-neutral-500 space-y-1">
                            <p className="text-sm">Etapa 1: Selecione ou insira o valor do saque.</p>
                            <p className="text-sm">Etapa 2: Gere um código para completar o saque.</p>
                        </div>

                        <div className="grid grid-cols-3 gap-4 mt-4">
                            {[5, 10, 20, 50, 100, 200].map((value) => (
                                <button
                                    key={value}
                                    type="button"
                                    onClick={() => handleWithdrawValueClick(value)}
                                    className="bg-neutral-800 hover:bg-neutral-300 text-neutral-100 hover:text-black p-4 rounded-lg transition-all duration-200 transform hover:scale-105"
                                >
                                    {value}
                                </button>
                            ))}
                        </div>

                        <div className="flex items-center justify-center mt-4">
                            <input
                                className="appearance-none w-full p-3 text-lg bg-neutral-900 text-zinc-300 rounded-lg border border-neutral-800 focus:outline-none focus:border-neutral-700 transition duration-200"
                                type="text"
                                value={withdrawValue}
                                placeholder="Valor do Saque:"
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className="flex flex-col items-start mt-2 space-y-2">
                            {log && <p className="text-sm text-green-500">{log}</p>}
                            {error && <p className="text-sm text-red-500">{error}</p>}
                        </div>

                        <button
                            type="submit"
                            className={`w-full py-3 text-lg rounded-lg mt-6 ${withdrawValue && !error ? "bg-blue-600 hover:bg-blue-700" : "bg-neutral-700 cursor-not-allowed"} `}
                            disabled={!withdrawValue || !!error}
                        >
                            {loading ? "Carregando..." : "Enviar"}
                        </button>
                    </form>
                )}
            </section>

            <section className="sticky bottom-0 z-10 bg-white shadow-md">
                <DownMenu />
            </section>
        </main>
    );
}
