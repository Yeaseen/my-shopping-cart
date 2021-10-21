import React, { useContext } from 'react'

import { Typography, List, ListItem, ListItemText } from '@material-ui/core'
import { userContext } from '../../App'
const Review = () => {
  const { state, dispatch } = useContext(userContext)

  const calculateSubTotal = () => {
    let sTotal = 0
    for (let i = 0; i < state.products.length; i++) {
      sTotal = sTotal + state.products[i].price * state.products[i].count
    }

    return sTotal
    //console.log(sTotal)
    //setSubtotal(sTotal)
  }
  //console.log(state)
  return (
    <>
      <Typography variant="h6" gutterBottom>
        Order Summary
      </Typography>
      <List disablePadding>
        {state.products.map((product) => (
          <ListItem style={{ padding: '10px 0' }} key={product.id}>
            <ListItemText
              primary={product.title}
              secondary={`Quantity: ${product.count}`}
            />
            <Typography variant="body2">${product.price}</Typography>
          </ListItem>
        ))}
        <ListItem style={{ padding: '10px 0' }}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" style={{ fontWeight: 700 }}>
            ${calculateSubTotal()}
          </Typography>
        </ListItem>
      </List>
    </>
  )
}

export default Review
