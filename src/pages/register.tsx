import { FormEvent, useState } from "react"

export default function Register() {
    const [type, setType] = useState("password")
    const [username, setUsername] = useState("password")
    const [email, setEmail] = useState("password")
    const [password, setPassword] = useState("password")
    const [confirmPassword, setConfirmPassword] = useState("password")
    const [error, setError] = useState("")

    function changeType() {
        type == "password" ? setType("text") : setType("password")
    }

    return (
        <div className="flex items-center justify-center h-screen">
            <div className="flex flex-col shadow-2xl px-8 py-10 space-y-5 bg-white rounded-lg">
                <span className="space-y-1.5">
                    <h1 className="text-center text-xl font-semibold">Cadastre-se</h1>
                </span>
                <form className="flex flex-col space-y-4">
                    <input type="text" placeholder="Usuario" className="border border-gray-600/20 p-2 focus:outline-none focus:border-gray-600 duration-200" required onChange={(e) => {
                        setUsername(e.target.value)
                    }} />
                    <input type="text" placeholder="Email" className="border border-gray-600/20 p-2 focus:outline-none focus:border-gray-600 duration-200" required onChange={(e) => {
                        setEmail(e.target.value)
                    }} />
                    <input type={type} placeholder="Senha" className="border border-gray-600/20 p-2 focus:outline-none focus:border-gray-600 duration-200" required onChange={(e) => {
                        setPassword(e.target.value)
                    }} />
                    <input type={type} placeholder="Confirmar senha" className="border border-gray-600/20 p-2 focus:outline-none focus:border-gray-600 duration-200" required onChange={(e) => {
                        setConfirmPassword(e.target.value)
                    }} />
                    <div className="flex gap-2 flex-row-reverse justify-end items-center">

                        <label htmlFor="show" className="text-sm">Mostrar senha</label>
                        <input name="show" type="checkbox" onChange={changeType} value={"Mostrar senha"} />
                    </div>
                    <input type="submit" value="Enviar" className="bg-gray-700 hover:bg-gray-800 duration-200 cursor-pointer px-3 py-2 text-white rounded" />
                    <span className="text-sm text-center">Já possui conta? <a href="/login" className="text-blue-600">Conecte-se</a></span>
                    {error ? <h1 className="text-red-600 text-center">{error}</h1> : ""}
                </form>
            </div>
        </div>
    )
}