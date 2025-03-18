import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import DownMenu from "../components/DownMenu";
import { HouseGames } from "../components/gamesSections";

export default function Games() {
    const navigate = useNavigate();
    const authToken = localStorage.getItem("authTokenbb");

    useEffect(() => {
        if (!authToken) {
            navigate("/login");
        }
    }, [authToken, navigate]);
    if (!authToken) return null;

    return (
        <div className="flex flex-col h-screen relative">
            <section className="sticky top-0 z-20">
                <Header />
            </section>

            <article className="flex p-2 w-full flex-col flex-grow">
                <h1 className=" text-xl my-2 font-semibold text-neutral-200 italic">Games BirdBet Inc.</h1>
                <hr className="border-white/5 mt-1 mb-4" />
                <section className="w-full">

                    <HouseGames />
                </section>

            </article>
            <div className="my-10 text-center text-gray-200">
                <p className="text-lg">Mais jogos em breve! Fique ligado.</p>
                <p className="mt-2">Enquanto isso, aproveite o <strong>under over 7</strong>!</p>
            </div>
            <div className="sticky bottom-0 z-20">
                <DownMenu />
            </div>
        </div>
    );
}
