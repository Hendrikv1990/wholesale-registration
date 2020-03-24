import TextField from '@material-ui/core/TextField'
import React from 'react'
import { Field } from 'formik'

import { FormattedMessage, useIntl } from 'react-intl'
import Select from 'react-select'
import styled from 'styled-components'
import { device } from '../assets/Styles'
import { dialCodes } from '../constants'
const Styling = styled.div.attrs({
  className: 'form-container',
})`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  .react-select__control {
    border-style: none;
    border-radius: 0;
    border-bottom: 1px solid;
    box-shadow: none;
    .react-select__indicators {
      span {
        display: none;
      }
    }
    &:hover {
      border: none;
      border-bottom: 2px solid;
    }
  }
  .row-container {
    display: flex;
    width: 100%;
  }
  .column-container {
    flex: 0 1 50%;
    @media ${device.tablet} {
      flex: 0 1 100%;
    }
  }
  .field-wrapper {
    margin: 1rem;
  }
  .width-50 {
    flex: 0 1 50%;
  }
  .width-100 {
    flex: 0 1 100%;
  }
  .width-auto {
    flex: 0 1 auto;
  }
  .width-30 {
    flex: 0 1 30%;
  }
  .width-70 {
    flex: 0 1 70%;
  }

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

const businessTypes = [
  {
    value: 'Einzelunternehmen',
    label: 'Einzelunternehmen',
  },
  {
    value: 'GbR',
    label: 'GbR',
  },
  {
    value: 'Einzelkaufleute',
    label: 'Einzelkaufleute',
  },
  {
    value: 'OHG',
    label: 'OHG',
  },
  {
    value: 'KG',
    label: 'KG',
  },
  {
    value: 'GmbH',
    label: 'GmbH',
  },
  {
    value: 'UG (haftungsbeschränkt)',
    label: 'UG (haftungsbeschränkt)',
  },
  {
    value: 'AG',
    label: 'AG',
  },
]

const productsCategories = [
  {
    value: 'category_1',
    label: 'category_1',
  },
  {
    value: 'category_2',
    label: 'category_2',
  },
  {
    value: 'category_3',
    label: 'category_3',
  },
]

const MultiSelect = props => {
  const {
    name,
    label,
    options,
    value,
    error,
    touched,
    onBlur,
    onChange,
    placeholder,
  } = props
  const handleChange = value => {
    // this is going to call setFieldValue and manually update values.topcis
    onChange(name, value)
  }

  const handleBlur = () => {
    // this is going to call setFieldTouched and manually update touched.topcis
    onBlur(name, true)
  }
  return (
    <React.Fragment>
      <label htmlFor={name}>{label}</label>
      <Select
        id={name}
        options={options}
        isMulti={true}
        onChange={handleChange}
        onBlur={handleBlur}
        value={value}
        classNamePrefix="react-select"
        placeholder={placeholder}
      />
      {error && touched && <div className="field-error">{error}</div>}
    </React.Fragment>
  )
}

export const Form = ({
  errors,
  touched,
  values,
  handleChange,
  handleBlur,
  setFieldTouched,
  setFieldValue,
  field,
}) => {
  const intl = useIntl()

  return (
    <Styling>
      <div className="row-container">
        <h1>
          <FormattedMessage id="form.h1">{message => message}</FormattedMessage>
        </h1>
      </div>
      <div className="column-container">
        <div className="row-container">
          <div className="field-wrapper width-50">
            <TextField
              fullWidth
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
          </div>
          <div className="field-wrapper width-100">
            <TextField
              fullWidth
              name="lastName"
              helperText={
                errors.lastName && touched.lastName && errors.lastName
              }
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.lastName && Boolean(errors.lastName)}
              label={intl.messages['form.lastName']}
              value={values.lastName}
            />
          </div>
        </div>
        <div className="row-container">
          <div className="field-wrapper width-100">
            <TextField
              fullWidth
              name="email"
              helperText={errors.email && touched.email && errors.email}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.email && Boolean(errors.email)}
              label={intl.messages['form.email']}
              value={values.email}
            />
          </div>
        </div>
        <div className="row-container">
          <div className="field-wrapper width-30">
            <Select
              id="dialCode"
              onBlur={() => setFieldTouched('dialCode', true)}
              onChange={value => {
                return setFieldValue('dialCode', value)
              }}
              name="dialCode"
              options={dialCodes}
              getOptionLabel={option => option.value}
              getOptionValue={option => option.value}
              value={values.dialCode}
              classNamePrefix="react-select"
            />
            {errors.dialCode && touched.dialCode && (
              <div className="field-error">{errors.dialCode.value}</div>
            )}
          </div>
          <div className="field-wrapper width-70">
            <TextField
              fullWidth
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
          </div>
        </div>
        <div className="row-container">
          <div className="field-wrapper width-100">
            <TextField
              fullWidth
              name="businessName"
              helperText={
                errors.businessName &&
                touched.businessName &&
                errors.businessName
              }
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.businessName && Boolean(errors.businessName)}
              label={intl.messages['form.businessName']}
              value={values.businessName}
            />
          </div>
        </div>
        <div className="row-container">
          <div className="field-wrapper width-100">
            <TextField
              fullWidth
              name="businessAddress"
              helperText={
                errors.businessAddress &&
                touched.businessAddress &&
                errors.businessAddress
              }
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.businessAddress && Boolean(errors.businessAddress)}
              label={intl.messages['form.businessAddress']}
              value={values.businessAddress}
            />
          </div>
        </div>
      </div>
      <div className="column-container">
        <div className="row-container">
          <div className="field-wrapper width-50">
            <TextField
              fullWidth
              name="postalCode"
              helperText={
                errors.postalCode && touched.postalCode && errors.postalCode
              }
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.postalCode && Boolean(errors.postalCode)}
              label={intl.messages['form.postalCode']}
              value={values.postalCode}
            />
          </div>
          <div className="field-wrapper width-50">
            <TextField
              fullWidth
              name="city"
              helperText={errors.city && touched.city && errors.city}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.city && Boolean(errors.city)}
              label={intl.messages['form.city']}
              value={values.city}
            />
          </div>
        </div>
        <div className="row-container">
          <div className="field-wrapper width-100">
            <TextField
              fullWidth
              name="taxNumber"
              helperText={
                errors.taxNumber && touched.taxNumber && errors.taxNumber
              }
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.taxNumber && Boolean(errors.taxNumber)}
              label={intl.messages['form.taxNumber']}
              value={values.taxNumber}
            />
          </div>
        </div>
        <div className="row-container">
          <div className="field-wrapper width-100">
            <Select
              id="businessType"
              onBlur={() => setFieldTouched('businessType', true)}
              onChange={value => {
                return setFieldValue('businessType', value)
              }}
              name="businessType"
              options={businessTypes}
              value={values.businessType}
              classNamePrefix="react-select"
              placeholder={intl.messages['form.businessType']}
            />
            {errors.businessType && touched.businessType && (
              <div className="field-error">{errors.businessType.value}</div>
            )}
          </div>
        </div>
        <div className="row-container">
          <div className="field-wrapper width-100">
            <input
              type="file"
              accept=".xlsx,.xls,.doc, .docx,.ppt, .pptx,.txt,.pdf"
              className="file"
              files={values.file}
              onChange={e => {
                const file = e.target.files[0]
                console.log(file)

                const reader = new FileReader()
                reader.onload = item => {
                  console.log(item)
                  file.attachment = item.target.result
                  return setFieldValue('file', file)
                }
                reader.readAsDataURL(file)
              }}
            />
          </div>
        </div>

        <div className="row-container">
          <div className="field-wrapper width-100">
            <MultiSelect
              name="productCategories"
              value={values.productCategories}
              onChange={setFieldValue}
              onBlur={setFieldTouched}
              error={errors.productCategories}
              touched={touched.productCategories}
              options={productsCategories}
              classNamePrefix="react-select"
              placeholder={intl.messages['form.productCategories']}
            />
          </div>
        </div>
      </div>
    </Styling>
  )
}

export default Form
