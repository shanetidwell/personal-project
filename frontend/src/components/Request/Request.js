import React, {Component} from 'react'
import {Link, Redirect} from 'react-router-dom';
import axios from 'axios';

export default class Request extends Component {
    constructor(props){
        super(props);
        this.state = {
            store_name: "",
            city: "",
            zip: "",
            added: false,
            storeRequestId: null
        }
    }
    handleChange = (e) =>{
        this.setState({[e.target.name]: e.target.value})
    }
    
    addStoreRequest = ()=>{
        const storeRequest = {...this.state};
        // console.log(11111, storeRequest);
        axios.post('/api/storeRequest', storeRequest).then(response=>{
            console.log("id", response.data[0].id);
            this.setState({added: true, storeRequestId: response.data[0].id})
        }).catch(e=>console.log(e));
    }

    
    render (){
        if (this.state.added){
            return <Redirect to={`/request/${this.state.storeRequestId}/addItem`}/>
        }
        return(
            <div>
                Request
                <h1>Store Name</h1>
                <input type="text" value={this.state.store_name} name = "store_name" onChange={this.handleChange}></input>
                <h3>Store Location</h3>
                <span>City</span>
                <input type="text" value={this.state.city} name = "city" onChange={this.handleChange}></input>
                <span>Zip</span>
                <input type="number" value={this.state.zip} name = "zip" onChange={this.handleChange}></input>
                {/* <Link to={'/request/addItem'} ><button className="button" onClick={()=>this.addStoreRequest()}>Add Item</button></Link> */}
                <button className="button" onClick={()=>this.addStoreRequest()}>Add Item</button>
             
                {/* <button className="button" onClick={()=>this.nextClick()}>Next</button> */}
            </div>
        )
    }
}
