import axios from 'axios'
import { Formik } from 'formik'
import { gsap, Power3, TimelineLite } from 'gsap'
import { CSSPlugin } from 'gsap/CSSPlugin'
import debounce from 'lodash.debounce'
import React, { Component } from 'react'
import { Transition, TransitionGroup } from 'react-transition-group'
import styled from 'styled-components'
import * as yup from 'yup'
import Debug from './Debug'
import Footer from './Footer'

gsap.registerPlugin(CSSPlugin)

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

const FormSchema = yup.object().shape({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  email: yup
    .string()
    .email()
    .required(),
  telephone: yup
    .string()
    .matches(phoneRegExp, 'Phone number is not valid')
    .required(),
  businessName: yup.string().required(),
  businessAddress: yup.string().required(),
  postalCode: yup.string().required(),
  city: yup.string().required(),
  taxNumber: yup.string().required(),
  // file: yup.object().shape({
  //   // name: yup.string().required(),
  //   attachment: yup.string().required(),
  // }),
  dialCode: yup.object().shape({
    label: yup.string().required(),
    value: yup.string().required('Please choose on of the options'),
  }),
  businessType: yup.object().shape({
    label: yup.string().required(),
    value: yup.string().required('Please choose on of the options'),
  }),
  businessRegistration: yup.string().required(),
  productCategories: yup

    .array()
    .nullable()
    .min(1, 'Pick at least 1 category')
    .of(
      yup.object().shape({
        label: yup.string().required(),
        value: yup.string().required(),
      }),
    ),
})

const AcknowledgeSchema = yup.object().shape({
  gdpr: yup.bool().oneOf([true], 'Must agree to Privacy Policy'),
})

const Styling = styled.div.attrs({
  className: 'wrapper',
})`
  .main-wrapper {
    margin: auto 7rem;
    position: relative;
    height: ${props => props.mainHeight}px;
    min-height: 700px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 3rem 0;
    .main-container {
      width: 100%;
      position: absolute;
    }
  }
  .footer-wrapper {
    /* position: absolute;
    bottom: 0; */
    width: 100%;
  }
`

class Wizard extends Component {
  static Page = ({ children, parentState }) => {
    return children(parentState)
  }

  constructor(props) {
    super(props)
    this.mainRef = React.createRef()
    this.state = {
      message: null,
      page: 0,
      values: props.initialValues,
      dimensions: {
        width: 0,
        height: 0,
      },
    }
  }

  onResizeDebounced = debounce(() => {
    if (this.mainRef.current != null) {
      this.setState({
        dimensions: {
          height: this.mainRef.current.clientHeight,
          width: this.mainRef.current.clientWidth,
        },
      })
    }
  }, 400)

  onResize = () => {
    return this.onResizeDebounced()
  }
  componentDidMount() {
    window.addEventListener('resize', this.onResize)
    this.onResize()
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.onResize)
  }

  next = values =>
    this.setState(state => ({
      page: Math.min(state.page + 1, this.props.children.length - 1),
      values,
    }))

  previous = () =>
    this.setState(state => ({
      page: Math.max(state.page - 1, 0),
    }))

  validate = values => {
    const activePage = React.Children.toArray(this.props.children)[
      this.state.page
    ]
    return activePage.props.validate ? activePage.props.validate(values) : {}
  }

  handleSubmit = values => {
    const { children } = this.props
    const { page } = this.state
    const isLastPage = page === React.Children.count(children) - 1

    if (isLastPage) {
      const submitLead = values => {
        let data
        axios({
          method: 'post',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          url:
            'https://tomhemps.hkvlaanderen.com/wp-json/tomhemps/v1/wholesale_registration/',
          data: values,
        })
          .then(response => {
            this.setState({ message: 'success' })
          })
          .catch(error => {
            this.setState({ message: 'failure' })
          })
          .then(() => {})
        return data
      }
      submitLead(values)
    } else {
      this.next(values)
    }
  }

  getValidationSchema = page => {
    const validationSchemas = [null, FormSchema, AcknowledgeSchema]
    return validationSchemas[page]
  }

  animateOnEnter = node => {
    const timeline = new TimelineLite()
    return timeline.from(
      node,
      0.5,
      {
        ease: Power3.easeInOut,
        autoAlpha: 0,
      },
      '+=0.5',
    )
  }

  animateOnExit = node => {
    const timeline = new TimelineLite()
    return timeline.to(node, 0.5, {
      ease: Power3.easeInOut,
      autoAlpha: 0,
    })
  }
  render() {
    const { children } = this.props
    const { page, values } = this.state
    const activePage = React.Children.toArray(children)[page]

    // const isLastPage = page === React.Children.count(children) - 1
    return (
      <Styling mainHeight={this.state.dimensions.height}>
        <Formik
          initialValues={values}
          validationSchema={this.getValidationSchema(this.state.page)}
          enableReinitialize={false}
          validate={this.validate}
          onSubmit={this.handleSubmit}
          render={props => (
            <form onSubmit={props.handleSubmit}>
              <div className="main-wrapper">
                <TransitionGroup component={null}>
                  <Transition
                    appear
                    onEntered={this.onResize()}
                    key={this.state.page}
                    onEnter={node => this.animateOnEnter(node)}
                    onExit={node => this.animateOnExit(node)}
                    timeout={500}
                    unmountOnExit
                  >
                    <div className="main-container" ref={this.mainRef}>
                      {React.cloneElement(activePage, {
                        parentState: { ...props },
                      })}
                      <Footer
                        width={this.state.dimensions.width}
                        previous={this.previous}
                        page={page}
                      />
                    </div>
                  </Transition>
                </TransitionGroup>
              </div>

              {process.env.NODE_ENV === 'development' && <Debug />}
            </form>
          )}
        />
      </Styling>
    )
  }
}

export default Wizard
