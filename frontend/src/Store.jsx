import {create} from "zustand"

let useStore = create((set) => ({
    fromState : true,
    setFromState : (val)=> {
        set({fromState : val})
    },
    promotionText : '',
    setPromotionText : (val) => {
        set({promotionText : val })
    }
}))

export default useStore;