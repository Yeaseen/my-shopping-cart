import React from 'react'

import { Card } from 'react-bootstrap'
import { Link, withRouter } from 'react-router-dom'
import { userContext } from '../App'

import { Types } from '../reducers';
const SingleCard = (props) => {

    const { state, dispatch } = React.useContext(userContext);


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

    return (
        <Card>
            <Card.Img variant="top" src={props.record.picture} />
            <Card.Body style={{ textAlign: "center" }}>
                <Card.Title style={{ fontSize: "medium" }} className="btn"
                ><Link to={{
                    pathname: '/product/' + props.record._id,
                    state: { foo: props.record }
                }}>{props.record.title} </Link></Card.Title>
                <Card.Text>
                    {props.record.description}
                </Card.Text>
                <Card.Text style={{ fontSize: "medium" }}>
                    ${props.record.price}
                </Card.Text>
                <Card.Text style={{ fontSize: "medium" }}>
                    Available: {props.record.stock}
                </Card.Text>
            </Card.Body>
            <Card.Footer className="align-items-center" >
                <i className="material-icons"
                    style={{ float: "left", position: "absolute", left: "0px", color: "red", marginLeft: "5px" }}
                    onClick={() => { addToCart(props.record) }}
                >add_shopping_cart</i> <small className="btn"
                    onClick={() => { addToCart(props.record) }}
                    style={{ marginLeft: "10px", fontSize: "large" }}>  Add to cart</small>

                {
                    state.products.map(product => (
                        product.id === props.record._id
                            ? <span key={product.id}>
                                <i className="material-icons"
                                    style={{ position: "relative", left: "0px", color: "grey", marginLeft: "0px" }}

                                >check</i>

                                <span className="btn btn-secondary" key={product.id} style={{ marginLeft: "20px" }}><Link style={{ color: "white" }} to={{
                                    pathname: '/cart'
                                }}> View cart</Link></span>

                            </span>
                            :
                            <span key={product.id}></span>
                    ))
                }
            </Card.Footer>
            
        </Card>




    )
}

export default SingleCard