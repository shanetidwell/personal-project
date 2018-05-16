import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {getUserInfo} from '../../redux/reducers/user';
import {setGiftRequestAddedFalse} from '../../redux/reducers/userRequest';

// import './Home.css';

class Home extends Component {

    componentWillMount(){
        this.props.getUserInfo();
        this.props.setGiftRequestAddedFalse();
    }

    render(){
        const styles = this.styles()
        console.log(11111, this.props)
        return (
            this.props.user.id?
            <div style={styles.contentContainer}>
                <Link to='/request'><button style={styles.button} /* className="button request-button" */ >Place Order</button></Link>
                <Link to={'/shopanddeliver'}><button style={styles.button}/*  className="button fulfill-button" */>Shop and Deliver</button></Link>
            </div>

            :
            <div>
                <Link to="/"><button> Go to login page</button></Link>
            </div>
        )
    }
    styles = () => {
        
        return {
            contentContainer: {
                backgroundImage: "url(" + "https://images.unsplash.com/photo-1510284876186-b1a84b94418f?ixlib=rb-0.3.5&s=126b9605a0aa819c77f00279c80d48e4&auto=format&fit=crop&w=1950&q=80" + ")",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                // backgroundPosition: "center",
                height: "80vh",
                display: "flex",
                justifyContent: "Center",
                alignItems: "Center",
            },
            button: {
                border: "none",
                cursor: "pointer",
                borderRadius: "2px",
                marginTop: "20px",
                backgroundColor: "Transparent",
                border: "1px solid black",
                fontSize: "16px",
                marginRight: "10px",
                fontSize: "20px"
              },
        }
      }
}
function mapStateToProps(state){
    const {user} = state;
    return {user}
}

export default connect(mapStateToProps, {getUserInfo, setGiftRequestAddedFalse})(Home)
