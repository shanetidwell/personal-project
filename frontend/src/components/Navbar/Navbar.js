import React, {Component} from 'react';
import {connect} from 'react-redux';
import './Navbar.css'
import axios from 'axios';
import io from 'socket.io-client';
import {Redirect, Link} from 'react-router-dom';
import {getUserInfo} from '../../redux/reducers/user';
import {getMessages, getMessageThreads, addMessage} from '../../redux/reducers/messages';
import {getGiftRequests, getMyDeliveries} from '../../redux/reducers/userRequest';

const socket = io("http://localhost:4000");

class Navbar extends Component {
    constructor(props){
        super(props);
        this.state = {
            logout:false,
            requestMade: false
        }
        socket.on('receive request', (payload)=>{
            console.log('received reeqest navbar', payload)
            this.updateCodeFromSockets(payload);
        });
        socket.on('delivery request accepted', (payload)=>{
            console.log("accepted request ", payload);
            this.props.getMyDeliveries();
        });
        socket.on("new thread",(payload)=>{
            console.log("new thread", payload)
            if(payload.recipientId === this.props.user.id||payload.senderId===this.props.user.id){
                console.log("9999999")
                socket.emit('room', {room: `message${payload.threadId}`})
            }
        })
        socket.on("new message", (payload)=>{
            console.log("new mesage", payload)
            this.props.addMessage({sender: payload.sender, message: payload.message});
            this.props.getMessages(this.props.messages.currentMessageThread)
        })
       
        // this.socket = io("localhost:4000")
    }
    updateCodeFromSockets(payload){
        // console.log("upadate code from sockets", payload);
        this.setState({requestMade: payload.requestMade});
        this.props.getGiftRequests();
    }
    componentWillMount(){
        this.props.getUserInfo();
        this.props.getGiftRequests();
        this.props.getMyDeliveries();
        this.props.getMessageThreads();
    }
    // componentDidMount(){
    //     // if(this.props.giftRequest[0].id)
    //     this.props.getGiftRequests();
    //     console.log("proppps", this.props);
    //     // socket.emit('room', {room: 5});
    // }
    // componentWillReceiveProps(nextProps){
        
        
    //     // socket.emit('room', {room: 5});
    //     // socket.emit('room', {room: this.props.giftRequest[0].id});
    // }


    logout = ()=>{
        console.log("logging out")
        axios.get('/api/logout').then(response=>{
            this.setState({logout:true});
        }).catch((e)=>console.log(e));
    }
    
    render (){
        console.log("propsss88888", this.props);
        this.props.myGiftRequests.forEach(giftRequest=>{
            // console.log("trying to join room")
            socket.emit('room', {room: `gift${giftRequest.id}`})
        });
        this.props.myDeliveries.forEach(delieryRequest=>{
            // console.log("trying to join delivry")
            socket.emit('room', {room: `delivery${delieryRequest.id}`})
        });
        this.props.messages.messageThreads.forEach(messageThread=>{
            socket.emit("room", {room: `message${messageThread.id}`});
        })

        const styles = this.styles();
        // console.log("nav Props", this.props)
        if (this.state.logout){
            return (<Redirect to={"/"}/>)
        }
        return(
            <div className={"navbar"}style={styles.nav}>
                <div style={styles.giftedContainer}>
                <Link to={'/home'}>
                    <div style={styles.gifted}>
                        <img style={styles.icon}src={"https://i.imgur.com/LAP2JFe.png"}/>
                        Gifted.
                    </div>
                </Link>
                </div>
                <div style={styles.navbar} className="main-font">
                <Link to={`/messageThreads`}><button>Message</button></Link>
                    {this.props.deliveryNotifications !==0?
                     <Link to={'/myGiftRequests'}><button style={Object.assign({},styles.navContent, styles.myRequests)} data-badge={this.props.deliveryNotifications} className="button main-font notification" >My Gift Requests</button></Link> 
                    :
                    <Link to={'/myGiftRequests'}><button style={Object.assign({},styles.navContent, styles.myRequests)} className="button main-font" >My Gift Requests</button></Link> 
                    
                    }
                   
                    
                    {this.props.acceptanceNotifications !==0? 
                    <Link to={'/myDeliveries'}><button style={Object.assign({},styles.navContent, styles.myRequests)} data-badge={this.props.acceptanceNotifications}  className="button  main-font notification" >My Deliveries</button></Link>   
                    : 
                    <Link to={'/myDeliveries'}><button style={Object.assign({},styles.navContent, styles.myRequests)} className="button  main-font" >My Deliveries</button></Link>  
                    }
                    
                    <button style={Object.assign({},styles.navContent, styles.logout)} className="button  main-font" onClick={()=>this.logout()}>Logout</button>
                    <img style={Object.assign({},styles.navContent, styles.profilePic)}/* className="profile-pic" */ src={this.props.user.profile_pic}></img>
                    {/* style={Object.assign({}, styles.input, styles.whatever)}            */}
                </div>
            </div>
        )
    }
    styles = () =>{
        return {
            profilePic: {
                width: "35px",
                height: "35px",
                borderRadius: "50%",
                boxShadow: "0px 0px 4px"
            },
            navContent: {
                marginLeft: "15px"

            },
            icon: {
                height: "40px",
                marginRight: "10px",
                marginBottom: "5px"
                // width: "40px"
            }
            ,
            gifted: {
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontSize: "45px",
                fontFamily:"'Amatic SC', cursive",
                fontWeight: "bold",
                color: "#163D57",
                textDecoration: "none"
            },
            nav:{
                display: "flex",
                justifyContent: "space-between",
                boxShadow: "0px 2px 2px #163D57",
                marginBottom: "2px",
                paddingRight: "20px",
                paddingLeft: "20px"
            },
            
            logout: {
                color: "#163D57",
                fontSize: "1.5rem",
                fontFamily:"'Roboto', sans-serif",
                backgroundColor: "Transparent"
            },
            myRequests: {
                color: "#163D57",
                fontSize: "1.5rem",
                fontfamily: "'Roboto', sans-serif",
                backgroundColor: "Transparent"
            },
            navbar: {
                height: "80px",
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end"               
            },
            giftedContainer :{
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
            }

        }
    }
}

function mapStateToProps(state){
        const {user, userRequest, messages} = state;
        const giftRequest = userRequest.giftRequest;
        const myGiftRequests = userRequest.myGiftRequests;
        const myDeliveries = userRequest.myDeliveries;
        const acceptanceNotifications = userRequest.acceptanceNotifications;
        const deliveryNotifications = userRequest.deliveryNotifications;
        return {user, giftRequest, myGiftRequests, myDeliveries, acceptanceNotifications, deliveryNotifications, messages}   
}

export default connect(mapStateToProps,{getUserInfo, getGiftRequests, getMyDeliveries, getMessageThreads, getMessages, addMessage})(Navbar);