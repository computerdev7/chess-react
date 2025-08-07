import { useEffect } from "react";
import { useNavigate } from "react-router"

export default function Home() {

    let navigate = useNavigate();

    let getItem = sessionStorage.getItem('userName')

    useEffect(() => {

        if (getItem == null) {
            navigate('/login')
        }

    }, [])


    return (
        <>
            <div className="h-screen w-screen flex justify-center items-center gap-5">
                <button className="h-16 w-28 border border-black"
                    onClick={() => {
                        navigate('/game')
                        sessionStorage.setItem('condForPlay',true)
                    }}
                > Online </button>
                <button className="h-16 w-28 border border-black"
                    onClick={() => {
                        navigate('/game')
                        sessionStorage.setItem('condForPlay',false)
                    }}
                > Offline </button>
            </div>
        </>
    )
}