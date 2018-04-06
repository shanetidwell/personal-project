import React, {Component} from 'react';
import axios from 'axios';
import {Redirect} from 'react-router-dom';






export default class Auth extends Component {
    constructor(props){
        super(props)
        this.state = {
            username: "",
            password: "",
            email:"",
            login: false
        }
    }
    // handleChangeUsername=(value)=>{
    //     this.setState({username: value});
    // }
    // handleChangePassword = (value) => {
    //     this.setState({password: value})
    // }
    // login = ()=>{
    //     const user = {username:this.state.username, password: this.state.password}
    //     axios.post(`/api/auth/login`, user).then(user=>{
            
    //         const {username, profile_pic} = user.data[0];
    //         this.props.getUserInfo(username, profile_pic);
    //         console.log("user",user);
    //         this.setState({login: true});
    //     }).catch((e)=>console.log(e));
    // }
    // register = ()=>{
    //     const user = {username:this.state.username, password: this.state.password}
    //     console.log("register");
    //     axios.post(`/api/auth/register`, user).then(user=>{
    //         console.log(user)
    //         const {username, profile_pic} = user.data[0];
    //         this.props.getUserInfo(username, profile_pic);
    //         this.setState({login: true});
    //     }).catch((e)=>console.log(e));
    // }
    render(){
        // if (this.state.login){
        //     return <Redirect to={"/dashboard"}/>;
        // }
        return (
            <div>
                Login
            </div>
            
        )
    }
   
}
