import React from 'react'
import styled from 'styled-components'

const Button = styled.button`
  backgroun-color:transparent;
`

const RegisterButton = ({ name, color }) => {
  return (
      <div className="item">
      <Button type="submit" className="button dark">
      {name}
      </Button>
      </div>
)
}
export default RegisterButton
