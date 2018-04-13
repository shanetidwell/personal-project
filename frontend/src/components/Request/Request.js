import React, {Component} from 'react'
import {Link, Redirect} from 'react-router-dom';
import axios from 'axios';
import AddItemForm from '../AddItemForm/AddItemForm';
import {addStoreRequest} from '../../redux/reducers/userRequest';
import {connect} from 'react-redux';

class Request extends Component {
    constructor(props){
        super(props);
        this.state = {
            store_name: "",
            city: "",
            state:"",
            zip: "",
            added: false,
            storeRequestId: null,
            
        }
    }
    handleChange = (e) =>{
        this.setState({[e.target.name]: e.target.value})
    }
    
    addRequest = ()=>{
        const storeRequest = {...this.state};
        console.log("99999")
        console.log(this.props)
        this.props.addStoreRequest(storeRequest);
        // axios.post('/api/storeRequest', storeRequest).then(response=>{
        //     console.log("id", response.data[0].id);
        //     this.setState({added: true, storeRequestId: response.data[0].id})
        // }).catch(e=>console.log(e));
    }

    
    render (){
        // const {storeRequest} = this.props.userRequest.storeRequest[0]
        if (this.props.userRequest.storeRequestAdded){
            return <Redirect to={`/request/${this.props.userRequest.storeRequest[0].id}/addItem`}/>
        }
        return(
            <div>
                {/* {this.state.added === false?( */}
                <div>
                    <h1>Store Name</h1>
                    <input type="text" value={this.state.store_name} name = "store_name" onChange={this.handleChange}></input>
                    <h3>Store Location</h3>
                    <span>City</span>
                    <input type="text" value={this.state.city} name = "city" onChange={this.handleChange}></input>
                    <span>State</span>
                    <input type="text" value={this.state.state} name = "state" onChange={this.handleChange}></input>
                    <span>Zip</span>
                    <input type="number" value={this.state.zip} name = "zip" onChange={this.handleChange}></input>
                    <button className="button" onClick={()=>this.addRequest()}>Add Item</button>
                </div>
               
                {/* <button className="button" onClick={()=>this.addStoreRequest()}>Add Item</button> */}
                
            </div>
        )
    }
}
function mapStateToProps(state){
    const {userRequest} = state;
    return {userRequest}   
}

export default connect(mapStateToProps,{addStoreRequest})(Request);