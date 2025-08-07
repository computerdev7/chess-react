import { useState } from "react"
import { useNavigate } from "react-router"
import useStore from "../Store.jsx"

export default function Alert(){

    let navigate = useNavigate()
    let [userName,setUserName] = useState('')
    let {setShowAlert} = useStore();

    return(
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-60 w-96 bg-slate-700 flex justify-center items-center flex-col gap-5">
                <p className="text-white">choose username</p>
                <input onChange={(e) => setUserName(e.currentTarget.value)} value={userName}/>
                <button 
                onClick={()=> {
                    sessionStorage.setItem('userName',userName);
                    setShowAlert(false);
                }}
                className="border">OK</button>
            </div>
    )
}