import React, {Component} from 'react'
import axios from 'axios';

export default class UserReviews extends Component {
    constructor(props){
        super(props)
        this.state = {
            reviews: [],
            addedReview: ""
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
        axios.post(`/api/userReviews/addReview/${this.props.match.params.id}`, {review: this.state.addedReview});
    }
    
    render(){
        console.log(this.props)
        return (
            <div>
                Reviews
                <textarea  type="text" value={this.state.addedReview} onChange={this.handleReviewChange}></textarea>
                <button onClick={()=>{this.addReview()}}>Submit</button>
                {this.state.reviews.map((review, index)=>{
                    return (
                        <div key={review.id}>
                            <span>
                                {review.stars}
                            </span>
                            <span>
                                {review.name}
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
}
