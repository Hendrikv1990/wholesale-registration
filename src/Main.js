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
