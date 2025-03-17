import { FormEvent, useEffect, useState } from "react";
import handleLogin from "../handlers/handlelogin";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const navigate = useNavigate();
    const authToken = localStorage.getItem("authTokenbb"); // Obtém o token diretamente

    // Se o usuário estiver autenticado, redireciona imediatamente
    useEffect(() => {
        if (authToken) {
            navigate("/games");
        }
    }, [authToken, navigate]);

    // Se estiver autenticado, não renderiza nada (ou pode exibir um loader)
    if (authToken) {
        navigate("/games");
        return null; // Ou um loading spinner
    }

    const [type, setType] = useState("password");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [response, setResponse] = useState<string | undefined>(undefined);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setResponse("");

        try {
            const res = await handleLogin(e, email, password);
            if (res?.status === 200) {
                setResponse(res.data.message || "Login realizado com sucesso!");
                setError("");
                navigate("/games");
            } else {
                setError(res?.data?.message || "Erro ao realizar login.");
            }
        } catch (error: any) {
            setError(error?.response?.data?.message || "Erro ao realizar login.");
        } finally {
            setLoading(false);
        }
    };

    function changeType() {
        setType(type === "password" ? "text" : "password");
    }

    return (
        <div className="flex items-center justify-center h-screen">
            <div className="flex flex-col shadow-2xl px-8 max-w-2/3 sm:max-w-2/4 md:max-w-2/6 xl:max-w-1/4 py-10 space-y-5 bg-white text-gray-700 rounded-lg">
                <h1 className="text-center text-xl font-semibold">Conectar-se</h1>
                <form onSubmit={handleSubmit} className="flex  flex-col space-y-4">
                    <input
                        type="email"
                        placeholder="Email"
                        className="border border-gray-600/20 p-2 focus:outline-none focus:border-zinc-600 duration-200"
                        required
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type={type}
                        placeholder="Senha"
                        className="border border-gray-600/20 p-2 focus:outline-none focus:border-zinc-600 duration-200"
                        required
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <div className="flex gap-2 flex-row-reverse justify-end items-center">
                        <label htmlFor="show">Mostrar senha</label>
                        <input
                            name="show"
                            type="checkbox"
                            onChange={changeType}
                            className="w-4 h-4 appearance-none border border-black/30 rounded bg-transparent checked:bg-blue-600 focus:outline-none cursor-pointer"
                        />
                    </div>
                    <input
                        type="submit"
                        value={loading ? "Carregando..." : "Entrar"}
                        className="bg-blue-600 hover:bg-blue-700 duration-200 cursor-pointer px-3 py-2 text-white rounded"
                        disabled={loading}
                    />
                    <span className="text-sm text-center">
                        Não possui conta? <a href="/register" className="text-blue-600">Cadastre-se</a>
                    </span>
                    <div className="w-full flex overflow-clip text-wrap text-center items-center justify-center">

                        {response && <h1 className="text-emerald-600 text-sm text-center">{response}</h1>}
                        {error && <h1 className="text-red-600 text-sm text-center">{error}</h1>}
                    </div>
                </form>
            </div>
        </div>
    );
}
