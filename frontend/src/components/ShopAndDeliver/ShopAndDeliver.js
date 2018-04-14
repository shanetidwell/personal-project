import React, {Component} from 'react'
import axios from 'axios';
import DeliveryRequest from '../DeliveryRequests/DeliveryRequests';

export default class ShopAndDeliver extends Component {
    constructor(props){
        super(props)
        this.state = {
            requests: []
        }
    }
    componentWillMount = ()=>{
        axios.get('/api/requests').then(response=>{
            console.log("requests", response);
            this.setState({requests: response.data})
        })
    }
    render (){
        return(
            <div>
                Shop and Deliver
                {this.state.requests.map((request)=>{
                    const {id, gender, years_old, interests, favorite_colors, size, notes} = request
                    return (
                        <DeliveryRequest key={id} requestId={id} gender={gender} age={years_old} interests={interests}
                         size={size} favoriteColors={favorite_colors} notes={notes}/>
                    )
                })}
            </div>
        )
    }
}
