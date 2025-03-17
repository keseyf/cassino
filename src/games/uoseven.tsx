import { useState, useRef } from "react";
import DownMenu from "../components/DownMenu";
import Header from "../components/Header";

export function UosevenPage() {
    const cs = ["under", "equal", "over"];
    const authToken = localStorage.getItem("authTokenbb");
    const [dice, setDice] = useState<{ d1: number; d2: number } | null>(null);
    const [bet, setBet] = useState<number | null>(null);
    const [c, setC] = useState("");
    const [result, setResult] = useState<string>("");
    const [rolling, setRolling] = useState(false);
    const [showWinModal, setShowWinModal] = useState(false);

    // 🔊 Pré-carregar os sons
    const winSoundRef = useRef(new Audio("/win.mp3"));
    const diceSoundRef = useRef(new Audio("/dice.mp3"));

    const rollDice = async () => {
        if (!bet) {
            setResult("Insira um valor antes de apostar!");
            return;
        }
        if (!c) {
            setResult("Selecione uma opção de aposta antes de apostar!");
            return;
        }

        setRolling(true); // Ativa a animação de fade-out dos dados
        setResult("Rolando Dados...");

        setTimeout(async () => {
            const response = await fetch("http://localhost:4040/api/games/uoseven", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ a: authToken, b: bet, c: c }),
            });

            const data = await response.json();
            setDice({ d1: data.d1, d2: data.d2 });
            setResult(data.message);

            // 🎲 Toca o som dos dados
            diceSoundRef.current.play();

            setRolling(false); // Animação de fade-in

            if (data.message === "Ganho!") {
                // 🔊 Toca o som de vitória
                winSoundRef.current.play();
                setShowWinModal(true);
            }
        }, 1500); // Tempo da animação antes de mostrar os dados
    };

    return (
        <div className="flex flex-col relative items-center h-screen bg-gray-100">
            <section className="sticky w-full top-0 z-20">
                <Header />
            </section>

            <div className="flex gap-4 bg-emerald-800 items-center flex-col h-full justify-center w-full shadow-lg" style={{ height: "calc(100vh - 374px)" }}>
                <div className={`flex transition-opacity duration-500 ${rolling ? "opacity-0" : "opacity-100"}`}>
                    <img src={`../assets/dice${dice ? dice.d1 : 1}.png`} alt="Dado 1" className="w-24 h-24" />
                    <img src={`../assets/dice${dice ? dice.d2 : 1}.png`} alt="Dado 2" className="w-24 h-24" />
                </div>
                {result && <div className="text-white text-center mt-4">{result}</div>}
            </div>

            <div className="flex flex-col w-full h-fit gap-2 flex-1 py-5 bg-zinc-800">
                <div className="flex gap-2 px-5 w-full">
                    {cs.map((option, index) => (
                        <button
                            key={option}
                            className={`flex-1 text-center py-3 px-6 rounded-lg text-white font-semibold transition-all duration-300 ${c === option ? "bg-blue-600" : "bg-gray-700 hover:bg-gray-600"}`}
                            onClick={() => setC(option)}
                        >
                            {index === 0 ? "Menor" : index === 1 ? "Igual" : "Maior"}
                        </button>
                    ))}
                </div>
                <div className="flex px-6 h-fit w-full gap-2 justify-evenly content-center items-center">
                    <input
                        type="number"
                        placeholder="Aposta"
                        className="border flex-1 border-gray-600/20 p-2 focus:outline-none focus:border-zinc-600 duration-200"
                        required
                        onChange={(e) => {
                            const value = Number(e.target.value);
                            if (!isNaN(value)) setBet(value);
                        }}
                    />
                    <input type="submit" value="Jogar Dados" onClick={rollDice} className="py-3 px-6 bg-blue-500 text-white font-semibold rounded-lg shadow-md transition-all duration-300 hover:bg-blue-600" />
                </div>
            </div>

            <div className="fixed bottom-0 w-full">
                <DownMenu />
            </div>

            {/* Modal de vitória */}
            {showWinModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/30 bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                        <h2 className="text-2xl font-bold text-green-600">🎉 Você Ganhou! 🎉</h2>
                        <p className="mt-2 text-zinc-700">Parabéns, sua aposta foi bem-sucedida!</p>
                        <button
                            onClick={() => setShowWinModal(false)}
                            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700"
                        >
                            Fechar
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
