import React, {Component} from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import {Redirect, Link} from 'react-router-dom';
import {getMyDeliveries, clearAcceptanceNotifications} from '../../redux/reducers/userRequest';
import './MyDeliveries.css';


class MyDeliveries extends Component {
    
    componentWillMount = ()=>{
         this.props.getMyDeliveries();
    }
    componentWillUnmount=()=>{
        this.props.clearAcceptanceNotifications();
    }
    render (){
       console.log(this.props)
       const styles = this.styles()
        return(
       <div style={styles.deliveryContainer}>
        <div style={styles.header}>My Deliveries</div>
           {this.props.myDeliveries.map((delivery, index)=>{
               
               console.log(delivery);
               const {status, gender, years_old, favorite_colors, size, interests, notes, acceptance_seen, name, user_id, money_amount} = delivery;
               let color = {
                backgroundColor: acceptance_seen === false? "#f4f7f9": "white"
                }
               return(
                   <div className="my-delivery"style={Object.assign({},styles.deliveryColumns,color)} key={index}>
                    <Link to={`/userReviews/${user_id}`}><span style={Object.assign({},styles.category, styles.link)}>{name}</span></Link>                   
                    <span style={styles.category}>Status: {status}</span>
                    <span style={styles.category}>Gender: {gender}</span>
                    <span style={styles.category}>Age: {years_old}</span>
                    <span style={styles.category}>Interests: {interests}</span>
                    <span style={styles.category}>Favorite Colors: {favorite_colors}</span>
                    <span style={styles.category}>Size: {size}</span>
                    <span style={styles.category}>Max Price of Gift: {money_amount}</span>
                    <span style={styles.category}>Notes: {notes}</span>
                   </div>
               )
           })}
       </div>
        )
    }
    styles = () =>{
        return {
            category: {
                marginBottom: "7px"
            },
            link: {
                color: 'black',
                fontWeight: "bold",
                marginBottom: "7px"                
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
            deliveryColumns: {
                padding: "10px",
                display: "flex",
                flexDirection: 'column',
                textAlign: "left",
                marginTop: 20,
                width: '40vw',
                borderRadius: 5,
                boxShadow: "0px 2px 7px #C9C9C9",
            },
            deliveryContainer: {
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center"
            }
        }
    }
}
function mapStateToProps(state){
    const {userRequest} = state
    const {myDeliveries} = userRequest
    return{myDeliveries}
}
export default connect(mapStateToProps, {getMyDeliveries, clearAcceptanceNotifications})(MyDeliveries)