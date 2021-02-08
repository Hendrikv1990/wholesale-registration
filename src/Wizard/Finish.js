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
    
    .lead {
    font-family:"Archivo Narrow", sans-serif;
    font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.5;
  letter-spacing: normal;
  color: #55706c;
    }
    &.link {
    padding-bottom:0;
    }
    &.link div {
        padding-bottom: 10px;
    line-height: 1;
     font-size: 20px;
    font-weight: bold;
    color: rgb(0, 20, 15);
    font-family: "bebas_neue_probold";
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
      <div className="container no-padding d-flex">
      <div className="column-container width-40">
        <div className="row-container">
          <h2>{formState.finish.title}</h2>
        </div>
        <div className="row-container">
          <div
            className="lead"
            dangerouslySetInnerHTML={{ __html: formState.finish.description }}
          ></div>
        </div>
        <div className="row-container"></div>
      </div>
      <div className="width-60 column-space">
        <div className="row-container link">
          <a href={formState.finish.wholesale_catalog.url} target="_blank">
            <div className="width-100">
              {formState.finish.wholesale_catalog.title}
            </div>
            <div className="width-50 arrow">
              <ArrowSVG />
            </div>
          </a>
        </div>
        <div className="row-container link">
          <a href={`mailto: ${formState.finish.wholesale_email_address.url}`}>
            <div className="width-100">
              {formState.finish.wholesale_email_address.title}
            </div>
            <div className="width-50 arrow">
              <ArrowSVG />
            </div>
          </a>
        </div>
        <div className="row-container link">
          <a href={formState.finish.wholesale_phone.url}>
            <div className="width-100">
              {formState.finish.wholesale_phone.title}
            </div>
            <div className="width-50 arrow">
              <ArrowSVG />
            </div>
          </a>
        </div>
        <div className="row-container link">
          <a href={formState.finish.wholesale_shop.url}>
            <div className="width-100">
              {formState.finish.wholesale_shop.title}
            </div>
            <div className="width-50 arrow">
              <ArrowSVG />
            </div>
          </a>
        </div>
      </div>
        </div>
    </Styling>
  )
}

export default Finish
