import React, { useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'

const NavBar = () => {
    const history = useHistory()

    useEffect(()=>{
        {history.push("/")} 
    }, [])

    return (
        <div className="norm">
            <div className="nav-wrapper white">
                <Link to="/" className="cus ">Shopping Cart</Link>
                
            </div>
        </div>
    )
}

export default NavBar