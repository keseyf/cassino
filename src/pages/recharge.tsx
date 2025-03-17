import { FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import DownMenu from "../components/DownMenu";
import handleRecharge from "../handlers/handleRecharge";

export default function RechargePage() {
    const navigate = useNavigate();
    const token = localStorage.getItem("authTokenbb");
    const [loading, setLoading] = useState(false);
    const [rechargeValue, setRechargeValue] = useState<string>(""); // Agora é string para evitar problemas de entrada
    const [canInteract, setCanInteract] = useState(true);
    const [log, setLog] = useState("");
    const [error, setError] = useState("");
    const [pixKey, setPixKey] = useState<string | null>(null);

    useEffect(() => {
        if (!token) {
            navigate("/register");
        }
    }, [token, navigate]);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const numericValue = Number(rechargeValue);
        if (isNaN(numericValue) || numericValue <= 0 || numericValue > 1000) return;

        setCanInteract(false);

        try {
            if (!token) {
                alert("Nenhum token definido");
                return;
            }
            const response = await handleRecharge(numericValue, token);
            setLoading(false);

            if (response.status === 200) {
                setLog(response.data.message);
                setError("");
                setPixKey(response.data.pixCopyPasteKey);
            } else {
                setError(response.data.message);
                setLog("");
            }
        } catch (error) {
            alert("Erro ao processar a recarga");
        } finally {
            setCanInteract(true);
        }
    };

    const handleRechargeValueClick = (value: number) => {
        setRechargeValue(value.toString());
        setLog("Valor de recarga válido!");
        setError("");
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;

        // Permitir apenas números
        if (!/^\d*$/.test(value)) {
            return;
        }

        setRechargeValue(value);

        if (value === "") {
            setError("");
            setLog("");
            return;
        }

        const numericValue = Number(value);
        if (numericValue > 1000) {
            setError("Valor de recarga maior que 1000!");
            setLog("");
        } else if (numericValue < 1) {
            setError("Valor de recarga deve ser maior que 0!");
            setLog("");
        } else {
            setLog("Valor de recarga válido!");
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
            <section className="sticky top-0 z-10 bg-white shadow-md">
                <Header />
            </section>

            <section className={`flex flex-col items-center justify-center py-8 px-4 w-full ${canInteract ? "pointer-events-auto" : "pointer-events-none"}`} style={{ flex: 1 }}>
                {pixKey ? (
                    <div className="bg-white shadow-xl rounded-xl p-6 w-full max-w-md space-y-6">
                        <h1 className="text-3xl font-extrabold text-center text-blue-500">Chave Pix Gerada</h1>
                        <div className="text-center text-gray-600 space-y-1">
                            <p className="text-sm">Use a chave abaixo para realizar o pagamento.</p>
                        </div>

                        <div className="mt-4">
                            <span className="block bg-gray-100 text-zinc-700 p-4 rounded-lg break-words">{pixKey}</span>
                            <button
                                type="button"
                                onClick={copyToClipboard}
                                className="mt-4 bg-blue-600 w-full hover:bg-blue-700 text-white py-2 px-6 rounded-lg transition-all duration-200"
                            >
                                Copiar Chave Pix
                            </button>
                            <p className="text-sm text-zinc-700 my-5 text-center">Ao realizar recarga, recarregue o saldo para verificar se pagamento caiu!</p>
                        </div>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="bg-white shadow-xl rounded-xl p-6 w-full max-w-md space-y-6">
                        <h1 className="text-3xl font-extrabold text-center text-blue-500">Recarga</h1>
                        <div className="text-center text-gray-600 space-y-1">
                            <p className="text-sm">Etapa 1: Selecione ou insira o valor.</p>
                            <p className="text-sm">Etapa 2: Gere um código de recarga.</p>
                        </div>

                        <div className="grid grid-cols-3 gap-4 mt-4">
                            {[5, 10, 20, 50, 100, 200].map((value) => (
                                <button
                                    key={value}
                                    type="button"
                                    onClick={() => handleRechargeValueClick(value)}
                                    className="bg-gray-200 hover:bg-gray-300 text-zinc-700 p-4 rounded-lg transition-all duration-200 transform hover:scale-105"
                                >
                                    {value}
                                </button>
                            ))}
                        </div>

                        <div className="flex items-center justify-center mt-4">
                            <input
                                className="appearance-none w-full p-3 text-lg bg-gray-100 text-zinc-700 rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                                type="text"
                                value={rechargeValue}
                                placeholder="Valor:"
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className="flex flex-col items-start mt-2 space-y-2">
                            {log && <p className="text-sm text-green-600">{log}</p>}
                            {error && <p className="text-sm text-red-600">{error}</p>}
                        </div>

                        <button
                            type="submit"
                            className={`w-full py-3 text-lg rounded-lg mt-6 ${rechargeValue && !error ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-400 cursor-not-allowed"} `}
                            disabled={!rechargeValue || !!error}
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
