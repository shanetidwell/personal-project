import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {getMessageThreads} from '../../redux/reducers/messages';

// import './Home.css';

class MessageThreads extends Component {

    componentWillMount(){
        this.props.getMessageThreads();
    }

    render(){
        const styles = this.styles()
        
        return (
            
            <div >
               MesssageThreads
               {this.props.messages.messageThreads.map(messageThread=>{
                   console.log("message Thread", messageThread)
                   return(
                       <Link key={messageThread.id} to = {`/messages/${messageThread.id}`}>
                        <div key={messageThread.id}>
                            {messageThread.name}                       
                        </div>
                        </Link>
                    )
               })}
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
                height: "60vh",
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
    const {user, messages} = state;
    return {user, messages}
}

export default connect(mapStateToProps, {getMessageThreads})(MessageThreads);
