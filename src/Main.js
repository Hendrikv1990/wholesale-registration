import React from 'react'
import Wizard from './Wizard'
import Acknowledge from './Wizard/Acknowledge'
import Finish from './Wizard/Finish'
import Form from './Wizard/Form'
import Start from './Wizard/Start'

const Main = ({ campaign, source, medium, targetGroup, postType, store }) => {
  return (
    <React.Fragment>
      <Wizard
        store={store}
        initialValues={{
          firstName: 'Marinos',
          lastName: 'Zakynthinos',
          email: 'marinoszak@gmail.com',
          dialCode: {
            value: '+49',
            label: 'Germany',
          },
          telephone: '15168729265',
          businessName: 'Pardalo  katsiki',
          businessAddress: 'Oldenburger Str. 5',
          postalCode: '10551',
          city: 'Berlin',
          taxNumber: '234',
          gdpr: false,
          productCategories: [
            {
              value: 'category_2',
              label: 'category_2',
            },
          ],
          businessType: {
            value: 'Einzelkaufleute',
            label: 'Einzelkaufleute',
          },
          files: [],
          uploaded: {},
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
          // files: [],
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
