import React, { useEffect } from 'react'
import {useState} from 'react'
import { getinvoice, getorder } from '../../Services/services'
import { encryptStorage } from '../../ConfigFiles/EncryptStorage'
import {Table} from 'react-bootstrap'
function Order() {
    const [orders, setorders] = useState([])
    useEffect(() => {
        //console.log(encryptStorage.getItem("user"))
        getorder({email:encryptStorage.getItem("user").email}).then(data=>
            {
                console.log(data)
                setorders(data.data.data)
            }
            )
        
    }, [])
    const submit=(data)=>{
        //alert(data)
        getinvoice({name:encryptStorage.getItem("user").first_name+" "+encryptStorage.getItem("user").last_name,"orderid":data}).then(data=>{
            console.log(data.data.data)
            const newWindow = window.open(`http://localhost:8899/images/invoice/${data.data.data}`, '_blank')
            if (newWindow) newWindow.opener = null
        })
    }
    return (
        <div>
            <Table>
                <thead>
                    <tr>
                        <th>
                            #
                        </th>
                        <th>
                            id
                        </th>
                        <th>
                            Order Date
                        </th>
                        <th>
                            getinvoice
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((item,index)=>{
                        return(
                            <tr key={index}>
                                <td>{index+1}</td>
                                <td>{item._id}</td>
                                <td>{item.order_date}</td>
                                <td><button onClick={()=>submit(item._id)}>Get Invoice </button></td>
                            </tr>
                        )
                    })}
                </tbody>

            </Table>
        </div>
    )
}

export default Order
