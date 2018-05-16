import React, {Component} from 'react'
import axios from 'axios';
import DeliveryRequest from '../DeliveryRequests/DeliveryRequests';

export default class ShopAndDeliver extends Component {
    constructor(props){
        super(props)
        this.state = {
            requests: []
        }
    }
    componentWillMount = ()=>{
        axios.get('/api/requests').then(response=>{
            console.log("requests", response);
            this.setState({requests: response.data})
        })
    }
    render (){
        const styles = this.styles()
        return(
            <div>
            <div style={styles.giftRequestsContainer}>
                
                {this.state.requests.map((request)=>{
                    const {id, gender, years_old, interests, favorite_colors, size, notes, name, user_id, money_amount} = request
                    return (
                        <DeliveryRequest key={id} requestId={id} gender={gender} age={years_old} interests={interests}
                         size={size} favoriteColors={favorite_colors} notes={notes} name={name} user_id={user_id} money_amount={money_amount}/>
                    )
                })}
            </div>
            </div>
        )
    }
    styles=()=>{
        return {
            giftRequestsContainer: {
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "space-around"
            }
        }
    }
}
