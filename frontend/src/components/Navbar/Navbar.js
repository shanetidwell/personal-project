import React, {Component} from 'react';
import {connect} from 'react-redux';
import './Navbar.css'
import axios from 'axios';
import socketIOClient from 'socket.io.client';
import {Redirect} from 'react-router-dom';
import {getUserInfo} from '../../redux/reducers/user';

class Navbar extends Component {
    constructor(props){
        super(props);
        this.state = {
            logout:false
        }
    }
    componentWillMount(){
        this.props.getUserInfo()
    }

    logout = ()=>{
        console.log("logging out")
        axios.get('/api/logout').then(response=>{
            this.setState({logout:true});
        }).catch((e)=>console.log(e));
    }
    
    render (){
        console.log(this.props)
        if (this.state.logout){
            return (<Redirect to={"/"}/>)
        }
        return(
            <div className="nav-bar blue-color main-font">
                <img className="profile-pic" src={this.props.user.profile_pic}></img>
                <button className="button my-requests blue-color main-font" onClick={()=>this.logout()}>My Gift Requests</button>                
                <button className="button logout blue-color main-font" onClick={()=>this.logout()}>Logout</button>
            </div>
        )
    }
}

function mapStateToProps(state){
        const {user} = state;
        return {user}   
}

export default connect(mapStateToProps,{getUserInfo})(Navbar);