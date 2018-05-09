import React, {Component} from 'react'
import {Link} from 'react-router-dom';
import axios from 'axios';
import io from 'socket.io-client';
import {addRecipient, deleteRecipient, updateCurrentThread, getMessages, addMessage, updateMessages, clearMessageInfo} from '../../redux/reducers/messages';
import {connect} from 'react-redux';
import './Messaging.css'
const socket = io("http://localhost:4000");

class Messaging extends Component {
    constructor(props){
        super(props);
        this.state = {
            message :""                   
        }
    }
    componentWillMount(){
        this.props.updateCurrentThread(this.props.match.params.threadId)
    }
    componentDidUpdate(){
        this.scrollToBottom();
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
        console.log("getting messages")
        this.props.getMessages(this.props.match.params.threadId);
        this.scrollToBottom();
        
        
    }
    componentWillUnmount(){
        this.props.clearMessageInfo();
    }
    sendMessage = ()=>{
        const payload = {
            message: this.state.message,
            recipientId: this.props.messages.messageRecipientId
        }
        // axios.post(`/api/message/addMessage/${this.props.messages.currentMessageThread}`, payload ).then(
        // this.props.addMessage({message:this.state.message, sender: this.props.user.id });
        axios.post(`/api/messages/addMessage/${this.props.messages.currentMessageThread}`, payload ).then(response=>{
            console.log("lets see if this works", response);
            this.props.updateMessages(response.data);
            socket.emit("send message", {
                message: this.state.message,
                // room: `message${this.props.messages.currentMessageThread}`
                room: `message${this.props.match.params.threadId}`,
                sender: this.props.user.id, 
                thread_id: this.props.messages.currentMessageThread
            })
            this.setState({message: ""})
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
    scrollToBottom = () => {
        this.messagesEnd.scrollIntoView({ behavior: "smooth" });
      }
    render (){
        // console.log(111,this.props)
        const styles=this.styles();
        
        return(
            <div style={styles.messagePage}>
                {this.props.messages.messagingWith !== null ? <div style={styles.header}>{this.props.messages.messagingWith}</div>:<div style={styles.header}>Messages</div>}
                <div style={styles.messagesContainer} className="messages-container">
                    <div>
                        {this.props.messages.messages.map((message, index)=>{
                            let messageSide = message.sender===this.props.user.id ? styles.myMessages : styles.theirMessages
                            let messageStyle = message.sender===this.props.user.id ? styles.greyMessage : styles.blueMessage
                        
                            return (
                                <div style={messageSide} key={index}>
                                    <div style={messageStyle}>
                                    {message.message}
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                    <div /* style={{ float:"left", clear: "both" }} */
                        ref={(el) => { this.messagesEnd = el; }}>
                    </div>
                </div>
                <div style={styles.input} >
                    <textarea style={styles.textarea} placeholder="Message" value={this.state.message} onChange={this.handleMessageChange}/>
                    <button style={styles.sendButton} onClick={()=>this.sendMessage()}>Send</button>
               </div>
            </div>
        )
    }
    styles=()=>{
        var wideView = window.innerWidth * .7 > 700;
        console.log("wideview",wideView);
        return {
            messagePage: {
                display: "flex",
                flexDirection: "column",
                alignItems: "center"
            },
            header: {
                backgroundColor: "#163D57",
                width: "100%",
                height: "40px",
                marginBottom: "10px",
                display: "flex",
                alignItems: "center",
                // paddingLeft: wideView ? (window.innerWidth-600)/2: "30%",
                paddingLeft: wideView ? (window.innerWidth-700): "30%",
                // color: isMobile ? 'red' : 'black',
                color: "white",
                boxShadow: "0px 2px 7px #C9C9C9",
            },
            input: {
                position: "absolute",
                bottom: "10px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
              
            },
            textarea: {
                width: "70vw",
                maxWidth: "700px",
                borderRadius: "5px",
                marginRight: "5px"
                
            },
            myMessages: {
                width: "70vw",
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
                marginBottom: "10px",
                maxWidth: "700px"
            },
            theirMessages: {
                width: "70vw",
                display: "flex",
                alignItems: "center",
                maxWidth: "700px",
                marginBottom: "10px",

            },
            blueMessage: {
               borderRadius: "5px",
               backgroundColor: "#163D57",
               color: "white",
               padding: "7px",
               maxWidth: "250px"
            },
            greyMessage: {
                borderRadius: "5px",
                backgroundColor: "#e3e5e8",
                color: "black",
                padding: "7px",
                maxWidth: "250px"
            },
            messagesContainer: {
                // height: "calc(100vh-160px)",
                // width: "70vw",
                // maxHeight: "calc(100vh-160px)",
                overflow: "auto",
                overflowX: "hidden",
                padding: "15px",
                boxSizing: "border-box"
            },
            sendButton: {
                border: "none",
                cursor: "pointer",
                borderRadius: "5px",
                backgroundColor: "#163D57",
                border: "1px solid #163D57",
                color: "white",
                padding: "5px",
                // height: "30px"
            },
        }
    }
}
function mapStateToProps(state){
    const {user,messages} = state;
    const user_id = user.id
    return {user, messages}   
}

export default connect(mapStateToProps,{addRecipient, updateCurrentThread, getMessages, addMessage, updateMessages, clearMessageInfo})(Messaging);