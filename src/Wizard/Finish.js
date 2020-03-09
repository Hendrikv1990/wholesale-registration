import React from 'react'
import styled from 'styled-components'

const Styling = styled.div.attrs({
  className: 'wrapper',
})`
  width: 100%;
  .container {
  }
`

export const Start = props => {
  return (
    <Styling>
      <div className="container">
        <span>Händlersuche</span>
        <h1>Lorem ipsum dolor sit amet.</h1>
        <p className="lead">
          Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
          nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat.
          Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
          nonummy nibh euismod tincidunt ut laoreet dolore magna.
        </p>
      </div>
    </Styling>
  )
}

export default Start
