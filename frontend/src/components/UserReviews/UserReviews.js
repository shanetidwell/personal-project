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
            goToMessages: false
        }

    }
    componentDidMount(){
        axios.get(`/api/userReviews/${this.props.match.params.id}`).then(response=>{
            console.log("reviews", response);
            this.setState({reviews: response.data})
        })
    }
    handleReviewChange = (e)=>{
        this.setState({addedReview: e.target.value});
    }
    addReview = () =>{
        axios.post(`/api/userReviews/addReview/${this.props.match.params.id}`, {review: this.state.addedReview, stars: this.state.rating});
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
                <h3>Leave a Review</h3>
                <button onClick={()=>this.addMessageRecipient()}>Message</button>
                <div style={styles.submitReviewContainer}>
                    <StarRatings style={styles.star}
                        rating={this.state.rating}
                        changeRating={this.changeRating}    
                        numberOfStars = {5}                
                    />
                
                    <textarea style={styles.textarea} placeholder={'Write your review here'}type="text" value={this.state.addedReview} onChange={this.handleReviewChange}></textarea>
                    <button style={styles.submitButton} className={"button"} onClick={()=>{()=>this.addReview()}}>Submit</button>
                </div>
                {this.state.reviews.map((review, index)=>{
                    return (
                        <div key={review.id}>
                            
                            <StarRatings 
                                rating={review.stars === null? 0: review.stars}
                                starRatedColor="blue"
                                numberOfStars={5}
                                starDimension="15px"
                                starSpacing = "2px"
                            />
                            <p>
                            {review.review}
                            </p>
                            <span style={styles.reviewer}>
                                {`By ${review.name} on ${review.date_recorded === null? 0: review.date_recorded.substring(0,12)}`}
                            </span>
                            
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
                width: "50%"
            },
            container: {
                display: "flex",
                flexDirection: "Column",
                alignItems: "Center"
            },
            textarea: {
                width: "80%",
                height: "50px",
                padding: "10px",
                borderRadius: "5px",
                marginTop: "10px"
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
            },
            reviewer: {
                fontSize: "12px"
            }
            
        }
    }
}
function mapStateToProps(state){
    const {messages, user} = state;
    return {messages, user}   
}


export default connect(mapStateToProps, {addRecipient, updateCurrentThread})(UserReviews);

