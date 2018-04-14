import axios from 'axios'
import AddItem from '../../components/AddItem/AddItem';

const initialState = {
    giftRequest: [],
    giftRequestAdded: false,
    items: []
}
const ADD_ITEM = 'ADD_ITEMS';
const ADD_GIFT_REQUEST = 'ADD_GIFT_REQUEST';

export default (state = initialState, action) => {
    switch (action.type) {
      case ADD_ITEM:
        console.log("reducer hit")
        var tempState = {...state}
        tempState.items.push(action.payload)
        return {tempState}
      case ADD_GIFT_REQUEST + '_FULFILLED':
        console.log('Add store')
        return {...state, giftRequest: action.payload.data, giftRequestAdded: true}
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


export function addItem(item) {
    return {
      type: ADD_ITEM,
      payload: item
    }
  }