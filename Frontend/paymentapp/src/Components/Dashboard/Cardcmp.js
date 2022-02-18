import React from 'react'
import {Card,Button} from 'react-bootstrap'
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import { encryptStorage } from '../../ConfigFiles/EncryptStorage';
import { updateCart } from '../../Services/services';
import swal from 'sweetalert2'
function Cardcmp({name,price,image_url,id}) {
    const history = useHistory();
    const dispatch = useDispatch()
    
    const alreadyhave=(data)=>{
        var count=0
        encryptStorage.getItem('cart').map(item=>{
            console.log(item)
            console.log(id)
            if(item.id==data){
                count=count+1
            }
        })
        return count
    }
    const addtoCart=()=>{
        //console.log(alreadyhave(id))
        if(alreadyhave(id)==0){
            var data1=encryptStorage.getItem('cart')
            dispatch({type:'Inc_count'})
            data1.push({name:name,price:price,quantity:1,image_url:image_url,id:id,Status:"In Stock"})
            encryptStorage.setItem('cart',data1)
            // updateCart({email:encryptStorage.getItem('user').email,cart_data:data1}).then(data=>
            //     console.log(data))
            swal.fire("item added")
        }
        else{
            swal.fire("already added")
        }
    }
    return (
        <Card>
            <Card.Img variant="top" src={image_url} width="100%" height="120px" />
            <Card.Body>
                <div style={{height:"70px",borderBottom:"2px solid black"}}>

                <p>{name}</p>
                </div>
                <Card.Text>
                    <p>
                    Price:{price}

                    </p>
                </Card.Text>
                <Button onClick={addtoCart} variant="danger">Add to Cart</Button>
                    
                </Card.Body>
        </Card>
    )
}

export default Cardcmp
