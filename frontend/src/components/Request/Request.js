import React, {Component} from 'react'
import {Link, Redirect} from 'react-router-dom';
import axios from 'axios';
import AddItemForm from '../AddItemForm/AddItemForm';
import {addGiftRequest, getGiftRequests} from '../../redux/reducers/userRequest';

import {addAddress} from '../../redux/reducers/user';
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
            street: "",
            city: "",
            state: "",
            zip: "",
            maxMoney: "",
            added: false,
            giftRequestId: null,
            correctAddress: true
            
        }
    }
    componentWillMount = () =>{
        
    }
    
    handleChange = (e) =>{
        this.setState({[e.target.name]: e.target.value})
    }
    
    addRequest = ()=>{
        const giftRequest = {...this.state};
        // console.log(this.props)
        this.props.addGiftRequest(giftRequest);
    }
    
    submitAddress = ()=>{
        if(this.state.street === "" || this.state.city === "" || this.state.state ==="" || this.state.zip ===""){
            this.setState({correctAddress:false})
        } else {
            this.setState({correctAddress: true})
            const {street, city, state,zip} = this.state
            this.props.addAddress({street, city, state,zip});
        }
    }

    
    render (){
        const styles = this.styles()
        if (this.props.userRequest.giftRequestAdded){
            this.props.getGiftRequests();
            console.log(222222)
            return <Redirect to={`/home`}/>
            // return <Redirect to={`/request/${this.props.userRequest.giftRequest[0].id}/addItem`}/>
        }
        
        const {user} = this.props;
        //console.log(user);
        return(
            
            <div style={styles.page}>
                {/* {this.state.added === false?( */}
                <div>
                    {user.street === null?
                    <div style={styles.container}>
                        <h1>Enter Your Address</h1>
                        {this.state.correctAddress === false && <div>Please fill out all of the fields</div>}

                        <div style={styles.formItem}>
                            <span style={styles.label}>Street</span>
                            <input style={styles.input} type="text" value={this.state.street} name = "street" onChange={this.handleChange}></input>
                        </div>
                        <div style={styles.formItem}>
                            <span style={styles.label}>City</span>
                            <input style={styles.input} type="text" value={this.state.city} name = "city" onChange={this.handleChange}></input>
                        </div>
                        <div style={styles.formItem}>
                            <span style={styles.label}>State</span>
                            <input style={styles.input} type="text" value={this.state.state} name = "state" onChange={this.handleChange}></input>
                        </div>
                        <div style={styles.formItem}>
                            <span style={styles.label}>Zip</span>
                            <input style={styles.input} type="number" value={this.state.zip} name = "zip" onChange={this.handleChange}></input>
                        </div>
                        <button style={styles.submitButton} className="button" onClick={()=>this.submitAddress()}>Submit</button>
                     </div>
                    :
                    <div style={styles.container}>
                        <h3>Tell us about your friend</h3>
                        <div style={styles.formItem}>
                            <span style={styles.label}>Gender</span>
                            <input style={styles.input} type="text" value={this.state.gender} name = "gender" onChange={this.handleChange}></input>
                        </div>
                        <div style={styles.formItem}>
                            <span style={styles.label}>Age</span>
                            <input style={styles.input} type="number" value={this.state.age} name = "age" onChange={this.handleChange}></input>
                        </div>
                        <div style={styles.formItem}>
                            <span style={styles.label}>Interests</span>
                            <input style={styles.input} type="text" value={this.state.interests} name = "interests" onChange={this.handleChange}></input>
                        </div>
                        <div style={styles.formItem}>
                            <span style={styles.label}>Size</span>
                            <input style={styles.input} type="text" value={this.state.size} name = "size" onChange={this.handleChange}></input>
                            {/* <input style={Object.assign({}, styles.input, styles.whatever)} type="text" value={this.state.size} name = "size" onChange={this.handleChange}></input> */}
                        </div>
                        
                        <div style={styles.formItem}>
                            <span style={styles.label}>Favorite Colors</span>
                            <input style={styles.input} type="text" value={this.state.favoriteColors} name = "favoriteColors" onChange={this.handleChange}></input>
                        </div>
                        <div style={styles.formItem}>
                            <span style={styles.label}>Max Price of Gift</span>
                            <input style={styles.input} type="number" value={this.state.maxMoney} placeholder= "$" name = "maxMoney" onChange={this.handleChange}></input>
                        </div>
                        <div style={styles.formItem}>
                            <span style={styles.label}>Additional Info</span>
                            <textarea style={styles.additionInfo} type="text" value={this.state.notes} name = "notes" onChange={this.handleChange}></textarea>
                        </div>
                        <button style={styles.submitButton}className="button" onClick={()=>this.addRequest()}>Submit</button>
                    </div>
                    }
                </div>
                
            </div>
        )
    }

    styles = () => {
        const isMobile = window.innerWidth < 800
        return {
            container: {
                display: 'flex',
                flexDirection: 'column',
                marginTop: 30,
                alignItems: 'center',
                // border: "2px solid #DBDBDB",
                width: '40vw',
                borderRadius: 5,
                boxShadow: "0px 3px 15px #C9C9C9",
                // boxShadow: "0px 3px 15px #163D57",
                padding: 15
            },
            label: {
                paddingLeft: '10px',
                // color: isMobile ? 'red' : 'black',
                color: "#163D57",
                // textAlign: 'right',
                // marginLeft: 'auto'
            },
            formItem: {
                display: 'flex',
                flexDirection: 'column',
                width: '60%',
                alignItems: "left",
                // justifyContent: 'space-between',
                marginBottom: 10
            },
            input: {
                // marginLeft: 'auto',
                outline: "none",
                border: "none",
                // borderBottom: "1px solid #163D57",
                borderBottom: "1px solid #DBDBDB",
                width: '100%',
                margin: 5
            },
            additionInfo: {
                // outline: "none",
                // border: "none",
                // borderBottom: "1px solid #DBDBDB",
                width: '100%',
                height: 70,
                margin: 5

            },
            page: {
                display: 'flex',
                flexDirection: 'column',
                justifyContent: "center",
                alignItems: "center"
            },
            submitButton: {
                border: "none",
                cursor: "pointer",
                borderRadius: "2px",
                marginTop: "20px",
                backgroundColor: "#163D57",
                border: "1px solid #163D57",
                color: "white",
                padding: "5px",
                // fontSize: "12px"

            }
        }
    }
}
function mapStateToProps(state){
    const {userRequest, user} = state;
    return {userRequest, user}   
}

export default connect(mapStateToProps,{addGiftRequest, addAddress, getGiftRequests})(Request);