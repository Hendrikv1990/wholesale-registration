import { createGlobalStyle } from 'styled-components'
import './App.css'

export const sizes = {
  desktop: 1300,
  tablet: 1024,
  phone: 768,
}

export const device = Object.keys(sizes).reduce((acc, cur) => {
  acc[cur] = `(max-width: ${sizes[cur]}px)`
  return acc
}, {})
export default device

export const GlobalStyle = createGlobalStyle`
  * { box-sizing: border-box; }

  body {
    font-family: 'ArchivoNarrow', 'Helvetica Neue', Arial, Helvetica, Verdana,
      sans-serif;
    color: #222;
    letter-spacing: 0.2px;
     text-rendering: optimizeLegibility;
     
  }

  h1 {
    font-family: 'Bebas Neue Pro';
    text-transform: uppercase;
    font-size: 96px;
    line-height: 0.9;
    color: #00140f;
    margin: 0 0 3rem 0;
    }
  p {
    font-family: 'ArchivoNarrow';
    font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.5;
    letter-spacing: normal;
    color: #55706c;
  }
  
`
