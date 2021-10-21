import React, { useContext, useState, useEffect } from 'react'
import { userContext } from '../../../App'
import { Types } from '../../../reducers'

import {
  CssBaseline,
  Paper,
  Stepper,
  Step,
  StepLabel,
  Typography,
  CircularProgress,
  Divider,
  Button
} from '@material-ui/core'

import { Link, withRouter } from 'react-router-dom'
import AddressForm from '../AddressForm'
import PaymentForm from '../PaymentForm'

import useStyle from './styles'

const steps = ['Shipping Adress', 'Payement Details']

const Checkout = (props) => {
  const { state, dispatch } = useContext(userContext)
  const [activeStep, setActiveStep] = useState(0)
  const [shippingData, setShippingData] = useState({})
  const [isFinished, setIsFinished] = useState(false)
  const [order, setOrder] = useState(null)
  const [error, setError] = useState('')
  const classes = useStyle()

  const nextStep = () => setActiveStep((prevActiveStep) => prevActiveStep + 1)
  const backStep = () => setActiveStep((prevActiveStep) => prevActiveStep - 1)

  const test = (data) => {
    setShippingData(data)
    //console.log(data)
    nextStep()
  }

  const deleteAllItems = () => {
    dispatch({
      type: Types.DeleteALL
    })
  }

  const ifError = (error) => {
    //timeout()
    setError(error)
    deleteAllItems()
  }

  const handleCaptureCheckout = (newOrder) => {
    //const incomingOrder = await commerce.checkout.capture(checkoutTokenId, newOrder);
    setOrder(null)
    deleteAllItems()
  }

  const timeout = () => {
    setTimeout(() => {
      setIsFinished(true)
    }, 3000)
  }

  let Confirmation = () =>
    order ? (
      <>
        <div>
          <Typography variant="h5">
            Thank you for your purchase, customer.firstname customer.lastname!
          </Typography>
          <Divider className={classes.divider} />
          <Typography variant="subtitle2">Order ref: reference</Typography>
        </div>
        <br />
        <Button component={Link} variant="outlined" type="button" to="/">
          Back to home
        </Button>
      </>
    ) : (
      <>
        <div>
          <Typography variant="h5">Thank you for your purchase!</Typography>
          <Divider className={classes.divider} />
        </div>
        <br />
        <Button component={Link} variant="outlined" type="button" to="/">
          Back to home
        </Button>
      </>
    )

  // isFinished ? (
  //   <>
  //     <div>
  //       <Typography variant="h5">Thank you for your purchase!</Typography>
  //       <Divider className={classes.divider} />
  //     </div>
  //     <br />
  //     <Button component={Link} variant="outlined" type="button" to="/">
  //       Back to home
  //     </Button>
  //   </>
  // ) : (
  //   <div className={classes.spinner}>
  //     <CircularProgress />
  //   </div>
  // )

  if (error) {
    Confirmation = () => (
      <>
        <Typography variant="h5">Error: {error}</Typography>
        <br />
        <Button component={Link} variant="outlined" type="button" to="/">
          Back to home
        </Button>
      </>
    )
  }

  const Form = () =>
    activeStep === 0 ? (
      <AddressForm test={test} />
    ) : (
      <PaymentForm
        shippingData={shippingData}
        nextStep={nextStep}
        backStep={backStep}
        handleCaptureCheckout={handleCaptureCheckout}
        ifError={ifError}
      />
    )

  return (
    <>
      <div className={classes.toolbar} />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography variant="h4" align="center">
            Checkout
          </Typography>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map((step) => (
              <Step key={step}>
                <StepLabel>{step}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length ? <Confirmation /> : <Form />}
        </Paper>
      </main>
    </>
  )
}
export default withRouter(Checkout)
