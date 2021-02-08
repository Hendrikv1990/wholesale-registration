import React, { useEffect } from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import Wizard from './Wizard'
import Acknowledge from './Wizard/Acknowledge'
import Finish from './Wizard/Finish'
import Form from './Wizard/Form'
import Start from './Wizard/Start'

const Main = ({ campaign, source, medium, targetGroup, postType, store }) => {
  const dispatch = useDispatch();
  const language = window.wpml_browser_redirect_params.pageLanguage;

  const getForm = () => {

    return axios.get(
      '/wp-json/tomhemps/v1/wholesale_registration',
      {
          params: {
            lang: language
        }
        },
    )
  }

  useEffect(() => {
    getForm()
      .then((response) => {
        dispatch({
          type: 'RECEIVE_FORM',
          form: response.data,
        })
      })
      .catch((error) => {})
  }, [dispatch])

  return (
    <React.Fragment>
      <Wizard
        store={store}
        initialValues={{
          uploaded: {},
          firstName: '',
          lastName: '',
          email: '',
          dialCode: '',
          telephone: '',
          businessName: '',
          businessAddress: '',
          postalCode: '',
          city: '',
          country: '',
          taxNumber: '',
          vatNumber: '',
          gdpr: false,
          productCategories: [],
          businessType: '',
          files: [],
        }}
      >
        <Wizard.Page>
          {(props) => {
            return <Start {...props}></Start>
          }}
        </Wizard.Page>
        <Wizard.Page>
          {(props) => {
            return <Form {...props}></Form>
          }}
        </Wizard.Page>
        <Wizard.Page>
          {(props) => {
            return <Acknowledge {...props}></Acknowledge>
          }}
        </Wizard.Page>
        <Wizard.Page>
          {(props) => {
            return <Finish {...props}></Finish>
          }}
        </Wizard.Page>
      </Wizard>
    </React.Fragment>
  )
}

export default Main
