import { useState } from "react"
import { useNavigate } from "react-router"

export default function SignLogin(){

    let [userName , setUserName] = useState('');
    let navigate = useNavigate();

    return (
        <>
        <div className="h-screen w-screen flex justify-center items-center">
        <div className="h-56 w-56 p-8 bg-slate-700">
            <input className="w-full" value={userName} onChange={(e)=> setUserName(e.currentTarget.value)}
            type="text" />
            <button className="border w-16 border-black"
            onClick={()=> {
                sessionStorage.setItem('userName', userName );
                navigate('/')
            }}
            > SEND </button>
        </div>
        </div>
        </>
    )
}