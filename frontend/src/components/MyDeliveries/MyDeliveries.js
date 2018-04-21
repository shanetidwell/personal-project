import React, {Component} from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import {Redirect, Link} from 'react-router-dom';
import {getMyDeliveries} from '../../redux/reducers/userRequest';


class MyDeliveries extends Component {
    
    componentWillMount = ()=>{
         this.props.getMyDeliveries();
    }
    render (){
       console.log(this.props)
        return(
       <div>
           Deiveries
           {this.props.myDeliveries.map((delivery, index)=>{
               return(
                   <div key={index}>
                    <span>{delivery.status}</span>
                   </div>
               )
           })}
           {/* {this.props.userRequest.userRequest. myGiftRequests.map((request)=>{
                    const {id, gender, years_old, interests, favorite_colors, size, notes} = request
                    return (
                       <div key={id}>
                           <span>{id}</span>
                           <span>{gender}</span>
                           <span>{years_old}</span>
                        </div>
                    )
                })} */}
       </div>
        )
    }
}
function mapStateToProps(state){
    const {userRequest} = state
    const {myDeliveries} = userRequest
    return{myDeliveries}
}
export default connect(mapStateToProps, {getMyDeliveries})(MyDeliveries)