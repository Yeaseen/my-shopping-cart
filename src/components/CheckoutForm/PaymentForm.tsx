import React, { useContext } from 'react'
import { Typography, Button, Divider } from '@material-ui/core'
import {
  Elements,
  CardElement,
  ElementsConsumer
} from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import Review from './Review'
import { userContext } from '../../App'

const stripePromise = loadStripe(
  process.env.REACT_APP_STRIPE_PUBLIC_KEY || '{}'
)

function PaymentForm(props: any) {
  //console.log(props.shippingData)

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

  const handleSubmit = async (events, elements, stripe) => {
    events.preventDefault()

    if (!stripe || !elements) return

    const cardElement = elements.getElement(CardElement)

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement
    })

    if (error) {
      console.log(error)
      props.ifError(error)
      props.nextStep()
    } else {
      const orderData = {
        all_items: state.products,
        customer: {
          firstname: props.shippingData.firstName,
          lastname: props.shippingData.lastName,
          email: props.shippingData.email
        },
        shipping: {
          name: 'Primary',
          street: props.shippingData.address1,
          town_city: props.shippingData.city,
          country_state: props.shippingData.division,
          postal_zip_code: props.shippingData.zip,
          country: props.shippingData.country
        },
        payment: {
          gateway: 'stripe',
          stripe: {
            payment_method_id: paymentMethod.id
          }
        }
      }
      props.handleCaptureCheckout(orderData)
      props.nextStep()
    }
  }
  return (
    <>
      <Review />
      <Divider />
      <Typography variant="h6" gutterBottom style={{ margin: '20px 0' }}>
        Payment method
      </Typography>

      <Elements stripe={stripePromise}>
        <ElementsConsumer>
          {({ elements, stripe }) => (
            <form onSubmit={(e) => handleSubmit(e, elements, stripe)}>
              <CardElement />
              <br /> <br />
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Button variant="outlined" onClick={props.backStep}>
                  Back
                </Button>

                <Button
                  type="submit"
                  variant="contained"
                  disabled={!stripe}
                  color="primary"
                >
                  Pay ${calculateSubTotal()}
                </Button>
              </div>
            </form>
          )}
        </ElementsConsumer>
      </Elements>
    </>
  )
}

export default PaymentForm
