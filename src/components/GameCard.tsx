import CardGameInterface from "../utils/CardInterface";

export default function GameCard({ url, inputFile, canplay }: CardGameInterface) {
    return (
        <div className="flex  group transform transition duration-300 hover:scale-105 rounded flex-col space-y-3">
            <div className="flex flex-col items-center bg-transparent justify-between rounded-2xl shadow-lg w-48 h-fit hover:shadow-xl">
                <img className="h-full bg-auto w-full rounded-lg object-contain" src={inputFile} alt="game icon" />

            </div>

            <a
                className={`w-full py-2 px-4 text-white font-semibold rounded-lg text-center transition duration-200 ${canplay ? "bg-blue-500 hover:bg-blue-600" : "bg-gray-600 text-gray-400 pointer-events-none"}`}
                href={url}
            >
                Jogar
            </a>
        </div>
    )
}