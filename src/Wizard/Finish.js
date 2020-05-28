import axios from 'axios'
import React from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import { ReactComponent as ArrowSVG } from '../assets/arrow.svg'
import { device } from '../assets/Styles'

const Styling = styled.div.attrs({
  className: 'finish-container',
})`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
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

export const Finish = ({
  errors,
  touched,
  handleChange,
  handleBlur,
  values,
}) => {
  const formState = useSelector((state) => state.form)

  const handleDownload = (e) => {
    e.preventDefault()
    // https://stackoverflow.com/questions/40707684/how-do-i-save-a-file-getting-downloaded-from-server-using-react/40708651
    axios({
      method: 'get',
      url: formState.wholesale_catalog.url,
    })
      .then((response) => {
        window.open(response.data.wholesale_catalog)
      })
      .catch((error) => {})
  }

  return (
    <Styling>
      <div className="column-container">
        <div className="row-container">
          <h1>{formState.finish.title}</h1>
        </div>
        <div className="row-container">
          <div
            className="lead"
            dangerouslySetInnerHTML={{ __html: formState.finish.description }}
          ></div>
        </div>
        <div className="row-container"></div>
      </div>
      <div className="column-container">
        <div className="row-container link">
          <a onClick={(e) => handleDownload(e)}>
            <div className="width-50">
              {formState.finish.wholesale_catalog.title}
            </div>
            <div className="width-50 arrow">
              <ArrowSVG />
            </div>
          </a>
        </div>
        <div className="row-container link">
          <a href={`mailto: ${formState.finish.wholesale_email_address.url}`}>
            <div className="width-50">
              {formState.finish.wholesale_email_address.title}
            </div>
            <div className="width-50 arrow">
              <ArrowSVG />
            </div>
          </a>
        </div>
        <div className="row-container link">
          <a href={formState.finish.wholesale_phone.url}>
            <div className="width-50">
              {formState.finish.wholesale_phone.title}
            </div>
            <div className="width-50 arrow">
              <ArrowSVG />
            </div>
          </a>
        </div>
        <div className="row-container link">
          <a href={formState.finish.wholesale_shop.url}>
            <div className="width-50">
              {formState.finish.wholesale_shop.title}
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
