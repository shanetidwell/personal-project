import React, {Component} from 'react';
import {connect} from 'react-redux';
import './Navbar.css'
import axios from 'axios';
import io from 'socket.io-client';
import {Redirect, Link} from 'react-router-dom';
import {getUserInfo} from '../../redux/reducers/user';

const socket = io("http://localhost:4000");

class Navbar extends Component {
    constructor(props){
        super(props);
        this.state = {
            logout:false,
            requestMade: false
        }
        socket.on('receive request', (payload)=>{
            console.log('received reeqest navbar')
            this.updateCodeFromSockets(payload);
        })
        // this.socket = io("localhost:4000")
    }
    updateCodeFromSockets(payload){
        console.log("upadatecodefrom sockets", payload);
        this.setState({requestMade: payload.requestMade})
    }
    componentWillMount(){
        this.props.getUserInfo()
    }
    componentDidMount(){
        // if(this.props.giftRequest[0].id)
        socket.emit('room', {room: 5});
    }
    componentWillReceiveProps(nextProps){
        socket.emit('room', {room: 5});
        // socket.emit('room', {room: this.props.giftRequest[0].id});
    }


    logout = ()=>{
        console.log("logging out")
        axios.get('/api/logout').then(response=>{
            this.setState({logout:true});
        }).catch((e)=>console.log(e));
    }
    
    render (){
        const styles = this.styles();
        console.log("nav Props", this.props)
        if (this.state.logout){
            return (<Redirect to={"/"}/>)
        }
        return(
            <div style={styles.nav}>
                <div style={styles.gifted}>
                    Gifted.
                </div>
                <div style={styles.navbar} className="main-font">
                    <Link to={'/myGiftRequests'}><button style={Object.assign({},styles.navContent, styles.myRequests)} className="button main-font" >My Gift Requests</button></Link> 
                    <Link to={'/myDeliveries'}><button style={Object.assign({},styles.navContent, styles.myRequests)} className="button  main-font" >My Deliveries</button></Link>   
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
            gifted: {
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontSize: "45px",
                fontFamily:"'Amatic SC', cursive",
                fontWeight: "bold"
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
            }

        }
    }
}

function mapStateToProps(state){
        const {user, userRequest} = state;
        const giftRequest = userRequest.giftRequest
        return {user, giftRequest}   
}

export default connect(mapStateToProps,{getUserInfo})(Navbar);