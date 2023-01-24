import React, { useState, useEffect } from 'react'
import SlotService from '../services/Dashboard/SlotService'

const Context = React.createContext({})

export function SlotsContextProvider({ children }) {
    const [slots, setSlots] = useState([]);

    useEffect(function () {
        console.log("useEffectContext_Slots")
        SlotService.getAll()
            .then(({ data }) => {
                setSlots(data)
            })
    }, [setSlots])

    return <Context.Provider value={{ slots, setSlots }}>
        {children}
    </Context.Provider>
}

export default Context