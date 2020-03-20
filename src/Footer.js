import React from 'react'
import { FormattedMessage } from 'react-intl'
import styled from 'styled-components'
import { device, sizes } from './assets/Styles'
import { useSelector } from 'react-redux'

const Styling = styled.div.attrs({
  className: 'footer-wrapper',
})`
  .footer-container {
  }
  .hidden {
    visibility: hidden;
  }
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  .item {
    div {
      display: inline-block;
    }
    @media ${device.phone} {
      display: flex;
      justify-content: center;
      flex: 0 1 100%;
      margin-top: 1rem;
    }
  }

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
          @media ${device.phone} {
            justify-content: center;
          }
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
  }
`

export const Footer = ({ page, previous, width }) => {
  const status = useSelector(state => state.status)
  const Pagination = () => {
    return (
      <div className="item">
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
      </div>
    )
  }

  const SubmitButton = ({ name }) => {
    return (
      <div className="item">
        <button type="submit" className="button">
          <FormattedMessage id={name}>{message => message}</FormattedMessage>
        </button>
      </div>
    )
  }

  const SimpleButton = ({ name, className }) => {
    return (
      <div className={`item ${className}`}>
        <button type="button" onClick={previous} className="button">
          <FormattedMessage id={name}>{message => message}</FormattedMessage>
        </button>
      </div>
    )
  }

  const buttonName = () => {
    switch (status) {
      case 'FILES_UPLOADED':
        return 'button.form.submit'
      case 'idle':
        return 'button.form.submit'
      case 'LOADED':
        return 'button.form.upload'
      case 'PENDING':
        return 'button.form.uploading'
      default:
        return 'button.form.submit'
    }
  }

  return (
    <Styling>
      {/* We show this hidden component on Desktop and Tablet only */}
      {page === 1 && width > sizes.phone && (
        <SimpleButton className="hidden" name="button.start" />
      )}
      {page === 0 && <SubmitButton name="button.start" />}
      {page === 2 && <SimpleButton name="button.back" />}
      {page > 0 && page < 4 && <Pagination />}
      {(page === 1 || page === 2) && <SubmitButton name={buttonName()} />}
    </Styling>
  )
}
export default Footer
