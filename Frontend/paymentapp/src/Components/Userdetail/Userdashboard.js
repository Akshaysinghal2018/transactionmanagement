import React from 'react'
import { useEffect } from 'react'
import { encryptStorage } from '../../ConfigFiles/EncryptStorage'
import Bodycmp from '../Dashboard/Bodycmp'
function Userdashboard() {
    useEffect(() => {
        if(encryptStorage.getItem("user")==undefined){
            window.location.replace("/")
        }
    }, [])
    return (
        <div>
            <Bodycmp />
        </div>
    )
}

export default Userdashboard
