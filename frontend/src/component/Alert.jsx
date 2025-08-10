import { useEffect, useState } from "react"
import { useNavigate } from "react-router"
import useStore from "../Store.jsx"

export default function Alert({ username, gameResult }) {

    let navigate = useNavigate()
    let [userName, setUserName] = useState('')
    let { setShowAlert, setRestartGame } = useStore();
    let [wrongUserName, setWrongUserName] = useState(false);

    useEffect(() => {

    }, [])

    return (
        <>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-60 w-96 
             flex justify-center items-center flex-col gap-5 bg-yellow-200/70 rounded-xl backdrop-blur-md z-50">
                {
                    username ?
                        <>
                            <span className="flex justify-center items-center flex-col">
                                <p className="font-ChelseaMarket text-3xl text-yellow-900">choose username</p>
                                {wrongUserName && <p className="text-red-600 w-2/3 text-center leading-4 font-extrabold" >re-enter username since this user alrready exist or the username is invalid</p>}
                            </span>
                            <input className="w-3/5 p-2 rounded-lg outline-yellow-300 font-ChelseaMarket tracking-widest"
                                onChange={(e) => setUserName(e.currentTarget.value)} value={userName} />
                            <button className="border font-ChelseaMarket p-3 rounded-2xl w-24 bg-blue-400/70 text-white/70 hover:bg-blue-400/90 
                            hover:text-white active:border-none"
                                onClick={async () => {
                                    try {
                                        if (userName.length > 2) {
                                            const response = await fetch("https://chess-react-8rwz.onrender.com/setUser", {
                                                method: "POST",
                                                headers: {
                                                    "Content-Type": "application/json",
                                                },
                                                body: JSON.stringify({ userName }),
                                            });

                                            if (response.ok) {

                                                sessionStorage.setItem('userName', userName);
                                                setShowAlert(false);
                                                setWrongUserName(false)

                                            } else if (response.ok == false) {
                                                setWrongUserName(true)
                                            }
                                        } else {
                                            setWrongUserName(true)
                                        }
                                    } catch (err) {
                                        console.log(err)
                                    }
                                }}
                            >OK</button>
                        </> :
                        <>
                            <h1 className="text-yellow-900 text-2xl font-bold font-ChelseaMarket" >{gameResult}</h1>
                            <div className="flex gap-5">
                                <button className="border border-green-600 text-white/100 text-2xl font-bold font-ChelseaMarket p-3 rounded-3xl bg-green-500 shadow-inner
                  outline-yellow-300/50 active:outline active:border-none hover:border-green-700 hover:bg-green-600 active:text-white/50"
                                    onClick={() => {
                                        setRestartGame(true)
                                        setShowAlert(false)
                                    }}
                                > restart </button>
                                <button className="border border-red-500 text-white/100 text-2xl font-bold font-ChelseaMarket p-3 rounded-3xl bg-red-400 shadow-inner
                  outline-yellow-300/50 active:outline active:border-none hover:border-red-600 hover:bg-red-500 active:text-white/50"
                                    onClick={() => {
                                        setRestartGame(true);
                                        navigate('/');
                                        setShowAlert(false);
                                    }}
                                > home </button>
                            </div>
                        </>

                }
            </div>
        </>
    )
}