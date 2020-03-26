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
    font-family: 'Archivo Narrow', 'Helvetica Neue', Arial, Helvetica, Verdana,
      sans-serif;
    letter-spacing: 0.2px;
     text-rendering: optimizeLegibility;
     color: #55706c;
      font-size: 14px;
;
  }
  @-webkit-keyframes autofill {
    0%,100% {
        color: #666;
        background: transparent;
    }
}

input:-webkit-autofill {
    -webkit-animation-delay: 1s; /* Safari support - any positive time runs instantly */
    -webkit-animation-name: autofill;
    -webkit-animation-fill-mode: both;
}
  /* Remove chrome outline blue */
  input:focus, textarea:focus, select:focus,button:focus{
        outline:none !important;
    }
  h1 {
    font-family: 'Bebas Neue Pro';
    text-transform: uppercase;
    font-size: 60px;
    line-height: 0.9;
    color: #00140f;
    margin: 0 0 1rem 0;
    }
  p {
    font-family: 'Archivo Narrow';
    font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.5;
    letter-spacing: normal;
    color: #55706c;
  }
  a {
      color: #55706c;
      text-decoration: none;
      font-size: 14px;
    }
  
`
