import React, {Component} from 'react'
import axios from 'axios';
import io from 'socket.io-client';
import {connect} from 'react-redux';
import {getMyDeliveries} from '../../redux/reducers/userRequest';
import {Link} from 'react-router-dom';
const socket = io("http://localhost:4000");


class DeliveryRequest extends Component {
    constructor(props){
        super(props)
         this.state = {
             items: [],
             showItems: false,
             amount: ""

            
        }
    }
    // componentDidMount () {
    //     // console.log('this.props.ri', this.props.requestId)
    //     axios.get(`/api/items/${this.props.requestId}`).then(response=>{
    //         console.log(response);
    //         this.setState({items: response.data})
    //     })
    // }
    makeDelivery= ()=>{
        console.log('makingDelivery');
        const stuffToSend = {
            delivery_amount: this.state.amount
        };
        axios.post(`/api/giftRequest/${this.props.requestId}`,{stuffToSend}).then(response=>{
            
            console.log("made delivery")
            this.props.getMyDeliveries();
            console.log("checking boolean", response);
            // 
            // socket.emit('room', {room: 5});
            // socket.emit('make request', {
            //     room: 5,
            //     requestMade: true
            // })
            // debugger
            socket.emit('room', {room: `gift${this.props.requestId}`});
            socket.emit('make request', {
                room: `gift${this.props.requestId}`,
                requestMade: true
            })
        })
    }
    handleChange = (e) =>{
        this.setState({[e.target.name]: e.target.value})
    }
   collapse = ()=>{
       this.setState({showItems:false});
   }

    render (){
        const styles = this.styles();
        console.log("rendered")
        const {requestId, gender, age, interests, size, favoriteColors, notes, name, user_id, money_amount} = this.props;
        return(
            <div style={styles.requestColumns}>
                {/* <span>{requestId}</span> */}
                <div style={styles.flexRow}>
                    <span>Requested by</span>
                    <Link to={`/userReviews/${user_id}`}>
                    <span style={styles.requester}>{name}</span>
                    </Link>
                </div>
                <span style={styles.category}>Gender: {gender}</span>
                <span style={styles.category}>Age: {age}</span>
                <span style={styles.category}>Interests: {interests}</span>
                <span style={styles.category}>Favorite Colors: {favoriteColors}</span>
                <span style={styles.category}>Size: {size}</span>
                <span style={styles.category}>Max Price of Gift: {money_amount}</span>
                <p>Notes: {notes}</p>
                {this.state.showItems &&
                <div>
                    <p>{interests}</p>
                    <span>{favoriteColors}</span>
                    <span>{size}</span>
                    <p>{notes}</p>
                </div>
                }
                
                {/* {this.state.showItems===false?
                <button className="button" onClick={()=>this.setState({showItems: true})}>Expand</button>
                :
                <button className = "button" onClick={()=>this.collapse()}>Collapse</button>
                } */}
                <div style={styles.makeDelivery}>
                    <div style={styles.yourPrice}>
                        <span>Your Price</span>
                        <input style={styles.input} type="number" value={this.state.amount} placeholder= "$" name = "amount" onChange={this.handleChange}></input>
                    </div>
                    <button style={styles.deliveryButton}className = "button" onClick={()=>this.makeDelivery()}>Make Delivery</button>
                </div>
            </div>
        )
    }
    styles=()=>{
        const twoColumn = window.innerWidth < 800
        return {
            category: {
                marginBottom: "7px"
            },
            requester: {
                fontWeight: "bold",
                marginLeft: "5px",
                color: "black"
                // marginBottom: "10px"
            },
            flexRow: {
                display: "flex",
                marginBottom: "10px"
            },
            requestColumns: {
                padding: "10px",
                display: "flex",
                flexDirection: 'column',
                textAlign: "left",
                marginTop: 30,
                width: twoColumn ? '45vw': '27vw',
                borderRadius: 5,
                boxShadow: "0px 2px 7px #C9C9C9",
                // justifyContent: "space-around"
            },
            deliveryButton: {
                border: "none",
                cursor: "pointer",
                borderRadius: "3px",
                backgroundColor: "#163D57",
                border: "1px solid #163D57",
                color: "white",
                padding: "5px",
                // fontSize: "12px"

            },
            makeDelivery: {
                display: "flex",
                alignItems: "center",
                // justifyContent: "space-around"
            },
            input: {
                width: "60px",
                height: "20px",
                marginLeft: "5px",
            },
            yourPrice: {
                marginRight: "5px",
                width: "50%",
                fontWeight: "bold"
            }

        }
    }
}
export default connect(null, {getMyDeliveries})(DeliveryRequest)
