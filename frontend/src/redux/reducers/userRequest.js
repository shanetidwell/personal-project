import axios from 'axios'
import AddItem from '../../components/AddItem/AddItem';

const initialState = {
    storeRequest: [],
    storeRequestAdded: false,
    items: []
}
const ADD_ITEM = 'ADD_ITEMS';
const ADD_STORE = 'ADD_STORE';

export default (state = initialState, action) => {
    switch (action.type) {
      case ADD_ITEM:
        console.log("reducer hit")
        var tempState = {...state}
        tempState.items.push(action.payload)
        return {tempState}
      case ADD_STORE + '_FULFILLED':
        console.log('Add store')
        return {...state, storeRequest: action.payload.data, storeRequestAdded: true}
      default:
        return state
    }
}
export function addStoreRequest(newRequest){
  return {
    type: ADD_STORE,
    payload: axios.post('/api/storeRequest', newRequest)
  }
}
// axios.post('/api/storeRequest', storeRequest)

export function addItem(item) {
    return {
      type: ADD_ITEM,
      payload: item
    }
  }