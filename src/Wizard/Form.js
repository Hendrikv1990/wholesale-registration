import React, { useEffect, useState } from 'react'
// import { ReactComponent as AddSVG } from '../assets/add.svg'
import { useDropzone } from 'react-dropzone'
import { FormattedMessage, useIntl } from 'react-intl'
import { useDispatch, useSelector } from 'react-redux'
import Select from 'react-select'
import styled from 'styled-components'
import { device } from '../assets/Styles'
import { dialCodes } from '../constants'
import axios from 'axios'

const Styling = styled.div.attrs({
  className: 'form-container',
})`
  .file {
    margin: 0 1px;
    .dropzone {
      font-size: 14px;
      color: #55706c;
      padding: 0.5rem;
      border: 1px solid #00140f;

      background-color: #fafafa;
      cursor: pointer;
      transition: border 500ms ease-in-out;
      &:hover {
        border: 1px solid #058273;
      }
      &:focus {
        outline: 0;
      }
    }
    .files {
      .file-wrapper {
        .file-caption {
          font-size: 14px;
          color: #55706c;
        }
      }
    }
    .accept {
      background-color: #cbfff2;
    }
    .reject {
      background-color: red;
    }

    .success-container {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      background: #fff;
      font-size: 14px;
      color: #55706c;
      padding: 0.5rem;
      border: 1px solid #00140f;
      p {
        margin: 0;
      }
    }
  }

  display: flex;
  flex-wrap: wrap;
  width: 100%;
  .react-select__control {
    border-style: none;
    border-radius: 0;
    border-bottom: 1px solid #00140f;
    box-shadow: none;
    transition: border 500ms ease-in-out;
    background: transparent;
    .react-select__value-container {
      padding: 0;
    }
    .react-select__indicators {
      span {
        display: none;
      }
    }
    &:hover {
      cursor: pointer;
      border: none;
      padding-bottom: 0;
      border-bottom: 1px solid #058273;
    }

    .react-select__multi-value {
      background-color: #fff;
      display: flex;
      align-items: center;
      .react-select__multi-value__label {
        color: #55706c;
      }
      .react-select__multi-value__remove {
        border-radius: 0;
        border: 1px solid #55706c;
        padding: 0;
        box-sizing: border-box;
        height: 18px;
        color: #55706c;
        &:hover {
          color: #55706c;
          border-color: #55706c;
          background-color: #fff;
        }
      }
    }
  }
  .react-select__menu {
    border-radius: 0;
    box-shadow: none;
    margin-top: 0;
    background-color: #fff;
    border-bottom: 1px solid #058273;
    .react-select__menu-list {
      padding-bottom: 0;
      padding-top: 0;
      .react-select__option {
        border-bottom: 1px solid transparent;
        color: #55706c;
      }
      .react-select__option--is-focused {
        cursor: pointer;
        background-color: inherit;
        color: #222;
      }
      .react-select__option--is-selected {
        background-color: inherit;
        color: #222;
      }
    }
  }
  .row-container {
    display: flex;
    width: 100%;
    height: 100px;
  }
  .column-container {
    flex: 0 1 50%;
    @media ${device.tablet} {
      flex: 0 1 100%;
    }
  }
  .field-wrapper {
    margin: 1rem;

    margin-bottom: 45px;
    position: relative;
    input {
      width: 100%;
      font-size: 14px;
      padding: 10px 10px 10px 5px;
      display: block;
      border: none;
      border-bottom: 1px solid #00140f;
      top: -20px;
      font-size: 14px;
      color: #55706c;
      transition: border 500ms ease-in-out;
      &:focus,
      &:hover {
        outline: none;
        border-bottom: 1px solid #058273;
      }
    }
    .field-error {
      position: absolute;
      color: #ff5151;
      font-size: 14px;
    }
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
  }
`

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

const getCategories = () => {
  let result = []
  axios
    .get(
      'https://tomhemps.hkvlaanderen.com/wp-json/tomhemps/v1/wholesale_registration',
      {},
    )
    .then((response) => {
      const r = response.data.categories.map((category) => {
        return { value: category.id, label: category.name }
      })
      result.push(...r)
    })
    .catch((error) => {
      console.log(error)
    })
  return result
}

// const productsCategories = [
//   {
//     value: 'category_1',
//     label: 'category_1',
//   },
//   {
//     value: 'category_2',
//     label: 'category_2',
//   },
//   {
//     value: 'category_3',
//     label: 'category_3',
//   },
// ]

const MultiSelect = (props) => {
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
  const handleChange = (value) => {
    onChange(name, value)
  }

  const handleBlur = () => {
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
        // menuIsOpen={true}
      />
      {error && touched && <div className="field-error">{error}</div>}
    </React.Fragment>
  )
}

const TextField = ({ error, name, label, ...props }) => {
  return (
    <React.Fragment>
      <input name={name} className="input" {...props} placeholder={label} />
      {error ? <p className="field-error">{error}</p> : null}
    </React.Fragment>
  )
}

const FileField = React.memo((props) => {
  const dispatch = useDispatch()
  const filesState = useSelector((state) => state.files)

  const onDrop = (acceptedFiles) => {
    if (acceptedFiles.length) {
      const arrFiles = Array.from(acceptedFiles)
      props.setFieldValue('files', arrFiles)
      const files = arrFiles.map((file, index) => {
        return { file, id: index }
      })
      dispatch({ type: 'load', files })
    }
  }

  const maxSize = 10048576

  const {
    isDragActive,
    getRootProps,
    getInputProps,
    isDragReject,
    isDragAccept,
    rejectedFiles,
  } = useDropzone({
    onDrop,
    accept:
      '.doc,.docx,.xml,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/pdf',
    minSize: 0,
    maxSize,
  })
  const isFileTooLarge =
    rejectedFiles.length > 0 && rejectedFiles[0].size > maxSize

  const additionalClass = isDragAccept ? 'accept' : isDragReject ? 'reject' : ''
  const intl = useIntl()

  return (
    <React.Fragment>
      <div className="file">
        <div
          {...getRootProps({
            className: `dropzone ${additionalClass}`,
          })}
        >
          <input {...getInputProps()} />

          {filesState.files.length === 0 &&
            !isDragActive &&
            !isDragReject &&
            intl.messages['form.files.label']}
          {isDragActive && !isDragReject && 'Drop it here'}
          {isDragReject && 'File type not accepted, sorry!'}
          {isFileTooLarge && (
            <div className="text-danger ">File is too large.</div>
          )}
          {!isDragActive && (
            <div className="files">
              {filesState.files.map(({ file, src, id }, index) => (
                <div
                  style={{
                    opacity: filesState.uploaded[id] ? 0.2 : 1,
                  }}
                  key={`file-${index}`}
                  className="file-wrapper"
                >
                  <div className="file-caption">{file.name}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </React.Fragment>
  )
})

export const Form = ({
  errors,
  touched,
  values,
  handleChange,
  handleBlur,
  setFieldTouched,
  setFieldValue,
  meta,
  field,
}) => {
  const intl = useIntl()
  const [categories, setCategories] = useState([])

  useEffect(() => {
    const c = getCategories()
    setCategories(c)
  }, [])

  return (
    <Styling>
      <div className="row-container">
        <h1>
          <FormattedMessage id="form.h1">
            {(message) => message}
          </FormattedMessage>
        </h1>
      </div>
      <div className="column-container">
        <div className="row-container">
          <div className="field-wrapper width-50">
            <TextField
              name="firstName"
              type="text"
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.firstName && errors.firstName}
              label={intl.messages['form.firstName']}
              value={values.firstName}
            />
          </div>
          <div className="field-wrapper width-100">
            <TextField
              name="lastName"
              type="text"
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.lastName && errors.lastName}
              label={intl.messages['form.lastName']}
              value={values.lastName}
            />
          </div>
        </div>
        <div className="row-container">
          <div className="field-wrapper width-100">
            <TextField
              name="email"
              type="email"
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.email && errors.email}
              label={intl.messages['form.email']}
              value={values.email}
            />
          </div>
        </div>
        <div className="row-container">
          <div className="field-wrapper width-30">
            <Select
              placeholder="true"
              id="dialCode"
              onBlur={() => setFieldTouched('dialCode', true)}
              onChange={(value) => {
                return setFieldValue('dialCode', value)
              }}
              name="dialCode"
              options={dialCodes}
              getOptionLabel={(option) => option.value}
              getOptionValue={(option) => option.value}
              value={values.dialCode}
              classNamePrefix="react-select"
            />
            {errors.dialCode && touched.dialCode && (
              <div className="field-error">{errors.dialCode.value}</div>
            )}
          </div>
          <div className="field-wrapper width-70">
            <TextField
              name="telephone"
              type="text"
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.telephone && errors.telephone}
              label={intl.messages['form.telephone']}
              value={values.telephone}
            />
          </div>
        </div>
        <div className="row-container">
          <div className="field-wrapper width-100">
            <TextField
              name="businessName"
              type="text"
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.businessName && errors.businessName}
              label={intl.messages['form.businessName']}
              value={values.businessName}
            />
          </div>
        </div>
        <div className="row-container">
          <div className="field-wrapper width-100">
            <TextField
              name="businessAddress"
              type="text"
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.businessAddress && errors.businessAddress}
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
              name="postalCode"
              type="text"
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.postalCode && errors.postalCode}
              label={intl.messages['form.postalCode']}
              value={values.postalCode}
            />
          </div>
          <div className="field-wrapper width-50">
            <TextField
              fullWidth
              name="city"
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
              type="text"
              name="taxNumber"
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.taxNumber && errors.taxNumber}
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
              onChange={(value) => {
                return setFieldValue('businessType', value)
              }}
              name="businessType"
              options={businessTypes}
              value={values.businessType}
              classNamePrefix="react-select"
              placeholder={intl.messages['form.businessType']}
              // menuIsOpen
            />
            {errors.businessType && touched.businessType && (
              <div className="field-error">{errors.businessType.value}</div>
            )}
          </div>
        </div>
        <div className="row-container">
          <div className="field-wrapper width-100">
            <FileField setFieldValue={setFieldValue} />
            {errors.files && touched.files && (
              <div className="field-error">{errors.files}</div>
            )}
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
              options={categories}
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
