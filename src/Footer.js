import React from 'react'
import styled from 'styled-components'
import { FormattedMessage } from 'react-intl'

const Styling = styled.div.attrs({
  className: 'footer-container',
})`
  width: 100%;

  display: flex;
  justify-content: space-between;
  align-items: center;
  .button {
    color: #222;
    background: white;
    line-height: 1.3em;
    border: 1px solid #222;
    padding: 1rem 4rem;
    text-transform: uppercase;
    font-weight: bold;
    &:hover,
    &:focus {
      cursor: pointer;
      background: white;
      color: #222;
      border-color: #222;
    }
  }
  .pagination-wrapper {
    .pagination-container {
      nav {
        ul {
          margin: 0;
          display: flex;
          padding: 0;
          flex-wrap: wrap;
          list-style: none;
          align-items: center;
          li {
            height: 32px;
            margin: 0 3px;
            padding: 0 10px;
            line-height: 2rem;
            border: 1px solid;
            transition: color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
              background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
            &.active {
              background: black;
              color: white;
            }
          }
        }
      }
    }
    h1 {
    }
    p {
    }
  }
`

export const Footer = ({ page, previous }) => (
  <Styling>
    {page === 0 && (
      <button className="button">
        <FormattedMessage id="button.start">
          {message => message}
        </FormattedMessage>
      </button>
    )}
    {page === 2 && (
      <button onClick={previous} className="button">
        <FormattedMessage id="button.back">
          {message => message}
        </FormattedMessage>
      </button>
    )}
    {page > 0 && page < 4 && (
      <div className="pagination-wrapper">
        <div className="pagination-container">
          <nav>
            <ul>
              {[1, 2, 3].map(x => {
                let active = x === page ? 'active' : ''
                return (
                  <li key={x} className={`${active}`}>
                    {x}
                  </li>
                )
              })}
            </ul>
          </nav>
        </div>
      </div>
    )}
    {(page === 1 || page === 2) && (
      <button type="submit" className="button">
        <FormattedMessage id="button.form">
          {message => message}
        </FormattedMessage>
      </button>
    )}
  </Styling>
)

export default Footer
