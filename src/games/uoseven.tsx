import { useState, useRef, useEffect } from "react";
import DownMenu from "../components/DownMenu";
import Header from "../components/Header";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function UosevenPage() {
    const cs = ["under", "equal", "over"];
    const authToken = localStorage.getItem("authTokenbb");

    // States
    const [dice, setDice] = useState<{ d1: number; d2: number } | null>(null);
    const [bet, setBet] = useState<number>(0); // Aposta inicial
    const [c, setC] = useState<string>("");
    const [result, setResult] = useState<string>("");
    const [rolling, setRolling] = useState<boolean>(false);
    const [showWinModal, setShowWinModal] = useState<boolean>(false);
    const [balance, setBalance] = useState<number | undefined>(undefined);
    const [loading, setLoading] = useState<boolean>(false);

    // Refs para sons
    const winSoundRef = useRef(new Audio("/win.mp3"));
    const diceSoundRef = useRef(new Audio("/dice.mp3"));

    // Carregar saldo ao montar o componente
    useEffect(() => {
        if (authToken) {
            fetchBalance();
        }
    }, [authToken]);

    if (!authToken) {
        localStorage.removeItem("authTokenbb")
        const navigate = useNavigate()
        navigate("/login")
        return null
    }

    // Função para buscar o saldo
    const fetchBalance = async () => {
        try {
            setLoading(true);
            const response = await axios.post(
                "https://api-cassino-nine.vercel.app/api/getBalance",
                { authToken },
                {
                    headers: {
                        Authorization: `Bearer ${authToken}`,
                    },
                }
            );
            setBalance(response.data.balance);
        } catch (error) {
            console.error("Erro ao obter o saldo:", error);
            localStorage.removeItem("authToken");
            window.location.href = "/login";
        } finally {
            setLoading(false);
        }
    };

    // Função para rolar os dados
    const rollDice = async () => {
        setLoading(true)
        if (bet <= 0) {
            setResult("Insira um valor antes de apostar!");
            return;
        }
        if (!c) {
            setResult("Selecione uma opção de aposta antes de apostar!");
            return;
        }

        if (bet < 0.5) {
            setResult("Mínimo de aposta: R$0.50");
            return;
        }

        setRolling(true);
        setResult("Rolando Dados...");

        setTimeout(async () => {
            const response = await fetch("https://api-cassino-nine.vercel.app/api/games/uoseven", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ a: authToken, b: bet, c: c }),
            });

            const data = await response.json();
            if (!data.d1 || !data.d2) {
                setDice({ d1: 1, d2: 1 });
            } else {

                setDice({ d1: data.d1, d2: data.d2 });
            }
            setResult(data.message);

            diceSoundRef.current.play();

            setRolling(false);

            if (data.message === "Ganho!") {
                winSoundRef.current.play();
                setShowWinModal(true);
            }

            setLoading(false)
            fetchBalance();
        }, 1500);
    };

    // Função para definir o valor máximo de aposta
    const handleMaxBet = async () => {
        if (balance && balance > 0) {
            setBet(balance);
        }
    };

    // Função para garantir que o valor da aposta seja um número válido
    const handleBetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = Number(e.target.value);
        if (!isNaN(value)) {
            setBet(value);
        }
    };

    return (
        <div className="flex flex-col items-center h-screen bg-gray-100">
            <section className="sticky w-full top-0 z-20">
                <Header />
            </section>

            <div className="flex gap-4 bg-emerald-800 items-center flex-col h-full justify-center w-full shadow-lg" style={{ height: "calc(100vh - 374px)" }}>
                <div className={`flex transition-opacity duration-500 ${rolling ? "opacity-0" : "opacity-100"}`}>
                    <img src={`/dice${dice ? dice.d1 : 1}.png`} alt="Dado 1" className="w-24 h-24" />
                    <img src={`/dice${dice ? dice.d2 : 1}.png`} alt="Dado 2" className="w-24 h-24" />
                </div>
                {result && <div className="text-white text-center mt-4">{result}</div>}
            </div>

            <div className="flex flex-col w-full h-fit gap-2 space-y-4 flex-1 py-5 bg-neutral-950">
                <div className="flex gap-2 px-5 w-full">
                    {cs.map((option, index) => (
                        <button
                            key={option}
                            className={`flex-1 text-center py-3 px-6 rounded-lg text-white font-semibold transition-all duration-300 ${c === option ? "bg-blue-500" : "bg-neutral-800 hover:bg-gray-600"}`}
                            onClick={() => setC(option)}
                        >
                            {index === 0 ? "Menor" : index === 1 ? "Igual" : "Maior"}
                        </button>
                    ))}
                </div>

                <div className="flex flex-col px-6 h-fit w-full space-y-4 gap-2 justify-evenly content-center items-center">
                    <div className="flex w-full gap-3">
                        <button
                            onClick={handleMaxBet}
                            className="border rounded flex-1 border-gray-600/20 p-2 focus:outline-none focus:border-zinc-600 duration-200"
                        >
                            Max
                        </button>
                        <input
                            type="number"
                            placeholder="Aposta"
                            className="border flex-1 rounded border-white/50 p-2 focus:outline-none focus:border-zinc-600 duration-200"
                            value={bet.toFixed(2) || ""}
                            onChange={handleBetChange}
                        />
                        <button
                            onClick={() => setBet(0.5)}
                            className="border rounded flex-1 border-gray-600/20 p-2 focus:outline-none focus:border-zinc-600 duration-200"
                        >
                            Min
                        </button>
                    </div>

                    <input
                        type="submit"
                        value="Jogar Dados"
                        disabled={(loading ? true : false)}
                        onClick={rollDice}
                        className={`py-3 w-full px-6 font-semibold rounded-lg shadow-md transition-all duration-300 ${loading ? "!bg-neutral-800 !text-neutral-500" : "!bg-emerald-500 hover:!bg-emerald-600 !text-white "}`}
                    />
                </div>
            </div>

            <div className="fixed bottom-0 w-full">
                <DownMenu />
            </div>

            {showWinModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/30 bg-opacity-50">
                    <div className="bg-neutral-900 p-6 rounded-lg shadow-lg text-center">
                        <h2 className="text-2xl font-bold text-green-500">🎉 Você Ganhou! 🎉</h2>
                        <p className="mt-2 text-zinc-200">Parabéns, sua aposta foi bem-sucedida!</p>
                        <button
                            onClick={() => setShowWinModal(false)}
                            className="mt-4 px-4 py-2 duration-200 shadow-2xl bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                        >
                            Fechar
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
