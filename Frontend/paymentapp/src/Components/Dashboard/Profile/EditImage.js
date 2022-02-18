import React from 'react'
import { encryptStorage } from '../../../ConfigFiles/EncryptStorage'
import {updateprofileimage} from '../../../Services/services'
import swal from 'sweetalert2'
function EditImage() {
    const submit = (e) => {
        e.preventDefault()
        let formData = new FormData();    //formdata object
        var imagedata = document.querySelector('input[type="file"]').files[0];
        formData.append("myfile", imagedata);
        formData.append('email', encryptStorage.getItem("user").email);   //append the values with key, value pair
        
        const config = {
            headers: {
                "Content-Type": "multipart/form-data; boundary=AaB03x" +
                    "--AaB03x" +
                    "Content-Disposition: file" +
                    "Content-Type: png" +
                    "Content-Transfer-Encoding: binary" +
                    "...data... " +
                    "--AaB03x--",
                "Accept": "application/json",
                "type": "formData",
                "Authentication":`Bearer ${localStorage.getItem('_token')}`
                
            }
        }
        updateprofileimage(formData).then(
            data => {
                console.log(data)
                if (data.data.Status === "success") {
                    var newdata=encryptStorage.getItem("user")
                    newdata.profile_img=data.data.new_profile_img
                    encryptStorage.setItem("user",newdata)
                    console.log(newdata)
                    swal.fire(data.data.message)
                    window.location.reload("")
                     }
                     else{
                         swal.fire("error")
                         window.location.reload("")
                     }
            }
        )

    }
    return (
        <div style={{textAlign:"center",margin:"20px"}}>
            <h1>Edit Profile Image</h1>
            <form method='POST' onSubmit={submit} enctype="multipart/form-data">
            <input type="file" name='myfile' id='myfile' />
            <input type="hidden" name='email' id='email' value={encryptStorage.getItem("user").email}/>
            <button type='submit' >Submit</button>
            </form>
        </div>
    )
}

export default EditImage
