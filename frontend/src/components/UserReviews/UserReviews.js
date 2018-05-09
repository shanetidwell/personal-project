import React, {Component} from 'react'
import axios from 'axios';
import StarRatings from 'react-star-ratings';
import io from 'socket.io-client';
import {connect} from 'react-redux'
import {Link, Redirect} from 'react-router-dom';
import {addRecipient, updateCurrentThread} from '../../redux/reducers/messages';


const socket = io("http://localhost:4000");

 class UserReviews extends Component {
    constructor(props){
        super(props)
        this.state = {
            reviews: [],
            addedReview: "",
            rating: 0,
            goToMessages: false,
            name: null
        }

    }
    componentDidMount(){
        this.getName(this.props.match.params.id);
        this.getReviews(this.props.match.params.id);
    }
    componentWillReceiveProps(nextProps){
        if (nextProps.match.params.id !== this.props.match.params.id ){
            this.getReviews(nextProps.match.params.id);  
            this.getName(nextProps.match.params.id);         
        }        
        
    }
    getReviews=(id)=>{
        axios.get(`/api/userReviews/${id}`).then(response=>{
            console.log("reviews", response);
            this.setState({reviews: response.data})
        })
    }
    getName = (id) =>{
        axios.get(`/api/getUsername/${id}`).then(response=>{
            console.log("name",response);
            this.setState({name: response.data[0].name});
        })
    }
    
    handleReviewChange = (e)=>{
        this.setState({addedReview: e.target.value});
    }
    addReview = () =>{
        axios.post(`/api/userReviews/addReview/${this.props.match.params.id}`, {review: this.state.addedReview, stars: this.state.rating}).then(response=>{
            this.setState({reviews: response.data, addedReview: ""})
        });
    }
   
        
    changeRating = (newRating)=>{
        this.setState({rating: newRating})
    }
    addMessageRecipient = ()=>{
        const recipientId = this.props.match.params.id
        this.props.addRecipient(parseInt(recipientId,10))
        console.log("ID", recipientId )
        if (recipientId !== null){
            axios.get(`/api/messages/${recipientId}`).then(response=>{
                console.log("messages response", response);
                if(response.data.status==="new_message_thread"){
                    this.props.updateCurrentThread(response.data.id);
                    console.log("new messaage thread id", response.data.id)
                    socket.emit('new message thread', {
                        threadId: response.data.id,
                        recipientId: parseInt(this.props.messages.messageRecipientId,10),
                        senderId: this.props.user.id

                    })
                }else{
                    this.props.updateCurrentThread(response.data.id);
                    console.log("thread id", response.data.id)
                }
                console.log("3985723");
                this.setState({goToMessages:true})
            })
            
        } 
        

    }
    
    render(){
        if(this.state.goToMessages){
            return <Redirect to={`/messages/${this.props.messages.currentMessageThread}`}/>
        }
        // if (this.props.userRequest.giftRequestAdded){
        //     this.props.getGiftRequests();
        //     console.log(222222)
        //     return <Redirect to={`/home`}/>
        //     // return <Redirect to={`/request/${this.props.userRequest.giftRequest[0].id}/addItem`}/>
        // }
        
        console.log(this.props)
        const styles = this.styles();
        return (
            <div style = {styles.container}>
                <div style={styles.header}>
                    <h3>{this.state.name}</h3>
                    <div style={styles.iconContainer}onClick={()=>this.addMessageRecipient()}>
                        <i style={styles.messageIcon}class="far fa-comment-alt"></i>
                        <span style={styles.messageSpan}>Message</span>
                    </div>
                </div>
                
                <div style={styles.submitReviewContainer}>
                    <div style={styles.leaveReview}>Leave a Review</div>
                    <div style={styles.starRatingContainer}>
                        <StarRatings style={styles.star}
                            rating={this.state.rating}
                            changeRating={this.changeRating}    
                            numberOfStars = {5}                
                        />
                    </div>
                
                    <textarea style={styles.textarea} placeholder={'Write your review here'}type="text" value={this.state.addedReview} onChange={this.handleReviewChange}></textarea>
                    <div style={styles.buttonContainer}>
                        <button style={styles.submitButton} className={"button"} onClick={()=>this.addReview()}>Submit</button>
                    </div>
                </div>
                {this.state.reviews.map((review, index)=>{
                    return (
                        <div style={styles.reviewContainer} key={review.id}>
                            <div style={styles.userContainer}>
                                
                                <i style={{fontSize: "30px"}}class="fas fa-user-circle"></i>
                                <Link to={`/userReviews/${review.reviewer_id}`}>
                                    <span style={styles.reviewer}>
                                        {`${review.name}`}
                                    </span>
                                </Link>
                            </div>
                            <StarRatings 
                                rating={review.stars === null? 0: review.stars}
                                starRatedColor="#163D57"
                                numberOfStars={5}
                                starDimension="15px"
                                starSpacing = "2px"
                            />
                            <span>
                                {`${review.date_recorded === null? 0: review.date_recorded.substring(0,12)}`}
                             </span>
                            <p>
                            {review.review}
                            </p>
                            
                            
                        </div>
                        
                    )
                })}

            </div>
        )
    }
    styles = ()=>{
        return {
            submitReviewContainer: {
                display: "flex",
                flexDirection: "Column",
                alignItems: "Center",
                width: "60%",
                borderBottom: "1px solid #C9C9C9",
                padding: "15px",
                marginBottom: "15px",
                marginTop: "10px",
                boxShadow: "0px 2px 8px #C9C9C9",
                borderRadius: "5px",
                boxSizing: "border-box",
            },
            leaveReview: {
                display: "flex",
                width: "80%",
                fontWeight: "bold",
                margin: "10px",
            },
            starRatingContainer: {
                display: "flex",
                width: "80%"
            },
            container: {
                display: "flex",
                flexDirection: "Column",
                alignItems: "Center"
            },
            header: {
                backgroundColor: "#163D57",
                width: "100%",
                height: "40px",
                marginBottom: "10px",
                display: "flex",
                alignItems: "center",
                paddingLeft: "40%",
                // paddingLeft: wideView ? (window.innerWidth-700): "30%",
                // color: isMobile ? 'red' : 'black',
                color: "white",
                boxShadow: "0px 2px 7px #C9C9C9",
            },
            messageSpan: {
                fontSize: "12px"
            },
            textarea: {
                width: "80%",
                height: "50px",
                padding: "10px",
                borderRadius: "5px",
                marginTop: "10px"
            },
            buttonContainer:{
                display: 'flex',
                justifyContent: "flex-end",
                width: "80%"
            },
            submitButton: {
                border: "none",
                cursor: "pointer",
                borderRadius: "5px",
                marginTop: "20px",
                backgroundColor: "#163D57",
                border: "1px solid #163D57",
                color: "white",
                padding: "5px",
            },
            reviewer: {
                marginLeft: "8px"
            },
            reviewContainer: {
                marginBottom: "5px",
                display: "flex",
                flexDirection: "column",
                textAlign: "left",
                padding: "20px",
                width: "60%",
                boxShadow: "0px 1px 5px #C9C9C9",
                boxSizing: "border-box",
                borderRadius: "5px"
            },
            userContainer: {
                display: "flex",
                alignItems: "center",
            },
            messageIcon: {
                fontSize: "20px",
                color: "white",
                
            },
            iconContainer: {
                cursor: "pointer",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                marginLeft: "20px"
            }
            
        }
    }
}
function mapStateToProps(state){
    const {messages, user} = state;
    return {messages, user}   
}


export default connect(mapStateToProps, {addRecipient, updateCurrentThread})(UserReviews);

