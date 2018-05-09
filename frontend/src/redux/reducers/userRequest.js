import axios from 'axios'
import AddItem from '../../components/AddItem/AddItem';

const initialState = {
    giftRequest: [],
    giftRequestAdded: false,
    acceptanceNotifications: 0,
    deliveryNotifications: 0,
    items: [],
    myGiftRequests:[],
    myDeliveries: []
}
const ADD_ITEM = 'ADD_ITEMS';
const ADD_GIFT_REQUEST = 'ADD_GIFT_REQUEST';
const GET_MY_GIFT_REQUESTS = 'GET_MY_GIFT_REQUESTS';
const GET_MY_DELIVERIES = 'GET_MY_DELIVERIES';
const ACCEPT_REQUEST = "ACCEPT_REQUEST";
const SET_REQUEST_ADDED_FALSE = "SET_REQUEST_ADDED_FALSE";
const CLEAR_DELIVERY_NOTIFICATIONS = "CLEAR_DELIVERY_NOTIFICATIONS";
const CLEAR_ACCEPTANCE_NOTIFICATIONS = "CLEAR_ACCEPTANCE_NOTIFICATIONS";
const GIFT_REQUEST_FULFILLED = "GIFT_REQUEST_FULFILLED";

export default (state = initialState, action) => {
    switch (action.type) {
      case ADD_ITEM:
        // console.log("reducer hit")
        var tempState = {...state}
        tempState.items.push(action.payload)
        return {tempState}
      case ADD_GIFT_REQUEST + '_FULFILLED':
        // console.log('Add Gift')
        // console.log(action.payload.data);
        return {...state, giftRequest: action.payload.data, giftRequestAdded: true}
      case GET_MY_GIFT_REQUESTS + '_FULFILLED':
        // console.log('get MY Requests', action.payload.data)
        const deliveryNotifications = parseInt(action.payload.data.deliveryNotifications[0].count, 10);
        return {...state, myGiftRequests: action.payload.data.requests, deliveryNotifications:deliveryNotifications}
      case GET_MY_DELIVERIES + '_FULFILLED':
        // console.log('get My Deliveries', action.payload.data);
        const notifications = parseInt(action.payload.data.count[0].count, 10);
        return {...state, myDeliveries: action.payload.data.deliveries, acceptanceNotifications: notifications}
      case ACCEPT_REQUEST + '_FULFILLED':
        console.log("action.payload.data", action.payload.data)
        return {...state, myGiftRequests: action.payload.data}
      case SET_REQUEST_ADDED_FALSE:
        // console.log("falseeee");
        return {...state, giftRequestAdded: false}
      case CLEAR_DELIVERY_NOTIFICATIONS + `_FULFILLED`:
        console.log("$$$", action.payload.data)
        return {...state, deliveryNotifications: action.payload.data.count}
      case CLEAR_ACCEPTANCE_NOTIFICATIONS + `_FULFILLED`:
        return {...state, acceptanceNotifications: action.payload.data.count}
      case GIFT_REQUEST_FULFILLED + `_FULFILLED`:
        return {...state, myGiftRequests: action.payload.data}
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
export function setGiftRequestAddedFalse(){
  return {
    type: SET_REQUEST_ADDED_FALSE,
    payload: false
  }
}
export function acceptRequest(deliveryRequestId, user_id, gift_request_id, delivery_amount){
  return {
    type: ACCEPT_REQUEST,
    payload: axios.post(`/api/deliveryRequests/accept/${deliveryRequestId}`, {user_id, gift_request_id, delivery_amount})
  }
}
export function clearDeliveryNotifications(){
  return {
    type: CLEAR_DELIVERY_NOTIFICATIONS,
    payload: axios.post(`/api/notifications/clearDeliveryNotifications`)
  }
}
export function clearAcceptanceNotifications(){
  return {
    type: CLEAR_ACCEPTANCE_NOTIFICATIONS,
    payload: axios.post(`/api/notifications/clearAcceptanceNotifications`)
  }
}
export function giftRequestFulfilled(id){
  return {
    type: GIFT_REQUEST_FULFILLED,
    payload: axios.post(`/api/giftRequests/fulfilled/${id}`)
  }
}


// export function addItem(item) {
//     return {
//       type: ADD_ITEM,
//       payload: item
//     }
//   }