import React, {Component} from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import {Redirect, Link} from 'react-router-dom';
import {getGiftRequests} from '../../redux/reducers/userRequest';
import PendingRequests from '../PendingRequests/PendingRequest';


class MyGiftRequests extends Component {
    
    componentWillMount = ()=>{
        this.props.getGiftRequests();
    }
    render (){
       console.log(this.props)
        return(
       <div>
           {this.props.userRequest.userRequest. myGiftRequests.map((request)=>{
                    const {id, gender, years_old, interests, favorite_colors, size, notes} = request
                    return (
                        <div key={id}>
                            <PendingRequests id={id} gender={gender} years_old={years_old} favorite_colors={favorite_colors}
                            size={size} notes={notes}/>
                        </div>
                    )
                      
                })}
       </div>
        )
    }
}
function mapStateToProps(state){
    const userRequest = state
    return{userRequest}
}
export default connect(mapStateToProps, {getGiftRequests})(MyGiftRequests)