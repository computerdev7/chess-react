import { useEffect, useState } from "react"
import { useNavigate } from "react-router"
import useStore from "../Store.jsx"

export default function Alert({ username, gameResult }) {

    let navigate = useNavigate()
    let [userName, setUserName] = useState('')
    let { setShowAlert, setRestartGame } = useStore();
    let [wrongUserName,setWrongUserName] = useState(false);

    useEffect(() => {

    }, [])

    return (
        <>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-60 w-96 bg-slate-700 flex justify-center items-center flex-col gap-5">
                {
                    username ?
                        <>
                            <p className="text-white">choose username</p>
                            {wrongUserName && <p className="text-white" >re-enter username since this user alrready exist</p>}
                            <input onChange={(e) => setUserName(e.currentTarget.value)} value={userName} />
                            <button
                                onClick={async () => {
                                    try{
                                        const response = await fetch("http://localhost:3000/setUser", {
                                            method: "POST", 
                                            headers: {
                                                "Content-Type": "application/json", 
                                            },
                                            body: JSON.stringify({userName}), 
                                        });
    
                                        if(response.ok){
                                            sessionStorage.setItem('userName', userName);
                                            setShowAlert(false);
                                            setWrongUserName(false)
                                        } else if(response.ok == false){
                                            setWrongUserName(true)
                                        }
                                    } catch(err){
                                        console.log(err)
                                    }
                                }}
                                className="border">OK</button>
                        </> :
                        <>
                            <h1 className="text-white" >{gameResult}</h1>
                            <div className="flex gap-5">
                                <button className="border"
                                    onClick={() => {
                                        setRestartGame(true)
                                        setShowAlert(false)
                                    }}
                                > restart </button>
                                <button className="border"
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