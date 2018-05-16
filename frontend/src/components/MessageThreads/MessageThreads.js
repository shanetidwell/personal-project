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
            
            <div style={styles.messageThreadPage} >
               <div style={styles.header}>Messages</div>
               {this.props.messages.messageThreads.map(messageThread=>{
                //    console.log("message Thread", messageThread)
                   if (messageThread.message !== null){
                       return(
                           
                           <Link key={messageThread.id} to = {`/messages/${messageThread.id}`}>
                           <div style={styles.messageThreadContainer}>
                                <div style={styles.firstLetter}>{messageThread.name[0].toUpperCase()}</div>
                                <div key={messageThread.id}>
                                    <div style={styles.messageSender}>{messageThread.name}</div>
                                    <div style={styles.message}>{messageThread.sender ===this.props.user.id? `You: ${messageThread.message}`: 
                                        messageThread.message.length > 40? `${messageThread.message.slice(0, 40)}...`: messageThread.message}</div>                      
                                </div>
                            </div>
                            </Link>
                        )
                   }
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
              header: {
                backgroundColor: "#163D57",
                width: "100%",
                height: "40px",
                marginBottom: "15px",
                display: "flex",
                alignItems: "center",
                // paddingLeft: wideView ? (window.innerWidth-600)/2: "30%",
                paddingLeft: "30%",
                // color: isMobile ? 'red' : 'black',
                color: "white",
                boxShadow: "0px 2px 7px #C9C9C9",
            },
              firstLetter: {
                  width: "30px",
                  height: "30px",
                  borderRadius: "50%",
                  backgroundColor: "#C9C9C9",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  color: "white",
                  marginRight: "15px"                  
              },
              messageThreadPage: {
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
              },
              messageThreadContainer: {
                  display: "flex",
                  boxShadow: "0px 2px 7px #C9C9C9",
                  width: "50vw",
                  padding: "10px",
                  borderRadius: "5px",
              },
              message:{
                  textAlign: "left",
                  fontSize: ".95rem",
                  color: "black"
              },
              messageSender: {
                  fontSize: "1.1rem",
                  textAlign: "left",
                  color: "black"                  
              }
        }
      }
}
function mapStateToProps(state){
    const {user, messages} = state;
    return {user, messages}
}

export default connect(mapStateToProps, {getMessageThreads})(MessageThreads);
