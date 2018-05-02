import React, {Component} from 'react'
import axios from 'axios';
import io from 'socket.io-client';
import {connect} from 'react-redux';
import {getMyDeliveries} from '../../redux/reducers/userRequest';
const socket = io("http://localhost:4000");


class DeliveryRequest extends Component {
    constructor(props){
        super(props)
         this.state = {
             items: [],
             showItems: false,

            
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
        axios.post(`/api/giftRequest/${this.props.requestId}`).then(response=>{
            
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
   collapse = ()=>{
       this.setState({showItems:false});
   }

    render (){
        const styles = this.styles();
        console.log("rendered")
        const {requestId, gender, age, interests, size, favoriteColors, notes} = this.props;
        return(
            <div style={styles.requestColumns}>
                {/* <span>{requestId}</span> */}
                <span style={styles.category}>Gender: {gender}</span>
                <span style={styles.category}>Age: {age}</span>
                <span style={styles.category}>Interests: {interests}</span>
                <span style={styles.category}>Favorite Colors: {favoriteColors}</span>
                <span style={styles.category}>Size: {size}</span>
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
                <button style={styles.deliveryButton}className = "button" onClick={()=>this.makeDelivery()}>Make Delivery</button>
               
            </div>
        )
    }
    styles=()=>{
        const twoColumn = window.innerWidth < 800
        return {
            category: {
                marginBottom: "7px"
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
export default connect(null, {getMyDeliveries})(DeliveryRequest)
