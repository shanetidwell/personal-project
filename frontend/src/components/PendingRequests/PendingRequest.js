import React, {Component} from 'react'
import axios from 'axios';


export default class PendingRequest extends Component {
    constructor(props){
        super(props)
         this.state = {
             users: [],
             showRequesters: false,
             requesters: []


            
        }
    }
    // componentDidMount () {
    //     // console.log('this.props.ri', this.props.requestId)
    //     axios.get(`/api/items/${this.props.requestId}`).then(response=>{
    //         console.log(response);
    //         this.setState({items: response.data})
    //     })
    // }
    componentDidMount = () =>{
        axios.get(`/api/deliveryRequests/${this.props.id}`).then(response=>{
            console.log(response.data);
            this.setState({requesters: response.data});
        })   
    }

   collapse = ()=>{
       this.setState({showRequesters:false});
   }
   acceptRequest = (deliveryRequestId)=>{
       axios.post(`/api/deliveryRequests/accept/${deliveryRequestId}`).then(response=>{
           console.log("accept", response)
       }).catch(e=>console.log(e));
   }
   declineRequest = (deliveryRequestId)=>{
       axios.post(`/api/deliveryRequests/decline/${deliveryRequestId}`).then(response=>{
        console.log("declined", response)
        }).catch(e=>console.log(e));
   }

    render (){
        const {id, gender, years_old, interests, favorite_colors, size, notes} = this.props
        return(
            <div>
                <div key={id}>
                    <span>{id}</span>
                     <span>{gender}</span>
                    <span>{years_old}</span>
                    {this.state.showRequesters===false?
                        <button onClick={()=>this.setState({showRequesters: true})}>Expand</button>
                    :
                        <div>
                        <button onClick={()=>this.collapse()}>Collapse</button>
                        {this.state.requesters.map((requester, index)=>{
                            return (
                                <div key={index}>
                                    <span>{requester.name}</span>
                                    <span>{requester.stars}</span>
                                    <button onClick={()=>this.acceptRequest(requester.id)}>Accept</button>
                                    <button onClick={()=>this.declineRequest(requester.id)}>Decline</button>
                                </div>
                            )
                        })}
                        </div>
                        
                    }
                </div>
                
       
                {/* <span>{requestId}</span>
                <span>{gender}</span>
                <span>{age}</span>
                {this.state.showItems &&
                <div>
                    <p>{interests}</p>
                    <span>{favoriteColors}</span>
                    <span>{size}</span>
                    <p>{notes}</p>
                </div>
                }
                
                {this.state.showItems===false?
                <button className="button" onClick={()=>this.setState({showItems: true})}>Expand</button>
                :
                <button className = "button" onClick={()=>this.collapse()}>Collapse</button>
                }
                <button className = "button" onClick={()=>this.makeDelivery()}>Make Delivery</button>
                {/* Shop and Deliver
                {this.state.requests.map((request)=>{
                    return (
                        <div key={request.id}>
                            <span>{request.store_name}</span>
                            <span>{request.city}</span>
                            <span>{request.zip}</span>
                        </div>
                    )
                })} */} 
            </div>
        )
    }
}
