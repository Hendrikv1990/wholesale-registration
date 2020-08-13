import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { useDispatch, useSelector } from 'react-redux'
import Select from 'react-select'
import styled from 'styled-components'
import { device } from '../assets/Styles'
import { dialCodes } from '../constants'

const Styling = styled.div.attrs({
  className: 'form-container',
})`
  .file {
    margin: 0 1px;
    .dropzone {
    padding-left:0;
      font-size: 14px;
      color: #55706c;
      padding: 0.5rem;
      border-bottom: 1px solid #00140f;
      position: relative;
      background-color: #fcfbf7;
      cursor: pointer;
      transition: border 500ms ease-in-out;
      &:hover {
       
      }
      &:focus {
        outline: 0;
      }
      &:after {
        position: absolute;
        right:0;
        content:"";
        top:5px;
        @media only screen and (max-width:1023px){
          top:7px;
        }
        background-image:url("../wp-content/themes/tomhemps/src/icons/Plus_Green.svg");
        background-repeat:no-repeat;
        background-size:12px;
        width:12px;
        height:12px;
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
    border-bottom:1px solid #00140f;
    box-shadow: none;
    transition: border 500ms ease-in-out;
    background: #fcfbf7;
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
      padding-bottom: 5px;
      border-bottom: 1px solid #058273;
    }

    .react-select__multi-value {
      background-color: #fcfbf7;
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
  .form-title {
  margin:0 1rem;
  @media ${device.tablet} {
    margin:0;
  }
  }
  .react-select__menu {
    border-radius: 0;
    box-shadow: none;
    margin-top: 0;
    background-color: #fcfbf7;
    border:1px solid #00140f;
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
        color: #00140f;
      }
      .react-select__option--is-selected {
        background-color: inherit;
        color: #00140f;
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
   
    margin-bottom: 30px;
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
    .width-100 {
        margin-left: 0;
        margin-right: 0;
    }
    .width-50 {
        &:first-child {
          margin-left:0;
        }
       &.last-col {
        margin-right:0;
        
       }
       
    @media ${device.tablet} {
          margin:0;
        }
    }
  }

  .width-50 {
    flex: 0 1 50%;
    @media ${device.tablet}{
    flex: 0 1 100%;
    }
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
{
    value: 'Other',
    label: 'other',
},
]

const getCategories = () => {
  let result = []
  axios
    .get(
      '/wp-json/tomhemps/v1/wholesale_registration',
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
  const formState = useSelector((state) => state.form)
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
            formState.form.files.label}
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
  const [categories, setCategories] = useState([])
  const formState = useSelector((state) => state.form)

  useEffect(() => {
    const c = getCategories()
    setCategories(c)
  }, [])

  return (
    <Styling>
      <div className="row-container form-title">
        <h1>{formState.form.h1}</h1>
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
              label={formState.form.firstName}
              value={values.firstName}
            />
          </div>
          <div className="field-wrapper width-50 last-col">
            <TextField
              name="lastName"
              type="text"
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.lastName && errors.lastName}
              label={formState.form.lastName}
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
              label={formState.form.email}
              value={values.email}
            />
          </div>
        </div>
        <div className="row-container">
          <div className="field-wrapper width-30">
            <Select
              id="dialCode"
              onBlur={() => setFieldTouched('dialCode', true)}
              onChange={(value) => {
                return setFieldValue('dialCode', value)
              }}
              name="dialCode"
              options={dialCodes}
              getOptionLabel={(option) => option.value}
              getOptionValue={(option) => option.value}
              classNamePrefix="react-select"
              placeholder={formState.form.dialCode}
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
              label={formState.form.telephone}
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
              label={formState.form.businessName}
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
              label={formState.form.businessAddress}
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
              label={formState.form.postalCode}
              value={values.postalCode}
            />
          </div>
          <div className="field-wrapper width-50 last-col">
            <TextField
              fullWidth
              name="city"
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.city && Boolean(errors.city)}
              label={formState.form.city}
              value={values.city}
            />
          </div>
        </div>
        <div className="row-container">
          <div className="field-wrapper width-100">
            <Select
              id="country"
              onBlur={() => setFieldTouched('country', true)}
              onChange={(value) => {
                return setFieldValue('country', value)
              }}
              name="country"
              options={formState.countries}
              value={values.country}
              classNamePrefix="react-select"
              placeholder={formState.form.country}
              // menuIsOpen
            />
            {errors.country && touched.country && (
              <div className="field-error">{errors.country.value}</div>
            )}
          </div>
          <div className="field-wrapper width-50 last-col">
            <TextField
              type="text"
              name="taxNumber"
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.taxNumber && errors.taxNumber}
              label={formState.form.taxNumber}
              value={values.taxNumber}
            />
          </div>
        </div>

        <div className="row-container">
          <div className="field-wrapper width-100">
            <Select
                isSearchable={false}
              captureMenuScroll={false}
              id="businessType"
              onBlur={() => setFieldTouched('businessType', true)}
              onChange={(value) => {
                return setFieldValue('businessType', value)
              }}
              name="businessType"
              options={businessTypes}
              value={values.businessType}
              classNamePrefix="react-select"
              placeholder={formState.form.businessType}
              // menuIsOpen
            />
            {errors.businessType && touched.businessType && (
              <div className="field-error">{errors.businessType.value}</div>
            )}
          </div>

            <div className="field-wrapper width-50 last-col">
                <TextField
            type="text"
            name="vatNumber"
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.vatNumber && errors.vatNumber}
            label={formState.form.vatNumber}
            value={values.vatNumber}
            />
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
              placeholder={formState.form.productCategory}
            />
          </div>
        </div>
      </div>
    </Styling>
  )
}

export default Form
