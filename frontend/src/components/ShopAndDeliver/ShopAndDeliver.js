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
                    var {id, store_name, city, zip} = request
                    return (
                        <DeliveryRequest key={id} requestId={id} store_name={store_name} city={city} zip={zip}/>
                    )
                })}
            </div>
        )
    }
}
