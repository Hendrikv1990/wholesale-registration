import React from 'react'
import { FormattedMessage } from 'react-intl'
import styled from 'styled-components'
import { device } from '../assets/Styles'

const Styling = styled.div.attrs({
  className: 'ack-container',
})`
  display: flex;
  width: 100%;
  .row-container {
    display: flex;
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

export const Finish = ({
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
            <FormattedMessage id="finish.h1">
              {message => message}
            </FormattedMessage>
          </h1>
        </div>
        <div className="row-container">
          <p className="lead">
            <FormattedMessage id="finish.p">
              {message => message}
            </FormattedMessage>
          </p>
        </div>
        <div className="row-container"></div>
      </div>
      <div className="column-container">
        <div className="row-container">
          <div className="width-50">
            <FormattedMessage id="finish.firstName">
              {message => message}
            </FormattedMessage>
          </div>
          <div className="width-50">{values.firstName}</div>
        </div>
      </div>
    </Styling>
  )
}

export default Finish
