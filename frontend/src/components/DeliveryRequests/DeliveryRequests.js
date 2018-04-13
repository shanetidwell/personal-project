import React, {Component} from 'react'
import axios from 'axios';

export default class ShopAndDeliver extends Component {
    constructor(props){
        super(props)
         this.state = {
             items: [],
             showItems: false,

            
        }
    }
    componentDidMount () {
        // console.log('this.props.ri', this.props.requestId)
        axios.get(`/api/items/${this.props.requestId}`).then(response=>{
            console.log(response);
            this.setState({items: response.data})
        })
    }
    makeDelivery= ()=>{
        axios.post(`/api/storeRequest/${this.props.requestId}/?status=requested`).then(response=>{
            console.log("made delivery")
            console.log(response);
        })
    }
   collapse = ()=>{
       this.setState({showItems:false});
   }

    render (){
        console.log("rendered")
        const {requestId, store_name, city, zip} = this.props;
        return(
            <div>
                <span>{requestId}</span>
                <span>{store_name}</span>
                <span>{city}</span>
                <span>{zip}</span>
                {this.state.showItems &&
                this.state.items.map(item=>{
                    const{id, description, link, price, quantity} = item
                    return(
                        <div key={id}>
                            <span>{description}</span>
                            <span>{price}</span>
                            <span>{quantity}</span>
                            <span>{link}</span> 
                        </div>
                    )
                })}
                
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
