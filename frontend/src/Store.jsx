import {create} from "zustand"

let useStore = create((set) => ({
    timer : false,
    setTimer : (val)=> {
        set({timer : val})
    },
    fromState : true,
    setFromState : ()=> {
        set((state) => ({fromState  : !state.fromState}))
    },
    showPromotionInput : false,
    setShowPromotionInput : (val)=> {
        set({showPromotionInput : val})
    },
    promotionText : '',
    setPromotionText : (val) => {
        set({promotionText : val })
    }
}))

export default useStore;