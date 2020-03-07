import TextField from '@material-ui/core/TextField'
import React from 'react'
import { useIntl } from 'react-intl'
import Select from 'react-select'
import styled from 'styled-components'
import { dialCodes } from '../constants'

const Styling = styled.div.attrs({
  className: 'container',
})`
  display: flex;
  .container {
    span {
      font-size: 20px;
      font-weight: normal;
      font-stretch: normal;
      font-style: normal;
      line-height: 0.9;
      letter-spacing: normal;
    }
    h1 {
    }
    p {
    }
  }
`

const isEmpty = str => {
  return !str || 0 === str.length
}

export const Form = ({
  errors,
  touched,
  values,
  handleChange,
  handleBlur,
  setFieldTouched,
  setFieldValue,
}) => {
  const intl = useIntl()
  return (
    <Styling>
      <div className="container">
        <div className="column-container">
          <TextField
            name="firstName"
            helperText={
              errors.firstName && touched.firstName && errors.firstName
            }
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.firstName && Boolean(errors.firstName)}
            label={intl.messages['form.firstName']}
            value={values.firstName}
          />
          <TextField
            name="lastName"
            helperText={errors.lastName && touched.lastName && errors.lastName}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.lastName && Boolean(errors.lastName)}
            label={intl.messages['form.lastName']}
            value={values.lastName}
          />
          <TextField
            name="email"
            helperText={errors.email && touched.email && errors.email}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.email && Boolean(errors.email)}
            label={intl.messages['form.email']}
            value={values.email}
          />
          <Select
            onBlur={() => setFieldTouched('phoneCode', true)}
            onChange={value => setFieldValue('phoneCode', value)}
            name="phoneCode"
            options={dialCodes}
            getOptionLabel={option => `${option.code}`}
            getOptionValue={option => option.code}
            value={values.dialCode}
          />
          <TextField
            name="telephone"
            helperText={
              errors.telephone && touched.telephone && errors.telephone
            }
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.telephone && Boolean(errors.telephone)}
            label={intl.messages['form.telephone']}
            value={values.telephone}
          />
          <TextField
            name="businessName"
            helperText={
              errors.businessName && touched.businessName && errors.businessName
            }
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.businessName && Boolean(errors.businessName)}
            label={intl.messages['form.businessName']}
            value={values.businessName}
          />
          <TextField
            name="businessAdress"
            helperText={
              errors.businessAdress &&
              touched.businessAdress &&
              errors.businessAdress
            }
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.businessAdress && Boolean(errors.email)}
            label={intl.messages['form.businessAdress']}
            value={values.businessAdress}
          />
        </div>
      </div>
    </Styling>
  )
}

export default Form
