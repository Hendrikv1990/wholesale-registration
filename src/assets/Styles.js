import { createGlobalStyle } from 'styled-components'
import './App.css'

export const sizes = {
  desktop: 2560,
  tablet: 883,
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
    font-size: 96px;
    line-height: 0.9;
    color: #00140f;
    margin: 0 0 1rem;
    
     @media ${device.phone} {
        font-size:48px;
     }
    }
   h2 {
       color: #00140f;
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
    label[for="productCategories"]{
    display:none;
    }
    .react-select__placeholder {
    color:#55706c!important;
    }
    
    .react-select__control {
        padding-bottom: 5px;
        }
    .start-container {
    @media only screen and (min-width:1024px){

    padding-left: 180px;
    padding-top: 130px;
    }
  }
  
  .footer-wrapper {
    @media only screen and (max-width:1023px){
      margin:0;
          padding: 0 20px;
          margin-top:30px;
    }
  }
  
  .footer-wrapper {
   @media only screen and (min-width:1024px){
    margin-top: 50px;
   padding-left: 180px;
   padding-right:180px;
   
   
   }
   
   @media only screen and (min-width:1920px){
   max-width: 1920px;
    margin: auto;
    padding: 0;
   }
   
   @media only screen and (max-width:1023px){
   .pagination-wholesale {
    order:1;
   }
   }
   
  }
  .hero-container {
  @media only screen and (max-width:1023px){
  padding: 0 20px;
  
  button {
  width:100%;
  }
  }
  }
  
  .form-title {
  @media only screen and (max-width:1023px){
      height:auto!important;
      }
  }
  
  .column-container .row-container {
     @media only screen and (max-width:1023px){
      height:auto;
      .field-wrapper {
      margin-bottom:5px;
      }
      }
     
  }
  .ack-container {
  
  @media only screen and (min-width:1920px){
      margin-top: 12rem!important;
    margin-bottom: 12rem;
  }
  
  @media only screen and (max-width:1023px){
        padding: 0 20px;
        margin-bottom:10px;
        .column-space {
        display:none;
        }
        }
  }
  .form-container {
  @media only screen and (min-width:1024px){
      padding-top: 100px;
   padding-left: 180px;
   padding-right:180px;
   }
  }
  
   .column-space {
    @media only screen and (min-width:1024px){
      padding-left:20%;
    }
  }
  .no-padding {
  @media only screen and (max-width:1024px){
      flex-flow: column;
      }
  }
  .link {
    border-bottom: 1px solid #00140f;
    padding: 1rem 0;
    a {
      display: flex;
      justify-content: space-between;
      align-items: center;
      cursor: pointer;
      width: 100%;
    }
  }
  .arrow {
    display: flex;
    justify-content: flex-end;
  }
  .column-container {
    flex: 0 1 50%;
    @media only screen and (min-width:1023px){
     
    }
   
    @media ${device.tablet} {
      flex: 0 1 100%;
    }
  }
  .field-wrapper {
    margin: 1rem;
  }
  .width-50 {
    flex: 0 1 50%;
  }
  .width-100 {
    flex: 0 1 100%;
  }
  .width-auto {
    flex: 0 1 auto;
  }
  
  .width-40 {
   flex: 0 1 40%;
   margin:0;
    @media ${device.tablet} {
      flex: 0 1 100%;
    }
  }
   .width-60 {
   flex: 0 1 60%;
   margin:0;
    @media ${device.tablet} {
      flex: 0 1 100%;
    }
   }
  .no-padding {
  padding:0;
  }
  
`
