import React, { useEffect, useState, useContext } from 'react'
//import { Card } from 'react-bootstrap'
import axios from 'axios';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown'
import { userContext } from '../App'
import { Types } from '../reducers';
import './Home.css'
import { Link, withRouter } from 'react-router-dom'
import SingleCard from './SingleCard'
import { Stats } from 'fs';
const Home = () => {

    const [items, setItems] = useState<any[]>([])
    const [subtotal, setSubtotal] = useState(0)
    const [dropDwonValue, setDropDwonValue] = useState("Default Sorting")
    const { state, dispatch } = React.useContext(userContext);

    useEffect(() => {
        axios.get('https://gist.githubusercontent.com/Yeaseen/9eee54d0c4c673e414af25de915b18e5/raw/c3fd521dfbc6b5fbf851bf1e0486caf380bf88de/file.json')
            .then(res => {
                //console.log(res.data)
                setItems(res.data)
            })
    }, [])


    useEffect(() => {
        calculateSubTotal()
    }, [state])


    const sortDescending = () => {
        const sorted = items.sort((a, b) => a["price"] - b["price"])
        //console.log(sorted)
        setItems(sorted)
    }

    const sortAscending = () => {
        const sorted = items.sort((a, b) => b["price"] - a["price"])
        //console.log(sorted)
        setItems(sorted)
    }


    const handleSelect = (e) => {
        console.log(e);
        //setValue(e)
        setDropDwonValue(e)

        if (e === "Ascending") {
            sortAscending()
        }
        else if (e === "Descending") {
            sortDescending()
        }

    }

    const calculateSubTotal = () => {
        let sTotal = 0
        for (let i = 0; i < state.products.length; i++) {
            sTotal = sTotal + state.products[i].price * state.products[i].count
        }
        //console.log(sTotal)
        setSubtotal(sTotal)
    }



    const removeToCart = (recordid) => {
        //console.log(record)
        dispatch({
            type: Types.Delete,
            payload: {
                id: recordid
            }
        })

        //console.log(state)
    }


    const increaseCart = (recordID) => {

        dispatch({
            type: Types.Increase,
            payload: {
                id: recordID
            }
        });
    }


    const decreaseCart = (record) => {

        if (record.count == 1) {
            removeToCart(record.id)
            return;
        }

        dispatch({
            type: Types.Decrease,
            payload: {
                id: record.id
            }
        });
    }



    return (
        <>
            {items ?
                <div>

                    <div className="container">
                        <div className="row site-section">
                            <div className="col-md-9">

                                <h1>Products</h1>

                                <DropdownButton
                                    alignRight
                                    title={dropDwonValue}
                                    id="dropdown-menu-align-right"
                                    onSelect={handleSelect}
                                    style={{ float: "right", position: "absolute", right: "50px" }}
                                >
                                    <Dropdown.Item eventKey="Ascending">Ascending</Dropdown.Item>
                                    <Dropdown.Item eventKey="Descending">Descending</Dropdown.Item>
                                </DropdownButton>

                                <div className="container-fluid d-flex justify-content-center">
                                    <div className="row">
                                        {
                                            items.map(record => {
                                                return (
                                                    <div className="col-md-5" key={record._id}>
                                                        <SingleCard record={record} />
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-3">
                                <h1>Cart</h1>
                                {
                                    state.products.length > 0 ?
                                        <div>
                                            {state.products.map(record => (
                                                <div className="Comment-user" key={record.id} style={{ borderBottom: "1px solid blue" }}>
                                                    <div>
                                                        <div className="Comment-user-avatar">
                                                            <img src={record.picture} />
                                                        </div>
                                                    </div>
                                                    <div className="Comment-user-nickname" >

                                                        <span style={{ fontFamily: "'PT Sans', sans-serif", fontWeight: "bold" }}>{record.title}</span>

                                                        <br></br>
                                                        <form>
                                                            <div className="row">
                                                                <div className="value-button" id="decrease"
                                                                    onClick={() => { decreaseCart(record) }}
                                                                >-</div>
                                                                <div className="count-value">
                                                                    {record.count}
                                                                </div>
                                                                <div className="value-button" id="increase"
                                                                    onClick={() => { increaseCart(record.id) }}
                                                                >+</div>
                                                                <div
                                                                > x ${record.price} </div>

                                                              
                                                                <i className="material-icons"
                                                                    style={{ float: "right", position: "absolute", right: "0px", color: "red" }}
                                                                    onClick={() => { removeToCart(record.id) }}
                                                                >delete</i>
                                                            </div>

                                                        </form>

                                                        {/* {record.count} x ${record.price} */}
                                                        {/* <i className="material-icons"
                                                            style={{ float: "right", position: "absolute", right: "0px", color: "red" }}
                                                            onClick={() => { removeToCart(record.id) }}
                                                        >delete</i>

                                                        <br></br> */}

                                                    </div>

                                                </div>
                                            ))}
                                            <br></br>

                                            <span style={{ fontWeight: "bolder", fontSize: "small" }}>Subtotal: ${subtotal}</span>

                                            <br></br>

                                            <div className="btn btn-secondary" style={{ marginRight: "10px" }}><Link style={{ color: "white" }} to={{
                                                pathname: '/cart'
                                            }}> View cart</Link></div>

                                            <div className="btn btn-secondary">Checkout</div>
                                        </div>
                                        : <h4>No products in the cart</h4>
                                }
                            </div>

                        </div>


                    </div>
                </div >

                :
                <h2>Loading......</h2>
            }
        </>

    )
}

export default withRouter(Home)