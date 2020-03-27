import Checkbox from '@material-ui/core/Checkbox'
import axios from 'axios'
import React, { useEffect, useRef } from 'react'
import { FormattedMessage } from 'react-intl'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'

const Styling = styled.div.attrs({
  className: 'ack-container',
})`
  display: flex;
  width: 100%;
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
  const pending = useSelector(state => state.pending)
  const next = useSelector(state => state.next)
  const state = useSelector(state => state)
  const uploading = useSelector(state => state.uploading)

  const api = {
    uploadFile(next) {
      const formData = new FormData()
      formData.append('file', next.file)
      return axios({
        method: 'post',
        headers: { 'Content-Type': 'multipart/form-data' },
        url:
          'https://tomhemps.hkvlaanderen.com/wp-json/tomhemps/v1/file_upload',
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
    // console.log('use effect next ')
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
      // console.log('2')
      api
        .uploadFile(next)
        .then(response => {
          console.log(response)
          const serverLocation = response.data
          const prev = next
          logUploadedFile(++countRef.current)

          const pending = state.pending.slice(1)

          dispatch({
            type: 'file-uploaded',
            prev,
            serverLocation,
            pending,
          })
        })
        .catch(error => {
          console.error(error)
          dispatch({
            type: 'set-upload-error',
            error,
          })
        })
    }
  }, [state.pending, next])

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
      <div className="column-container">
        <div className="row-container">
          <h1>
            <FormattedMessage id="acknowledge.h1">
              {message => message}
            </FormattedMessage>
          </h1>
        </div>
        <div className="row-container lead-wrapper">
          <p className="lead">
            <FormattedMessage id="acknowledge.p">
              {message => message}
            </FormattedMessage>
          </p>
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
            href="https://www.google.gr"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FormattedMessage id="acknowledge.gdbr">
              {message => message}
            </FormattedMessage>
          </a>
          {errors.gdpr && touched.gdpr && (
            <div className="field-error">{errors.gdpr}</div>
          )}
        </div>
      </div>
      <div className="column-container">
        <div className="row-container">
          <div className="width-50">
            <FormattedMessage id="form.firstName">
              {message => message}
            </FormattedMessage>
          </div>
          <div className="width-50">{values.firstName}</div>
        </div>
        <div className="row-container">
          <div className="width-50">
            <FormattedMessage id="form.lastName">
              {message => message}
            </FormattedMessage>
          </div>
          <div className="width-50">{values.lastName}</div>
        </div>
        {/* <div className="row-container">{values.dialCode}</div> */}
        <div className="row-container">
          <div className="width-50">
            <FormattedMessage id="form.telephone">
              {message => message}
            </FormattedMessage>
          </div>
          <div className="width-50">{values.telephone}</div>
        </div>
        <div className="row-container">
          <div className="width-50">
            <FormattedMessage id="form.businessName">
              {message => message}
            </FormattedMessage>
          </div>
          <div className="width-50">{values.businessName}</div>
        </div>
        <div className="row-container">
          <div className="width-50">
            <FormattedMessage id="form.businessName">
              {message => message}
            </FormattedMessage>
          </div>
          <div className="width-50">{values.businessName}</div>
        </div>
        <div className="row-container">
          <div className="width-50">
            <FormattedMessage id="form.businessAddress">
              {message => message}
            </FormattedMessage>
          </div>
          <div className="width-50">{values.businessAddress}</div>
        </div>
        <div className="row-container">
          <div className="width-50">
            <FormattedMessage id="form.postalCode">
              {message => message}
            </FormattedMessage>
          </div>
          <div className="width-50">{values.postalCode}</div>
        </div>
        <div className="row-container">
          <div className="width-50">
            <FormattedMessage id="form.city">
              {message => message}
            </FormattedMessage>
          </div>
          <div className="width-50">{values.city}</div>
        </div>
        <div className="row-container">
          <div className="width-50">
            <FormattedMessage id="form.taxNumber">
              {message => message}
            </FormattedMessage>
          </div>
          <div className="width-50">{values.taxNumber}</div>
        </div>
        <div className="row-container">
          <div className="width-50">
            <FormattedMessage id="form.productCategory">
              {message => message}
            </FormattedMessage>
          </div>
          <div className="width-50">
            {values.productCategories &&
              values.productCategories.map(category => {
                return `${category.value} `
              })}
          </div>
        </div>
        <div className="row-container">
          <div className="width-50">
            <FormattedMessage id="form.businessType">
              {message => message}
            </FormattedMessage>
          </div>
          <div className="width-50">
            {values.businessType ? values.businessType.value : ''}
          </div>
        </div>
        <div className="row-container">
          <div className="width-50">
            <FormattedMessage id="form.businessRegistration">
              {message => message}
            </FormattedMessage>
          </div>
          <div className="width-50">
            {values.files
              ? state.files.map(({ file, src, id }, index) => (
                  <div
                    style={{
                      color: state.uploaded[id] ? '#058273' : '##55706c',
                    }}
                    key={`file-${index}`}
                    className="file-wrapper"
                  >
                    <div className="file-caption">{file.name}</div>
                  </div>
                ))
              : ''}
          </div>
        </div>
      </div>
    </Styling>
  )
}

export default Acknowledge
