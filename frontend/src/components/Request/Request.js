import React, {Component} from 'react'
import {Link, Redirect} from 'react-router-dom';
import axios from 'axios';
import AddItemForm from '../AddItemForm/AddItemForm';
import {addGiftRequest} from '../../redux/reducers/userRequest';
import {connect} from 'react-redux';

class Request extends Component {
    constructor(props){
        super(props);
        this.state = {
            gender: "",
            age: "",
            interests:"",
            size: "",
            favoriteColors: "",
            notes: "",
            added: false,
            giftRequestId: null,
            
        }
    }
    handleChange = (e) =>{
        this.setState({[e.target.name]: e.target.value})
    }
    
    addRequest = ()=>{
        const giftRequest = {...this.state};
        console.log(this.props)
        this.props.addGiftRequest(giftRequest);
    }

    
    render (){
        if (this.props.userRequest.giftRequestAdded){
            return <Redirect to={`/home`}/>
            // return <Redirect to={`/request/${this.props.userRequest.giftRequest[0].id}/addItem`}/>
        }
        return(
            <div>
                {/* {this.state.added === false?( */}
                <div>
                    <span>Gender</span>
                    <input type="text" value={this.state.gender} name = "gender" onChange={this.handleChange}></input>
                    <span>Age</span>
                    <input type="number" value={this.state.age} name = "age" onChange={this.handleChange}></input>
                    <span>Interests</span>
                    <input type="text" value={this.state.interests} name = "interests" onChange={this.handleChange}></input>
                    <span>Size</span>
                    <input type="text" value={this.state.size} name = "size" onChange={this.handleChange}></input>
                    <span>Favorite Colors</span>
                    <input type="text" value={this.state.favoriteColors} name = "favoriteColors" onChange={this.handleChange}></input>
                    <span>Any Additionaly Information</span>
                    <input type="text" value={this.state.notes} name = "notes" onChange={this.handleChange}></input>
                    <button className="button" onClick={()=>this.addRequest()}>Add Item</button>
                </div>
                
            </div>
        )
    }
}
function mapStateToProps(state){
    const {userRequest} = state;
    return {userRequest}   
}

export default connect(mapStateToProps,{addGiftRequest})(Request);