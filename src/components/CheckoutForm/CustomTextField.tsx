import React from 'react'

import { useFormContext, Controller } from 'react-hook-form'
import { TextField, Grid } from '@material-ui/core'

const CustomTextField = ({ name, label, required }) => {
  const { control } = useFormContext()
  const isError = false
  return (
    <Grid item xs={12} sm={6}>
      <Controller
        render={({ field }) => (
          <TextField
            autoFocus
            margin="dense"
            label={label}
            required={required}
            error={isError}
            type="text"
            fullWidth
            {...field}
          />
        )}
        control={control}
        name={name}
      />
    </Grid>
  )
}

export default CustomTextField
