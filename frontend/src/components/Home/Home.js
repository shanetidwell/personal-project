import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {getUserInfo} from '../../redux/reducers/user'
import './Home.css';

class Home extends Component {

    componentWillMount(){
        this.props.getUserInfo()
    }

    render(){

        console.log(this.props)
        return (
            this.props.user.id?
            <div className="home-page">
                <Link to={'/request'}><button className="button request-button" >Place Order</button></Link>
                <Link to={'/shopanddeliver'}><button className="button fulfill-button">Shop and Deliver</button></Link>
            </div>

            :
            <div>
                <Link to="/"><button> Go to login page</button></Link>
            </div>
        )
    }
}
function mapStateToProps(state){
    const {user} = state;
    return {user}
}

export default connect(mapStateToProps, {getUserInfo})(Home)
