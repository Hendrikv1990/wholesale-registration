import React from 'react'
import { useSelector } from 'react-redux'
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
  const formState = useSelector((state) => state.form)

  return (
    <React.Fragment>
      {formState && (
        <Styling>
          <div className="hero-container">
            <span>{formState.start.wholesale_subtitle}</span>
            <h1>{formState.start.wholesale_title}</h1>
            <p className="lead">{formState.start.wholesale_description}</p>
            <SubmitButton name={formState.buttons.wholesale_register_button} />
          </div>
          <div className="image-wrapper">
            <img src={formState.start.wholesale_image}></img>
          </div>
        </Styling>
      )}
    </React.Fragment>
  )
}

export default Start
