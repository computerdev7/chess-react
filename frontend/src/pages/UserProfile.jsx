import { useEffect } from "react"
import axios from "axios"
import { useState } from "react"

export default function UserProfile() {

    let username1 = sessionStorage.getItem("userName")
    let [userInfo, setUserInfo] = useState({})

    useEffect(() => {
        axios.get(`https://chess-react-8rwz.onrender.com/userprofile/${username1}`)
            .then((res) => {
                setUserInfo(res.data.message)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])


    return (
        <>
            <h1>
                {userInfo?.username}
            </h1>
            <h1>
                {userInfo?.win}
            </h1>
            <h1>
                {userInfo?.loss}
            </h1>
        </>
    )
}