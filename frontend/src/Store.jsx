import {create} from "zustand"

let useStore = create((set) => ({
    fromState : true,
    setFromState : (val)=> {
        set({fromState : val})
    },
    promotionText : '',
    setPromotionText : (val) => {
        set({promotionText : val })
    },
    onlineUsers : {
        w : null,
        b : null
    },
    setOnlineUsers : (user,val) => {
        set((state)=> ({...state.onlineUsers, [user] : val }))
    },
    restartGame : false,
    setRestartGame : (val)=> {
        set({restartGame : val})
    },
    startGame : true,
    setStartGame : (val)=> {
        set({startGame : val})
    },
    userColor : '',
    setUserColor : (val) => {
        set({userColor : val})
    },
    partner : false,
    setPartner : (val) => {
        set({partner : val})
    },
    showAlert : false,
    setShowAlert : (val) => {
        set({showAlert : val})
    },
    showPromotionInput : false,
    setShowPromotionInput : (val)=> {
        set({showPromotionInput : val })
    },
    playSound : ()=> {
        const sound = new Audio('/assets/move.mp3')
        sound.play();
    }
}))

export default useStore;