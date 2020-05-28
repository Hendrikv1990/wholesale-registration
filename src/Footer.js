import React from 'react'
import { FormattedMessage } from 'react-intl'
import styled from 'styled-components'
import { device, sizes } from './assets/Styles'
import { useSelector } from 'react-redux'
import SubmitButton from './SubmitButton'
const Styling = styled.div.attrs({
  className: 'footer-wrapper',
})`
  .links {
    display: flex;
    flex-direction: column;
    font-family: Archivo Narrow;
    font-size: 14px;
    color: #55706c;
    span {
      a {
        color: #068273;
      }
    }
  }

  .hidden {
    visibility: hidden;
    display: none;
  }
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  .pagination {
    margin: 0 auto;
  }
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
              background: #00140f;
              color: white;
            }
          }
        }
      }
    }
  }
`
const Button = styled.button`
  color: #222;
  background: #fff;
  border: 1px solid #222;
  line-height: 1.3em;
  padding: 1rem 4rem;
  text-transform: uppercase;
  font-weight: bold;
  &:hover,
  &:focus {
    cursor: pointer;
    background: #fff;
    color: #222;
  }
`

const SimpleButton = ({ name, className, previous }) => {
  return (
    <div className={`item ${className}`}>
      <Button type="button" onClick={previous} className="button">
        <FormattedMessage id={name}>{(message) => message}</FormattedMessage>
      </Button>
    </div>
  )
}

export const Footer = React.memo(({ page, previous, width }) => {
  const status = useSelector((state) => state.files.status)
  const formState = useSelector((state) => state.form)

  const Pagination = () => {
    return (
      <div className="item pagination">
        <div className="pagination-wrapper">
          <div className="pagination-container">
            <nav>
              <ul>
                {[1, 2, 3].map((x) => {
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

  const buttonName = () => {
    switch (status) {
      case 'FILES_UPLOADED':
        return 'button.form.submit'
      case 'idle':
        return 'button.form.submit'
      case 'LOADED':
        return 'button.form.submit'
      case 'PENDING':
        return 'button.form.uploading'
      default:
        return 'button.form.submit'
    }
  }

  return (
    <React.Fragment>
      {formState && (
        <Styling>
          {/* We show this hidden component on Desktop and Tablet only */}
          {page === 1 && width > sizes.phone && (
            <SimpleButton
              className="hidden"
              name={formState.buttons.wholesale_register_button}
            />
          )}
          {page === 0 && (
            <React.Fragment>
              <div className="links">
                <span>
                  {formState.login_message}
                  <a href={formState.login_link.url}>
                    {formState.login_link.title}
                  </a>
                </span>
              </div>
            </React.Fragment>
          )}
          {page === 1 && (
            <div className="links">
              <span>
                {formState.login_message}
                <a href={formState.login_link.url}>
                  {formState.login_link.title}
                </a>
              </span>
              <span>
                {formState.help_message}
                <a href={formState.help_link.url}>
                  {formState.help_link.title}
                </a>
              </span>
            </div>
          )}
          {page === 2 && (
            <SimpleButton
              previous={previous}
              name={formState.buttons.wholesale_back_button}
            />
          )}
          {page > 0 && page < 4 && <Pagination />}
          {page === 1 && (
            <SubmitButton name={formState.buttons.wholesale_next_button} />
          )}
          {page === 2 ? (
            status === 'FILES_UPLOADED' ? (
              <SubmitButton
                color="green"
                name={formState.buttons.wholesale_submit_button}
              />
            ) : (
              <SubmitButton name={formState.buttons.wholesale_submit_button} />
            )
          ) : null}
        </Styling>
      )}
    </React.Fragment>
  )
})
export default Footer
