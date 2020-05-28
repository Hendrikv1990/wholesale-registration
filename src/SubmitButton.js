import React from 'react'
import styled from 'styled-components'

const SubmitButton = ({ name, color }) => {
  const Button = styled.button`
    color: ${(props) => (props.color === 'green' ? '#fff' : '#222')};
    background: ${(props) => (props.color === 'green' ? '#058273' : '#fff')};
    border: ${(props) =>
      props.color === 'green' ? 'none' : '1px solid #222;'};
    line-height: 1.3em;
    padding: 1rem 4rem;
    text-transform: uppercase;
    font-weight: bold;
    &:hover,
    &:focus {
      cursor: pointer;
      background: ${(props) => (props.color === 'green' ? '#058273' : '#fff')};
      color: ${(props) => (props.color === 'green' ? '#fff' : '#222')};
    }
  `

  return (
    <div className="item">
      <Button color={color} type="submit" className="button">
        {name}
      </Button>
    </div>
  )
}
export default SubmitButton
