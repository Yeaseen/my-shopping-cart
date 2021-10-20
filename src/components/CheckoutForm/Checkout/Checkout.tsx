import React, { useContext, useState, useEffect } from 'react'

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

import { withRouter } from 'react-router-dom'
import AddressForm from '../AddressForm'
import PaymentForm from '../PaymentForm'

import useStyle from './styles'

const steps = ['Shipping Adress', 'Payement Details']

const Checkout = (props) => {
  const [activeStep, setActiveStep] = useState(0)
  const [shippingData, setShippingData] = useState({})
  const classes = useStyle()

  const nextStep = () => setActiveStep((prevActiveStep) => prevActiveStep + 1)
  const backStep = () => setActiveStep((prevActiveStep) => prevActiveStep - 1)

  const test = (data) => {
    setShippingData(data)
    console.log(data)
    nextStep()
  }

  const Form = () =>
    activeStep === 0 ? (
      <AddressForm test={test} />
    ) : (
      <PaymentForm shippingData={shippingData} />
    )

  const Confirmation = () => <div>Confirmation </div>
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
