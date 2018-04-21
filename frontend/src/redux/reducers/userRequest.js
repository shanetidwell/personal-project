import axios from 'axios'
import AddItem from '../../components/AddItem/AddItem';

const initialState = {
    giftRequest: [],
    giftRequestAdded: false,
    items: [],
    myGiftRequests:[],
    myDeliveries: []
}
const ADD_ITEM = 'ADD_ITEMS';
const ADD_GIFT_REQUEST = 'ADD_GIFT_REQUEST';
const GET_MY_GIFT_REQUESTS = 'GET_MY_GIFT_REQUESTS';
const GET_MY_DELIVERIES = 'GET_MY_DELIVERIES';

export default (state = initialState, action) => {
    switch (action.type) {
      case ADD_ITEM:
        console.log("reducer hit")
        var tempState = {...state}
        tempState.items.push(action.payload)
        return {tempState}
      case ADD_GIFT_REQUEST + '_FULFILLED':
        console.log('Add Gift')
        return {...state, giftRequest: action.payload.data, giftRequestAdded: true}
      case GET_MY_GIFT_REQUESTS + '_FULFILLED':
        console.log('get MY Requests')
        return {...state, myGiftRequests: action.payload.data}
      case GET_MY_DELIVERIES + '_FULFILLED':
        console.log('get My Deliveries')
        return {...state, myDeliveries: action.payload.data}
      default:
        return state
    }
}
export function addGiftRequest(newRequest){
  return {
    type: ADD_GIFT_REQUEST,
    payload: axios.post('/api/giftRequest', newRequest)
  }
}
export function getGiftRequests(){
  return {
    type: GET_MY_GIFT_REQUESTS,
    payload: axios.get('/api/myGiftRequests')
  }
}
export function getMyDeliveries(){
  return {
    type: GET_MY_DELIVERIES,
    payload: axios.get('/api/myDeliveries')
  }
}


export function addItem(item) {
    return {
      type: ADD_ITEM,
      payload: item
    }
  }