import React, {Component} from 'react'
import {Link} from 'react-router-dom';
import axios from 'axios';
import io from 'socket.io-client';
import {addRecipient, deleteRecipient, updateCurrentThread, getMessages, addMessage} from '../../redux/reducers/messages';
import {connect} from 'react-redux';
const socket = io("http://localhost:4000");

class Messaging extends Component {
    constructor(props){
        super(props);
        this.state = {
            message :""                   
        }
    }
    componentDidMount(){
        // console.log("ID", this.props.messages.messageRecipientId )
        // if (this.props.messages.messageRecipientId !== null){
        //     axios.get(`/api/messages/${this.props.messages.messageRecipientId}`).then(response=>{
        //         console.log("messages response", response);
        //         if(response.data.status==="message_id"){
        //             this.props.updateCurrentThread(response.data.id);
        //             socket.emit('new message thread', {
        //                 threadId: response.data.id,
        //                 recipientId: parseInt(this.props.messages.messageRecipientId,10),
        //                 senderId: this.props.user.id

        //             })
        //         }
        //     })
        // } 

        this.props.getMessages(this.props.match.params.threadId);
        this.props.updateCurrentThread(this.props.match.params.threadId);
    }
    sendMessage = ()=>{
        const payload = {
            message: this.state.message,
            recipientId: this.props.messages.messageRecipientId
        }
        // axios.post(`/api/message/addMessage/${this.props.messages.currentMessageThread}`, payload ).then(
        this.props.addMessage({message:this.state.message, sender: this.props.user.id });
        axios.post(`/api/messages/addMessage/${this.props.messages.currentMessageThread}`, payload ).then(response=>{
            socket.emit("send message", {
                message: this.state.message,
                // room: `message${this.props.messages.currentMessageThread}`
                room: `message${this.props.match.params.threadId}`,
                sender: this.props.user.id
            })
        })

    }
    
    submit = ()=>{
        const addItem = {...this.state};
        console.log(22222, addItem);
        axios.post(`/api/${this.props.gift_request_id}/item`, addItem).then(response=>{
        
            console.log("response", response.data[0]);
            
        }).catch(e=>console.log(e));
        socket.emit('room', {room: `gift${this.props.requestId}`});
        socket.emit('make request', {
            room: `gift${this.props.requestId}`,
            requestMade: true
        })
    }

    handleChange = (e) =>{
        this.setState({[e.target.name]: e.target.value})
    }
    handleMessageChange = (e)=>{
        this.setState({message: e.target.value})
    }
    render (){
        console.log(111,this.props)
        const styles=this.styles();
        return(
            <div>
                Messages
                {this.props.messages.messages.map((message, index)=>{
                    return (
                        <div key={message.index}>
                            {message.message}
                        </div>
                    )
                })}
                <div style={styles.input} >
                    <textarea style={styles.textarea} value={this.state.message} onChange={this.handleMessageChange}/><button onClick={()=>this.sendMessage()}>Send</button>
               </div>
            </div>
        )
    }
    styles=()=>{
        const twoColumn = window.innerWidth < 800
        return {
            input: {
                position: "absolute",
                bottom: "10px",
            },
            textarea: {
                width: "90vw"
            }
        }
    }
}
function mapStateToProps(state){
    const {user,messages} = state;
    const user_id = user.id
    return {user, messages}   
}

export default connect(mapStateToProps,{addRecipient, updateCurrentThread, getMessages, addMessage})(Messaging);