import axios from 'axios'

const initialState = {
    messageRecipientId: null,
    currentMessageThread: null,
    messages: [],
    messageThreads: []
}

const ADD_RECIPIENT = 'ADD_RECIPIENT';
const UPDATE_CURRENT_THREAD = 'UPDATE_CURRENT_THREAD';
const GET_MESSAGES = "GET_MESSAGES";
const GET_MESSAGE_THREADS = "GET_MESSAGE_THREADS";
const ADD_MESSAGE = "ADD_MESSAGE"

export default (state = initialState, action) => {
    switch (action.type) {
        case ADD_RECIPIENT :
        console.log("Add Recipient")
            return {...state, messageRecipientId: action.payload}
        case UPDATE_CURRENT_THREAD:
        console.log("update thread", action.payload)
            return {...state, currentMessageThread: action.payload}
        case GET_MESSAGES + "_FULFILLED":
            console.log("get Messages", action.payload.data)
            return {...state, messages: action.payload.data}
        case GET_MESSAGE_THREADS + "_FULFILLED":
            // console.log("payload", action.payload)
            return {...state, messageThreads: action.payload.data}
        case ADD_MESSAGE:
        let messages = {...state};
        messages.messages.push({sender: action.payload.sender, message: action.payload.message})
            console.log("adding Message", action.payload)
            return {...state, messages: messages.messages}
        default:
            return state
    }
}

  export function addRecipient(id){
    return {
      type: ADD_RECIPIENT,
      payload: id
    }
  }
  export function updateCurrentThread(threadId){
    return {
        type: UPDATE_CURRENT_THREAD,
        payload: threadId
    }
  }
  export function getMessages(threadId){
      return {
          type: GET_MESSAGES,
          payload: axios.get(`/api/getThreadMessages/${threadId}`)
      }
  }
  export function getMessageThreads(){
      return {
          type: GET_MESSAGE_THREADS,
          payload: axios.get('/api/getMessageThreads')
      }
  }
  export function addMessage(messageInfo){
      return {
          type: ADD_MESSAGE,
          payload: messageInfo
      }
  }
  
