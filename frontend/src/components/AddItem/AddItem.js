import React, {Component} from 'react'
import {Link} from 'react-router-dom';
import axios from 'axios';

export default class AddItem extends Component {
    constructor(props){
        super(props);
        this.state = {
            description: "",
            image_url: "",
            price: "", 
            quantity: "",   
            link: "",        
        }
    }
    submit = ()=>{
        const addItem = {...this.state};
        console.log(22222, addItem);
        axios.post(`/api/${this.props.match.params.store_request_id}/item`, addItem).then(response=>{
        
            console.log("response", response.data[0]);
            // this.setState({added: true, storeRequestId: response.data[0].id})
        }).catch(e=>console.log(e));
    }

    handleChange = (e) =>{
        this.setState({[e.target.name]: e.target.value})
    }
    render (){
        return(
            <div>
                Add Item {this.props.match.params.store_request_id}       
                <span>Item Description</span>
                <input type="text" value={this.state.description} name="description" onChange={this.handleChange}></input>
                <span>Image Url</span>
                <input type="text" value={this.state.image_url} name="image_url" onChange={this.handleChange}></input>
                <span>Price</span>
                <input type="number"value={this.state.price} name="price" onChange={this.handleChange}></input>
                <span>Quanity</span>
                <input type="number" value={this.state.quantity} name="quantity" onChange={this.handleChange}></input>
                <span>Link</span>
                <input type="text" value={this.state.link} name="link" onChange={this.handleChange}></input>
                <button className="button" onClick={()=>this.submit()}>Submit</button>
            </div>
        )
    }
}
