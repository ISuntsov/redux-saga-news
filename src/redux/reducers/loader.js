import { SET_LOADING_DATA } from '../constants'

const initialState = {
  isLoading: false,
}

const loader = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_LOADING_DATA:
      return { ...state, isLoading: payload }
    default:
      return state
  }
}

export default loader
