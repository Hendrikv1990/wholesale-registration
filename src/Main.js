import axios from 'axios'
import { Formik } from 'formik'
import { gsap, Power3, TimelineLite } from 'gsap'
import { CSSPlugin } from 'gsap/CSSPlugin'
import debounce from 'lodash.debounce'
import React, { Component } from 'react'
import { Transition, TransitionGroup } from 'react-transition-group'
import styled from 'styled-components'
import * as yup from 'yup'
import Footer from './Footer'
// import Debug from './Debug'
import Acknowledge from './Wizard/Acknowledge'
import Finish from './Wizard/Finish'
import Form from './Wizard/Form'
import Start from './Wizard/Start'

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
    .min(1, 'Pick at least 1 category')
    .nullable()
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
    position: relative;
    height: ${props => props.mainHeight}px;
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
          url: '',
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

    const isLastPage = page === React.Children.count(children) - 1
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
                    </div>
                  </Transition>
                </TransitionGroup>
              </div>
              <Footer
                width={this.state.dimensions.width}
                previous={this.previous}
                page={this.state.page}
              />
              {/* {process.env.NODE_ENV === 'development' && <Debug />} */}
            </form>
          )}
        />
      </Styling>
    )
  }
}

const Main = ({ campaign, source, medium, targetGroup, postType }) => {
  return (
    <React.Fragment>
      <Wizard
        initialValues={{
          firstName: 'ΜΑΡΙΝΟΣ',
          lastName: 'Ζακυνθινος',
          email: 'marinoszak@gmail.com',
          dialCode: {
            value: '+213',
            label: 'Algeria',
          },
          telephone: '234234234',
          businessName: 'asdf',
          businessAddress: 'Καρυα Λευκαδας',
          postalCode: '31080',
          city: 'Καρυα',
          taxNumber: '234',
          gdpr: false,
          productCategories: [
            {
              value: 'category_2',
              label: 'category_2',
            },
            {
              value: 'category_1',
              label: 'category_1',
            },
          ],
          businessType: {
            value: 'Einzelkaufleute',
            label: 'Einzelkaufleute',
          },
          businessRegistration: 'asdfsdf',
          // firstName: '',
          // lastName: '',
          // email: '',
          // dialCode: {},
          // telephone: '',
          // businessName: '',
          // businessAddress: '',
          // postalCode: '',
          // city: '',
          // taxNumber: '',
          // gdpr: false,
          // productCategories: [],
          // businessType: {},
        }}
      >
        <Wizard.Page>
          {props => {
            return <Start {...props}></Start>
          }}
        </Wizard.Page>

        <Wizard.Page>
          {props => {
            return <Form {...props}></Form>
          }}
        </Wizard.Page>

        <Wizard.Page>
          {props => {
            return <Acknowledge {...props}></Acknowledge>
          }}
        </Wizard.Page>

        <Wizard.Page>
          {props => {
            return <Finish {...props}></Finish>
          }}
        </Wizard.Page>
      </Wizard>
    </React.Fragment>
  )
}

export default Main
