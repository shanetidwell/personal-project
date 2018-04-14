import React, {Component} from 'react'
import {Link} from 'react-router-dom';
import axios from 'axios';
import AddItemForm from '../AddItemForm/AddItemForm';
import {connect} from 'react-redux'

export default class AddItem extends Component {
    constructor(props){
        super(props);
        this.state = {
            // description: "",
            // price: "", 
            // brand: "",
            // size: "",
            // color: "",
            // quantity: "",   
            // link: "", 
            storeName: "",
            storeCity: ""    
        }
    }
    componentWillMount = ()=>{
        axios.get(`/api/giftRequest/${this.props.match.params.gift_request_id}`).then(response=>{
            console.log("getting store name", response);
            this.setState({storeName: response.data[0].store_name, storeCity: response.data[0].city})
        })
    }
    submit = ()=>{
        const addItem = {...this.state};
        console.log(22222, addItem);
        axios.post(`/api/${this.props.match.params.gift_request_id}/item`, addItem).then(response=>{
        
            console.log("response", response.data[0]);
        }).catch(e=>console.log(e));
    }

    handleChange = (e) =>{
        this.setState({[e.target.name]: e.target.value})
    }
    render (){
        return(
            <div>
                <span>{this.state.storeName}</span>
                <span>{this.state.storeCity}</span>
                Add Item {this.props.match.params.gift_request_id}   
                <AddItemForm gift_request_id={this.props.match.params.gift_request_id}/>
                {/* <span>Item Description</span>
                <input type="text" value={this.state.description} name="description" onChange={this.handleChange}></input>
                <span>Price</span>
                <input type="number"value={this.state.price} name="price" onChange={this.handleChange}></input>
                <span>Brand</span>
                <input type="text" value={this.state.brand} name="brand" onChange={this.handleChange}></input>
                <span>Size</span>
                <input type="text" value={this.state.size} name="size" onChange={this.handleChange}></input>
                <span>Color</span>
                <input type="text" value={this.state.color} name="color" onChange={this.handleChange}></input>
                <span>Quanity</span>
                <input type="number" value={this.state.quantity} name="quantity" onChange={this.handleChange}></input>
                <span>Link</span>
                <input type="text" value={this.state.link} name="link" onChange={this.handleChange}></input>
                <button className="button" onClick={()=>this.submit()}>Submit</button> */}
            </div>
        )
    }
}
