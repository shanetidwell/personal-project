import React, {Component} from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import {Redirect, Link} from 'react-router-dom';
import {getMyDeliveries, clearAcceptanceNotifications} from '../../redux/reducers/userRequest';


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
           {this.props.myDeliveries.map((delivery, index)=>{
               
               console.log(delivery);
               const {status, gender, years_old, favorite_colors, size, interests, notes, acceptance_seen} = delivery;
               let color = {
                backgroundColor: acceptance_seen === false? "#f4f7f9": "white"
                }
               return(
                   <div style={Object.assign({},styles.deliveryColumns,color)} key={index}>
                    <span style={styles.category}>Status: {status}</span>
                    <span style={styles.category}>Gender: {gender}</span>
                    <span style={styles.category}>Age: {years_old}</span>
                    <span style={styles.category}>Interests: {interests}</span>
                    <span style={styles.category}>Favorite Colors: {favorite_colors}</span>
                    <span style={styles.category}>Size: {size}</span>
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