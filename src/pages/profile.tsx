import axios from "axios";
import { useEffect, useState } from "react";
import Header from "../components/Header";
import DownMenu from "../components/DownMenu";
import { IoIosRefresh } from "react-icons/io";
import { useNavigate } from "react-router-dom";

interface Payment {
    qrcode: string;
    amount: number;
    status: string;
    createdAt: string;
}

interface UserData {
    username: string;
    email: string;
    balance: number;
    recharges: Payment[];
}

export default function Profile() {
    const [userData, setUserData] = useState<UserData | null>(null);
    const [loading, setLoading] = useState(true);
    const authToken = localStorage.getItem("authTokenbb");
    const navigate = useNavigate();

    useEffect(() => {
        if (authToken) {
            navigate("/profile");
        } else {
            navigate("/");
        }
    }, [authToken, navigate]);

    if (!authToken) return null;

    async function fetchUserData() {
        try {
            const response = await axios.post<UserData>("https://api-cassino-nine.vercel.app/api/user/profile ",
                { authToken },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            setUserData(response.data);
        } catch (e) {
            console.error("Erro ao receber dados do usuário:", e);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (!authToken) {
            console.error("Nenhum token encontrado.");
            setLoading(false);
            return;
        }

        fetchUserData();
    }, [authToken]);

    return (
        <div className="relative min-h-screen flex flex-col bg-white text-white">
            <div className="sticky top-0 z-10 bg-white shadow-md">
                <Header />
            </div>
            <main className="flex-grow p-4 space-y-4">
                {loading ? (
                    <p className="text-zinc-700 font-semibold text-center">carregando</p>
                ) : (
                    <div className="w-full md:max-w-2/3 mx-auto bg-white p-6 rounded-lg shadow-xl shadow-black/10">
                        <div className="flex w-full justify-between">
                            <button className={`bg-blue-600 p-2 mb-5 rounded-full active:scale-75 duration-150`} onClick={() => fetchUserData()}><IoIosRefresh /></button>
                            <div className="flex gap-2">

                                {/*<a className="bg-blue-600 rounded px-6 py-2 text-sm h-fit active:scale-75 duration-150" href="/profile/update">Configurar</a>*/}
                                <button onClick={() => { localStorage.removeItem("authToken"); navigate("/"); }} className="bg-red-500 hover:bg-red-600 rounded cursor-pointer px-6 py-2 text-sm h-fit active:scale-75 duration-200">Sair da conta</button>
                            </div>
                        </div>
                        <div className="flex w-full justify-between">
                            <h1 className="text-2xl font-bold text-gray-800">Perfil</h1>
                        </div>
                        {userData ? (
                            <div>
                                <div className="flex gap-3">
                                    <img className="w-1/6 sm:w-1/10 rounded" src="public/a.png" alt="" />
                                    <div className="flex flex-col">
                                        <p className="text-gray-800 text-base">Nome de usuário: <span className="font-semibold">{userData.username}</span></p>

                                        <p className="text-gray-800 text-base">Email: <span className="font-semibold">{userData.email}</span></p>
                                        <p className="text-gray-800 text-base">Saldo: <span className="text-green-600 font-semibold">R$ {userData.balance.toFixed(2)}</span></p>
                                    </div>
                                </div>
                                <hr />
                                <hr />
                                <h2 className="mt-6 text-xl font-semibold text-gray-800">Histórico de Transações</h2>
                                {userData.recharges.length > 0 ? (
                                    <ul className="mt-2 space-y-2">
                                        {userData.recharges.map((recharge, index) => (
                                            <li key={index} className="p-4 bg-gray-100 rounded-lg shadow-sm">
                                                <p className="text-white rounded-full bg-gray-400 my-2 text-center w-fit py-1 px-3">{index + 1}</p>
                                                <p className="text-gray-800">Valor: <span className="font-semibold">R$ {recharge.amount.toFixed(2)}</span></p>
                                                <p className="text-gray-800">Status: <span className={recharge.status === 'pending' ? "text-yellow-500" : recharge.status === "expired" ? "text-red-500" : "text-green-500"}>{recharge.status}</span></p>
                                                <p className="text-gray-800">Data: {new Date(recharge.createdAt).toLocaleString()}</p>
                                                {
                                                    recharge.status === "expired" || recharge.status === "approved" ? "" : (
                                                        <div>
                                                            <div className="bg-gray-100 p-2 rounded-md overflow-hidden">
                                                                <h1 className="font-base my-2 text-gray-800">Código Pix</h1>
                                                                <p className="text-blue-600 font-semibold text-wrap text-sm break-words">{recharge.qrcode}</p>
                                                            </div>

                                                            <button onClick={() => {
                                                                navigator.clipboard.writeText(recharge.qrcode)
                                                                    .then(() => {
                                                                        alert("Código copiado com sucesso!");
                                                                    })
                                                                    .catch(err => {
                                                                        console.error("Erro ao copiar o código: ", err);
                                                                    });
                                                            }} className="text-white bg-blue-600 hover:bg-blue-700 cursor-pointer duration-200 mt-2 px-3 py-2 rounded">
                                                                Copiar código Pix
                                                            </button>
                                                        </div>
                                                    )
                                                }
                                                use
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p className="text-gray-700">Nenhuma transacao realizada!</p>
                                )}
                            </div>
                        ) : (
                            <p>Erro ao carregar os dados do usuário.</p>
                        )}
                    </div>
                )}
            </main>
            <div className="sticky bottom-0 z-20 bg-white shadow-md">
                <DownMenu />
            </div>
        </div>
    );
}
