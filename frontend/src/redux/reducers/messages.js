import axios from 'axios'

const initialState = {
    messageRecipientId: null,
    currentMessageThread: null,
    messages: [],
    messageThreads: [],
    messagingWith: null
}

const ADD_RECIPIENT = 'ADD_RECIPIENT';
const UPDATE_CURRENT_THREAD = 'UPDATE_CURRENT_THREAD';
const GET_MESSAGES = "GET_MESSAGES";
const GET_MESSAGE_THREADS = "GET_MESSAGE_THREADS";
const ADD_MESSAGE = "ADD_MESSAGE";
const UPDATE_MESSAGING_WITH = "UPDATE_MESSAGING_WITH";
const UPDATE_MESSAGES = "UPDATE_MESSAGES";
const CLEAR_MESSAGE_INFO = "CLEAR_MESSAGE_INFO";

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
            return {...state, messages: action.payload.data.messages, messagingWith: action.payload.data.name}
        case GET_MESSAGE_THREADS + "_FULFILLED":
            // console.log("payload", action.payload)
            return {...state, messageThreads: action.payload.data}
        case ADD_MESSAGE:
        let messages = {...state};
        messages.messages.push({sender: action.payload.sender, message: action.payload.message})
            console.log("adding Message", action.payload)
            return {...state, messages: messages.messages}
        case UPDATE_MESSAGING_WITH:
            return {...state, messagingWith: action.payload}
        case UPDATE_MESSAGES:
            return {...state, messages: action.payload}
        case CLEAR_MESSAGE_INFO:
            return {...state, messages:[], messageRecipientId: null, currentMessageThread: null, messagingWith: null}
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
  export function updateMessagingWith(name){
      return {
          type: UPDATE_MESSAGING_WITH,
          payload: name
      }
  }
  export function updateMessages(messages){
      return {
          type: UPDATE_MESSAGES,
          payload: messages
      }
  }
  export function clearMessageInfo(){
      return {
        type: CLEAR_MESSAGE_INFO,
        payload: "none"
      }
      
  }
  
