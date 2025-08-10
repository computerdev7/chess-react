import { useEffect } from "react";
import { useNavigate } from "react-router"
import Alert from "../component/Alert";
import useStore from "../Store.jsx";
import bgImage from "../../assets/BImage.jpg";
import TabImage from "../../assets/tab.jpg";
import MobileImage from "../../assets/mobile.jpg";
import { useState } from "react";

export default function Home() {

    let navigate = useNavigate();
    let { setShowAlert, showAlert } = useStore();
    let getItem = sessionStorage.getItem('userName')
    let [imageSize,setImageSize] = useState();

    useEffect(() => {

        if (getItem == null) {
            setShowAlert(true)
        }

    }, [])

    useEffect(() => {
        let data = window.innerWidth;

        let reSizeFunc = () => {
            data = window.innerWidth;
            setImageSize(data)
        }

        setImageSize(data)

        window.addEventListener('resize', reSizeFunc)

        return ()=> (
            window.removeEventListener('resize',reSizeFunc)
        )
    },[])


    return (
        <>
            {showAlert && <Alert username={true} />}
            <div className={`h-screen w-screen flex justify-center items-center gap-5 `}
            >
                <img
                    className="absolute -z-50 w-full h-full object-cover"
                    src={imageSize >= 750 ? bgImage : imageSize >= 500 ? TabImage : MobileImage }
                />
                <button className="h-16 w-28 border border-yellow-950 text-yellow-950 font-ChelseaMarket rounded-3xl bg-gradient-to-tr from-yellow-500 to-yellow-100 shadow-inner
                hover:bg-gradient-to-tr hover:from-yellow-100 hover:to-yellow-500 outline-yellow-300/50 active:outline active:border-none"
                    onClick={() => {
                        navigate('/game')
                        sessionStorage.setItem('condForPlay', true)
                    }}
                > Online </button>
                <button className="h-16 w-28 border border-yellow-950 text-yellow-950 font-ChelseaMarket rounded-3xl bg-gradient-to-tr from-yellow-500 to-yellow-100 
                hover:bg-gradient-to-tr hover:from-yellow-100 hover:to-yellow-500 outline-yellow-300/50 active:outline active:border-none"
                    onClick={() => {
                        navigate('/game')
                        sessionStorage.setItem('condForPlay', false)
                    }}
                > Offline </button>
            </div>
        </>
    )
}