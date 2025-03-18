import { BiHome, BiUser, BiWallet } from "react-icons/bi";
import { HiGift } from "react-icons/hi2";
import { MdMoney } from "react-icons/md";

export default function DownMenu() {
    return (
        <section className="flex w-full bg-neutral-900">
            <nav className="w-full">
                <ul className="flex w-full text-xs sm:text-base list-none">
                    <li className="flex-1">
                        <a href="/" className="flex duration-200 delay-50 hover:bg-blue-600 flex-col items-center justify-center p-3.5">
                            <BiHome size={20} />
                            Inicio
                        </a>
                    </li>
                    <li className="flex-1">
                        <a href="/recharge" className="flex duration-200 delay-50 hover:bg-blue-600 flex-col items-center justify-center p-3.5">
                            <BiWallet size={20} />
                            Recarga
                        </a>
                    </li>
                    <li className="flex-1">
                        <a href="/withdraw" className="flex duration-200 delay-50 hover:bg-blue-600 flex-col items-center justify-center p-3.5">
                            <MdMoney size={20} />
                            Saque
                        </a>
                    </li>
                    <li className="flex-1">
                        <a href="/profile" className="flex duration-200 delay-50 hover:bg-blue-600 flex-col items-center justify-center p-3.5">
                            <BiUser size={20} />
                            Perfil
                        </a>
                    </li>
                </ul>
            </nav>
        </section>
    );
}
