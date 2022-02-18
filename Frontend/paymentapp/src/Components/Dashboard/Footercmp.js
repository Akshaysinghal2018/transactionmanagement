import React from 'react'
import {useHistory} from 'react-router-dom'
function Footercmp() {
    const history =useHistory()
    return (
        <div>
            <footer className="page-footer font-small blue pt-4" style={{ backgroundColor: "black", color: "white",textAlign:"center",bottom:0,position:'relative',width:'100%' }}>
                <div className="footer-copyright text-center py-3">© 2021 Copyright:
                    <a href="/"> NeoStore</a> All rights reserved .
                </div>

            </footer>

        </div>
    )
}

export default Footercmp
