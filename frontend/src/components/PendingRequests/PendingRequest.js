import React, {Component} from 'react'
import axios from 'axios';
import io from 'socket.io-client';
import {connect} from "react-redux";
import {acceptRequest, giftRequestFulfilled} from '../../redux/reducers/userRequest';
import {Link} from 'react-router-dom';
import StarRatings from 'react-star-ratings';
import './PendingRequests.css'

const socket = io("http://localhost:4000");


class PendingRequest extends Component {
    constructor(props){
        super(props)
         this.state = {
             users: [],
             showRequesters: true,
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
        // console.log("status," ,this.props.giftRequestInfo[0]);
        if (this.props.giftRequestInfo[0].status !== "being fulfilled"){
            axios.get(`/api/deliveryRequests/${this.props.id}`).then(response=>{
                // console.log("requesters", response.data);
                // console.log("id", this.props.id)
                this.setState({requesters: response.data});
            })   
        }
    }
    // static getDerivedStateFromProps (nextProps, prevState) {
    
    //     console.log('does this even run', nextProps)
    //     let returnedState = {}
    //     // console.log(1111,this.props.giftRequestInfo[0].status);
    //     if (nextProps.giftRequestInfo[0].status !== "being fulfilled"){
    //         console.log("get requesters");
    //         axios.get(`/api/deliveryRequests/${nextProps.id}`).then(response=>{
    //             // console.log("requesters", response.data);
    //             // console.log("id", this.props.id)
    //             return {...prevState, requesters: response.data};
    //         })   
    //     }  
    // }
    componentWillReceiveProps(nextProps){
        // console.log(1111,this.props.giftRequestInfo[0].status);
        if (nextProps.giftRequestInfo[0].status !== "being fulfilled"){
            // console.log("get requesters");
            axios.get(`/api/deliveryRequests/${this.props.id}`).then(response=>{
                // console.log("requesters", response.data);
                // console.log("id", this.props.id)
                this.setState({requesters: response.data});
            })   
        }        // socket.emit('room', {room: 5});
        // socket.emit('room', {room: this.props.giftRequest[0].id});
    }

   collapse = ()=>{
       this.setState({showRequesters:false});
   }
   
   acceptDeliveryRequest = (deliveryRequestId, requesterId, giftRequestId, delivery_amount)=>{
        console.log("delivery amount", delivery_amount);
       this.props.acceptRequest(deliveryRequestId, requesterId, giftRequestId, delivery_amount)
        .then(() => this.setState({requesters: []}))
    //    debugger
       socket.emit('room', {room: `delivery${deliveryRequestId}`});
       socket.emit('accept delivery request', {
           room: `delivery${deliveryRequestId}`,
           acceptRequest: true

       })
        
        // console.log("set state");
   }
   declineRequest = (deliveryRequestId)=>{
       axios.post(`/api/deliveryRequests/decline/${deliveryRequestId}`).then(response=>{
        console.log("declined", response)
        }).catch(e=>console.log(e));
   }

    render (){
        const {id/* , gender, years_old, interests, favorite_colors, size, notes, status */} = this.props
        // console.log("props",this.props)
        // console.log("state", this.state)
        const {gender, years_old, interests, favorite_colors, size, notes, status, money_amount} = this.props.giftRequestInfo[0]
        console.log("id", id);
        console.log("PROOOPS", this.props.giftRequestInfo[0]);
        // console.log(2222, this.props.giftRequestInfo[0]);
       
        const styles = this.styles()
        return(
            <div style={styles.requestContainer}>
                <div style={styles.requestColumns}key={id}>
                    <span style={styles.category}>Status: {status}</span>
                    <span style={styles.category}>Gender: {gender}</span>
                    <span style={styles.category}>Age: {years_old}</span>
                    <span style={styles.category}>Interests: {interests}</span>
                    <span style={styles.category}>Favorite Colors: {favorite_colors}</span>
                    <span style={styles.category}>Size: {size}</span>
                    <span style={styles.category}>Max Price of Gift: {money_amount}</span>
                    {this.state.showRequesters===false?
                        <button onClick={()=>this.setState({showRequesters: true})}>See Requests</button>
                    :
                        <div>
                        <button onClick={()=>this.collapse()}>Collapse</button>
                        {this.state.requesters.length===0 && this.props.giftRequestInfo[0].name !== null?
                        <div >
                            <h3>Being Fulfilled by</h3>
                            <div style={styles.fulfilledContainer} className="requester_info_container">
                                <Link to={`/userReviews/${this.props.giftRequestInfo[0].fulfiller_id}`}><span style={styles.fulfiller}>{this.props.giftRequestInfo[0].name} for {this.props.giftRequestInfo[0].delivery_amount}</span></Link>
                                <button style={styles.deliveredButton} onClick={()=>this.props.giftRequestFulfilled(id)}>Delivered</button>
                            </div>
                        </div>
                        :
                        <div>
                        <h3>Requesters</h3>
                        {this.state.requesters.map((requester, index)=>{
                            console.log("requester", requester);
                            let color = {
                                backgroundColor: requester.delivery_request_seen === false? "#eff2f7": "white"
                            }
                            return (
                                <div style={Object.assign({},styles.requesterContainer,color)} key={index}>
                                <hr style={styles.line}/>
                                {/* <div style={Object.assign({},styles.requestersContainer, color)} > */}
                                <div style={styles.requestersContainer} >
                                {/* {Object.assign({},styles.navContent, styles.profilePic)} */}
                                    <div className="requester_info_container" style={styles.requesterInfoContainer}>
                                        <Link to={`/userReviews/${requester.user_id}`}><span style={styles.requesterName}>{requester.name}</span></Link>
                                        <StarRatings 
                                            rating={requester.avg === null? 0: parseInt(requester.avg, 10)}
                                            starRatedColor="#163D57"
                                            numberOfStars={5}
                                            starDimension="15px"
                                            starSpacing = "2px"
                                        />
                                        {/* <span>Rating: {requester.stars===null? "No Ratings": `${requester.avg}/5`}</span> */}
                                    </div>
                                    <div style={styles.deliveryAmount}>
                                        <span>Delivery Amount</span>
                                        <span>{requester.delivery_amount}</span>
                                    </div>
                                    <div style={styles.buttonContainer}>
                                        <button style={styles.acceptButton} onClick={()=>this.acceptDeliveryRequest(requester.id, requester.user_id, requester.gift_request_id, requester.delivery_amount)}>Accept</button>
                                        <button style={styles.rejectButton} onClick={()=>this.declineRequest(requester.id)}>Decline</button>
                                    </div>
                                </div>
                                </div>
                            )
                        })}
                        </div>
                        }
                        </div>         
                    }
                </div>
            </div>
        )
    }
    styles = () => {
        const twoColumn = window.innerWidth < 800
        return {
            requestContainer: {
                display: 'flex',
                // alignItems: 'center',
                // justifyContent: 'center',
                marginTop: 20,
                padding: "10px",
                width: '40vw',
                borderRadius: 5,
                boxShadow: "0px 2px 7px #C9C9C9",
            },
            requestersContainer: {
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "38vw"
            },
            requesterContainer: {
                paddingLeft: "5px",
                paddingBottom: "5px",
                paddingRight: "5px",
                borderRadius: 4
            },
            fulfiller: {
                fontWeight: "bold",
                color: "black"
            },
            line: {
                display: "block",
                height: "1px",
                border: 0,
                borderTop: "1px solid #ccc",
                // margin: "1em 0",
                padding: 0,
            },
            requesterName: {
                color: "black"
            },
            requesterInfoContainer: {
                display: "flex",
                flexDirection: "column",
                marginBottom: "5px"
            },
            rejectButton: {
                marginLeft: "5px",
                border: "none",
                cursor: "pointer",
                borderRadius: "2px",
                // marginTop: "20px",
                backgroundColor: "Transparent",
                border: "1px solid #163D57",
                padding: "5px",
                // fontSize: "12px"
            },
            acceptButton: {
                border: "none",
                cursor: "pointer",
                borderRadius: "2px",
                // marginTop: "20px",
                backgroundColor: "#163D57",
                border: "1px solid #163D57",
                color: "white",
                padding: "5px",
                // fontSize: "12px"
            },
            deliveredButton:{
                border: "none",
                cursor: "pointer",
                borderRadius: "3px",
                backgroundColor: "#163D57",
                // border: "1px solid #163D57",
                color: "white",
                padding: "5px",

            },
            buttonContainer: {
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
            },
            fulfilledContainer: {
                display: "flex",
                justifyContent: "space-between",
                width: '35vw',
                
            },
            requestColumns: {
                padding: "10px",

                display: "flex",
                flexDirection: 'column',
                textAlign: "left"
                // justifyContent: "space-around"
            },
            deliveryAmount: {
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                fontSize: ".9rem"
            }
           
        }

    }
}

function mapStateToProps(state, ownProps){
    const {userRequest} = state
    const giftRequestInfo = userRequest.myGiftRequests.filter(request=>{
        return request.id === ownProps.id
    })
    return {giftRequestInfo, userRequest};

}
export default connect(mapStateToProps, {acceptRequest, giftRequestFulfilled})(PendingRequest)

