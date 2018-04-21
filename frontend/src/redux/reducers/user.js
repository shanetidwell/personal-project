import axios from 'axios'

const initialState = {
    id: null,
    email: null,
    name: null,
    profile_pic: null,
    street: null,
    city: null,
    state: null,
    zip: null
}
const GET_USER_INFO = 'GET_USER_INFO'
const ADD_ADDRESS = 'ADD_ADDRESS'

export default (state = initialState, action) => {
    switch (action.type) {
      case GET_USER_INFO + '_FULFILLED':
        console.log("reducer hit")
        return { ...state, ...action.payload.data }
      case ADD_ADDRESS + '_FULFILLED':
      console.log("Add Address")
        return {...state, ...action.payload.data[0]}
      default:
        return state
    }
}

export function getUserInfo() {
    return {
      type: GET_USER_INFO,
      payload: axios.get('/auth/me')
    }
  }
  export function addAddress(address){
    return {
      type: ADD_ADDRESS,
      payload: axios.post('/api/user/address', address)
    }
  }
 
