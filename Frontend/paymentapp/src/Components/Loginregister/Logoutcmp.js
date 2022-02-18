import React from 'react'
import {useEffect} from 'react'
import { encryptStorage } from '../../ConfigFiles/EncryptStorage'
import swal from 'sweetalert2'
function Logoutcmp() {
    useEffect(() => {
        encryptStorage.removeItem("user")
        encryptStorage.removeItem("token")
        //encryptStorage.removeItem("cart")
        swal.fire(
            'Logout Successfully!',
            'You clicked the button!',
            'success'
          )
        window.location.replace("/")
    }, )
    return (
        <div>
            
        </div>
    )
}

export default Logoutcmp
