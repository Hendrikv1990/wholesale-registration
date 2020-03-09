import React from 'react'
import styled from 'styled-components'

const Styling = styled.div.attrs({
  className: 'container',
})`
  display: flex;
  opacity: 0;
  visibility: hidden;
  .hero-container {
    flex: 0 1 50%;
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
  .image-wrapper {
    flex: 0 1 50%;
  }
`

export const Start = props => {
  return (
    <Styling>
      <div className="hero-container">
        <span>Händlersuche</span>
        <h1>Lorem ipsum dolor sit amet.</h1>
        <p className="lead">
          Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
          nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat.
          Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
          nonummy nibh euismod tincidunt ut laoreet dolore magna.
        </p>
      </div>
      <div className="image-wrapper"></div>
    </Styling>
  )
}

export default Start
