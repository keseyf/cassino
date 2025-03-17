import { useEffect, useState } from "react";
import axios from "axios";
import { GiTwoCoins } from "react-icons/gi";
import { IoIosRefresh } from "react-icons/io";

export default function Header() {
  const authToken = localStorage.getItem("authToken");
  const [balance, setBalance] = useState<number | undefined>(undefined);
  const [loading, setLoading] = useState(false);

  const fetchBalance = async () => {
    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:4040/api/getBalance",
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
      localStorage.removeItem("authToken")
      window.location.href = "/login"

    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (authToken) {
      fetchBalance();
    } else {
      window.location.href = "/login"
    }
  }, [authToken]);

  return (
    <header className="bg-zinc-900 p-3 shadow-xl text-gray-200">
      <nav className="flex justify-between items-center">
        <article className="flex items-center justify-between w-full space-x-4">
          <section className="flex gap-2 flex-row-reverse items-center">
            <button className={`bg-blue-600 p-3 rounded-full active:scale-75 duration-150`} onClick={() => fetchBalance()}><IoIosRefresh /></button>
            {loading ? (
              <div className="flex gap-2 items-center border border-blue-600/50 py-3 md:px-4 px-3 rounded bg-zinc-800 text-sm">Loading...</div>
            ) : (
              <div className="flex gap-2 items-center border border-blue-600/50 py-3 md:px-2 px-2 rounded bg-zinc-800 text-sm text-wrap overflow-ellipsis">
                <GiTwoCoins />
                {balance !== undefined ? balance.toFixed(2) : null}
              </div>

            )}
          </section>
          <a href="/" className="font-black text-lg sm:text-2xl"><h1 >BIRDBET</h1></a>
          <section className="md:space-x-4 space-x-3">
            <a className="text-sm md:py-3 md:px-4 p-3 bg-blue-600 hover:bg-blue-700 duration-200 rounded" href="/recharge">Deposito</a>
            <a className="text-sm hidden md:inline md:py-3 md:px-4 p-3 border duration-200 border-blue-600 hover:bg-blue-600 rounded" href="/saque">Saque</a>

          </section>
        </article>

      </nav>
    </header>
  );
}
