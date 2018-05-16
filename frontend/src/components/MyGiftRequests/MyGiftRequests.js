import React, {Component} from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import {Redirect, Link} from 'react-router-dom';
import {getGiftRequests, clearDeliveryNotifications} from '../../redux/reducers/userRequest';
import PendingRequests from '../PendingRequests/PendingRequest';


class MyGiftRequests extends Component {
    
    componentWillMount = ()=>{
        this.props.getGiftRequests();
        
    }
    componentWillUnmount=()=>{
        this.props.clearDeliveryNotifications();
    }
    render (){
        const styles = this.styles();
    //    console.log("myGift Requests", this.props)
        return(
       <div style={styles.requestsContainer}>
            <div style={styles.header}>My Gift Requests</div>
           {this.props.userRequest.userRequest.myGiftRequests.map((request)=>{
                    const {id, gender, years_old, interests, favorite_colors, size, notes, status} = request
                    return (
                        <div key={id}>
                            <PendingRequests id={id}/*  gender={gender} years_old={years_old} interests={interests} favorite_colors={favorite_colors}
                            size={size} notes={notes} status={status} *//>
                        </div>
                    )
                      
                })}
       </div>
        )
    }
    styles = ()=>{
        return {
            requestsContainer: {
                display: 'flex',
                flexDirection: "column",
                alignItems: "center"


            },
            header: {
                backgroundColor: "#163D57",
                width: "100%",
                height: "40px",
                marginBottom: "15px",
                display: "flex",
                alignItems: "center",
                // paddingLeft: wideView ? (window.innerWidth-600)/2: "30%",
                paddingLeft: "30%",
                // color: isMobile ? 'red' : 'black',
                color: "white",
                boxShadow: "0px 3px 5px #C9C9C9",
            },
        }

    }
}
function mapStateToProps(state){
    const userRequest = state
    return{userRequest}
}
export default connect(mapStateToProps, {getGiftRequests, clearDeliveryNotifications})(MyGiftRequests)