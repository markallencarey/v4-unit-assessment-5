// import axios from 'axios'

const initialState = {
  user: {}
}

const UPDATE_USER = 'UPDATE_USER'
const LOGOUT = 'LOGOUT'

export function updateUser(user) {
  return {
    type: UPDATE_USER,
    payload: user 
  }
}

export function logout() {
  return {
    type: LOGOUT,
  }
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_USER:
      console.log(action.payload)
      return {
        ...state,
        user: action.payload
      }
    case LOGOUT:
      return initialState
    default:
      return state
  }
}