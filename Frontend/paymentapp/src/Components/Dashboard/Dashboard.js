import React from 'react'
import Bodycmp from './Bodycmp'
import { encryptStorage } from '../../ConfigFiles/EncryptStorage'
import {useEffect} from 'react'

function Dashboard() {
    useEffect(() => {
        if(encryptStorage.getItem("user")!=undefined){
            window.location.replace("/dashboard")
        }
        if(encryptStorage.getItem("cart")==undefined){
            encryptStorage.setItem("cart",[])
        }
    }, [])
    return (
        <div>
            <Bodycmp />
           </div>
    )
}

export default Dashboard
