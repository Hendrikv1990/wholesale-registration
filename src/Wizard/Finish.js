import React from 'react'
import axios from 'axios'
import { FormattedMessage } from 'react-intl'
import styled from 'styled-components'
import { device } from '../assets/Styles'
import { ReactComponent as ArrowSVG } from '../assets/arrow.svg'

const Styling = styled.div.attrs({
  className: 'ack-container',
})`
  display: flex;
  width: 100%;
  .row-container {
    display: flex;
  }
  .link {
    border-bottom: 1px solid #00140f;
    padding: 1rem 0;
    a {
      display: flex;
      justify-content: space-between;
      align-items: center;
      cursor: pointer;
      width: 100%;
    }
  }
  .arrow {
    display: flex;
    justify-content: flex-end;
  }
  .column-container {
    flex: 0 1 50%;
    padding: 0 3rem;
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
  }
`
const handleDownload = e => {
  e.preventDefault()
  // https://stackoverflow.com/questions/40707684/how-do-i-save-a-file-getting-downloaded-from-server-using-react/40708651
  axios({
    method: 'get',
    url:
      'https://tomhemps.hkvlaanderen.com/wp-json/tomhemps/v1/wholesale_registration/',
  })
    .then(response => {
      window.open(response.data.wholesale_catalog)
    })
    .catch(error => {})
}

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
        <div className="row-container link">
          <a onClick={e => handleDownload(e)}>
            <div className="width-50">
              <FormattedMessage id="finish.download">
                {message => message}
              </FormattedMessage>
            </div>
            <div className="width-50 arrow">
              <ArrowSVG />
            </div>
          </a>
        </div>
        <div className="row-container link">
          <a href="email">
            <div className="width-50">
              <FormattedMessage id="finish.email">
                {message => message}
              </FormattedMessage>
            </div>
            <div className="width-50 arrow">
              <ArrowSVG />
            </div>
          </a>
        </div>
        <div className="row-container link">
          <a href="call">
            <div className="width-50">
              <FormattedMessage id="finish.call">
                {message => message}
              </FormattedMessage>
            </div>
            <div className="width-50 arrow">
              <ArrowSVG />
            </div>
          </a>
        </div>
        <div className="row-container link">
          <a href="shop">
            <div className="width-50">
              <FormattedMessage id="finish.shop">
                {message => message}
              </FormattedMessage>
            </div>
            <div className="width-50 arrow">
              <ArrowSVG />
            </div>
          </a>
        </div>
      </div>
    </Styling>
  )
}

export default Finish
