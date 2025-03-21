import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Index() {
    const navigate = useNavigate();
    const token = localStorage.getItem("authTokenbb");

    useEffect(() => {
        if (token) {
            navigate("/games");
        } else {
            navigate("/login");
        }
    }, [token, navigate]); // Executa quando o token mudar

    return (
        <div className="flex items-center justify-center h-screen">
            Carregando...
        </div>
    );
}
