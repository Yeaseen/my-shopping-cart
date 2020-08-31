import React, { useContext, useState, useEffect } from 'react'

import { userContext } from '../App'
import { Link, withRouter } from 'react-router-dom';
import { Types } from '../reducers';
import './Home.css'
const Product = (props) => {
    const { state, dispatch } = useContext(userContext);
    const [subtotal, setSubtotal] = useState(0)

    const [count, setCount] = useState(0)

    //console.log(state)
    const { foo } = props.location.state
    //console.log(foo)




    useEffect(() => {
        calculateSubTotal()
    }, [state])


    const calculateSubTotal = () => {
        let sTotal = 0
        for (let i = 0; i < state.products.length; i++) {
            sTotal = sTotal + state.products[i].price * state.products[i].count
            if (state.products[i].id === foo._id) {
                setCount(state.products[i].count)
            }
        }
        //console.log(sTotal)
        setSubtotal(sTotal)
    }

    const addToCart = (record) => {
        //console.log(record)

        for (let i = 0; i < state.products.length; i++) {
            if (state.products[i].id === record._id) {
                dispatch({
                    type: Types.Increase,
                    payload: {
                        id: record._id,
                    }
                });

                //console.log("Got One Bye")

                return;
            }
        }

        dispatch({
            type: Types.Create,
            payload: {
                id: record._id,
                title: record.title,
                price: record.price,
                picture: record.picture,
                count: 1
            }
        });


        //console.log(state)
    }



    const removeToCart = (recordid) => {
        //console.log(record)
        dispatch({
            type: Types.Delete,
            payload: {
                id: recordid
            }
        })
        setCount(0)
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
        <div className="container">
            <div className="row site-section">
                <div className="col-md-9">

                    <div className="row site-section" style={{ borderBottom: "1px solid blue" }}>
                        <div className="col-md-8">
                            <img style={{ height: "400px", width: "400px" }} src={foo.picture}></img>

                        </div>

                        <div className="col-md-4">
                            <h1>{foo.title}</h1>
                            <h4>${foo.price}</h4>
                            <p>{foo.description}</p>
                            <span style={{ padding: "7px", borderWidth: "1px", borderStyle: "solid", fontSize: "small" }}>
                                {count}
                            </span>

                            <span className="btn btn-secondary" onClick={() => { addToCart(foo) }} style={{ marginLeft: "10px", fontSize: "large" }}>  Add to cart</span>
                        </div>

                    </div>


                    <br></br>


                    <div className="row">
                        <h1>Description</h1>
                        <p>{foo.description}</p>
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


                                                    <i className="material-icons"
                                                        style={{ float: "right", position: "absolute", right: "0px", color: "red" }}
                                                        onClick={() => { removeToCart(record.id) }}
                                                    >delete</i>
                                                </div>

                                            </form>


                                            {/* {record.count} x ${record.price}
                                            <i className="material-icons"
                                                style={{ float: "right", position: "absolute", right: "0px", color: "red" }}
                                                onClick={() => { removeToCart(record.id) }}
                                            >delete</i> */}
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
    )
}

export default withRouter(Product)