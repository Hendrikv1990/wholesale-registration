import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { device } from '../assets/Styles'
import SubmitButton from '../SubmitButton'
const Styling = styled.div.attrs({
  className: 'start-container',
})`
  display: flex;
  @media ${device.phone} {
    display: block;
  }
  .hero-container {
    flex: 0 1 50%;

    span {
      font-family: Bebas Neue Pro;
      font-size: 20px;
      font-weight: normal;
      font-stretch: normal;
      font-style: normal;
      line-height: 0.9;
      text-transform: capitalize;
    }
  }
  .image-wrapper {
    flex: 0 1 50%;
  }
`

export const Start = (props) => {
  const dispatch = useDispatch()
  const formState = useSelector((state) => state.form)

  const getForm = () => {
    return axios.get(
      'https://tomhemps.hkvlaanderen.com/wp-json/tomhemps/v1/wholesale_registration',
      {},
    )
  }

  useEffect(() => {
    getForm()
      .then((response) => {
        dispatch({
          type: 'RECEIVE_FORM',
          form: response.data,
        })
      })
      .catch((error) => {})
  }, [])

  return (
    <React.Fragment>
      {formState && (
        <Styling>
          <div className="hero-container">
            <span>{formState.wholesale_subtitle}</span>
            <h1>{formState.wholesale_title}</h1>
            <p className="lead">{formState.wholesale_description}</p>
            <SubmitButton name={formState.wholesale_register_button} />
          </div>
          <div className="image-wrapper">
            <img src={formState.wholesale_image}></img>
          </div>
        </Styling>
      )}
    </React.Fragment>
  )
}

export default Start
