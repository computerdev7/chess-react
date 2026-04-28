import { useEffect } from "react"
import axios from "axios"

export default function UserProfile(){

    let username1 = sessionStorage.getItem("username")

    useEffect(()=> {
        axios.get(`https://chess-react-8rwz.onrender.com/userprofile/${username1}`)
        .then((res)=> {
            console.log(res)
        })
        .catch((err)=> {
            console.log(err)
        })
    },[])

    return (
        <>
        user profile
        </>
    )
}