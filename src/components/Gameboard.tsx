import { FormEvent, useEffect, useState } from "react";

export default function Gameboard() {
    const [selectedBox, setSelectedBox] = useState(Number);
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(true)
    const [canBet, setCanBet] = useState(false)
    const [bet, setBet] = useState(Number)
    let balance = 40
    const minBet = 0.5
    useEffect(() => {
        if (bet >= minBet && balance >= bet && selectedBox) {
            setCanBet(true);
        } else {
            setCanBet(false); // Pode ser uma boa ideia resetar o valor de `canBet` se as condições não forem atendidas
        }
    }, [bet, minBet, balance, selectedBox]);  // Adicionando as variáveis como dependências


    function reveal(e: FormEvent) {
        e.preventDefault()
    }

    return (
        <main className="flex flex-col py-5 sm:flex-row sm:justify-between px-5 items-center placeholder:text-gray-200 bg-neutral-800 md:justify-evenly">
            <article className="grid p-3 group grid-rows-4 gap-2 w-fit grid-cols-4">
                {[...Array(16)].map((_, i) => (
                    <div
                        key={i}
                        onClick={() => setSelectedBox(i + 1)}
                        className={`h-20 w-20 lg:w-32 lg:h-32 cursor-pointer shadow-lg duration-300 rounded-xl flex items-center justify-center group-hover:not-hover:bg-zinc-700 text-transparent hover:text-white font-black text-lg ${selectedBox === i + 1 ? "md:scale-95 scale-105 !bg-emerald-500 text-white" : "bg-zinc-600 "
                            }`}
                    >
                        {i + 1}
                    </div>
                ))}
            </article>
            <form onSubmit={reveal} className="flex w-3/4 md:w-1/3 bg-zinc-700 p-6 flex-col rounded space-y-5 md:space-y-7">
                <h1 className="text-lg text-center text-white font-semibold">Aposta</h1>
                <input id="" type="number" placeholder="Quantia" className="border-gray-300/40 text-white border duration-300 focus:border-white p-3 outline-none" onChange={(e) => {
                    setBet(Number(e.target.value))
                }} />
                <select className="flex flex-col w-full border text-white outline-none border-gray-300/40 focus:border-white p-3" name="" id="">
                    <option value="2" className="bg-black border hover:bg-emerald-500">1.5x</option>
                    <option value="2" className="bg-black border hover:bg-emerald-500">2x</option>
                    <option value="2" className="bg-black border hover:bg-emerald-500">2.5x</option>
                    <option value="2" className="bg-black border hover:bg-emerald-500">5x</option>
                    <option value="2" className="bg-black border hover:bg-emerald-500">10x</option>
                </select>
                <button className={`text-white w-full px-2 py-3 rounded font-semibold duration-200 cursor-pointer ${canBet ? "pointer-events-auto bg-emerald-700" : "pointer-events-none bg-emerald-700/50"}`}>Revelar</button>
            </form>
        </main>
    );
}
