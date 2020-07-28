import Checkbox from '@material-ui/core/Checkbox'
import axios from 'axios'
import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { device } from '../assets/Styles'

const Styling = styled.div.attrs({
  className: 'ack-container',
})`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  margin-bottom: 3rem;

  .lead-wrapper {
    border-bottom: 1px solid;
  }
  .gdpr-wrapper {
    position: relative;
    padding: 1rem 0;
    a {
      padding-left: 1rem;
      color: #55706c;
      text-decoration: none;
      font-size: 14px;
    }
    span {
      padding: 0;
    }
  }
  .field-error {
    position: absolute;
    color: #ff5151;
    font-size: 14px;
    bottom: 0;
  }
  .row-container {
    display: flex;
    width: 100%;
  }
  .column-container {
    flex: 0 1 50%;
    margin: 0 4rem;
    @media ${device.tablet} {
      margin: 0;
      flex: 0 1 100%;
    }
  }
  .column-space {
  margin:0;
    @media only screen and (min-width:1024px){
      padding-left:20%;
    }
  }
  .footer-wrapper {
   @media ${device.tablet} {
      margin-left: auto;
    margin-right: auto;
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
  .width-40 {
   flex: 0 1 40%;
   margin:0;
    @media ${device.tablet} {
      flex: 0 1 100%;
    }
  }
   .width-60 {
   flex: 0 1 60%;
   margin:0;
   }
  .no-padding {
  padding:0;
  @media ${device.tablet} {
      padding:0;
    }
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

const Acknowledge = ({ errors, touched, handleChange, handleBlur, values }) => {
  const dispatch = useDispatch()
  const pending = useSelector((state) => state.files.pending)
  const next = useSelector((state) => state.files.next)
  const filesState = useSelector((state) => state.files)
  const formState = useSelector((state) => state.form)
  const uploading = useSelector((state) => state.files.uploading)
  const api = {
    uploadFile(next) {
      const formData = new FormData()
      formData.append('file', next.file)
      return axios({
        method: 'post',
        headers: { 'Content-Type': 'multipart/form-data' },
        url:
          '/wp-json/tomhemps/v1/file_upload',
        data: formData,
      })
    },
  }

  const logUploadedFile = (num, color = 'green') => {
    const msg = `%cUploaded ${num} files.`
    const style = `color:${color};font-weight:bold;`
    console.log(msg, style)
  }

  // Sets the next file when it detects that its ready to go
  useEffect(() => {
    // console.log(pending.length && next == null)
    if (pending.length && next == null) {
      const next = pending[0]
      dispatch({ type: 'next', next })
    }
  }, [next, pending, dispatch])

  const countRef = useRef(0)

  // Processes the next pending doc when ready
  useEffect(() => {
    // console.log('use effect file-uploaded or set-upload-error')
    // console.log(pending.length && next)
    if (pending.length && next) {
      api
        .uploadFile(next)
        .then((response) => {
          const serverLocation = response.data
          const prev = next
          logUploadedFile(++countRef.current)

          const pending = filesState.pending.slice(1)

          dispatch({
            type: 'file-uploaded',
            prev,
            serverLocation,
            pending,
          })
        })
        .catch((error) => {
          console.error(error)
          dispatch({
            type: 'set-upload-error',
            error,
          })
        })
    }
  }, [filesState.pending, next])

  // Ends the upload process
  useEffect(() => {
    // console.log('use effect files-uploaded')
    // console.log(!pending.length && uploading)

    if (!pending.length && uploading) {
      // console.log('3')
      dispatch({ type: 'files-uploaded' })
    }
  }, [pending.length, uploading, dispatch])
  return (
    <Styling>
      <div className="container mt-5 pt-3 no-padding d-flex">
      <div className="column-container width-40">
        <div className="row-container">
          <h2>{formState.acknowledge.title}</h2>
        </div>
        <div className="row-container lead-wrapper">
          <p className="lead">{formState.acknowledge.p}</p>
        </div>
        <div className="row-container gdpr-wrapper">
          <Checkbox
            helperText={errors.gdpr && touched.gdpr && errors.gdpr}
            type="checkbox"
            name="gdpr"
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <a
            href="https://www.tomhemps.com/datenschutz/"
            target="_blank"
            rel="noopener noreferrer"
          >
            {formState.acknowledge.gdpr}
          </a>
          {errors.gdpr && touched.gdpr && (
            <div className="field-error">{errors.gdpr}</div>
          )}
        </div>
      </div>
      <div className="width-60 column-space">
        <div className="row-container">
          <div className="width-50">{formState.form.firstName}</div>
          <div className="width-50">{values.firstName}</div>
        </div>
        <div className="row-container">
          <div className="width-50">{formState.form.lastName}</div>
          <div className="width-50">{values.lastName}</div>
        </div>
        <div className="row-container">
          <div className="width-50">{formState.form.telephone}</div>
          <div className="width-50">{values.telephone}</div>
        </div>
        <div className="row-container">
          <div className="width-50">{formState.form.businessName}</div>
          <div className="width-50">{values.businessName}</div>
        </div>

        <div className="row-container">
          <div className="width-50">{formState.form.businessAddress}</div>
          <div className="width-50">{values.businessAddress}</div>
        </div>
        <div className="row-container">
          <div className="width-50">{formState.form.postalCode}</div>
          <div className="width-50">{values.postalCode}</div>
        </div>
        <div className="row-container">
          <div className="width-50">{formState.form.city}</div>
          <div className="width-50">{values.city}</div>
        </div>
        <div className="row-container">
          <div className="width-50">{formState.form.taxNumber}</div>
          <div className="width-50">{values.taxNumber}</div>
        </div>
        <div className="row-container">
          <div className="width-50">{formState.form.productCategories}</div>
          <div className="width-50">
            {values.productCategories &&
              values.productCategories.map((category) => {
                return `${category.value} `
              })}
          </div>
        </div>
        <div className="row-container">
          <div className="width-50">{formState.form.businessType}</div>
          <div className="width-50">
            {values.businessType ? values.businessType.value : ''}
          </div>
        </div>
        <div className="row-container">
          <div className="width-50">{formState.form.businessRegistration}</div>
          <div className="width-50">
            {values.files &&
              filesState.files.map(({ file, src, id }, index) => (
                <div
                  style={{
                    color: filesState.uploaded[id] ? '#058273' : '#55706c',
                  }}
                  key={`file-${index}`}
                  className="file-wrapper"
                >
                  <div className="file-caption">{file.name}</div>
                </div>
              ))}
          </div>
        </div>
      </div>
        </div>
    </Styling>
  )
}

export default Acknowledge
