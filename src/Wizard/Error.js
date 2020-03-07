import { Field } from 'formik'
import React from 'react'

const Error = ({ name }) => (
  <Field name={name}>
    {({ form: { touched, errors } }) =>
      touched[name] && errors[name] ? (
        <span className="focus-border">{errors[name]}</span>
      ) : null
    }
  </Field>
)

export default Error
