import React, { useState } from 'react'
import { Button, Grid, Typography } from '@material-ui/core'
import { useForm, FormProvider } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector'
import CustomTextField from './CustomTextField'

const AddressForm = (props: any) => {
  const [country, setCountry] = useState('United States')
  const [division, setDivision] = useState('California')
  const methods = useForm()

  const onSubmit = (data) => {
    //console.log(data)
    props.test({ ...data, country, division })
  }

  const selectCountry = (val) => {
    setCountry(val)
    //console.log(country)
  }

  const selectRegion = (val) => {
    setDivision(val)
    //console.log(division)
  }

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Shipping Address
      </Typography>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <Grid container spacing={3}>
            <CustomTextField required name="firstName" label="First name" />
            <CustomTextField required name="lastName" label="Last name" />
            <CustomTextField required name="address1" label="Address line 1" />
            <CustomTextField required name="email" label="Email" />
            <CustomTextField required name="city" label="City" />
            <CustomTextField required name="zip" label="Zip / Postal code" />
            <Grid item xs={12} sm={6}>
              <CountryDropdown
                value={country}
                onChange={(val) => selectCountry(val)}
              />
              <br></br>
              <br></br>
            </Grid>
            <Grid item xs={12} sm={6}>
              <RegionDropdown
                country={country}
                value={division}
                onChange={(val) => selectRegion(val)}
              />
            </Grid>
          </Grid>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div className="btn btn-secondary" style={{ marginRight: '10px' }}>
              <Link
                style={{ color: 'white' }}
                to={{
                  pathname: '/cart'
                }}
              >
                {' '}
                Back to cart
              </Link>
            </div>
            <Button type="submit" variant="contained" color="primary">
              Next
            </Button>
          </div>
        </form>
      </FormProvider>
    </>
  )
}

export default AddressForm
