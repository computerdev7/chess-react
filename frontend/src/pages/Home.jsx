import {useNavigate} from "react-router"

export default function Home(){

    let navigate = useNavigate();

    return (
        <>
        <div className="h-screen w-screen flex justify-center items-center gap-5">
        <button className="h-16 w-28 border border-black" 
        onClick={()=> {
            navigate('/game', {state : "false"})
        }}
        > Online </button>
        <button className="h-16 w-28 border border-black" 
        onClick={()=> {
            navigate('/game', {state :  true})
        }}
        > Offline </button>
        </div>
        </>
    )
}