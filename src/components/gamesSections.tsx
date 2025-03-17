import GameCard from "./GameCard";

function HouseGames() {
    return (
        <article className="flex flex-col w-full space-y-1 justify-center items-center">
            <div className="flex flex-wrap gap-5 p-10 w-full">
                <GameCard inputFile="/public/gamedicelogo.png" nameGame="Dice" url="/games/underover7" canplay={true} />
            </div>

        </article>
    );
}

export { HouseGames };
