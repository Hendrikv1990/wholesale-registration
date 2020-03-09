import React from 'react'
import styled from 'styled-components'
import Checkbox from '@material-ui/core/Checkbox'
import { FormattedMessage } from 'react-intl'

const Styling = styled.div.attrs({
  className: 'ack-container',
})`
  opacity: 0;
  visibility: hidden;
  display: flex;
  width: 100%;
  .row-container {
    display: flex;
  }
  .column-container {
    flex: 0 1 50%;
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
    h1 {
    }
    p {
    }
  }
`

export const Acknowledge = ({
  errors,
  touched,
  handleChange,
  handleBlur,
  values,
}) => {
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
        <div className="row-container">
          <p className="lead">
            <FormattedMessage id="acknowledge.p">
              {message => message}
            </FormattedMessage>
          </p>
        </div>
        <div className="row-container">
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
            <FormattedMessage id="acknowledge.firstName">
              {message => message}
            </FormattedMessage>
          </div>
          <div className="width-50">{values.firstName}</div>
        </div>
        <div className="row-container">
          <div className="width-50">
            <FormattedMessage id="acknowledge.lastName">
              {message => message}
            </FormattedMessage>
          </div>
          <div className="width-50">{values.lastName}</div>
        </div>
        {/* <div className="row-container">{values.dialCode}</div> */}
        <div className="row-container">
          <div className="width-50">
            <FormattedMessage id="acknowledge.telephone">
              {message => message}
            </FormattedMessage>
          </div>
          <div className="width-50">{values.telephone}</div>
        </div>
        <div className="row-container">
          <div className="width-50">
            <FormattedMessage id="acknowledge.businessName">
              {message => message}
            </FormattedMessage>
          </div>
          <div className="width-50">{values.businessName}</div>
        </div>
        <div className="row-container">
          <div className="width-50">
            <FormattedMessage id="acknowledge.businessName">
              {message => message}
            </FormattedMessage>
          </div>
          <div className="width-50">{values.businessName}</div>
        </div>
        <div className="row-container">
          <div className="width-50">
            <FormattedMessage id="acknowledge.businessAddress">
              {message => message}
            </FormattedMessage>
          </div>
          <div className="width-50">{values.businessAddress}</div>
        </div>
        <div className="row-container">
          <div className="width-50">
            <FormattedMessage id="acknowledge.postalCode">
              {message => message}
            </FormattedMessage>
          </div>
          <div className="width-50">{values.postalCode}</div>
        </div>
        <div className="row-container">
          <div className="width-50">
            <FormattedMessage id="acknowledge.city">
              {message => message}
            </FormattedMessage>
          </div>
          <div className="width-50">{values.city}</div>
        </div>
        <div className="row-container">
          <div className="width-50">
            <FormattedMessage id="acknowledge.taxNumber">
              {message => message}
            </FormattedMessage>
          </div>
          <div className="width-50">{values.taxNumber}</div>
        </div>
        <div className="row-container">
          <div className="width-50">
            <FormattedMessage id="acknowledge.productCategories">
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
            <FormattedMessage id="acknowledge.businessType">
              {message => message}
            </FormattedMessage>
          </div>
          <div className="width-50">
            {values.businessType ? values.businessType.value : ''}
          </div>
        </div>
      </div>
    </Styling>
  )
}

export default Acknowledge
