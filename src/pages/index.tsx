export default function Index() {
    const token = localStorage.getItem("token")

    return (
        <div>
            oi
            {
                token ? (window.location.href = "/game") : (window.location.href = "/register")
            }
        </div>
    )
}