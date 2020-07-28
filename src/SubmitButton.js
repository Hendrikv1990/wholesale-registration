import React from 'react'
import styled from 'styled-components'

const Button = styled.button`
  color: ${(props) => (props.color === 'green' ? '#fff' : '#00140f')};
  background: ${(props) => (props.color === 'green' ? '#058273' : 'transparent')};
  border: ${(props) => (props.color === 'green' ? 'none' : '1px solid #00140f;')};
  line-height: 1.3em;
  padding:0;
  text-transform: uppercase;
  font-weight: bold;
  &:hover,
  &:focus {
    cursor: pointer;
    background: ${(props) => (props.color === 'green' ? '#058273' : '#fff')};
    color: ${(props) => (props.color === 'green' ? '#fff' : '#00140f')};
  }
`

const SubmitButton = ({ name, color }) => {
  return (
    <div className="item">
      <Button color={color} type="submit" className="button">
        {name}
      </Button>
    </div>
  )
}
export default SubmitButton
