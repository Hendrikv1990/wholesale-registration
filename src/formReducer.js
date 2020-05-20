const RECEIVE_FORM = 'RECEIVE_FORM'

const formInitialState = {
  form: {},
}

export const reducer = (state = formInitialState.form, action) => {
  switch (action.type) {
    case RECEIVE_FORM:
      return action.form
    default:
      return state
  }
}

export default reducer
