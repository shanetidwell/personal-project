import axios from 'axios'

const initialState = {
    id: null,
    email: null,
    name: null,
    profile_pic: null,
}
const GET_USER_INFO = 'GET_USER_INFO'

export default (state = initialState, action) => {
    switch (action.type) {
      case GET_USER_INFO + '_FULFILLED':
        console.log("reducer hit")
        return { ...state, ...action.payload.data }
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
