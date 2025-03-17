import { FormEvent, useEffect, useState } from "react";
import handleRegister from "../handlers/handleRegister";
import { useNavigate } from "react-router-dom";

export default function Register() {
    const navigate = useNavigate();
    const authToken = localStorage.getItem("authTokenbb");

    useEffect(() => {
        if (authToken) {
            navigate("/games");
        }
    }, [authToken, navigate]);

    if (authToken) return null;

    const [type, setType] = useState("password");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [response, setResponse] = useState<string | undefined>(undefined);
    const [loading, setLoading] = useState(false);

    function changeType() {
        setType((prevType) => (prevType === "password" ? "text" : "password"));
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setResponse("");

        try {
            const res = await handleRegister(username, email, password, confirmPassword);

            if (res?.status === 200) {
                setResponse(res.data.message || "Usuário registrado com sucesso!");
                setTimeout(() => navigate("/login"), 1000);
            } else {
                setError(res?.data?.message || "Erro ao registrar usuário.");
            }
        } catch (error: any) {
            setError(error?.response?.data?.message || "Erro ao registrar usuário.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center h-screen">
            <div className="flex flex-col sm:w-1/2 lg:w-1/3 shadow-2xl px-8 py-10 text-gray-700 space-y-5 bg-white rounded-lg">
                <h1 className="text-center text-xl font-semibold text-gray-700">Cadastre-se</h1>
                <form onSubmit={handleSubmit} className="flex flex-col text-gray-700 space-y-4">
                    <input
                        type="text"
                        placeholder="Usuário"
                        className="border border-gray-300 p-2 focus:outline-none focus:border-gray-500 duration-200"
                        required
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        className="border border-gray-300 p-2 focus:outline-none focus:border-gray-500 duration-200"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type={type}
                        placeholder="Senha"
                        className="border border-gray-300 p-2 focus:outline-none focus:border-gray-500 duration-200"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <input
                        type={type}
                        placeholder="Confirmar senha"
                        className="border border-gray-300 p-2 focus:outline-none focus:border-gray-500 duration-200"
                        required
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <div className="flex gap-2 flex-row-reverse justify-end items-center">
                        <label htmlFor="show" className="text-sm text-gray-700">Mostrar senha</label>
                        <input
                            name="show"
                            type="checkbox"
                            onChange={changeType}
                            className="w-4 h-4 appearance-none border border-black/30 rounded bg-transparent checked:bg-blue-600 focus:outline-none cursor-pointer"
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-blue-600 hover:bg-blue-700 duration-200 cursor-pointer px-3 py-2 text-white rounded disabled:bg-gray-500 disabled:cursor-not-allowed"
                        disabled={loading}
                    >
                        {loading ? "Carregando..." : "Enviar"}
                    </button>
                    <p className="text-sm text-gray-600 text-center">
                        Ao criar uma conta você concorda com os <a href="/terms" className="text-blue-600">Termos de uso</a>
                    </p>
                    <span className="text-sm text-center text-gray-600">
                        Já possui conta? <a href="/login" className="text-blue-600">Conecte-se</a>
                    </span>


                    {error && <p className="text-red-600 text-sm text-center">{error}</p>}
                    {response && <p className="text-emerald-600 text-sm text-center">{response}</p>}
                </form>
            </div>
        </div>
    );
}
